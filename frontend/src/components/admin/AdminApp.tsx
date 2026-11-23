"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { logout, saveContent, setStatus } from "@/app/admin/actions";
import type { SectionKey, SiteContent, SiteInfo, Status, WidgetKey } from "@/content/types";
import { SECTION_INFO, SITE_INFO, WIDGET_INFO } from "./catalog";
import FieldEditor from "./FieldEditor";

type View =
  | { kind: "flags" }
  | { kind: "site"; key: keyof SiteInfo }
  | { kind: "section"; key: SectionKey }
  | { kind: "widget"; key: WidgetKey }
  | { kind: "leadForm" };

type Group = "sections" | "widgets";
type Notice = { type: "ok" | "error"; text: string } | null;

const STATUS_LABEL: Record<Status, string> = { active: "Active", hidden: "Hidden", disabled: "Disabled" };

const clone = <T,>(v: T): T => structuredClone(v);
const hasStatus = (v: unknown): v is { status: Status } => typeof v === "object" && v !== null && "status" in v;

function StatusBadge({ status }: { status: Status }) {
  return <span className={`adm-badge adm-badge-${status}`}>{STATUS_LABEL[status]}</span>;
}

function StatusActions({ status, busy, onChange }: { status: Status; busy: boolean; onChange: (s: Status) => void }) {
  if (status !== "active") {
    return (
      <button type="button" className="adm-btn adm-btn-sm adm-btn-primary" disabled={busy} onClick={() => onChange("active")}>
        Activate
      </button>
    );
  }
  return (
    <div className="adm-row">
      <button type="button" className="adm-btn adm-btn-sm" disabled={busy} onClick={() => onChange("hidden")}>Hide</button>
      <button type="button" className="adm-btn adm-btn-sm" disabled={busy} onClick={() => onChange("disabled")}>Disable</button>
    </div>
  );
}

export default function AdminApp({ initial, defaults, storage }: { initial: SiteContent; defaults: SiteContent; storage: "redis" | "local" }) {
  const [content, setContent] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [view, setView] = useState<View>({ kind: "flags" });
  const [notice, setNotice] = useState<Notice>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const [navOpen, setNavOpen] = useState(false);

  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(saved), [content, saved]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (notice?.type !== "ok") return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  function go(v: View) {
    setView(v);
    setNavOpen(false);
    window.scrollTo({ top: 0 });
  }

  function save() {
    startSaving(async () => {
      const res = await saveContent(content);
      if (res.ok) {
        setSaved(content);
        setNotice({ type: "ok", text: "Saved — the live site is updated." });
      } else {
        setNotice({ type: "error", text: res.error });
      }
    });
  }

  function discard() {
    if (confirm("Discard all unsaved changes?")) setContent(saved);
  }

  /** Status changes are saved immediately and don't touch other unsaved edits. */
  async function changeStatus(group: Group, key: string, status: Status) {
    const apply = (c: SiteContent, s: Status) => {
      const next = clone(c);
      (next[group] as Record<string, { status: Status }>)[key].status = s;
      return next;
    };
    const previous = (content[group] as Record<string, { status: Status }>)[key].status;
    setBusyKey(key);
    setContent((c) => apply(c, status));
    setSaved((c) => apply(c, status));
    const res = await setStatus(group, key, status);
    setBusyKey(null);
    if (res.ok) {
      setNotice({ type: "ok", text: `${nameOf(group, key)} is now ${STATUS_LABEL[status].toLowerCase()}.` });
    } else {
      setContent((c) => apply(c, previous));
      setSaved((c) => apply(c, previous));
      setNotice({ type: "error", text: res.error });
    }
  }

  function nameOf(group: Group, key: string) {
    return group === "sections" ? SECTION_INFO[key as SectionKey].name : WIDGET_INFO[key as WidgetKey].name;
  }

  // ── Editor plumbing for the current view ──
  const editor = (() => {
    switch (view.kind) {
      case "site":
        return {
          title: SITE_INFO[view.key].name,
          desc: SITE_INFO[view.key].desc,
          value: content.site[view.key],
          template: defaults.site[view.key],
          set: (v: unknown) => setContent((c) => ({ ...c, site: { ...c.site, [view.key]: v } })),
        };
      case "section":
        return {
          title: SECTION_INFO[view.key].name,
          desc: SECTION_INFO[view.key].desc,
          value: content.sections[view.key],
          template: defaults.sections[view.key],
          set: (v: unknown) => setContent((c) => ({ ...c, sections: { ...c.sections, [view.key]: v } })),
          group: "sections" as const,
        };
      case "widget":
        return {
          title: WIDGET_INFO[view.key].name,
          desc: WIDGET_INFO[view.key].desc,
          value: content.widgets[view.key],
          template: defaults.widgets[view.key],
          set: (v: unknown) => setContent((c) => ({ ...c, widgets: { ...c.widgets, [view.key]: v } })),
          group: "widgets" as const,
        };
      case "leadForm":
        return {
          title: "Lead Form",
          desc: "Dropdown options and thank-you message for all enquiry forms",
          value: content.leadForm,
          template: defaults.leadForm,
          set: (v: unknown) => setContent((c) => ({ ...c, leadForm: v as SiteContent["leadForm"] })),
        };
      default:
        return null;
    }
  })();

  function resetSection() {
    if (!editor || !confirm(`Reset “${editor.title}” to the original content? You can still discard before saving.`)) return;
    const fresh = clone(editor.template) as unknown;
    // keep the current status — resetting content shouldn't flip visibility
    if (hasStatus(fresh) && hasStatus(editor.value)) fresh.status = editor.value.status;
    editor.set(fresh);
  }

  const viewKey = "key" in view ? view.key : null;
  const isActive = (v: View) => JSON.stringify(v) === JSON.stringify(view);
  const navItem = (v: View, label: string, status?: Status) => (
    <button key={label} type="button" className={`adm-nav-item${isActive(v) ? " active" : ""}`} onClick={() => go(v)}>
      <span>{label}</span>
      {status && status !== "active" && <span className={`adm-dot adm-dot-${status}`} title={STATUS_LABEL[status]} />}
    </button>
  );

  const flagRows = (group: Group) =>
    (Object.keys(content[group]) as string[])
      .filter((key) => hasStatus((content[group] as Record<string, unknown>)[key]))
      .map((key) => {
        const status = (content[group] as Record<string, { status: Status }>)[key].status;
        const info = group === "sections" ? SECTION_INFO[key as SectionKey] : WIDGET_INFO[key as WidgetKey];
        return (
          <tr key={key}>
            <td>
              <div className="adm-flag-name">{info.name}</div>
              <div className="adm-flag-desc">{info.desc}</div>
            </td>
            <td><StatusBadge status={status} /></td>
            <td>
              <div className="adm-row adm-row-end">
                <StatusActions status={status} busy={busyKey === key} onChange={(s) => changeStatus(group, key, s)} />
                <button
                  type="button"
                  className="adm-btn adm-btn-sm adm-btn-ghost"
                  onClick={() => go(group === "sections" ? { kind: "section", key: key as SectionKey } : { kind: "widget", key: key as WidgetKey })}
                >
                  Edit
                </button>
              </div>
            </td>
          </tr>
        );
      });

  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <button type="button" className="adm-menu-btn" onClick={() => setNavOpen((o) => !o)} aria-label="Toggle menu">☰</button>
        <div className="adm-brand">🌊 {content.site.brand.name} <span>Admin</span></div>
        <div className="adm-topbar-actions">
          {dirty && <span className="adm-unsaved">Unsaved changes</span>}
          <a className="adm-btn adm-btn-sm adm-btn-ghost" href="/" target="_blank" rel="noopener noreferrer">View site ↗</a>
          <button type="button" className="adm-btn adm-btn-sm adm-btn-ghost" onClick={discard} disabled={!dirty || saving}>Discard</button>
          <button type="button" className="adm-btn adm-btn-sm adm-btn-primary" onClick={save} disabled={!dirty || saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          <form action={logout}><button className="adm-btn adm-btn-sm adm-btn-ghost">Log out</button></form>
        </div>
      </header>

      {notice && (
        <div className={`adm-notice adm-notice-${notice.type}`} role={notice.type === "error" ? "alert" : "status"}>
          {notice.text}
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss">×</button>
        </div>
      )}

      <div className="adm-body">
        <aside className={`adm-sidebar${navOpen ? " open" : ""}`}>
          {navItem({ kind: "flags" }, "⚑ Feature flags")}
          <div className="adm-nav-title">Site info</div>
          {(Object.keys(SITE_INFO) as (keyof SiteInfo)[]).map((k) => navItem({ kind: "site", key: k }, SITE_INFO[k].name))}
          <div className="adm-nav-title">Sections</div>
          {(Object.keys(SECTION_INFO) as SectionKey[]).map((k) => {
            const s = content.sections[k];
            return navItem({ kind: "section", key: k }, SECTION_INFO[k].name, hasStatus(s) ? s.status : undefined);
          })}
          <div className="adm-nav-title">Widgets</div>
          {(Object.keys(WIDGET_INFO) as WidgetKey[]).map((k) =>
            navItem({ kind: "widget", key: k }, WIDGET_INFO[k].name, content.widgets[k].status),
          )}
          <div className="adm-nav-title">Forms</div>
          {navItem({ kind: "leadForm" }, "Lead form")}
        </aside>

        <main className="adm-main">
          {storage === "local" && (
            <div className="adm-banner">
              Using local storage (<code>.data/</code>). On Vercel, connect Upstash Redis and Vercel Blob so changes persist.
            </div>
          )}

          {view.kind === "flags" && (
            <>
              <h1 className="adm-h1">Feature flags</h1>
              <p className="adm-lead">
                <b>Active</b> — shown normally. <b>Hidden</b> — removed from the site. <b>Disabled</b> — shown greyed-out
                and not clickable. Changes go live immediately.
              </p>
              <h2 className="adm-h2">Sections</h2>
              <div className="adm-table-wrap"><table className="adm-table"><tbody>{flagRows("sections")}</tbody></table></div>
              <h2 className="adm-h2">Widgets</h2>
              <div className="adm-table-wrap"><table className="adm-table"><tbody>{flagRows("widgets")}</tbody></table></div>
            </>
          )}

          {editor && (
            <>
              <div className="adm-editor-head">
                <div>
                  <h1 className="adm-h1">{editor.title}</h1>
                  <p className="adm-lead">{editor.desc}</p>
                </div>
                <div className="adm-row">
                  {"group" in editor && editor.group && hasStatus(editor.value) && (
                    <>
                      <StatusBadge status={editor.value.status} />
                      <StatusActions
                        status={editor.value.status}
                        busy={busyKey === viewKey}
                        onChange={(s) => viewKey && changeStatus(editor.group, viewKey, s)}
                      />
                    </>
                  )}
                  <button type="button" className="adm-btn adm-btn-sm adm-btn-ghost" onClick={resetSection}>Reset to default</button>
                </div>
              </div>
              <details className="adm-tips">
                <summary>Formatting tips</summary>
                <ul>
                  <li><code>*text*</code> in a title makes it gold. <code>**text**</code> in the hero intro makes it bold.</li>
                  <li><code>{"{{founder.name}}"}</code>, <code>{"{{stats.studentsGuided}}"}</code>, <code>{"{{location.city}}"}</code> etc. insert values from Site info, so you only update them once.</li>
                  <li>Empty a button&apos;s text to hide that button.</li>
                </ul>
              </details>
              <div className="adm-card">
                <FieldEditor value={editor.value} template={editor.template} onChange={editor.set} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

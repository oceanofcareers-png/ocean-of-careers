"use client";

import { useId, useState, type ChangeEvent } from "react";
import { FIELD_LABELS, SERVICE_THEMES } from "./catalog";

type Value = unknown;
type Obj = Record<string, Value>;
type OnChange = (v: Value) => void;

const IMAGE_KEYS = /^(logo|photo|image|ogImage)$/;
const LONG_TEXT_KEYS = new Set([
  "desc", "intro", "quote", "a", "excerpt", "featureDesc", "description", "whatsappDefaultMessage",
  "full", "successMessage", "paragraphs", "sub",
]);
const SKIP_KEYS = new Set(["status"]);

const isObj = (v: Value): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const isLink = (v: Value): v is { label: string; href: string } =>
  isObj(v) && Object.keys(v).length === 2 && "label" in v && "href" in v;

export function labelFor(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
}

/** An empty value with the same shape, used for "Add item". */
function blankFrom(template: Value): Value {
  if (typeof template === "string") return "";
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  if (template === null) return null;
  if (Array.isArray(template)) return [];
  if (isObj(template)) {
    if (isLink(template)) return { label: "", href: "#book" };
    return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, k === "theme" ? "navy" : blankFrom(v)]));
  }
  return template;
}

function itemSummary(item: Value, index: number): string {
  if (typeof item === "string") return item || `Item ${index + 1}`;
  if (isObj(item)) {
    for (const k of ["title", "name", "q", "label", "text", "value", "category"]) {
      if (typeof item[k] === "string" && item[k]) return item[k] as string;
    }
  }
  return `Item ${index + 1}`;
}

// ── Leaf inputs ───────────────────────────────────────────────

function TextField({ fieldKey, value, onChange }: { fieldKey: string; value: string; onChange: OnChange }) {
  const id = useId();
  const long = LONG_TEXT_KEYS.has(fieldKey) || value.length > 90;
  const isHref = fieldKey === "href" || /Url$/.test(fieldKey);
  return (
    <div className="adm-field">
      <label htmlFor={id}>{labelFor(fieldKey)}</label>
      {fieldKey === "theme" ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
          {SERVICE_THEMES.map((t) => <option key={t}>{t}</option>)}
        </select>
      ) : long ? (
        <textarea id={id} value={value} rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {isHref && (
        <small className="adm-hint">
          #section · /page · https://… · tel:+91… · mailto:… · whatsapp: (or whatsapp:your message)
        </small>
      )}
    </div>
  );
}

function NumberField({ fieldKey, value, onChange }: { fieldKey: string; value: number; onChange: OnChange }) {
  const id = useId();
  return (
    <div className="adm-field adm-field-sm">
      <label htmlFor={id}>{labelFor(fieldKey)}</label>
      <input id={id} type="number" step="any" value={Number.isFinite(value) ? value : 0} onChange={(e) => onChange(e.target.valueAsNumber || 0)} />
    </div>
  );
}

function BoolField({ fieldKey, value, onChange }: { fieldKey: string; value: boolean; onChange: OnChange }) {
  return (
    <label className="adm-check">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      {labelFor(fieldKey)}
    </label>
  );
}

function LinkField({ fieldKey, value, onChange }: { fieldKey: string; value: { label: string; href: string }; onChange: OnChange }) {
  const id = useId();
  return (
    <fieldset className="adm-link">
      <legend>{labelFor(fieldKey)}</legend>
      <div className="adm-link-row">
        <div className="adm-field">
          <label htmlFor={`${id}-l`}>Text</label>
          <input id={`${id}-l`} value={value.label} onChange={(e) => onChange({ ...value, label: e.target.value })} placeholder="Leave empty to hide" />
        </div>
        <div className="adm-field">
          <label htmlFor={`${id}-h`}>Link</label>
          <input id={`${id}-h`} value={value.href} onChange={(e) => onChange({ ...value, href: e.target.value })} />
        </div>
      </div>
      <small className="adm-hint">#section · /page · https://… · tel:+91… · mailto:… · whatsapp: (or whatsapp:your message)</small>
    </fieldset>
  );
}

function ImageField({ fieldKey, value, onChange }: { fieldKey: string; value: string | null; onChange: OnChange }) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-field">
      <label htmlFor={id}>{labelFor(fieldKey)}</label>
      <div className="adm-image">
        <div className="adm-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary URLs */}
          {value ? <img src={value} alt="" /> : <span>No image</span>}
        </div>
        <div className="adm-image-controls">
          <div className="adm-row">
            <label className="adm-btn adm-btn-sm">
              {busy ? "Uploading…" : "Upload image"}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" hidden onChange={upload} disabled={busy} />
            </label>
            {value && (
              <button type="button" className="adm-btn adm-btn-sm adm-btn-ghost" onClick={() => onChange(null)}>
                Remove
              </button>
            )}
          </div>
          <input id={id} type="text" placeholder="…or paste an image URL" value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} />
          {error && <small className="adm-error">{error}</small>}
        </div>
      </div>
    </div>
  );
}

// ── Lists ─────────────────────────────────────────────────────

function move<T>(arr: T[], from: number, to: number) {
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function ListControls({ index, length, onMove, onRemove }: { index: number; length: number; onMove: (to: number) => void; onRemove: () => void }) {
  return (
    <div className="adm-list-controls">
      <button type="button" className="adm-icon" disabled={index === 0} onClick={() => onMove(index - 1)} aria-label="Move up">↑</button>
      <button type="button" className="adm-icon" disabled={index === length - 1} onClick={() => onMove(index + 1)} aria-label="Move down">↓</button>
      <button type="button" className="adm-icon adm-icon-danger" onClick={onRemove} aria-label="Remove">✕</button>
    </div>
  );
}

function ArrayField({ fieldKey, value, template, onChange }: { fieldKey: string; value: Value[]; template: Value; onChange: OnChange }) {
  const sample = value[0] ?? template;
  const simple = typeof sample === "string" || sample === undefined;
  const [open, setOpen] = useState<number | null>(null);

  const update = (i: number, v: Value) => onChange(value.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => {
    if (confirm(`Remove “${itemSummary(value[i], i)}”?`)) onChange(value.filter((_, j) => j !== i));
  };
  const add = () => {
    onChange([...value, blankFrom(sample ?? "")]);
    setOpen(value.length);
  };

  return (
    <fieldset className="adm-array">
      <legend>{labelFor(fieldKey)} <span className="adm-count">{value.length}</span></legend>
      {simple ? (
        value.map((item, i) => (
          <div key={i} className="adm-array-simple">
            {LONG_TEXT_KEYS.has(fieldKey) ? (
              <textarea rows={4} value={String(item)} onChange={(e) => update(i, e.target.value)} />
            ) : (
              <input value={String(item)} onChange={(e) => update(i, e.target.value)} />
            )}
            <ListControls index={i} length={value.length} onMove={(to) => onChange(move(value, i, to))} onRemove={() => remove(i)} />
          </div>
        ))
      ) : (
        value.map((item, i) => (
          <div key={i} className={`adm-item${open === i ? " open" : ""}`}>
            <div className="adm-item-head">
              <button type="button" className="adm-item-toggle" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="adm-caret">{open === i ? "▾" : "▸"}</span> {itemSummary(item, i)}
              </button>
              <ListControls index={i} length={value.length} onMove={(to) => { onChange(move(value, i, to)); setOpen(to); }} onRemove={() => remove(i)} />
            </div>
            {open === i && (
              <div className="adm-item-body">
                <FieldEditor value={item} template={sample} onChange={(v) => update(i, v)} />
              </div>
            )}
          </div>
        ))
      )}
      <button type="button" className="adm-btn adm-btn-sm adm-btn-ghost" onClick={add}>+ Add</button>
    </fieldset>
  );
}

// ── Recursive editor ──────────────────────────────────────────

type Props = { value: Value; template?: Value; onChange: OnChange; fieldKey?: string };

export default function FieldEditor({ value, template, onChange, fieldKey }: Props) {
  if (fieldKey && IMAGE_KEYS.test(fieldKey) && (value === null || typeof value === "string")) {
    return <ImageField fieldKey={fieldKey} value={value} onChange={onChange} />;
  }
  if (typeof value === "string") return <TextField fieldKey={fieldKey ?? ""} value={value} onChange={onChange} />;
  if (typeof value === "number") return <NumberField fieldKey={fieldKey ?? ""} value={value} onChange={onChange} />;
  if (typeof value === "boolean") return <BoolField fieldKey={fieldKey ?? ""} value={value} onChange={onChange} />;
  if (Array.isArray(value)) {
    const t = Array.isArray(template) ? template[0] : undefined;
    return <ArrayField fieldKey={fieldKey ?? ""} value={value} template={t} onChange={onChange} />;
  }
  if (isLink(value)) return <LinkField fieldKey={fieldKey ?? ""} value={value} onChange={onChange} />;
  if (isObj(value)) {
    const tmpl = isObj(template) ? template : {};
    const entries = Object.entries(value).filter(([k]) => !SKIP_KEYS.has(k));
    const body = (
      <div className="adm-fields">
        {entries.map(([k, v]) => (
          <FieldEditor key={k} fieldKey={k} value={v} template={tmpl[k]} onChange={(nv) => onChange({ ...value, [k]: nv })} />
        ))}
      </div>
    );
    return fieldKey ? (
      <fieldset className="adm-group">
        <legend>{labelFor(fieldKey)}</legend>
        {body}
      </fieldset>
    ) : (
      body
    );
  }
  return null;
}

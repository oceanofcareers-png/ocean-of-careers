import Image from "next/image";
import type { ReactNode } from "react";
import { isExternal, resolveHref } from "@/content/resolve";
import type { Link, SiteInfo, Status } from "@/content/types";

/** Renders `*text*` as a gold highlight. */
export function Highlight({ text, className = "gold" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <span key={i} className={className}>{part.slice(1, -1)}</span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Renders `**text**` as bold. */
export function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? <b key={i}>{part.slice(2, -2)}</b> : part,
      )}
    </>
  );
}

type SmartLinkProps = {
  link?: Link;
  href?: string;
  site: SiteInfo;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
};

export function SmartLink({ link, href, site, className, children, onClick, ariaLabel }: SmartLinkProps) {
  const url = resolveHref(href ?? link?.href ?? "", site);
  const external = isExternal(url);
  return (
    <a
      href={url}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children ?? link?.label}
    </a>
  );
}

/** Applies a section/widget status: hidden → not rendered, disabled → dimmed and non-interactive. */
export function Gate({ status, children }: { status: Status; children: ReactNode }) {
  if (status === "hidden") return null;
  if (status === "disabled") {
    return (
      <div className="is-disabled" inert aria-disabled="true">
        {children}
      </div>
    );
  }
  return <>{children}</>;
}

/** Images come from uploads or pasted URLs, so they skip the optimizer (no remotePatterns needed). */
export function ContentImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return <Image src={src} alt={alt} fill sizes={sizes} unoptimized style={{ objectFit: "cover" }} />;
}

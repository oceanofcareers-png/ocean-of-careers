import { ContentImage } from "./primitives";

export default function Logo({ src, name }: { src: string | null; name: string }) {
  return (
    <div className="nav-logo-box" style={{ position: "relative" }}>
      {src ? <ContentImage src={src} alt={`${name} logo`} sizes="54px" /> : <span aria-hidden>🌊</span>}
    </div>
  );
}

import Image from "next/image";

type Props = {
  src: string;
  className: string;
  /** Above-the-fold images load first; others load lazily. */
  priority?: boolean;
  position?: string;
};

/** Decorative full-bleed photo behind a section; the tint comes from the className's `::after`. */
export default function SectionBackground({ src, className, priority = false, position = "center" }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        {...(priority ? { fetchPriority: "high" as const, loading: "eager" as const } : { loading: "lazy" as const })}
        // Bundled images go through the optimizer; uploaded/pasted URLs are used as-is.
        unoptimized={!src.startsWith("/images/")}
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </div>
  );
}

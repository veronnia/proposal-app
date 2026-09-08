import type { ReactNode } from "react";

export function PreviewSection({
  title,
  accent,
  variant = "standard",
  constrainWidth = true,
  children,
}: {
  title: string;
  accent: string;
  variant?: "standard" | "manifesto";
  constrainWidth?: boolean;
  children: ReactNode;
}) {
  if (variant === "manifesto") {
    return (
      <section className="preview-section break-inside-avoid">
        <h2 className="font-display mb-4 text-sm font-semibold uppercase text-ink-500" style={{ letterSpacing: "0.14em" }}>
          {title}
        </h2>
        <div
          className="font-serif text-2xl italic leading-snug text-ink-900 md:text-[1.75rem]"
          style={{ maxWidth: "42ch", borderLeft: `3px solid ${accent}`, paddingLeft: "1.25rem" }}
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="preview-section break-inside-avoid">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">{title}</h2>
      <div aria-hidden className="mb-4 mt-2 h-[3px] w-12 rounded-full" style={{ backgroundColor: accent }} />
      {constrainWidth ? (
        <div className="max-w-[68ch] font-serif text-[1.05rem] leading-relaxed text-ink-700">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export function TextPreviewBody({ content }: { content: string | null | undefined }) {
  if (!content) {
    return <p className="font-sans text-sm italic text-ink-400">No content yet.</p>;
  }
  return <div className="whitespace-pre-wrap">{content}</div>;
}

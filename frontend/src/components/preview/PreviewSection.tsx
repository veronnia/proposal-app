import type { ReactNode } from "react";

export function PreviewSection({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section className="preview-section break-inside-avoid">
      <h2
        className="mb-3 border-b-2 pb-2 text-xl font-semibold text-ink-900"
        style={{ borderColor: accent }}
      >
        {title}
      </h2>
      <div className="text-sm leading-relaxed text-ink-700">{children}</div>
    </section>
  );
}

export function TextPreviewBody({ content }: { content: string | null | undefined }) {
  if (!content) {
    return <p className="italic text-ink-400">No content yet.</p>;
  }
  return <div className="whitespace-pre-wrap">{content}</div>;
}

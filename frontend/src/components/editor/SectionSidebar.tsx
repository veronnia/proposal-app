import { ChevronDown, ChevronUp, Eye, EyeOff, FileText, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProposalDraft } from "@/hooks/useProposalDraft";
import { isBasicInfoComplete } from "@/lib/validation";
import { isSectionComplete } from "@/sections/sectionRegistry";
import { SECTION_LABELS } from "@/sections/sectionMeta";
import type { SectionKey } from "@/types/proposal";

interface SectionSidebarProps {
  activeKey: string;
  onSelect: (key: string) => void;
}

export function SectionSidebar({ activeKey, onSelect }: SectionSidebarProps) {
  const { draft, dispatch } = useProposalDraft();

  return (
    <nav className="flex flex-col gap-1 p-3">
      <button
        onClick={() => onSelect("basicInfo")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
          activeKey === "basicInfo" ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-100"
        )}
      >
        <FileText className="h-4 w-4 shrink-0" />
        <span className="flex-1">Basic Info</span>
        <CompletionDot complete={isBasicInfoComplete(draft)} />
      </button>
      <button
        onClick={() => onSelect("branding")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
          activeKey === "branding" ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-100"
        )}
      >
        <Palette className="h-4 w-4 shrink-0" />
        <span className="flex-1">Branding</span>
      </button>

      <div className="my-2 border-t border-ink-200" />
      <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-ink-500">Sections</p>

      {draft.sectionOrder.map((key, index) => {
        const sectionKey = key as SectionKey;
        const visible = draft.sectionVisibility[key] ?? true;
        return (
          <div
            key={key}
            className={cn(
              "group flex items-center gap-1 rounded-lg px-1 py-1 text-sm transition-colors",
              activeKey === key ? "bg-brand-50" : "hover:bg-ink-100"
            )}
          >
            <div className="flex flex-col">
              <button
                aria-label="Move section up"
                disabled={index === 0}
                onClick={() => dispatch({ type: "MOVE_SECTION", key, direction: "up" })}
                className="rounded p-0.5 text-ink-400 hover:text-ink-700 disabled:opacity-0"
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                aria-label="Move section down"
                disabled={index === draft.sectionOrder.length - 1}
                onClick={() => dispatch({ type: "MOVE_SECTION", key, direction: "down" })}
                className="rounded p-0.5 text-ink-400 hover:text-ink-700 disabled:opacity-0"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => onSelect(key)}
              className={cn(
                "flex-1 truncate px-2 py-1.5 text-left font-medium",
                activeKey === key ? "text-brand-700" : "text-ink-700",
                !visible && "opacity-50"
              )}
            >
              {SECTION_LABELS[sectionKey] ?? key}
            </button>
            <button
              aria-label={visible ? "Hide section" : "Show section"}
              onClick={() => dispatch({ type: "TOGGLE_SECTION_VISIBILITY", key })}
              className="rounded p-1 text-ink-400 opacity-0 hover:text-ink-700 group-hover:opacity-100"
            >
              {visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
            <CompletionDot complete={isSectionComplete(sectionKey, draft)} />
          </div>
        );
      })}
    </nav>
  );
}

function CompletionDot({ complete }: { complete: boolean }) {
  return (
    <span
      className={cn("mr-2 h-1.5 w-1.5 shrink-0 rounded-full", complete ? "bg-emerald-500" : "bg-ink-300")}
      aria-hidden
    />
  );
}

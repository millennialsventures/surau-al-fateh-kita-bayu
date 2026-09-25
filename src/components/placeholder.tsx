import { Icon, type IconName } from "./icon";

type PlaceholderProps = {
  label: string;
  /** Optional detail line, e.g. what needs to be supplied. */
  hint?: string;
  icon?: IconName;
  className?: string;
};

/**
 * Marks content the surau committee has not supplied yet. Deliberately visible
 * rather than hidden, so nothing looks "live" when it is not.
 */
export function Placeholder({ label, hint, icon = "sparkle", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`rounded-card border border-dashed border-gold-300 bg-gold-50 p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold">
          <Icon name={icon} size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">{label}</p>
          {hint ? <p className="mt-1 text-sm leading-relaxed text-ink-soft">{hint}</p> : null}
        </div>
      </div>
    </div>
  );
}

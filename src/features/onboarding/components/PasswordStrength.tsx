const STRENGTH_COLORS = [
  "var(--border-subtle)",
  "var(--danger)",
  "var(--warning)",
  "var(--brand)",
  "var(--success)",
];
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_THRESHOLDS = { weak: 6, fair: 8, good: 12 };

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const len = password.length;
  const strength =
    len === 0
      ? 0
      : len < STRENGTH_THRESHOLDS.weak
        ? 1
        : len < STRENGTH_THRESHOLDS.fair
          ? 2
          : len < STRENGTH_THRESHOLDS.good
            ? 3
            : 4;

  if (strength === 0) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i <= strength ? STRENGTH_COLORS[strength] : "var(--border-subtle)",
            transition: `background var(--duration-normal)`,
          }}
        />
      ))}
      <span
        style={{
          fontSize: 11,
          color: STRENGTH_COLORS[strength],
          fontWeight: 500,
          fontFamily: "var(--font-family-sans)",
          whiteSpace: "nowrap",
        }}
      >
        {STRENGTH_LABELS[strength]}
      </span>
    </div>
  );
}

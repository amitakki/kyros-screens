type AuthBrandMarkProps = {
  compact?: boolean;
};

export function AuthBrandMark({
  compact = false,
}: AuthBrandMarkProps) {
  const boxSize = compact ? 28 : 36;
  const radius = compact ? 6 : 8;
  const fontSize = compact ? 7 : 8;
  const labelSize = compact ? 16 : 18;

  return (
    <>
      <div
        style={{
          width: boxSize,
          height: boxSize,
          borderRadius: radius,
          border: "2px dashed var(--brand-muted)",
          background:
            "color-mix(in oklch, var(--brand-subtle) 8%, transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize,
            color: "var(--brand-light)",
            letterSpacing: "0.06em",
          }}
        >
          LOGO
        </span>
      </div>
      <span
        style={{
          color: "var(--brand-foreground)",
          fontSize: labelSize,
          fontWeight: 600,
        }}
      >
        Kyros
      </span>
    </>
  );
}

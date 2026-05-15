type OutcomeStat = {
  number: string;
  label: string;
};

type OutcomesStripSectionProps = {
  isMobile: boolean;
  stats: readonly OutcomeStat[];
  footnote: string;
};

export function OutcomesStripSection({
  isMobile,
  stats,
  footnote,
}: OutcomesStripSectionProps) {
  return (
    <section
      style={{
        background: "var(--brand-dark)",
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: isMobile ? 32 : 48,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.number}>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: "var(--surface-raised)",
                  lineHeight: 1.1,
                  marginBottom: 12,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "var(--brand-muted)",
                  lineHeight: 1.6,
                  maxWidth: 260,
                  margin: "0 auto",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "var(--brand-light)",
            opacity: 0.7,
          }}
        >
          {footnote}
        </p>
      </div>
    </section>
  );
}

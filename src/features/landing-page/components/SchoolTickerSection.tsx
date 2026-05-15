type SchoolTickerSectionProps = {
  schools: readonly string[];
  tickerItems: readonly string[];
  prefix: string;
  suffix: string;
};

export function SchoolTickerSection({
  schools,
  tickerItems,
  prefix,
  suffix,
}: SchoolTickerSectionProps) {
  return (
    <section
      id="schools"
      style={{
        background: "var(--surface-inverse)",
        height: 56,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="kyros-ticker-track">
          {tickerItems.map((school, index) => (
            <span
              key={`${school}-${index}`}
              style={{
                color: "var(--surface-raised)",
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: "nowrap",
                paddingRight: 32,
                fontFamily: "inherit",
              }}
            >
              {index === 0 || index === schools.length ? (
                <span>
                  <span
                    style={{
                      color: "var(--auth-panel-text)",
                      marginRight: 12,
                    }}
                  >
                    {prefix}
                  </span>
                  {school}
                </span>
              ) : (
                <>{"·  "}{school}</>
              )}
            </span>
          ))}
          <span
            style={{
              color: "var(--brand-light)",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
              paddingRight: 64,
            }}
          >
            {suffix}
          </span>
        </div>
      </div>
    </section>
  );
}

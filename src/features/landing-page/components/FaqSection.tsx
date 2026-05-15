import { ChevronDown } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  items: readonly FaqItem[];
  openFaq: number | null;
  onToggleFaq: (index: number) => void;
  title: string;
  moreQuestionsLabel: string;
  helpCenterLabel: string;
  helpCenterHref: string;
};

export function FaqSection({
  items,
  openFaq,
  onToggleFaq,
  title,
  moreQuestionsLabel,
  helpCenterLabel,
  helpCenterHref,
}: FaqSectionProps) {
  return (
    <section
      id="faq"
      style={{
        background: "var(--surface-subtle)",
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--text-heading)",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          {title}
        </h2>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {items.map((item, index) => (
            <div
              key={item.q}
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 12,
                marginBottom: 12,
                overflow: "hidden",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <button
                onClick={() => onToggleFaq(index)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text-heading)",
                  }}
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "var(--text-subtle)",
                    flexShrink: 0,
                    transform:
                      openFaq === index
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              {openFaq === index && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-body)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
          <p
            style={{
              textAlign: "center",
              marginTop: 28,
              fontSize: 14,
              color: "var(--text-subtle)",
            }}
          >
            {moreQuestionsLabel}{" "}
            <a
              href={helpCenterHref}
              style={{
                color: "var(--brand)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {helpCenterLabel}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

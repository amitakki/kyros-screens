import { Star } from "lucide-react";
import { Card, CardContent } from "../../../app/components/ui/card";

type TestimonialItem = {
  quote: string;
  author: string;
  school: string;
  badge: string;
  initial: string;
  color: string;
};

type TestimonialsContent = {
  title: string;
  items: readonly TestimonialItem[];
  ratingScore: string;
  ratingCount: string;
};

type Props = {
  isMobile: boolean;
  content: TestimonialsContent;
};

export function TestimonialsSection({ isMobile, content }: Props) {
  return (
    <section
      style={{
        background: "var(--brand-subtle)",
        paddingTop: isMobile ? 40 : 64,
        paddingBottom: isMobile ? 40 : 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <h2
            style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: 700,
              color: "var(--text-heading)",
            }}
          >
            {content.title}
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {content.items.map((t) => (
            <Card
              key={t.author}
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 12,
                boxShadow: "var(--shadow-soft)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "var(--brand-subtle)",
                  color: "var(--brand)",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {t.badge}
              </div>
              <CardContent style={{ padding: 28 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, color-mix(in oklch, ${t.color} 13%, transparent), color-mix(in oklch, ${t.color} 33%, transparent))`,
                      border: `2px solid color-mix(in oklch, ${t.color} 27%, transparent)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      color: t.color,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        style={{ color: "var(--warning)" }}
                        fill="var(--warning)"
                      />
                    ))}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--text-heading)",
                    lineHeight: 1.65,
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-heading)",
                    marginBottom: 10,
                  }}
                >
                  {t.author}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    background: "var(--success-subtle)",
                    color: "var(--success-dark)",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {t.school}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Star
              size={20}
              style={{ color: "var(--warning)" }}
              fill="var(--warning)"
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "var(--text-heading)",
              }}
            >
              {content.ratingScore}
            </span>
            <span style={{ fontSize: 14, color: "var(--text-subtle)" }}>
              {content.ratingCount}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

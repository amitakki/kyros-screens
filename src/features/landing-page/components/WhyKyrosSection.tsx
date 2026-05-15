import { BarChart2, Clock, Target } from "lucide-react";
import type { ComponentType } from "react";

type IconName = "target" | "clock" | "bar-chart";

type WhyKyrosPoint = {
  icon: IconName;
  iconColor: string;
  iconBg: string;
  title: string;
  desc: string;
};

type WhyKyrosContent = {
  title: string;
  points: readonly WhyKyrosPoint[];
};

type Props = {
  isMobile: boolean;
  content: WhyKyrosContent;
};

function resolveIcon(name: IconName): ComponentType<{ size: number; style?: React.CSSProperties }> {
  switch (name) {
    case "target": return Target;
    case "clock": return Clock;
    case "bar-chart": return BarChart2;
  }
}

export function WhyKyrosSection({ isMobile, content }: Props) {
  return (
    <section
      style={{
        background: "var(--surface-raised)",
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
          {content.title}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 32,
            maxWidth: 1184,
            margin: "0 auto",
          }}
        >
          {content.points.map((point) => {
            const IconComponent = resolveIcon(point.icon);
            return (
              <div
                key={point.title}
                style={{
                  textAlign: "center",
                  padding: 32,
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    background: point.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <IconComponent
                    size={28}
                    style={{ color: point.iconColor }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";

type Props = { items: readonly string[] };

export function PricingFeatureList({ items }: Props) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0 0 24px",
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <Check
            size={15}
            style={{
              color: "var(--brand)",
              marginTop: 2,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "var(--text-body)",
              lineHeight: 1.5,
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

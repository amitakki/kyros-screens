import { Search } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { Input } from "../../../app/components/ui/input";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { testHistoryContent as c } from "../content";
import type { TestRecord } from "../types";

interface TestHistorySectionProps {
  filterSubject: string;
  searchQuery: string;
  sortBy: string;
  testHistory: TestRecord[];
  totalTests: number;
  onFilterSubjectChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}

const SORT_OPTIONS = [
  { value: "date",  label: "Date" },
  { value: "score", label: "Score" },
];

const FILTER_OPTIONS = [
  { value: "all",       label: "All" },
  { value: "maths",     label: "Maths" },
  { value: "english",   label: "English" },
  { value: "verbal",    label: "Verbal" },
  { value: "nonverbal", label: "Non-Verbal" },
];

function PillButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 32,
        padding: "0 13px",
        border: `1px solid ${active ? "var(--brand)" : "var(--border-subtle)"}`,
        borderRadius: 20,
        background: active ? "var(--brand-subtle)" : "transparent",
        color: active ? "var(--brand)" : "var(--text-muted)",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        fontFamily: "var(--font-family-sans)",
        transition: "background 120ms, border-color 120ms, color 120ms",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function ScoreBadge({ rawScore }: { rawScore: number }) {
  const bg    = rawScore >= 85 ? "var(--success-subtle)" : rawScore >= 70 ? "var(--warning-subtle)" : "var(--danger-subtle)";
  const color = rawScore >= 85 ? "var(--success)"        : rawScore >= 70 ? "var(--warning)"        : "var(--danger)";

  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 700,
        padding: "2px 9px",
        borderRadius: 20,
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}
    >
      {rawScore}%
    </span>
  );
}

export function TestHistorySection({
  filterSubject,
  searchQuery,
  sortBy,
  testHistory,
  totalTests,
  onFilterSubjectChange,
  onSearchQueryChange,
  onSortByChange,
}: TestHistorySectionProps) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: 28,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--text-heading)",
              margin: 0,
            }}
          >
            {c.heading}
          </h3>
          <span
            style={{
              fontSize: 13,
              color: "var(--text-subtle)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {testHistory.length} of {totalTests}
          </span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Button style={{ fontSize: 13, height: 34 }} variant="ghost">
            {c.exportCsv}
          </Button>
          <Button style={{ fontSize: 13, height: 34 }} title={c.exportPdfTooltip} variant="ghost">
            {c.exportPdf}
          </Button>
        </div>
      </div>

      {/* ── Controls row ── */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: isMobile ? "1 1 auto" : "0 0 240px" }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-subtle)",
            }}
          />
          <Input
            placeholder={c.searchPlaceholder}
            style={{
              height: 36,
              paddingLeft: 36,
              fontSize: 13,
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
            }}
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />
        </div>

        {/* Sort pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "var(--text-subtle)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Sort:
          </span>
          {SORT_OPTIONS.map((opt) => (
            <PillButton
              key={opt.value}
              active={sortBy === opt.value}
              label={opt.label}
              onClick={() => onSortByChange(opt.value)}
            />
          ))}
        </div>

        {/* Subject filter pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTER_OPTIONS.map((opt) => (
            <PillButton
              key={opt.value}
              active={filterSubject === opt.value}
              label={opt.label}
              onClick={() => onFilterSubjectChange(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-subtle)" }}>
              {[c.colDate, c.colSubject, c.colTopic, c.colScore, c.colTime].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-subtle)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testHistory.map((test, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid var(--surface-muted)",
                  transition: "background 120ms",
                  cursor: "pointer",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "var(--brand-subtle)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "11px 14px",
                    fontSize: 13,
                    color: "var(--text-subtle)",
                    whiteSpace: "nowrap",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {test.date}
                </td>
                <td style={{ padding: "11px 14px", fontSize: 13, color: "var(--text-body)" }}>
                  {test.subject}
                </td>
                <td
                  style={{
                    padding: "11px 14px",
                    fontSize: 13,
                    color: "var(--text-body)",
                    maxWidth: isMobile ? 120 : 240,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {test.topic}
                </td>
                <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ScoreBadge rawScore={test.rawScore} />
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--text-subtle)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {test.score.split(" ")[0]}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "11px 14px",
                    fontSize: 13,
                    color: "var(--text-subtle)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {test.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Load more ── */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button style={{ fontSize: 14 }} variant="ghost">
          {c.loadMore}
        </Button>
      </div>
    </div>
  );
}

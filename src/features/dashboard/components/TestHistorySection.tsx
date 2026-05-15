import type { CSSProperties } from "react";
import { Search } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { Input } from "../../../app/components/ui/input";
import { testHistoryContent as c } from "../content";
import type { TestRecord } from "../types";

interface TestHistorySectionProps {
  filterSubject: string;
  searchQuery: string;
  sortBy: string;
  testHistory: TestRecord[];
  onFilterSubjectChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}

export function TestHistorySection({
  filterSubject,
  searchQuery,
  sortBy,
  testHistory,
  onFilterSubjectChange,
  onSearchQueryChange,
  onSortByChange,
}: TestHistorySectionProps) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-heading)", marginBottom: 20 }}>
        {c.heading}
      </h3>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ position: "relative", width: 280 }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-subtle)",
              }}
            />
            <Input
              placeholder={c.searchPlaceholder}
              style={{
                height: 40,
                paddingLeft: 40,
                fontSize: 14,
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
              }}
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
            />
          </div>
          <select
            style={selectStyle}
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
          >
            <option value="date">{c.sortByDate}</option>
            <option value="score">{c.sortByScore}</option>
          </select>
          <select
            style={selectStyle}
            value={filterSubject}
            onChange={(event) => onFilterSubjectChange(event.target.value)}
          >
            <option value="all">{c.filterAll}</option>
            <option value="maths">{c.filterMaths}</option>
            <option value="english">{c.filterEnglish}</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button style={{ fontSize: 13 }} variant="ghost">
            {c.exportCsv}
          </Button>
          <Button style={{ fontSize: 13 }} title={c.exportPdfTooltip} variant="ghost">
            {c.exportPdf}
          </Button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-subtle)" }}>
              <th style={tableHeadStyle}>{c.colDate}</th>
              <th style={tableHeadStyle}>{c.colSubject}</th>
              <th style={tableHeadStyle}>{c.colTopic}</th>
              <th style={tableHeadStyle}>{c.colScore}</th>
              <th style={tableHeadStyle}>{c.colTime}</th>
            </tr>
          </thead>
          <tbody>
            {testHistory.map((test, index) => (
              <tr
                key={index}
                style={{ borderBottom: "1px solid var(--surface-muted)" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "var(--brand-subtle)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "transparent";
                }}
              >
                <td style={tableCellStyle}>{test.date}</td>
                <td style={tableCellStyle}>{test.subject}</td>
                <td style={tableCellStyle}>{test.topic}</td>
                <td
                  style={{
                    ...tableCellStyle,
                    color:
                      test.rawScore >= 85
                        ? "var(--success)"
                        : test.rawScore < 70
                          ? "var(--danger)"
                          : "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {test.score}{test.rawScore === 100 ? ' 🎉' : test.rawScore >= 85 ? ' ✓' : ''}
                </td>
                <td style={{ ...tableCellStyle, color: "var(--text-muted)" }}>{test.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Button style={{ fontSize: 15 }} variant="ghost">
          {c.loadMore}
        </Button>
      </div>
    </div>
  );
}

const selectStyle: CSSProperties = {
  height: 40,
  padding: "0 12px",
  border: "1px solid var(--border-subtle)",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "var(--font-family-sans)",
  cursor: "pointer",
};

const tableHeadStyle: CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-muted)",
};

const tableCellStyle: CSSProperties = {
  padding: "12px 16px",
  fontSize: 14,
  color: "var(--text-body)",
};

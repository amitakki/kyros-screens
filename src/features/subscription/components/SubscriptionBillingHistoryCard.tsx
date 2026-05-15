import { Download } from "lucide-react";

import { subscriptionBillingContent } from "../content";

export function SubscriptionBillingHistoryCard() {
  const content = subscriptionBillingContent.billingHistory;
  const statusClassNames = {
    Paid: "bg-success-subtle text-success",
    Pending: "bg-warning-subtle text-warning-foreground",
    Failed: "bg-danger-subtle text-danger-foreground",
  } as const;

  const getStatusClassName = (status: string) =>
    statusClassNames[status as keyof typeof statusClassNames] ??
    statusClassNames.Failed;

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-7 shadow-sm">
      <div className="mb-1 flex items-baseline justify-between">
        <p className="text-base font-bold text-foreground">{content.title}</p>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        {content.description}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              {content.columns.map((column) => (
                <th
                  key={column}
                  className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, index) => (
              <tr
                key={`${row.date}-${row.amount}`}
                className={`border-b border-border-subtle ${
                  index % 2 === 0 ? "bg-card" : "bg-surface-subtle"
                }`}
              >
                <td className="px-3 py-3.5 text-text-body">{row.date}</td>
                <td className="px-3 py-3.5 text-text-body">{row.desc}</td>
                <td className="px-3 py-3.5 font-semibold text-foreground">
                  {row.amount}
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClassName(
                      row.status,
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <button
                    className="flex items-center gap-1 bg-transparent text-sm text-brand"
                    type="button"
                  >
                    <Download size={13} /> {content.downloadCta}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {[content.exportCsvCta, content.exportPdfCta].map((buttonLabel) => (
          <button
            key={buttonLabel}
            className="h-9 rounded-lg border border-border bg-transparent px-4 text-sm font-medium text-text-body"
            type="button"
          >
            {buttonLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

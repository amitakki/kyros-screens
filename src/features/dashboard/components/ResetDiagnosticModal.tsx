import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";

interface ResetDiagnosticModalProps {
  childName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetDiagnosticModal({
  childName,
  onClose,
  onConfirm,
}: ResetDiagnosticModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 text-center">
          <AlertCircle className="mx-auto mb-4 size-8 text-warning" />
          <h3 className="mb-3 text-xl font-bold text-foreground">
            Reset {childName}&apos;s diagnostic?
          </h3>
          <p className="text-sm leading-6 text-text-body">
            {childName}&apos;s {parentDashboardContent.resetDiagnosticDescription.toLowerCase()}
          </p>
        </div>

        <label className="mb-6 flex cursor-pointer items-start gap-2.5 rounded-lg bg-secondary p-4">
          <input
            checked={confirmed}
            className="mt-0.5 cursor-pointer"
            type="checkbox"
            onChange={(event) => setConfirmed(event.target.checked)}
          />
          <span className="text-sm text-text-body">
            {parentDashboardContent.archiveProgressConfirmation} {childName}&apos;s
            {" "}current progress
          </span>
        </label>

        <div className="flex justify-between gap-3">
          <Button
            className="h-12 flex-1 text-sm"
            size="lg"
            variant="ghost"
            onClick={onClose}
          >
            {parentDashboardContent.cancel}
          </Button>
          <Button
            className="h-12 flex-1 text-sm font-semibold"
            disabled={!confirmed}
            size="lg"
            variant="destructive"
            onClick={onConfirm}
          >
            {parentDashboardContent.resetDiagnostic}
          </Button>
        </div>
      </div>
    </div>
  );
}

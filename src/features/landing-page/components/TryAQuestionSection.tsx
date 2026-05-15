import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";

type AnswerOption = { id: string; text: string };
type ExplanationStep = { label: string; text: string };

type TryAQuestionContent = {
  title: string;
  description: string;
  questionBadge: string;
  difficultyBadge: string;
  question: string;
  submitLabel: string;
  correctBadge: string;
  explanationTitle: string;
  explanationSteps: readonly ExplanationStep[];
  ctaLabel: string;
  ctaSubtext: string;
  answerOptions: readonly AnswerOption[];
  correctAnswer: string;
};

type Props = { content: TryAQuestionContent };

export function TryAQuestionSection({ content }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ background: "var(--surface-raised)", paddingTop: 64, paddingBottom: 64 }}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--text-heading)", marginBottom: 12 }}>
            {content.title}
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-body)" }}>{content.description}</p>
        </div>

        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div
            style={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 12,
              boxShadow: "var(--shadow-medium)",
              padding: 32,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span
                style={{
                  background: "var(--brand-subtle)",
                  color: "var(--brand)",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {content.questionBadge}
              </span>
              <span
                style={{
                  background: "var(--warning-subtle)",
                  color: "var(--warning-foreground)",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {content.difficultyBadge}
              </span>
            </div>

            <p style={{ fontSize: 18, color: "var(--text-heading)", fontWeight: 600, marginBottom: 24, lineHeight: 1.5 }}>
              Solve for <em>x</em>: &nbsp; {content.question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {content.answerOptions.map((opt) => {
                const isSelected = selectedAnswer === opt.id;
                const isCorrect = opt.id === content.correctAnswer;
                const showResult = submitted;
                let borderColor = "var(--border-subtle)";
                let bg = "var(--surface-raised)";
                let textColor = "var(--text-heading)";
                if (showResult && isCorrect) {
                  borderColor = "var(--success)";
                  bg = "var(--success-subtle)";
                  textColor = "var(--success-dark)";
                } else if (showResult && isSelected && !isCorrect) {
                  borderColor = "var(--danger)";
                  bg = "var(--danger-subtle)";
                  textColor = "var(--danger-foreground)";
                } else if (!showResult && isSelected) {
                  borderColor = "var(--brand)";
                  bg = "var(--brand-subtle)";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => !submitted && setSelectedAnswer(opt.id)}
                    disabled={submitted}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      height: 48,
                      padding: "0 16px",
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: 10,
                      background: bg,
                      cursor: submitted ? "default" : "pointer",
                      fontSize: 15,
                      color: textColor,
                      textAlign: "left",
                      transition: "all 0.15s",
                      ...(showResult && isCorrect ? { borderLeftWidth: 4 } : {}),
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: `1.5px solid ${isSelected || (showResult && isCorrect) ? borderColor : "var(--border-subtle)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        color: isSelected || (showResult && isCorrect) ? borderColor : "var(--text-subtle)",
                        flexShrink: 0,
                      }}
                    >
                      {opt.id}
                    </span>
                    {opt.text}
                    {showResult && isCorrect && (
                      <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 700, color: "var(--success)" }}>
                        {content.correctBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {!submitted ? (
              <button
                onClick={() => selectedAnswer && setSubmitted(true)}
                style={{
                  width: "100%",
                  height: 48,
                  background: selectedAnswer ? "var(--brand)" : "var(--border-subtle)",
                  color: selectedAnswer ? "var(--brand-foreground)" : "var(--text-subtle)",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: selectedAnswer ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                {content.submitLabel}
              </button>
            ) : (
              <div
                style={{
                  background: "var(--brand-subtle)",
                  border: "1px solid var(--brand-muted)",
                  borderLeft: "4px solid var(--brand)",
                  borderRadius: 8,
                  padding: "14px 16px",
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-dark)", marginBottom: 8 }}>
                  {content.explanationTitle}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65, margin: 0 }}>
                  {content.explanationSteps.map((step, i) => (
                    <span key={i}>
                      <strong>{step.label}</strong> {step.text}
                      {i < content.explanationSteps.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link to="/register">
              <Button
                style={{
                  background: "var(--brand)",
                  color: "var(--brand-foreground)",
                  height: 52,
                  paddingLeft: 32,
                  paddingRight: 32,
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 12,
                }}
                className="hover:bg-brand-hover"
              >
                {content.ctaLabel}{" "}
                <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </Button>
            </Link>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>{content.ctaSubtext}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

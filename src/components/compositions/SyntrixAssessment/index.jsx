import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

import Recommendation from "../../business/Recommendation";
import BusinessImpact from "../../business/BusinessImpact";
import Confidence from "../../business/Confidence";
import { getConfidenceLevel } from "../../../lib/confidence";

export default function SyntrixAssessment({
  assessmentSection,
}) {
  const {
    assessment,
    context,
    intelligence,
  } = assessmentSection ?? {};

  if (!assessment) return null;

  const confidence =
    getConfidenceLevel(
      assessment.confidence,
    );

  const {
    rootCauses = [],
    trends = [],
    memory = [],
    memorySummary,
  } = intelligence ?? {};

  return (
    <Card>
      <div className="space-y-10">
        <section>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Syntrix Assessment
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {assessment.title}
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            {assessment.assessment}
          </p>
        </section>

        <Recommendation
          recommendation={
            assessment.recommendation
          }
        />

        <BusinessImpact
          weeklyRecovery={
            assessment.businessImpact
              .weeklyRecovery
          }
          annualRecovery={
            assessment.businessImpact
              .annualRecovery
          }
        />

        <Confidence
          score={assessment.confidence}
          confidence={confidence}
        />

        {context && (
          <section className="border-t border-slate-800 pt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Why Syntrix Believes This
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              {context.headline}
            </h3>

            <p className="mt-4 leading-8 text-slate-300">
              {context.explanation}
            </p>

            {context.factors?.length > 0 && (
              <div className="mt-6 space-y-4">
                {context.factors.map(
                  (factor) => (
                    <div
                      key={factor.label}
                      className="flex items-start justify-between gap-8 border-b border-slate-800 pb-3"
                    >
                      <p className="font-semibold text-slate-200">
                        {factor.label}
                      </p>

                      <p className="max-w-xl text-right text-slate-400">
                        {factor.value}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        )}

        {rootCauses.length > 0 && (
          <section className="border-t border-slate-800 pt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Likely Root Causes
            </p>

            <div className="mt-5 space-y-4">
              {rootCauses.map((cause) => (
                <div
                  key={cause.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-white">
                      {cause.title}
                    </p>

                    <Badge
                      tone={getConfidenceTone(
                        cause.confidence,
                      )}
                    >
                      {cause.confidence} confidence
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {cause.description}
                  </p>

                  {cause.evidence?.length >
                    0 && (
                    <ul className="mt-3 space-y-1">
                      {cause.evidence.map(
                        (item) => (
                          <li
                            key={item}
                            className="text-sm text-slate-500"
                          >
                            • {item}
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {trends.length > 0 && (
          <section className="border-t border-slate-800 pt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Detected Trends
            </p>

            <div className="mt-5 space-y-4">
              {trends.map((trend) => (
                <div
                  key={trend.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-white">
                      {trend.title}
                    </p>

                    <Badge
                      tone={getTrendTone(
                        trend.severity,
                      )}
                    >
                      {trend.direction}
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {trend.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-slate-800 pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Operational Memory
          </p>

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-sm leading-6 text-slate-300">
              {memorySummary ??
                "No similar historical intervention found yet."}
            </p>

            {memory.length > 0 && (
              <p className="mt-3 text-xs text-slate-500">
                Based on {memory.length} previous
                matched intervention
                {memory.length === 1
                  ? ""
                  : "s"}
                .
              </p>
            )}
          </div>
        </section>
      </div>
    </Card>
  );
}

function getConfidenceTone(confidence) {
  if (confidence === "high") {
    return "success";
  }

  if (confidence === "medium") {
    return "warning";
  }

  return "info";
}

function getTrendTone(severity) {
  if (severity === "high") {
    return "danger";
  }

  if (severity === "medium") {
    return "warning";
  }

  return "info";
}
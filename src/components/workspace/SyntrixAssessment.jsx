import Card from "../ui/Card";
import Badge from "../ui/Badge";

import Recommendation from "../business/Recommendation";
import BusinessImpact from "../business/BusinessImpact";
import Confidence from "../business/Confidence";

import {
  getConfidenceLevel,
} from "../../lib/confidence";

export default function SyntrixAssessment({
  assessment: assessmentWorkspace,
}) {
  const {
    assessment,
    recommendation,
    analysis,
  } = assessmentWorkspace ?? {};

  if (!assessment) {
    return null;
  }

  const confidence =
    getConfidenceLevel(
      assessment.confidence,
    );

  const {
    headline,
    explanation,
    factors = [],
    evidence = [],
    rootCauses = [],
    trends = [],
    memory = [],
    memorySummary,
  } = analysis ?? {};

  const resolvedRecommendation =
    recommendation ??
    assessment.recommendation ??
    null;

  const businessImpact =
    assessment.businessImpact ?? null;

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

          {assessment.assessment && (
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              {assessment.assessment}
            </p>
          )}
        </section>

        {resolvedRecommendation && (
          <Recommendation
            recommendation={
              resolvedRecommendation
            }
          />
        )}

        {businessImpact && (
          <BusinessImpact
            weeklyRecovery={
              businessImpact.weeklyRecovery ??
              0
            }
            annualRecovery={
              businessImpact.annualRecovery ??
              0
            }
          />
        )}

        {assessment.confidence != null && (
          <Confidence
            score={assessment.confidence}
            confidence={confidence}
          />
        )}

        {(
          headline ||
          explanation ||
          factors.length > 0 ||
          evidence.length > 0
        ) && (
          <section className="border-t border-slate-800 pt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Supporting Analysis
            </p>

            {headline && (
              <h3 className="mt-3 text-2xl font-bold text-white">
                {headline}
              </h3>
            )}

            {explanation && (
              <p className="mt-4 leading-8 text-slate-300">
                {explanation}
              </p>
            )}

            {factors.length > 0 && (
              <div className="mt-6 space-y-4">
                {factors.map(
                  (factor, index) => (
                    <div
                      key={
                        factor.id ??
                        factor.label ??
                        index
                      }
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

            {evidence.length > 0 && (
              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-slate-200">
                  Evidence
                </p>

                <ul className="mt-3 space-y-2">
                  {evidence.map(
                    (item, index) => {
                      const text =
                        getDisplayText(item);

                      if (!text) {
                        return null;
                      }

                      return (
                        <li
                          key={
                            item?.id ??
                            `${text}-${index}`
                          }
                          className="text-sm leading-6 text-slate-400"
                        >
                          • {text}
                        </li>
                      );
                    },
                  )}
                </ul>
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
              {rootCauses.map(
                (cause, index) => (
                  <div
                    key={
                      cause.id ??
                      cause.title ??
                      index
                    }
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-white">
                        {cause.title}
                      </p>

                      {cause.confidence && (
                        <Badge
                          tone={getConfidenceTone(
                            cause.confidence,
                          )}
                        >
                          {cause.confidence} confidence
                        </Badge>
                      )}
                    </div>

                    {cause.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {cause.description}
                      </p>
                    )}

                    {cause.evidence?.length >
                      0 && (
                      <ul className="mt-3 space-y-1">
                        {cause.evidence.map(
                          (
                            item,
                            evidenceIndex,
                          ) => (
                            <li
                              key={`${getDisplayText(
                                item,
                              )}-${evidenceIndex}`}
                              className="text-sm text-slate-500"
                            >
                              •{" "}
                              {getDisplayText(
                                item,
                              )}
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        {trends.length > 0 && (
          <section className="border-t border-slate-800 pt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Detected Trends
            </p>

            <div className="mt-5 space-y-4">
              {trends.map(
                (trend, index) => (
                  <div
                    key={
                      trend.id ??
                      trend.title ??
                      index
                    }
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-white">
                        {trend.title}
                      </p>

                      {trend.direction && (
                        <Badge
                          tone={getTrendTone(
                            trend.severity,
                          )}
                        >
                          {trend.direction}
                        </Badge>
                      )}
                    </div>

                    {trend.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {trend.description}
                      </p>
                    )}
                  </div>
                ),
              )}
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

function getDisplayText(item) {
  if (typeof item === "string") {
    return item;
  }

  return (
    item?.description ??
    item?.value ??
    item?.label ??
    item?.title ??
    null
  );
}

function getConfidenceTone(confidence) {
  const normalizedConfidence =
    String(confidence).toLowerCase();

  if (normalizedConfidence === "high") {
    return "success";
  }

  if (normalizedConfidence === "medium") {
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
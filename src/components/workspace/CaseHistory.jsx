import WorkspaceSection from "../business/WorkspaceSection";
import InvestigationTimeline from "../investigations/InvestigationTimeline";
import InvestigationActivity from "../investigations/InvestigationActivity";

export default function CaseHistory({
  history,
}) {
  const {
    timeline,
    activity = [],
  } = history ?? {};

  if (!timeline && activity.length === 0) {
    return null;
  }

  return (
    <WorkspaceSection
      label="Case History"
      title="How this investigation evolved"
      description="Review the operational sequence that created this case and the actions recorded since it opened."
    >
      <div className="space-y-6">
        {timeline && (
          <InvestigationTimeline
            timeline={timeline}
          />
        )}

        {activity.length > 0 && (
          <InvestigationActivity
            activity={activity}
          />
        )}
      </div>
    </WorkspaceSection>
  );
}
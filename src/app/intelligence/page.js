import ExecutiveWorkspace from "../../components/layout/ExecutiveWorkspace";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import ExecutiveBrief from "../../components/intelligence/ExecutiveBrief";
import IntelligenceStory from "../../components/intelligence/IntelligenceStory";
import AskSyntrixPanel from "../../components/intelligence/AskSyntrixPanel";
import { getIntelligenceWorkspace, getRequestContext, } from "../../lib/services";

export default function IntelligencePage() {
  const requestContext = getRequestContext();
  const workspace = getIntelligenceWorkspace(requestContext);

  const { summary, intelligence } = workspace;

  return (
    <ExecutiveWorkspace
      eyebrow="Syntrix Intelligence"
      title={summary.title}
      decision="What does Syntrix understand about the business right now?"
    >

      <ExecutiveBrief brief={workspace.executiveBrief} />

      {intelligence.topOpportunities[0] && (
        <WorkspaceSection
          label="Featured Intelligence"
          title="Top Operational Story"
          description="The highest-priority issue Syntrix believes deserves leadership attention."
        >
          <IntelligenceStory item={intelligence.topOpportunities[0]} featured />
        </WorkspaceSection>
      )}

      <WorkspaceSection
        label="Additional Stories"
        title="Other Operational Stories"
        description="Additional intelligence Syntrix is tracking across your scope."
      >
        <div className="space-y-6">
          {intelligence.topOpportunities.slice(1).map((item) => (
            <IntelligenceStory key={item.priority.id} item={item} />
          ))}
        </div>
      </WorkspaceSection>

        <AskSyntrixPanel />
    </ExecutiveWorkspace>
  );
}
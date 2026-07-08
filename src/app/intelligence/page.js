import AppLayout from "../../components/layout/AppLayout";
import WorkspacePage from "../../components/layout/WorkspacePage";
import WorkspaceHeader from "../../components/business/WorkspaceHeader";
import WorkspaceSection from "../../components/business/WorkspaceSection";
import ExecutiveBrief from "../../components/intelligence/ExecutiveBrief";
import IntelligenceStory from "../../components/intelligence/IntelligenceStory";
import AskSyntrixPanel from "../../components/intelligence/AskSyntrixPanel";
import { getIntelligenceWorkspace, getUserContext } from "../../lib/services";

export default function IntelligencePage() {
  const user = getUserContext();
  const workspace = getIntelligenceWorkspace(user);

  const { summary, intelligence } = workspace;

  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow="Syntrix Intelligence"
          title={summary.title}
          decision="What does Syntrix understand about the business right now?"
          updatedAt="Updated live"
        />

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
      </WorkspacePage>
    </AppLayout>
  );
}
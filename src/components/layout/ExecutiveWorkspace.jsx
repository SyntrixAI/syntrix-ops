import AppLayout from "./AppLayout";
import WorkspacePage from "./WorkspacePage";
import WorkspaceHeader from "../business/WorkspaceHeader";

export default function ExecutiveWorkspace({
  eyebrow,
  title,
  decision,
  updatedAt = "Updated live",
  children,
}) {
  return (
    <AppLayout>
      <WorkspacePage>
        <WorkspaceHeader
          eyebrow={eyebrow}
          title={title}
          decision={decision}
          updatedAt={updatedAt}
        />

        {children}
      </WorkspacePage>
    </AppLayout>
  );
}
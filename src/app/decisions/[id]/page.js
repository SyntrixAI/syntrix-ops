import { notFound, } from "next/navigation";
import ExecutiveWorkspace from "../../../components/layout/ExecutiveWorkspace";
import {
  getExecutiveDecision,
  getRequestContext,
} from "../../../lib/services";
import ExecutiveDecision from "../../../components/compositions/ExecutiveDecision";

export default async function ExecutiveDecisionPage({
  params,
}) {
  const {
    id,
  } = await params;

  const requestContext =
    getRequestContext();

  const decision =
    getExecutiveDecision({
      decisionId: id,
      requestContext,
    });

  if (!decision) {
    notFound();
  }

  return (
    <ExecutiveWorkspace
        eyebrow="Executive Decision"
        title={decision.location}
        decision="Should leadership approve and execute this recommendation?"
    >
        <ExecutiveDecision
        decision={decision}
        />
    </ExecutiveWorkspace>
    );
}
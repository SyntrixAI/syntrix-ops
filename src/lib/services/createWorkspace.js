export function createWorkspace({
  organization = null,
  overview = {},
  status = null,
  metrics = {},
  insights = [],
  operations = {},
  execution = {},
  activity = {},
}) {
  return {
    organization,
    overview,
    status,
    metrics,
    insights,
    operations,
    execution,
    activity,
  };
}
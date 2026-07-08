import { operationalMemory } from "../../data/operationalMemory";

export function getOperationalMemory(locationId) {
  if (!locationId) return null;

  return operationalMemory[locationId] ?? null;
}
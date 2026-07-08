import { operationalMemory } from "../../data/operationalMemory";

export function getOperationalMemory({ locationId, category } = {}) {
  return operationalMemory.filter((memory) => {
    const matchesLocation = locationId
      ? memory.locationId === locationId
      : true;

    const matchesCategory = category
      ? memory.category === category
      : true;

    return matchesLocation && matchesCategory;
  });
}
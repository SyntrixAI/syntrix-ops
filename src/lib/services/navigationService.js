export function getNavigation(
  requestContext,
) {
  return [
    {
      title: "WORKFLOW",

      items: [
        {
          label:
            "Daily Briefing",

          href:
            "/",
        },

        getLeadershipWorkspaceItem(
          requestContext,
        ),

        {
          label:
            "Operations",

          href:
            "/operations",
        },

        {
          label:
            "Execution",

          href:
            "/execution",
        },
      ].filter(Boolean),
    },

    {
      title: "INTELLIGENCE",

      items: [
        {
          label:
            "Syntrix Intelligence",

          href:
            "/intelligence",
        },
      ],
    },

    {
      title: "SYSTEM",

      items: [
        {
          label:
            "Settings",

          href:
            "/settings",
        },
      ],
    },
  ];
}

function getLeadershipWorkspaceItem(
  requestContext,
) {
  const membership =
    requestContext?.membership;

  if (
    !membership ||
    membership.status !== "active"
  ) {
    return null;
  }

  const {
    scopeLevel,
    scopeEntityId,
  } = membership;

  if (
    scopeLevel === "company"
  ) {
    return {
      label:
        "Organization",

      href:
        "/organization",
    };
  }

  if (
    scopeLevel === "region" &&
    scopeEntityId
  ) {
    return {
      label:
        "Region",

      href:
        `/regions/${scopeEntityId}`,
    };
  }

  if (
    scopeLevel === "district" &&
    scopeEntityId
  ) {
    return {
      label:
        "District",

      href:
        `/districts/${scopeEntityId}`,
    };
  }

  if (
    scopeLevel === "location" &&
    scopeEntityId
  ) {
    return {
      label:
        "Location",

      href:
        `/locations/${scopeEntityId}`,
    };
  }

  return null;
}
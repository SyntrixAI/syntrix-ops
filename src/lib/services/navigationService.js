export function getNavigation(user) {
  return [
    {
      title: "WORKFLOW",
      items: [
        {
          label: "Daily Briefing",
          href: "/",
        },
        getOrganizationNavigationItem(user),
        {
          label: "Operations",
          href: "/operations",
        },
        {
          label: "Execution",
          href: "/execution",
        },
      ].filter(Boolean),
    },
    {
      title: "INTELLIGENCE",
      items: [
        {
          label: "Syntrix Intelligence",
          href: "/intelligence",
        },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        {
          label: "Settings",
          href: "/settings",
        },
      ],
    },
  ];
}

function getOrganizationNavigationItem(user) {
  const level = user?.scope?.level;

  if (level === "company") {
    return {
      label: "Organization",
      href: "/organization",
    };
  }

  if (level === "region") {
    return {
      label: "Region",
      href: "/organization",
    };
  }

  if (level === "district") {
    return {
      label: "District",
      href: "/organization",
    };
  }

  if (level === "location") {
    return {
      label: "Location",
      href: "/organization",
    };
  }

  return {
    label: "Organization",
    href: "/organization",
  };
}
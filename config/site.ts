export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "WODAI",
  description: "Make WORKOUTS easy with AI.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "New",
      href: "/create",
    },
    {
      label: "Bookmarks",
      href: "/favorites",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Program",
      href: "/program",
    },
    {
      label: "Analytics",
      href: "/analytics",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

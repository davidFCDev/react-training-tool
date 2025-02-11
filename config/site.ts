export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make WODS easy with WODAI.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create",
      href: "/create",
    },
    {
      label: "Favorites",
      href: "/favorites",
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

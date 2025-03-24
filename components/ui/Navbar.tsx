"use client";

import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { GithubIcon } from "../common/icons";
import ProfileDropdown from "../user/ProfileDropdown";

import { ThemeSwitch } from "@/components/utils/theme-switch";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/authContext";

export const Navbar = () => {
  const { user } = useAuth();

  const filteredNavItems = user
    ? siteConfig.navItems.filter(
        (item) =>
          item.label === "Home" ||
          item.label === "New" ||
          item.label === "Bookmarks" ||
          item.label === "Program" ||
          item.label === "Analytics"
      )
    : siteConfig.navItems.filter(
        (item) =>
          item.label === "Home" ||
          item.label === "Login" ||
          item.label === "Register"
      );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit anton-regular tracking-widest text-xl">
              TR<span className="text-success text-2xl font-bold">AI</span>NING
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {filteredNavItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {user ? <ProfileDropdown /> : null}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};

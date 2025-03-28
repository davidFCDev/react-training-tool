import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { Providers } from "./providers";

import { Navbar } from "@/components/ui/Navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-10 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-4 mt-6">
              <Link
                isExternal
                className="flex gap-1 text-current text-xs"
                href="https://github.com/davidFCDev"
                title="DavidFC GitHub"
              >
                <span className="text-default-600 ">Created with ❤️ by</span>
                <p className="text-success">DavidFC</p>
              </Link>
            </footer>
          </div>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ThemeSwitch } from "./components/theme-switch";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <header className="absolute flex flex-row gap-2 top-0 items-center left-0 h-16 w-screen p-5">
                <h1 className="text-lg h-fit ">Satisfactory: Alternate Assistant</h1> <ThemeSwitch className="justify-self-right"/> 
            </header>
            <main className="container mx-auto h-full max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full p-8 text-center">
              <span>Uses this <Link href="https://www.reddit.com/r/SatisfactoryGame/comments/1fekus9/alternate_recipe_ranking_10_optimizing_for/">ranking system</Link> developed by u/wrigh516</span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <SessionProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
      </body>
      </SessionProvider>
    </html>
  );
}
export const experimental_ppr = true;


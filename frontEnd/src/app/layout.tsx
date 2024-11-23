// app/layout.tsx

import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import localFont from "next/font/local";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "PlayOn",
  description: "Alquila tu cancha en un click (o dos...)",
};

const sfProRegular = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Regular.otf",
  variable: "--font-sf-pro-regular",
  weight: "100 900",
});

const sfProRegularItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-RegularItalic.otf",
  variable: "--font-sf-pro-regular-italic",
  weight: "100 900",
});

const sfProBold = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Bold.otf",
  variable: "--font-sf-pro-bold",
  weight: "100 900",
});
const sfProBoldItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-BoldItalic.otf",
  variable: "--font-sf-pro-bold-italic",
  weight: "100 900",
});

const sfProMedium = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Medium.otf",
  variable: "--font-sf-pro-medium",
  weight: "100 900",
});

const sfProMediumItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-MediumItalic.otf",
  variable: "--font-sf-pro-medium-italic",
  weight: "100 900",
});

const sfProSemibold = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Semibold.otf",
  variable: "--font-sf-pro-semibold",
  weight: "100 900",
});

const sfProSemiboldItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-SemiboldItalic.otf",
  variable: "--font-sf-pro-semibold-italic",
  weight: "100 900",
});

const sfProHeavy = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Heavy.otf",
  variable: "--font-sf-pro-heavy",
  weight: "100 900",
});

const sfProHeavyItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-HeavyItalic.otf",
  variable: "--font-sf-pro-heavy-italic",
  weight: "100 900",
});

const sfProLight = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Light.otf",
  variable: "--font-sf-pro-light",
  weight: "100 900",
});
const sfProLightItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-LightItalic.otf",
  variable: "--font-sf-pro-light-italic",
  weight: "100 900",
});

const sfProBlack = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Black.otf",
  variable: "--font-sf-pro-black",
  weight: "100 900",
});
const sfProBlackItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-BlackItalic.otf",
  variable: "--font-sf-pro-black-italic",
  weight: "100 900",
});

const sfProThin = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Thin.otf",
  variable: "--font-sf-pro-thin",
  weight: "100 900",
});
const sfProThinItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-ThinItalic.otf",
  variable: "--font-sf-pro-thin-italic",
  weight: "100 900",
});

const sfProUltralight = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-Ultralight.otf",
  variable: "--font-sf-pro-ultralight",
  weight: "100 900",
});

const sfProUltralightItalic = localFont({
  src: "../../public/fonts/sf-pro-font/SF-Pro-Display-UltralightItalic.otf",
  variable: "--font-sf-pro-ultralight-italic",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${sfProRegular.variable}
          ${sfProRegularItalic.variable}
          ${sfProBlack.variable}
          ${sfProBlackItalic.variable}
          ${sfProBold.variable}
          ${sfProBoldItalic.variable}
          ${sfProHeavy.variable}
          ${sfProHeavyItalic.variable}
          ${sfProLight.variable}
          ${sfProLightItalic.variable}
          ${sfProMedium.variable}
          ${sfProMediumItalic.variable}
          ${sfProSemibold.variable}
          ${sfProSemiboldItalic.variable}
          ${sfProThin.variable}
          ${sfProThinItalic.variable}
          ${sfProUltralight.variable}
          ${sfProUltralightItalic.variable}
          antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider attribute="class">
          <Theme>
            <SessionProvider session={session}>
              <Header />
              <main className="flex-1 flex justify-center items-center px-4 py-8 bg-gray-100">
                {children}
              </main>
              <Footer />
            </SessionProvider>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}

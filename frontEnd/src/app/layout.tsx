// app/layout.tsx

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
//import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "PlayOn",
  description: "Alquila tu cancha en un cl",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class">
          <Theme accentColor="orange">
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

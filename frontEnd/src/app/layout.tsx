// app/layout.tsx

import React from "react";
import Header from "@/components/Headerx";
import Footer from "@/components/footer";
import "@/styles/globals.css";
import { SharedStateProvider } from "../context/useSharedState";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "PlayOn",
  description: "Alquila tu cancha en un cl",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Theme accentColor="orange">
          <SharedStateProvider>
            <Header />
            <main className="flex-1 flex justify-center items-center px-4 py-8 bg-gray-100">
              {children}
            </main>
            <Footer />
          </SharedStateProvider>
        </Theme>
      </body>
    </html>
  );
};

export default RootLayout;

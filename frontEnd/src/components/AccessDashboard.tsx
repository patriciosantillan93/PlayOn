"use client";

import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";
import { Button } from "./ui/button";

export default function AccessDashboard() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login"
  );

  const openAuthModal = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" onClick={() => openAuthModal("login")}>
        Login
      </Button>
      <Button onClick={() => openAuthModal("register")}>Sign up</Button>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
}

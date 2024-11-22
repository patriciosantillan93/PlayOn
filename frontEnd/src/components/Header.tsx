"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { AuthModal } from "./auth/AuthModal";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login"
  );
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  console.log(session, " SESSION");

  const openAuthModal = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">PlayOn</h1>
          </Link>
          <nav className="hidden sm:flex items-center space-x-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Fields
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex flex-row items-center gap-2">
            {/* <div>
              {theme === "light" && (
                <button onClick={() => setTheme("dark")}>Dark</button>
              )}
              {theme === "dark" && (
                <button onClick={() => setTheme("light")} className="mr-2">
                  Light
                </button>
              )}
            </div> */}
            <ThemeToggle />
            {session?.user ? (
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-muted-foreground">
                  Welcome, {session.user.name}
                </span>
                <Link
                  href={`/users/${session.user.id}/bookings`}
                  className=" text-muted-foreground "
                >
                  My Bookings
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex text-sm text-muted-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => openAuthModal("login")}>
                  Login
                </Button>
                <Button onClick={() => openAuthModal("register")}>
                  Sign up
                </Button>

                <AuthModal
                  isOpen={isAuthModalOpen}
                  onClose={() => setIsAuthModalOpen(false)}
                  defaultTab={authModalTab}
                />
              </div>
            )}
          </div>

          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="hamburguer-container"
            className="sm:hidden flex flex-col justify-center place-items-center p-2 gap-2"
          >
            <div className="w-6 border border-gray-500"></div>
            <div className="w-6 border border-gray-500"></div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 bg-white w-full h-screen py-5 z-50 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="relative flex flex-col justify-start place-tems-center  text-lg font-bold">
          <Link className="px-5 py-3 hover:bg-gray-400" href="#">
            Fields
          </Link>
          <Link className="px-5 py-3 hover:bg-gray-400" href="#">
            Contact
          </Link>
          {session?.user && (
            <>
              <Link
                href={`/users/${session.user.id}/bookings`}
                className="px-5 py-3 hover:bg-gray-400"
              >
                My Bookings
              </Link>
              <button
                onClick={() => signOut()}
                className="px-5 py-3 text-left hover:bg-gray-400"
              >
                Logout
              </button>
            </>
          )}
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="close-hamburguer-container"
            className="absolute top-2 right-5 p-2 "
          >
            <div className="w-7 border-t-2 place-self-center border-gray-500 rotate-45"></div>

            <div className="w-7 border-t-2 place-self-center border-gray-500 -rotate-45"></div>
          </div>
        </nav>
      </div>
    </header>
  );
}

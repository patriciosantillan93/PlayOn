import { auth } from "@/auth";
import Link from "next/link";
import { logOut } from "@/actions/auth";
import { UserFromDB } from "@/interfaces/user";
import { CalendarDays } from "lucide-react";
import AccessDashboard from "./AccessDashboard";
import { Button } from "./ui/button";

export default async function Header() {
  const session = await auth();
  console.log(session, " SESSION");
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">PlayOn</h1>
          </div>
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
          <div className="flex items-center gap-2">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {session.user?.name}
                </span>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Bookings
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logOut}
                  className="flex items-center gap-2"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <AccessDashboard />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

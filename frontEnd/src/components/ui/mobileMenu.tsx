"use client";
import Link from "next/link";
import { logOut } from "@/actions/auth";
import { Session } from "next-auth";

export default function MobileMenu({
  session,
  onClose,
}: {
  session: Session;
  onClose: () => void;
}) {
  console.log(session, " SESSION");
  return (
    <div className="absolute sm:hidden top-0 left-0 w-full h-screen py-10 z-50">
      <nav className="relative flex flex-col justify-start align-items-center  text-lg font-bold">
        <Link className="px-5 py-3 hover:bg-gray-400" href="#">
          Fields
        </Link>
        <Link className="px-5 py-3 hover:bg-gray-400" href="#">
          Contact
        </Link>
        {session?.user && (
          <>
            <Link href="#" className="px-5 py-3 hover:bg-gray-400">
              My Bookings
            </Link>
            <button
              onClick={logOut}
              className="px-5 py-3 text-left hover:bg-gray-400"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
}

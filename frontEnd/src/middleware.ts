// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";
import { NextRequest } from "next/server";
import { UserFromDB } from "./interfaces/user";

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const user = session?.user as UserFromDB;
  if (
    !session // ||
    // (req.nextUrl.pathname === "/dashboard" && user.role !== "admin")
  ) {
    return Response.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};

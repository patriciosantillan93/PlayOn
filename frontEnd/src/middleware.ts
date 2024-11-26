// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return Response.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};

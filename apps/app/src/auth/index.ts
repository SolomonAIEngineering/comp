import NextAuth from "next-auth";
import { cache } from "react";
import { authConfig } from "./config";

export const runtime = "nodejs";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };

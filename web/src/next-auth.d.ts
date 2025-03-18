import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "./schemas/enums";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isOAuth: boolean;
  id: number 
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser 
  }
}

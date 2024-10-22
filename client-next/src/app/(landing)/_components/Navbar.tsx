import { validateSession } from "@/server/session";
import { NavbarClient } from "./NavbarClient";

export const revalidate = 0;

export const Navbar = async () => {
  const session = await validateSession();
  return <NavbarClient session={session} />;
};

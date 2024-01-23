
import { redirect } from "next/navigation";

import PageContent from "../components/PageContent";
import { isUserAuthenticated } from "@/services/auth/auth.service";

export default async function SignInPage() {
  if (await isUserAuthenticated()) redirect("/dashboard");

  return (
    <main className="container">
      <PageContent variant="sign-in" />
    </main>
  );
}
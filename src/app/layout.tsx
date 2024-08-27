import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.scss";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";
import { getCurrentUser, isUserAuthenticated } from "@/services/auth/auth.service";
import { cookies, headers } from "next/headers";
import { AuthProvider } from "./auth/AuthProvider";
import { getTokens } from "next-firebase-auth-edge";
import { authConfig } from "@/config/server.config";
import { toUser } from "@/shared/user";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Beneficios",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const tokens = await getTokens(cookies(), {
    ...authConfig,
    headers: headers()
  });
  const user = tokens ? toUser(tokens) : null;

  

  return (
    <html lang="en">
      <body className={`${pjs.className} bg-[#f6f6f3]`}>
        <AuthProvider user={user}><Menu/></AuthProvider>
        <AuthProvider user={user}>{children}</AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}

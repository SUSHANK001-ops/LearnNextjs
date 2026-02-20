import type { Metadata } from "next";
import "./globals.css";
import Clientprovider from "@/Clientprovider";

export const metadata: Metadata = {
  title: "Full stack project",
  description: "A full stack project using Next.js, Prisma, and PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Clientprovider >

        {children}
        </Clientprovider>
        </body>
    </html>
  );
}

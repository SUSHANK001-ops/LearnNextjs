import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

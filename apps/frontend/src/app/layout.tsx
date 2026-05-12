import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algebra Learning Tool",
  description: "Master algebra with interactive learning tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

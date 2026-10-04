import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrainTracker",
  description: "Modern, ad-free railway tracking and journey information for India.",
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
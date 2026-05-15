import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JG University | Shape Your Future",
  description:
    "JG University is a premier institution fostering innovation, excellence, and leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}

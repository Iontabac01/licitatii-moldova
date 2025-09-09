import type { Metadata } from "next";
import "./globals.css";
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: "Licitații Moldova - Platforma de Licitații Online",
  description: "Platforma națională pentru licitații publice și private din Moldova",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}

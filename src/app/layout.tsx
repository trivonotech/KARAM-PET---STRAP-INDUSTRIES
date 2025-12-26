import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SiteConfigProvider } from "../context/SiteConfigContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", /* Add variable for CSS modules usage */
});

export const metadata: Metadata = {
  title: "KARAM PET - Strap Industries",
  description: "Manufacturer of High-Precision Strapping Products",
};

import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <SiteConfigProvider>
            {children}
          </SiteConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

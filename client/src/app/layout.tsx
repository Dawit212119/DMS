import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import MuiProvider from "@/components/mui-provider";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EFile | Document Management System",
  description:
    "eFile is a powerful and organized Document Management System designed to help you store, manage, and access project reports effortlessly — categorized by weekly, monthly, quarterly, and annual formats.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Providers>
          <div>{children}</div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}

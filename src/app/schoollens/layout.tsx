import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SchoolLens — See Your School Data Clearly",
  description:
    "SchoolLens turns any school Excel file into live dashboards, AI-powered insights, and clean, reliable data — in minutes. Built for Philippine schools.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "SchoolLens — See Your School Data Clearly",
    description:
      "Turn any school Excel file into live dashboards and AI insights. Built for Philippine schools.",
    type: "website",
  },
};

export default function SchoolLensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

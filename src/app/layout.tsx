import type { Metadata, Viewport } from "next";
import "./globals.css";
import SidebarLayout from "../components/sidebarlayout";

export const metadata: Metadata = {
  title: "City Hospital - Appointment Booking System",
  description: "Book and manage hospital appointments",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen w-full overflow-x-hidden">
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  );
}

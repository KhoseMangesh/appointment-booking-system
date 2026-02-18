"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  function openDashboard() {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(user);

    if (parsed.role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  }

  // Navigation buttons (shown only on home)
  const navItems = [
    { href: "/about", label: "About" },
    { href: "/faculty", label: "Faculty" },
    { href: "/facilities", label: "Facilities" },
    { href: "/contact", label: "Contact" },
    { href: "/appointments", label: "Appointment Booking" },
    { href: "/login", label: "Sign Up" },
  ];

  return (
    <header className="bg-emerald-700 text-white shadow-md">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-15 py-4">
        
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          {/* Website Name */}
          <Link
            href="/"
            className="text-xl sm:text-3xl font-bold tracking-wide"
            style={{ textDecoration: "none" }}
          >
            City Hospital
          </Link>

          {/* Profile Icon */}
          <button
            onClick={openDashboard}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition backdrop-blur-sm"
            aria-label="Open dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" />
            </svg>
          </button>
        </div>

        {/* ✅ NAV BUTTONS — ONLY ON HOME PAGE */}
        {pathname === "/" && (
          <nav className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600/70 text-white hover:bg-emerald-600 transition"
                style={{ textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

      </div>
    </header>
  );
}

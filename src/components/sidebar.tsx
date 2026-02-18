import Link from "next/link";

const items = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Book Appointment", href: "/appointments" },
];

export default function Sidebar() {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-500">NAVIGATION</p>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-6 rounded-xl bg-slate-50 p-3 border border-slate-100">
        <p className="text-sm font-semibold text-slate-800">Need help?</p>
        <p className="mt-1 text-xs text-slate-600">
          Call reception: <span className="font-semibold">+91 98765 43210</span>
        </p>
        <p className="text-xs text-slate-600">
          Email: <span className="font-semibold">support@cityhospital.com</span>
        </p>
      </div>
    </aside>
  );
}

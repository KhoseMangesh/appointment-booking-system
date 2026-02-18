export default function ContactPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Contact</h1>
        <p className="mt-2 text-slate-700">
          Reach us for appointments, emergency support, and general enquiries.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Phone">
          <p className="text-slate-900 font-semibold">+91 98765 43210</p>
          <p className="text-slate-700 text-sm mt-1">Emergency: +91 90000 00000</p>
        </Card>

        <Card title="Email">
          <p className="text-slate-900 font-semibold">cityhospital@gmail.com</p>
          <p className="text-slate-700 text-sm mt-1">support@cityhospital.com</p>
        </Card>

        <Card title="Address">
          <p className="text-slate-900 font-semibold">City Hospital, Main Road</p>
          <p className="text-slate-700 text-sm mt-1">Your City, Maharashtra, India</p>
        </Card>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Social Media</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Social href="#" label="Instagram" />
          <Social href="#" label="Facebook" />
          <Social href="#" label="YouTube" />
          <Social href="#" label="X (Twitter)" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Working Hours</h2>
        <div className="mt-2 text-slate-700">
          <div>Mon–Sat: 9:00 AM – 10:00 PM</div>
          <div>Sunday: 9:00 AM – 2:00 PM</div>
          <div className="mt-2 text-sm text-slate-500">Emergency services available 24×7.</div>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="text-sm font-semibold text-slate-600">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Social({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
      style={{ textDecoration: "none" }}
    >
      {label}
    </a>
  );
}

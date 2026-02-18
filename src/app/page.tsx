export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl border border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome to City Hospital
        </h2>
        <p className="mt-2 text-slate-600">
          Book your appointment in minutes. Manage visits, timings, and doctor
          availability with ease.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
            ✅ Trusted Doctors
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
            ✅ Fast Booking
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
            ✅ 24×7 Emergency
          </span>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-xs font-semibold text-slate-500">DEPARTMENTS</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">12+</p>
          <p className="mt-1 text-sm text-slate-600">Specialized care units</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-xs font-semibold text-slate-500">DOCTORS</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">40+</p>
          <p className="mt-1 text-sm text-slate-600">Experienced staff</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <p className="text-xs font-semibold text-slate-500">EMERGENCY</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">24×7</p>
          <p className="mt-1 text-sm text-slate-600">Always available</p>
        </div>
      </section>

      {/* About */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h3 className="text-lg font-bold text-slate-900">About Our Hospital</h3>
        <p className="mt-2 text-slate-600">
          City Hospital provides patient-first healthcare with modern facilities,
          specialist doctors, and quick appointment services. We focus on
          accurate diagnosis, transparent treatment, and friendly support.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
            <h4 className="font-semibold text-slate-900">Our Services</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>General Consultation</li>
              <li>Dental & Orthopedics</li>
              <li>Cardiology & Neurology</li>
              <li>Pathology & Lab Tests</li>
              <li>Emergency & ICU</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
            <h4 className="font-semibold text-slate-900">Why Choose Us</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Experienced doctors and staff</li>
              <li>Clean and modern infrastructure</li>
              <li>Quick appointment booking</li>
              <li>Patient-friendly care and support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="text-center text-xs text-slate-500">
        © {new Date().getFullYear()} City Hospital. All rights reserved.
      </section>
    </div>
  );
}

const facilities = [
  "CT Scan",
  "MRI",
  "Digital X-Ray",
  "Ultrasound (Sonography)",
  "ECG & 2D Echo",
  "Pathology Laboratory",
  "Pharmacy (In-house)",
  "24×7 Emergency",
  "Operation Theatre (OT)",
  "ICU / Critical Care",
  "Vaccination Center",
  "Physiotherapy Unit",
  "Ambulance Service",
  "Blood Collection Center",
];

export default function FacilitiesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Facilities</h1>
        <p className="mt-2 text-slate-700">
          City Hospital offers modern diagnostics and patient-focused infrastructure.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map((f) => (
          <div key={f} className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="text-slate-900 font-bold">{f}</div>
            <div className="mt-1 text-sm text-slate-700">
              Available with trained staff and standard safety protocols.
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

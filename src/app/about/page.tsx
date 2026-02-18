export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* ABOUT */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          About City Hospital
        </h1>

        <p className="mt-3 text-slate-700 leading-relaxed">
          City Hospital is a multi-specialty care center focused on patient-first treatment,
          modern diagnostics, and trusted clinical expertise. We serve our community with
          24×7 emergency support, outpatient services, and advanced imaging and laboratory facilities.
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            title="Mission"
            text="Deliver safe, affordable, and high-quality healthcare with compassion."
          />
          <InfoCard
            title="Vision"
            text="Be the most trusted hospital for families through excellence in care."
          />
          <InfoCard
            title="Values"
            text="Integrity • Empathy • Safety • Innovation • Teamwork"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Why Patients Choose Us</h2>
        <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
          <li>Experienced doctors across major departments</li>
          <li>Advanced diagnostics (CT/MRI/Ultrasound/Lab)</li>
          <li>Fast appointment booking and follow-ups</li>
          <li>Clean infrastructure, patient-friendly staff</li>
          <li>Transparent billing and patient support desk</li>
        </ul>
      </section>

      {/* GALLERY */}
            {/* GALLERY */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Hospital Gallery</h2>
        <p className="mt-2 text-slate-600 text-sm">
          A glimpse of our hospital infrastructure and facilities.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <GalleryImage
            src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg"
            caption="Reception & Waiting Area"
          />
          <GalleryImage
            src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg"
            caption="Diagnostics & Consultation Room"
          />
          <GalleryImage
            src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg"
            caption="Patient Ward & Care Facilities"
          />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="text-lg font-bold text-slate-900">{title}</div>
      <div className="mt-2 text-slate-700 text-sm leading-relaxed">{text}</div>
    </div>
  );
}

function GalleryImage({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="rounded-2xl overflow-hidden border border-slate-100 bg-white">
      <img
        src={src}
        alt={caption}
        className="w-full h-40 sm:h-44 lg:h-52 object-cover bg-slate-100"
      />
      <figcaption className="p-3 text-sm text-slate-700">{caption}</figcaption>
    </figure>
  );
}

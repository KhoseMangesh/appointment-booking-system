const doctors = [
  {
    name: "Dr. A. Sharma",
    dept: "General Medicine",
    exp: "12+ years",
    img: "https://images.pexels.com/photos/8460376/pexels-photo-8460376.jpeg",
  },
  {
    name: "Dr. R. Patil",
    dept: "Cardiology",
    exp: "10+ years",
    img: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg",
  },
  {
    name: "Dr. N. Joshi",
    dept: "Orthopedics",
    exp: "8+ years",
    img: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
  },
  {
    name: "Dr. S. Deshmukh",
    dept: "Dermatology",
    exp: "7+ years",
    img: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
  },
  {
    name: "Dr. M. Khan",
    dept: "Dental",
    exp: "9+ years",
    img: "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg",
  },
];

export default function FacultyPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-100 bg-white p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Faculty</h1>
        <p className="mt-2 text-slate-700">
          Meet our experienced doctors and specialists.
        </p>
      </section>

      {/* Zig-Zag Layout */}
      <section className="space-y-5">
        {doctors.map((d, i) => {
          const right = i % 2 === 1;

          return (
            <div
              key={d.name}
              className={`flex ${right ? "justify-end" : "justify-start"}`}
            >
              <div className="relative w-full max-w-2xl rounded-2xl border border-slate-100 bg-white shadow-sm p-5 sm:p-6">
                
                {/* Doctor Info */}
                <div className="pr-24 sm:pr-28">
                  <div className="text-xl font-bold text-slate-900">{d.name}</div>
                  <div className="mt-1 text-sm text-slate-700">{d.dept}</div>

                  <div className="mt-3 inline-flex rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 text-xs font-semibold">
                    Experience: {d.exp}
                  </div>

                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Available for OPD consultations and appointment booking.
                  </div>
                </div>

                {/* Doctor Image bottom-right */}
                <div className="absolute bottom-4 right-4">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border border-slate-200">
                    <img
                      src={d.img}
                      alt={d.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

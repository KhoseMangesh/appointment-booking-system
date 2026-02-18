import Header from "./header";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* ✅ Responsive container for ALL pages */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <main className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}

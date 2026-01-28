import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        
        {/* Header */}
        <header
          style={{
            backgroundColor: "#0f766e",
            color: "white",
            padding: "15px 30px",
          }}
        >
          <h1 style={{ margin: 0 }}>City Hospital</h1>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Care • Compassion • Commitment
          </p>
        </header>

        {/* Navigation */}
        <nav
          style={{
            background: "#e5e7eb",
            padding: "10px 30px",
            display: "flex",
            gap: "20px",
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/appointment">Book Appointment</Link>

        </nav>

        {/* Page content */}
        <main style={{ padding: "30px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}

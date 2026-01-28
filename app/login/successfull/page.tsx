"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // redirect to home
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "30px",
          backgroundColor: "#dcfce7",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2>✅ Login Successful</h2>
        <p>You are now logged in.</p>
        <p>Redirecting to home page...</p>
      </div>
    </div>
  );
}

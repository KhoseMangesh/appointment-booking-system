"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // 👉 Redirect to homepage
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
        <h2>✅ Registration Complete</h2>
        <p>Your account has been created successfully.</p>
        <p>You will be redirected to the home page shortly...</p>
      </div>
    </div>
  );
}

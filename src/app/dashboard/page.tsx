"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRouterPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(userRaw);
    if (user.role === "admin") router.replace("/dashboard/admin");
    else router.replace("/dashboard/user");
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm text-slate-700">
        Opening dashboard...
      </div>
    </div>
  );
}

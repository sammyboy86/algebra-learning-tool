"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface HelloResponse {
  message: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [apiMessage, setApiMessage] = useState<string>("Loading...");
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Fetch Hello World from backend
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    fetch(`${backendUrl}/api/hello`)
      .then((res) => res.json())
      .then((data: ApiResponse<HelloResponse>) => {
        if (data.success && data.data) {
          setApiMessage(data.data.message);
          setApiStatus("success");
        } else {
          setApiMessage(data.error || "Unknown error");
          setApiStatus("error");
        }
      })
      .catch((err) => {
        setApiMessage(`Failed to connect: ${err.message}`);
        setApiStatus("error");
      });
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-brand">
          <span>∑</span> Algebra Learning Tool
        </div>
        <div className="dashboard-nav-right">
          {user && <span className="dashboard-user">{user.email}</span>}
          <button onClick={handleLogout} className="logout-button">
            Sign Out
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p className="api-label">Response from backend API:</p>
          <div className={`api-response ${apiStatus}`}>{apiMessage}</div>
        </div>
      </main>
    </div>
  );
}

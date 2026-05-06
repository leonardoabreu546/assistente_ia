import React from "react";

export default function DashboardStatsGrid({ children }: { children: React.ReactNode }) {
  return <div className="row g-3">{children}</div>;
}
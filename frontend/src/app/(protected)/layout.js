"use client";
import { useState } from "react";
import { Sidebar, FooterCompact, LoggedInHeader } from "@/components";

function AuthLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
      <div className="flex-1 pt-16 lg:ml-20 xl:ml-64">
        <LoggedInHeader mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
        {children}
        <FooterCompact />
      </div>
    </div>
  );
}

export default AuthLayout;
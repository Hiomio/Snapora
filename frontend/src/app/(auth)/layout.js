"use client";

import { Header } from "@/components";

export default function AuthLayout({ children }) {
  return (
    <div className="pt-20 pb-2 bg-zinc-950 text-white">
      <Header />
      {children}
    </div>
  );
}
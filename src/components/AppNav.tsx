"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CircleDot } from "lucide-react";
import { cn } from "@/lib/ui";

const links = [
  ["Dashboard", "/dashboard"],
  ["Upload", "/upload"],
  ["Review", "/review"],
  ["Settings", "/settings"],
] as const;

export function AppNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f6f7f4]/80 backdrop-blur-xl">
      <nav className="shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#07111f] text-[#d8c08b]"><CircleDot size={18} /></span>
          <span>First Wealth</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={cn("rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950", pathname === href && "bg-white text-slate-950 shadow-sm")}>{label}</Link>
          ))}
        </div>
        <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[#07111f] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10">
          <BarChart3 size={16} /> Open app
        </Link>
      </nav>
    </header>
  );
}

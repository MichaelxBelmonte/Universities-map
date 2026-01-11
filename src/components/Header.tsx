"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  stats: {
    total: number;
    totalCampuses: number;
    withCoords: number;
    byCategory: {
      statale: number;
      non_statale: number;
      telematica: number;
      ordinamento_speciale: number;
      other: number;
    };
  };
}

export default function Header({ stats }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="relative px-3 sm:px-5 py-2.5 sm:py-3 flex-shrink-0 bg-[#0a0e17]/90 backdrop-blur-xl border-b border-cyan-500/10">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-3">
        {/* Left section: Logo + Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src="/youthlink-logo.png"
            alt="YouthLink"
            width={240}
            height={56}
            className="h-5 sm:h-7 w-auto"
            priority
            unoptimized
          />
          <div className="hidden sm:block h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="hidden sm:block">
            <h1 className="text-sm lg:text-base font-bold text-white tracking-tight">
              Universities Map
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono">
              <span className="text-cyan-400">{stats.total}</span>
              <span>universities</span>
              <span className="text-white/20">|</span>
              <span className="text-cyan-400">{stats.totalCampuses}</span>
              <span>campuses</span>
              <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                <span>🇮🇹</span>
                <span className="text-[10px]">IT</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center section: Stats grid - hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-1.5 px-2 border-r border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
            <span className="text-blue-400 font-mono font-bold text-xs">{stats.byCategory.statale}</span>
            <span className="text-white/40 text-[9px] uppercase hidden lg:inline">pub</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 border-r border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50" />
            <span className="text-purple-400 font-mono font-bold text-xs">{stats.byCategory.non_statale}</span>
            <span className="text-white/40 text-[9px] uppercase hidden lg:inline">priv</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 border-r border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="text-emerald-400 font-mono font-bold text-xs">{stats.byCategory.telematica}</span>
            <span className="text-white/40 text-[9px] uppercase hidden lg:inline">online</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 px-2 border-r border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
            <span className="text-amber-400 font-mono font-bold text-xs">{stats.byCategory.ordinamento_speciale}</span>
            <span className="text-white/40 text-[9px] uppercase hidden xl:inline">spec</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shadow-sm shadow-gray-400/50" />
            <span className="text-gray-400 font-mono font-bold text-xs">{stats.byCategory.other}</span>
            <span className="text-white/40 text-[9px] uppercase hidden xl:inline">other</span>
          </div>
        </div>

        {/* Right section: Language switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}

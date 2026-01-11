"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

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
    <header
      className="relative px-3 sm:px-5 py-2.5 sm:py-3 flex-shrink-0 backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--bg-secondary) 90%, transparent)",
        borderBottom: "1px solid var(--border-accent)",
      }}
    >
      {/* Subtle gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(to right, transparent, var(--accent-primary), transparent)",
          opacity: 0.5,
        }}
      />

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
          <div
            className="hidden sm:block h-6 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--text-muted), transparent)" }}
          />
          <div className="hidden sm:block">
            <h1
              className="text-sm lg:text-base font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Universities Map
            </h1>
            <div className="flex items-center gap-2 text-[11px] font-mono" style={{ color: "var(--text-tertiary)" }}>
              <span style={{ color: "var(--accent-primary)" }}>{stats.total}</span>
              <span>universities</span>
              <span style={{ color: "var(--text-muted)" }}>|</span>
              <span style={{ color: "var(--accent-primary)" }}>{stats.totalCampuses}</span>
              <span>campuses</span>
              <span
                className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--border-primary)"
                }}
              >
                <span>🇮🇹</span>
                <span className="text-[10px]">IT</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center section: Stats grid - hidden on mobile */}
        <div
          className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--border-secondary)",
          }}
        >
          <div className="flex items-center gap-1.5 px-2" style={{ borderRight: "1px solid var(--border-primary)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cat-statale)", boxShadow: `0 0 6px var(--cat-statale-glow)` }} />
            <span className="font-mono font-bold text-xs" style={{ color: "var(--cat-statale)" }}>{stats.byCategory.statale}</span>
            <span className="text-[9px] uppercase hidden lg:inline" style={{ color: "var(--text-tertiary)" }}>pub</span>
          </div>
          <div className="flex items-center gap-1.5 px-2" style={{ borderRight: "1px solid var(--border-primary)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cat-non-statale)", boxShadow: `0 0 6px var(--cat-non-statale-glow)` }} />
            <span className="font-mono font-bold text-xs" style={{ color: "var(--cat-non-statale)" }}>{stats.byCategory.non_statale}</span>
            <span className="text-[9px] uppercase hidden lg:inline" style={{ color: "var(--text-tertiary)" }}>priv</span>
          </div>
          <div className="flex items-center gap-1.5 px-2" style={{ borderRight: "1px solid var(--border-primary)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cat-telematica)", boxShadow: `0 0 6px var(--cat-telematica-glow)` }} />
            <span className="font-mono font-bold text-xs" style={{ color: "var(--cat-telematica)" }}>{stats.byCategory.telematica}</span>
            <span className="text-[9px] uppercase hidden lg:inline" style={{ color: "var(--text-tertiary)" }}>online</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 px-2" style={{ borderRight: "1px solid var(--border-primary)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cat-speciale)", boxShadow: `0 0 6px var(--cat-speciale-glow)` }} />
            <span className="font-mono font-bold text-xs" style={{ color: "var(--cat-speciale)" }}>{stats.byCategory.ordinamento_speciale}</span>
            <span className="text-[9px] uppercase hidden xl:inline" style={{ color: "var(--text-tertiary)" }}>spec</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 px-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cat-other)", boxShadow: `0 0 6px var(--cat-other-glow)` }} />
            <span className="font-mono font-bold text-xs" style={{ color: "var(--cat-other)" }}>{stats.byCategory.other}</span>
            <span className="text-[9px] uppercase hidden xl:inline" style={{ color: "var(--text-tertiary)" }}>other</span>
          </div>
        </div>

        {/* Right section: Theme + Language switcher */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

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
    <header className="glass-panel relative px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0 border-b-0">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-2">
        <div className="animate-fade-in-up flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* YouthLink Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/youthlink-logo.png"
                alt="YouthLink"
                width={240}
                height={56}
                className="h-5 sm:h-8 w-auto"
                priority
                unoptimized
              />
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/20" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-semibold text-white/90">
                  Universities Map
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-green-500/20 to-red-500/20 border border-white/10 text-white/70 whitespace-nowrap">
                  🇮🇹 {t("appSubtitle")}
                </span>
              </div>
              <p className="text-[10px] sm:text-sm text-white/50 truncate">
                <span className="stat-glow-cyan font-medium">{stats.total}</span>{" "}
                <span className="hidden sm:inline">{t("universities")}</span>
                <span className="sm:hidden">uni</span>
                {" • "}
                <span className="text-white/70">{stats.totalCampuses}</span>{" "}
                <span className="hidden sm:inline">{t("campuses")}</span>
                <span className="sm:hidden">sedi</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* Tech-style stats - hidden on mobile */}
          <div
            className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-mono animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-blue-400 font-bold text-sm lg:text-base">{stats.byCategory.statale}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">{t("statale")}</span>
            </div>
            <div className="hidden lg:flex flex-col items-center">
              <span className="text-purple-400 font-bold text-sm lg:text-base">{stats.byCategory.non_statale}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">{t("nonStatale")}</span>
            </div>
            <div className="hidden lg:flex flex-col items-center">
              <span className="text-emerald-400 font-bold text-sm lg:text-base">{stats.byCategory.telematica}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">{t("telematica")}</span>
            </div>
            <div className="hidden xl:flex flex-col items-center">
              <span className="text-amber-400 font-bold text-sm lg:text-base">{stats.byCategory.ordinamento_speciale}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">{t("speciale")}</span>
            </div>
            <div className="hidden xl:flex flex-col items-center">
              <span className="text-gray-400 font-bold text-sm lg:text-base">{stats.byCategory.other}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider">{t("other")}</span>
            </div>
          </div>

          {/* Language switcher */}
          <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

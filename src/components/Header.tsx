"use client";

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
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-sm sm:text-lg font-semibold tracking-tight whitespace-nowrap">
                  {t("appTitle")}
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-green-500/20 to-red-500/20 border border-white/10 text-white/70 whitespace-nowrap">
                  🇮🇹 {t("appSubtitle")}
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-white/50 truncate">
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

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Stats badges - hidden on mobile */}
          <div
            className="hidden md:flex items-center gap-2 lg:gap-3 text-sm animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="stat-glow-blue font-semibold text-xs lg:text-sm">
                {stats.byCategory.statale}
              </span>
              <span className="text-white/50 text-xs lg:text-sm hidden lg:inline">{t("statale")}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="stat-glow-purple font-semibold">
                {stats.byCategory.non_statale}
              </span>
              <span className="text-white/50">{t("nonStatale")}</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="stat-glow-green font-semibold">
                {stats.byCategory.telematica}
              </span>
              <span className="text-white/50">{t("telematica")}</span>
            </div>
            <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="stat-glow-amber font-semibold">
                {stats.byCategory.ordinamento_speciale}
              </span>
              <span className="text-white/50">{t("speciale")}</span>
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

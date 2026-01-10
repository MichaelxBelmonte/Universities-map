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
    <header className="glass-panel relative z-10 px-4 py-4 flex-shrink-0 border-b-0">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                {t("appTitle")}
              </h1>
              <p className="text-sm text-white/50">
                <span className="stat-glow-cyan font-medium">{stats.total}</span>{" "}
                {t("universities")} •{" "}
                <span className="text-white/70">{stats.totalCampuses}</span>{" "}
                {t("campuses")} •{" "}
                <span className="text-white/70">{stats.withCoords}</span>{" "}
                {t("onMap")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats badges */}
          <div
            className="hidden sm:flex items-center gap-3 text-sm animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="stat-glow-blue font-semibold">
                {stats.byCategory.statale}
              </span>
              <span className="text-white/50">{t("statale")}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="stat-glow-purple font-semibold">
                {stats.byCategory.non_statale}
              </span>
              <span className="text-white/50">{t("nonStatale")}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="stat-glow-green font-semibold">
                {stats.byCategory.telematica}
              </span>
              <span className="text-white/50">{t("telematica")}</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
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

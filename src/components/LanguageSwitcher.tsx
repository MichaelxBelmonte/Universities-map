"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "it", label: "IT", flag: "🇮🇹" },
    { code: "en", label: "EN", flag: "🇬🇧" },
  ];

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-white/5 border border-white/10">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            flex items-center justify-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium
            transition-all duration-200 touch-manipulation
            ${
              language === lang.code
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            }
          `}
          title={lang.code === "it" ? "Italiano" : "English"}
        >
          <span className="text-sm">{lang.flag}</span>
          <span className="hidden sm:inline text-xs">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

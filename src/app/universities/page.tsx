import { loadUniversities, getUniversityStats } from "@/lib/loadUniversities";
import UniversitiesClient from "@/components/UniversitiesClient";
import Header from "@/components/Header";

export const metadata = {
  title: "Universities Map | Explore Global Universities",
  description:
    "Interactive world map of universities. Currently featuring 104 Italian universities - explore public, private, online, and special institutions. More countries coming soon!",
};

export default async function UniversitiesPage() {
  const universities = await loadUniversities();
  const stats = getUniversityStats(universities);

  return (
    <main className="h-dvh w-full flex flex-col relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="yl-bg-mesh" />

      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 relative" style={{ zIndex: 100 }}>
        <Header stats={stats} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 relative" style={{ zIndex: 10 }}>
        <UniversitiesClient universities={universities} />
      </div>
    </main>
  );
}

import { loadUniversities, getUniversityStats } from "@/lib/loadUniversities";
import UniversitiesClient from "@/components/UniversitiesClient";
import Header from "@/components/Header";

export const metadata = {
  title: "Italy Universities Map | YouthLink",
  description:
    "Interactive map of all Italian universities - explore public, private, telematic, and special status institutions.",
};

export default async function UniversitiesPage() {
  const universities = await loadUniversities();
  const stats = getUniversityStats(universities);

  return (
    <main className="h-screen w-full flex flex-col relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="yl-bg-mesh" />

      {/* Header */}
      <Header stats={stats} />

      {/* Main Content */}
      <div className="flex-1 min-h-0 relative z-10">
        <UniversitiesClient universities={universities} />
      </div>
    </main>
  );
}

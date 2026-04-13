import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import ImpactSummary from "@/components/teacher/journey/ImpactSummary";
import DisciplineBreakdown from "@/components/teacher/journey/DisciplineBreakdown";
import ClientProgressList from "@/components/teacher/journey/ClientProgressList";

export default function ClientJourneyPage() {
  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-6 lg:px-8 space-y-6">
        <h2 className="font-display text-2xl text-neutral-900">
          Client Journey
        </h2>
        <ImpactSummary />
        <div className="grid gap-6 lg:grid-cols-2">
          <DisciplineBreakdown />
          <ClientProgressList />
        </div>
      </div>
    </>
  );
}

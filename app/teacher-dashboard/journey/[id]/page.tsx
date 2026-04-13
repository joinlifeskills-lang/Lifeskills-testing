import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import IndividualJourney from "@/components/teacher/journey/IndividualJourney";
import { teacherClients, teacherSessions } from "@/lib/teacher/data";

export default async function IndividualJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = teacherClients.find((c) => c.id === id);

  if (!client) return notFound();

  const clientSessions = teacherSessions.filter((s) => s.clientId === id);

  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-6 lg:px-8">
        <Link
          href="/teacher-dashboard/journey"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to all clients
        </Link>
        <IndividualJourney client={client} sessions={clientSessions} />
      </div>
    </>
  );
}

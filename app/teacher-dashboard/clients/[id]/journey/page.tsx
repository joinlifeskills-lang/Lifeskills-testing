import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import ClientJourneyFull from "@/components/teacher/journey/ClientJourneyFull";
import { teacherClients, teacherSessions } from "@/lib/teacher/data";

export default async function ClientJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = teacherClients.find((c) => c.id === id);
  if (!client) return notFound();

  const completedSessions = teacherSessions.filter(
    (s) => s.clientId === id && s.status === "completed"
  );

  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-6 lg:px-8">
        {/* Nav */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Link
            href={`/teacher-dashboard/clients/${id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} />
            {client.name}
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-sm font-medium text-neutral-900">Journey</span>
        </div>

        {/* Tab-style navigation between Overview and Journey */}
        <div className="flex gap-1 mb-6 border-b border-neutral-100">
          <Link
            href={`/teacher-dashboard/clients/${id}`}
            className="px-4 py-2.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Overview
          </Link>
          <span className="px-4 py-2.5 text-sm font-medium text-deep-sage border-b-2 border-deep-sage">
            Journey
          </span>
        </div>

        <div className="mb-4">
          <h2 className="font-display text-2xl text-neutral-900">{client.name}'s Journey</h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Client since {new Date(client.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        <ClientJourneyFull
          clientId={id}
          clientName={client.name}
          completedSessionCount={completedSessions.length}
        />
      </div>
    </>
  );
}

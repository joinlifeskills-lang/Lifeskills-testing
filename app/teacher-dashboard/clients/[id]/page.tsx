import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import ClientDetail from "@/components/teacher/clients/ClientDetail";
import { teacherClients, teacherSessions } from "@/lib/teacher/data";

export default async function ClientDetailPage({
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
          href="/teacher-dashboard/clients"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Clients
        </Link>

        {/* Tab navigation */}
        <div className="flex gap-1 mb-6 border-b border-neutral-100">
          <span className="px-4 py-2.5 text-sm font-medium text-deep-sage border-b-2 border-deep-sage">
            Overview
          </span>
          <Link
            href={`/teacher-dashboard/clients/${id}/journey`}
            className="px-4 py-2.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Journey
          </Link>
        </div>

        <ClientDetail client={client} sessions={clientSessions} />
      </div>
    </>
  );
}

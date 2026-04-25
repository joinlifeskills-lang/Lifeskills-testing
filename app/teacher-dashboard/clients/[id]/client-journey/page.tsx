import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import IndividualClientJourney from "@/components/teacher/journey/IndividualClientJourney";
import { teacherClients } from "@/lib/teacher/data";

export default async function IndividualClientJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = teacherClients.find((c) => c.id === id);
  if (!client) return notFound();

  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-8 lg:px-8 xl:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/teacher-dashboard/client-journey"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} />
            All clients
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-electric-teal flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-sans font-bold">
              {client.initials}
            </span>
          </div>
          <div>
            <h1 className="font-display text-2xl text-deep-sage">
              {client.name}&apos;s Journey
            </h1>
            <p className="font-sans text-sm text-neutral-500">
              Client since{" "}
              {new Date(client.memberSince).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <IndividualClientJourney client={client} />
      </div>
    </>
  );
}

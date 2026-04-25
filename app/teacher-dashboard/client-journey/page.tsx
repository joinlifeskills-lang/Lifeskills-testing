"use client";

import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import ClientJourneyList from "@/components/teacher/journey/ClientJourneyList";
import { teacherClients } from "@/lib/teacher/data";

export default function ClientJourneyPage() {
  return (
    <>
      <TeacherTopBar />
      <div className="min-h-screen bg-warm-sand">
        <div className="px-4 py-8 lg:px-8 xl:px-12 max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl text-deep-sage">
              Client Journey
            </h1>
            <p className="font-sans text-sm text-neutral-500 mt-1">
              Check in on your clients&apos; progress.
            </p>
          </div>
          <ClientJourneyList clients={teacherClients} />
        </div>
      </div>
    </>
  );
}

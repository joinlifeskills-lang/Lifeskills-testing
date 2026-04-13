import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import ClientList from "@/components/teacher/clients/ClientList";
import { teacherClients } from "@/lib/teacher/data";

export default function ClientsPage() {
  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-6 lg:px-8">
        <h2 className="font-display text-2xl text-neutral-900 mb-6">Clients</h2>
        <ClientList clients={teacherClients} />
      </div>
    </>
  );
}

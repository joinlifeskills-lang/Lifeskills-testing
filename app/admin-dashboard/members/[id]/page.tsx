import Link from "next/link";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import MemberDetail from "@/components/admin/members/MemberDetail";
import { members } from "@/lib/admin/members";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface MemberDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { id } = await params;
  const member = members.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <>
      <AdminTopBar title={member.name} />
      <div className="p-4 md:p-6 lg:p-8">
        <Link
          href="/admin-dashboard/members"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          Back to Members
        </Link>

        <MemberDetail member={member} />
      </div>
    </>
  );
}

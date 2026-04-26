import TeacherDetailClient from "./TeacherDetailClient";

interface TeacherDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TeacherDetailPage({ params }: TeacherDetailPageProps) {
  const { id } = await params;
  return <TeacherDetailClient id={id} />;
}

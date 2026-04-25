import { redirect } from "next/navigation";

export default async function LegacyIndividualJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/teacher-dashboard/clients/${id}/client-journey`);
}

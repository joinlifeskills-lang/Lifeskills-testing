import AdminCard from "@/components/admin/ui/AdminCard";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import MemberJourney from "@/components/admin/members/MemberJourney";
import { Member } from "@/lib/admin/types";
import { disciplineTagColors, Discipline } from "@/lib/teachers";
import { CalendarDays, DollarSign, Video, Heart } from "lucide-react";

interface MemberDetailProps {
  member: Member;
}

export default function MemberDetail({ member }: MemberDetailProps) {
  return (
    <div className="space-y-8">
      {/* ── Member Info Header ── */}
      <AdminCard className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={member.initials} size="lg" />
            <div>
              <h2 className="font-display text-xl text-neutral-900">{member.name}</h2>
              <p className="text-sm text-neutral-500">{member.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={member.status} />
                <span className="text-xs text-neutral-400">
                  Member since{" "}
                  {new Date(member.joinDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-teal/10">
                <Video size={15} className="text-electric-teal" />
              </div>
              <div>
                <p className="text-lg font-bold text-neutral-900">{member.totalSessions}</p>
                <p className="text-[0.6rem] text-neutral-500">Sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bright-amber/10">
                <DollarSign size={15} className="text-bright-amber" />
              </div>
              <div>
                <p className="text-lg font-bold text-neutral-900">${member.totalSpent.toLocaleString()}</p>
                <p className="text-[0.6rem] text-neutral-500">Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disciplines + Favorite Teachers inline */}
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-neutral-100 pt-5">
          <div>
            <p className="text-[0.6rem] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Disciplines</p>
            <div className="flex flex-wrap gap-1.5">
              {member.preferredDisciplines.map((d) => {
                const colors = disciplineTagColors[d as Discipline];
                return (
                  <span
                    key={d}
                    className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold"
                    style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
                  >
                    {d}
                  </span>
                );
              })}
            </div>
          </div>
          {member.favoriteTeachers.length > 0 && (
            <div>
              <p className="text-[0.6rem] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Heart size={10} className="text-vivid-coral" /> Favorite Teachers
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.favoriteTeachers.map((t) => (
                  <span key={t} className="rounded-full bg-warm-sand px-2.5 py-0.5 text-[0.65rem] font-medium text-deep-sage">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        {member.notes && (
          <div className="mt-4 rounded-xl bg-vivid-coral/5 border border-vivid-coral/15 px-4 py-3">
            <p className="text-xs text-neutral-700">{member.notes}</p>
          </div>
        )}
      </AdminCard>

      {/* ── Journey — mirrors customer /customer-dashboard/journey layout ── */}
      <MemberJourney member={member} />
    </div>
  );
}

import AdminCard from "@/components/admin/ui/AdminCard";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { Member } from "@/lib/admin/types";
import { disciplineTagColors, Discipline } from "@/lib/teachers";
import { CalendarDays, DollarSign, Video, Heart } from "lucide-react";

interface MemberDetailProps {
  member: Member;
}

export default function MemberDetail({ member }: MemberDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminCard className="p-6">
        <div className="flex items-center gap-4">
          <Avatar initials={member.initials} size="lg" />
          <div>
            <h2 className="font-display text-xl text-neutral-900">{member.name}</h2>
            <p className="text-sm text-neutral-500">{member.email}</p>
            <div className="mt-1">
              <StatusBadge status={member.status} />
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminCard className="flex items-center gap-3 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-teal/10">
            <Video size={18} className="text-electric-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">{member.totalSessions}</p>
            <p className="text-xs text-neutral-500">Total Sessions</p>
          </div>
        </AdminCard>

        <AdminCard className="flex items-center gap-3 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bright-amber/10">
            <DollarSign size={18} className="text-bright-amber" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">
              ${member.totalSpent.toLocaleString()}
            </p>
            <p className="text-xs text-neutral-500">Total Spent</p>
          </div>
        </AdminCard>

        <AdminCard className="flex items-center gap-3 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-sage/10">
            <CalendarDays size={18} className="text-lime-sage" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">
              {new Date(member.joinDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-neutral-500">Member Since</p>
          </div>
        </AdminCard>
      </div>

      {/* Preferred Disciplines */}
      <AdminCard className="p-6">
        <h3 className="mb-3 font-display text-base text-neutral-900">Preferred Disciplines</h3>
        <div className="flex flex-wrap gap-2">
          {member.preferredDisciplines.map((d) => {
            const colors = disciplineTagColors[d as Discipline];
            return (
              <span
                key={d}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
              >
                {d}
              </span>
            );
          })}
        </div>
      </AdminCard>

      {/* Favorite Teachers */}
      <AdminCard className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Heart size={16} className="text-vivid-coral" />
          <h3 className="font-display text-base text-neutral-900">Favorite Teachers</h3>
        </div>
        {member.favoriteTeachers.length > 0 ? (
          <ul className="space-y-2">
            {member.favoriteTeachers.map((teacher) => (
              <li
                key={teacher}
                className="flex items-center gap-3 rounded-xl border border-neutral-100 px-4 py-3"
              >
                <Avatar
                  initials={teacher
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                  size="sm"
                />
                <span className="text-sm font-medium text-neutral-700">{teacher}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">No favorite teachers yet.</p>
        )}
      </AdminCard>

      {/* Notes */}
      {member.notes && (
        <AdminCard className="p-6">
          <h3 className="mb-2 font-display text-base text-neutral-900">Admin Notes</h3>
          <p className="text-sm text-neutral-700">{member.notes}</p>
        </AdminCard>
      )}
    </div>
  );
}

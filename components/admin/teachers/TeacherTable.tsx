"use client";

import { useState, useMemo } from "react";
import AdminTable, { Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import SearchInput from "@/components/admin/ui/SearchInput";
import { AdminTeacher, ApplicationStatus } from "@/lib/admin/types";
import { disciplineTagColors, Discipline } from "@/lib/teachers";
import { Info, Mail, Phone, Globe, X } from "lucide-react";

function InstagramIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* ── Contact Info Modal ── */
function ContactModal({ teacher, onClose }: { teacher: AdminTeacher; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar initials={teacher.initials} size="sm" />
              <span className="text-sm font-semibold text-neutral-900">{teacher.name}</span>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
              <X size={16} />
            </button>
          </div>
          {/* Contact details */}
          <div className="space-y-1">
            <a href={`mailto:${teacher.email}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
              <Mail size={16} className="text-neutral-400 flex-shrink-0" />
              <span className="truncate">{teacher.email}</span>
            </a>
            <a href={`tel:${teacher.phone}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
              <Phone size={16} className="text-neutral-400 flex-shrink-0" />
              {teacher.phone}
            </a>
            {teacher.socials?.instagram && (
              <span className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700">
                <InstagramIcon size={16} className="text-neutral-400 flex-shrink-0" />
                {teacher.socials.instagram}
              </span>
            )}
            {teacher.socials?.facebook && (
              <span className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700">
                <FacebookIcon size={16} className="text-neutral-400 flex-shrink-0" />
                {teacher.socials.facebook}
              </span>
            )}
            {teacher.socials?.website && (
              <span className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700">
                <Globe size={16} className="text-neutral-400 flex-shrink-0" />
                {teacher.socials.website}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface TeacherTableProps {
  teachers: AdminTeacher[];
  activeTab: ApplicationStatus;
  onRowClick?: (teacher: AdminTeacher) => void;
}

export default function TeacherTable({ teachers, activeTab, onRowClick }: TeacherTableProps) {
  const [search, setSearch] = useState("");
  const [contactTeacher, setContactTeacher] = useState<AdminTeacher | null>(null);

  const filtered = useMemo(() => {
    const byStatus = teachers.filter((t) => t.status === activeTab);
    if (!search.trim()) return byStatus;
    const q = search.toLowerCase();
    return byStatus.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.disciplines.some((d) => d.toLowerCase().includes(q))
    );
  }, [teachers, activeTab, search]);

  const columns: Column<AdminTeacher>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (t) => (
        <div className="flex items-center gap-3">
          <Avatar initials={t.initials} size="sm" />
          <div className="min-w-0">
            <p className="font-medium text-neutral-900">{t.name}</p>
            <p className="text-xs text-neutral-500 truncate">{t.email}</p>
          </div>
        </div>
      ),
    },
    // Contact column — desktop inline, hidden on mobile (info icon used instead)
    ...(activeTab === "active"
      ? [
          {
            key: "contact" as const,
            label: "Contact",
            hideOnMobile: true,
            render: (t: AdminTeacher) => (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <Phone size={12} className="text-neutral-400" />
                  {t.phone}
                </span>
                <div className="flex items-center gap-2">
                  {t.socials?.instagram && (
                    <span title={t.socials.instagram}>
                      <InstagramIcon size={14} className="text-neutral-400 hover:text-neutral-700 transition-colors" />
                    </span>
                  )}
                  {t.socials?.facebook && (
                    <span title={t.socials.facebook}>
                      <FacebookIcon size={14} className="text-neutral-400 hover:text-neutral-700 transition-colors" />
                    </span>
                  )}
                  {t.socials?.website && (
                    <span title={t.socials.website}>
                      <Globe size={14} className="text-neutral-400 hover:text-neutral-700 transition-colors" />
                    </span>
                  )}
                </div>
              </div>
            ),
          } satisfies Column<AdminTeacher>,
        ]
      : []),
    {
      key: "disciplines",
      label: "Disciplines",
      hideOnMobile: true,
      render: (t) => (
        <div className="flex flex-wrap gap-1">
          {t.disciplines.map((d) => {
            const colors = disciplineTagColors[d as Discipline];
            return (
              <span
                key={d}
                className="rounded-full px-2 py-0.5 text-[0.65rem] font-semibold"
                style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
              >
                {d}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (t) => <StatusBadge status={t.status} />,
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      hideOnMobile: true,
      render: (t) => (
        <span className="text-neutral-700">{t.rating > 0 ? t.rating.toFixed(1) : "--"}</span>
      ),
    },
    {
      key: "sessions",
      label: "Sessions",
      sortable: true,
      hideOnMobile: true,
      render: (t) => <span className="text-neutral-700">{t.sessions.toLocaleString()}</span>,
    },
    {
      key: "revenue",
      label: "Revenue",
      sortable: true,
      hideOnMobile: true,
      render: (t) => (
        <span className="font-medium text-neutral-900">
          {t.revenue > 0 ? `$${t.revenue.toLocaleString()}` : "--"}
        </span>
      ),
    },
    {
      key: "applicationDate",
      label: "Applied",
      sortable: true,
      render: (t) => (
        <span className="text-neutral-500">
          {new Date(t.applicationDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search teachers by name, email, or discipline..."
        className="max-w-sm"
      />
      <AdminTable
        columns={columns}
        data={filtered}
        keyField="id"
        onRowClick={onRowClick}
        mobileCardRender={(t: AdminTeacher) => (
          <div className="flex items-center gap-3">
            <Avatar initials={t.initials} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-neutral-900 truncate">{t.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusBadge status={t.status} />
                <span className="text-[0.65rem] text-neutral-400">
                  {new Date(t.applicationDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {activeTab === "active" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setContactTeacher(t);
                }}
                className="flex-shrink-0 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-electric-teal transition-colors"
              >
                <Info size={18} />
              </button>
            )}
          </div>
        )}
      />
      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-neutral-500">
          No teachers found.
        </p>
      )}

      {/* Contact Info Modal */}
      {contactTeacher && (
        <ContactModal
          teacher={contactTeacher}
          onClose={() => setContactTeacher(null)}
        />
      )}
    </div>
  );
}

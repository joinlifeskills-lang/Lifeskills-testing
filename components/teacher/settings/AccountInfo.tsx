"use client";

import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { teacherProfile } from "@/lib/teacher/data";

export default function AccountInfo() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(`${teacherProfile.firstName} ${teacherProfile.lastName}`);
  const [email, setEmail] = useState(teacherProfile.email);
  const [phone, setPhone] = useState(teacherProfile.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expanded, setExpanded] = useState(true);

  const inputClass =
    "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-electric-teal focus:ring-1 focus:ring-electric-teal/30 transition-colors";

  const content = (
    <div className="space-y-5">
      {/* Info fields */}
      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-neutral-500">Name</label>
            {editing ? (
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <p className="text-sm text-neutral-900">{name}</p>
            )}
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="ml-4 flex items-center gap-1 text-xs font-semibold text-electric-teal"
            >
              <Pencil size={13} /> Edit
            </button>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Email</label>
          {editing ? (
            <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          ) : (
            <p className="text-sm text-neutral-900">{email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Phone</label>
          {editing ? (
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
          ) : (
            <p className="text-sm text-neutral-900">{phone}</p>
          )}
        </div>

        {editing && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="border-t border-neutral-100 pt-5">
        <h4 className="mb-3 text-sm font-semibold text-neutral-900">Change Password</h4>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-500">
              Current Password
            </label>
            <input
              type="password"
              className={inputClass}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-500">
              New Password
            </label>
            <input
              type="password"
              className={inputClass}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-500">
              Confirm New Password
            </label>
            <input
              type="password"
              className={inputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage transition-colors hover:bg-deep-sage/5">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      {/* Header — acts as accordion toggle on mobile */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-6 py-5 md:cursor-default"
      >
        <h3 className="font-display text-lg text-neutral-900">Account</h3>
        <span className="md:hidden">
          {expanded ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
        </span>
      </button>

      {/* Content — always visible on md+, toggleable on mobile */}
      <div className={`px-6 pb-6 ${expanded ? "block" : "hidden"} md:block`}>
        {content}
      </div>
    </div>
  );
}

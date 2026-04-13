"use client";

import { useState } from "react";
import { Camera, Star, Globe, DollarSign, Eye } from "lucide-react";
import { teacherProfile } from "@/lib/teacher/data";
import type { Discipline } from "@/lib/teachers";

const DISCIPLINES: { label: Discipline; color: string }[] = [
  { label: "Breathwork", color: "#0BA89A" },
  { label: "Meditation", color: "#6BAA3E" },
  { label: "Yoga", color: "#D4940A" },
  { label: "Somatic", color: "#E8603A" },
  { label: "Reiki", color: "#C026A0" },
];

export default function PublicProfile() {
  const [displayName, setDisplayName] = useState(teacherProfile.displayName);
  const [headline, setHeadline] = useState(teacherProfile.headline);
  const [tagline, setTagline] = useState(teacherProfile.tagline);
  const [bio, setBio] = useState(teacherProfile.bio);
  const [disciplines, setDisciplines] = useState<Discipline[]>(teacherProfile.disciplines);
  const [price, setPrice] = useState(teacherProfile.price);
  const [yearsExperience, setYearsExperience] = useState(teacherProfile.yearsExperience);
  const [nextAvailable, setNextAvailable] = useState(teacherProfile.nextAvailable);
  const [languages, setLanguages] = useState(teacherProfile.languages.join(", "));
  const [introVideoUrl, setIntroVideoUrl] = useState(teacherProfile.introVideoUrl ?? "");
  const [showPreview, setShowPreview] = useState(false);

  function toggleDiscipline(d: Discipline) {
    setDisciplines((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  const inputClass =
    "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 font-sans text-sm outline-none focus:border-electric-teal focus:ring-1 focus:ring-electric-teal/30 transition-colors";

  /* ── Preview Panel ── */
  const Preview = () => (
    <div className="space-y-5">
      {/* Avatar + name */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-electric-teal text-2xl font-bold text-white">
          {teacherProfile.avatarInitials}
        </div>
        <h3 className="font-display text-xl text-neutral-900">{displayName}</h3>
        <p className="mt-1 text-sm text-neutral-500">{headline}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1.5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(teacherProfile.rating)
                  ? "fill-bright-amber text-bright-amber"
                  : "text-neutral-300"
              }
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-neutral-900">
          {teacherProfile.rating}
        </span>
        <span className="text-sm text-neutral-500">
          ({teacherProfile.totalReviews} reviews)
        </span>
      </div>

      {/* Tagline */}
      <p className="text-sm leading-relaxed text-neutral-700">{tagline}</p>

      {/* Disciplines */}
      <div className="flex flex-wrap gap-2">
        {disciplines.map((d) => {
          const color =
            DISCIPLINES.find((x) => x.label === d)?.color ?? "#2D4A3E";
          return (
            <span
              key={d}
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {d}
            </span>
          );
        })}
      </div>

      {/* Card meta row */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-700">
        <span className="flex items-center gap-1.5">
          <DollarSign size={15} className="text-neutral-500" />
          <span className="font-semibold">${price}</span> / session
        </span>
        <span className="flex items-center gap-1.5">
          <Globe size={15} className="text-neutral-500" />
          {languages}
        </span>
        {yearsExperience > 0 && (
          <span className="text-neutral-500">{yearsExperience} yrs experience</span>
        )}
        {nextAvailable && (
          <span className="text-neutral-500">Available {nextAvailable}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* ── Form ── */}
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-electric-teal text-2xl font-bold text-white">
            {teacherProfile.avatarInitials}
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-neutral-100">
              <Camera size={14} className="text-neutral-700" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Profile Photo</p>
            <p className="text-xs text-neutral-500">JPG, PNG. Max 2 MB</p>
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Display Name
          </label>
          <input
            className={inputClass}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        {/* Headline */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Headline
          </label>
          <input
            className={inputClass}
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>

        {/* Card Tagline */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Card Tagline
          </label>
          <p className="mb-1.5 text-xs text-neutral-400">
            One sentence shown on your public teacher card. Start with "I help you…"
          </p>
          <input
            className={inputClass}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="I help you…"
            maxLength={120}
          />
          <p className="mt-1 text-right text-xs text-neutral-400">{tagline.length}/120</p>
        </div>

        {/* Full Bio */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            About You
          </label>
          <p className="mb-1.5 text-xs text-neutral-400">
            Shown on your full profile page. Tell your story and approach.
          </p>
          <textarea
            rows={4}
            className={inputClass + " resize-none"}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Disciplines */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Disciplines
          </label>
          <div className="flex flex-wrap gap-2">
            {DISCIPLINES.map(({ label, color }) => {
              const active = disciplines.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleDiscipline(label)}
                  className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors"
                  style={
                    active
                      ? { backgroundColor: color, borderColor: color, color: "#fff" }
                      : { borderColor: "#E5E5E5", color: "#4A4A4A" }
                  }
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: active ? "#fff" : color }}
                  />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Session Price */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Session Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
              $
            </span>
            <input
              type="number"
              min={0}
              className={inputClass + " pl-8"}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Years of Experience + Next Available — side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Years of Experience
            </label>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={yearsExperience}
              onChange={(e) => setYearsExperience(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Next Available
            </label>
            <p className="mb-1.5 text-xs text-neutral-400">e.g. Mon, Apr 14</p>
            <input
              className={inputClass}
              value={nextAvailable}
              onChange={(e) => setNextAvailable(e.target.value)}
              placeholder="Mon, Apr 14"
            />
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Languages
          </label>
          <input
            className={inputClass}
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="English, Spanish"
          />
        </div>

        {/* Intro Video */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Intro Video URL{" "}
            <span className="text-neutral-400">(optional)</span>
          </label>
          <input
            className={inputClass}
            value={introVideoUrl}
            onChange={(e) => setIntroVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90">
            Save Changes
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-1.5 rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage transition-colors hover:bg-deep-sage/5 lg:hidden"
          >
            <Eye size={15} />
            Preview
          </button>
        </div>
      </div>

      {/* ── Desktop Preview ── */}
      <div className="hidden rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] lg:block">
        <h3 className="mb-4 font-display text-lg text-neutral-900">
          Live Preview
        </h3>
        <Preview />
      </div>

      {/* ── Mobile Preview Overlay ── */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 lg:hidden">
          <div className="w-full rounded-t-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg text-neutral-900">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm font-semibold text-electric-teal"
              >
                Close
              </button>
            </div>
            <Preview />
          </div>
        </div>
      )}
    </div>
  );
}

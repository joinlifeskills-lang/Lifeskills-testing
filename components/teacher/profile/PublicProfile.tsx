"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, DollarSign, Eye, Clock, Video, Upload, X, Check, ChevronDown, Plus } from "lucide-react";
import { teacherProfile } from "@/lib/teacher/data";
import type { Discipline } from "@/lib/teachers";

const ALL_LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Hindi",
  "Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "Punjabi",
  "Malay / Indonesian",
  "Telugu",
  "Vietnamese",
  "Turkish",
  "Korean",
  "French",
  "German",
  "Italian",
  "Tamil",
  "Urdu",
  "Persian / Farsi",
  "Thai",
  "Gujarati",
  "Kannada",
  "Polish",
  "Ukrainian",
  "Dutch",
];

const DISCIPLINES: { label: Discipline; color: string }[] = [
  { label: "Breathwork", color: "#0BA89A" },
  { label: "Meditation", color: "#6BAA3E" },
  { label: "Yoga", color: "#D4940A" },
  { label: "Somatic", color: "#E8603A" },
  { label: "Reiki", color: "#C026A0" },
];

const CUSTOM_DISCIPLINE_COLOR = "#6366F1";

export default function PublicProfile() {
  const [displayName, setDisplayName] = useState(teacherProfile.displayName);
  const [headline, setHeadline] = useState(teacherProfile.headline);
  const [tagline, setTagline] = useState(teacherProfile.tagline);
  const [bio, setBio] = useState(teacherProfile.bio);
  const [disciplines, setDisciplines] = useState<Discipline[]>(teacherProfile.disciplines);
  const [customDisciplines, setCustomDisciplines] = useState<string[]>([]);
  const [showCustomDisciplineInput, setShowCustomDisciplineInput] = useState(false);
  const [customDisciplineValue, setCustomDisciplineValue] = useState("");
  const [price, setPrice] = useState(teacherProfile.price);
  const [yearsExperience, setYearsExperience] = useState(teacherProfile.yearsExperience);
  const [languages, setLanguages] = useState<string[]>(teacherProfile.languages);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [showCustomLangInput, setShowCustomLangInput] = useState(false);
  const [customLangValue, setCustomLangValue] = useState("");
  const [sessionDuration, setSessionDuration] = useState(60);
  const [introCallDuration, setIntroCallDuration] = useState(15);
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [introVideoPreviewUrl, setIntroVideoPreviewUrl] = useState<string | null>(null);
  const [introVideoDurationError, setIntroVideoDurationError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
        setShowCustomLangInput(false);
        setCustomLangValue("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleLanguage(lang: string) {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }

  function addCustomLanguage() {
    const trimmed = customLangValue.trim();
    if (trimmed && !languages.includes(trimmed) && !ALL_LANGUAGES.includes(trimmed)) {
      setLanguages((prev) => [...prev, trimmed]);
    }
    setCustomLangValue("");
    setShowCustomLangInput(false);
  }

  function toggleDiscipline(d: Discipline) {
    setDisciplines((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  function addCustomDiscipline() {
    const trimmed = customDisciplineValue.trim();
    if (trimmed && !customDisciplines.includes(trimmed)) {
      setCustomDisciplines((prev) => [...prev, trimmed]);
    }
    setCustomDisciplineValue("");
    setShowCustomDisciplineInput(false);
  }

  function removeCustomDiscipline(d: string) {
    setCustomDisciplines((prev) => prev.filter((x) => x !== d));
  }

  function handleVideoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIntroVideoDurationError(null);
    const url = URL.createObjectURL(file);
    const vid = document.createElement("video");
    vid.preload = "metadata";
    vid.src = url;
    vid.onloadedmetadata = () => {
      if (vid.duration > 65) {
        setIntroVideoDurationError("Video must be 30 seconds to 1 minute. Please record a shorter clip.");
        URL.revokeObjectURL(url);
        e.target.value = "";
      } else {
        setIntroVideo(file);
        setIntroVideoPreviewUrl(url);
      }
    };
  }

  function removeIntroVideo() {
    if (introVideoPreviewUrl) URL.revokeObjectURL(introVideoPreviewUrl);
    setIntroVideo(null);
    setIntroVideoPreviewUrl(null);
    setIntroVideoDurationError(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
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
        {customDisciplines.map((d) => (
          <span
            key={d}
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: CUSTOM_DISCIPLINE_COLOR }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* Card meta row */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-700">
        <span className="flex items-center gap-1.5">
          <DollarSign size={15} className="text-neutral-500" />
          <span className="font-semibold">${price}</span> / session
        </span>
        <span className="flex items-center gap-1.5">
          <Globe size={15} className="text-neutral-500" />
          {languages.join(", ")}
        </span>
        {sessionDuration > 0 && (
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-neutral-500" />
            {sessionDuration} min
          </span>
        )}
        {introCallDuration > 0 && (
          <span className="text-electric-teal font-medium">
            Free {introCallDuration}-min intro call
          </span>
        )}
        {yearsExperience > 0 && (
          <span className="text-neutral-500">{yearsExperience} yrs experience</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* ── Form ── */}
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        {/* Avatar — prominent upload area */}
        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-6 transition-colors hover:border-electric-teal/30 hover:bg-electric-teal/5">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-electric-teal text-3xl font-bold text-white">
            {teacherProfile.avatarInitials}
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="rounded-full bg-electric-teal px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Upload Profile Photo
          </button>
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
            One sentence shown on your public teacher card. Start with &ldquo;I help you&hellip;&rdquo;
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

            {/* Custom discipline chips */}
            {customDisciplines.map((d) => (
              <span
                key={d}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white"
                style={{ backgroundColor: CUSTOM_DISCIPLINE_COLOR }}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
                {d}
                <button
                  type="button"
                  onClick={() => removeCustomDiscipline(d)}
                  className="ml-0.5 opacity-80 hover:opacity-100"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {/* Other button */}
            {!showCustomDisciplineInput && (
              <button
                type="button"
                onClick={() => setShowCustomDisciplineInput(true)}
                className="flex items-center gap-1.5 rounded-full border border-dashed border-neutral-300 px-3.5 py-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:border-electric-teal hover:text-electric-teal"
              >
                <Plus size={12} />
                Other
              </button>
            )}
          </div>

          {/* Custom discipline input */}
          {showCustomDisciplineInput && (
            <div className="mt-3 flex items-center gap-2">
              <input
                autoFocus
                className={inputClass + " flex-1"}
                placeholder="Enter discipline name"
                value={customDisciplineValue}
                onChange={(e) => setCustomDisciplineValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); addCustomDiscipline(); }
                  if (e.key === "Escape") { setShowCustomDisciplineInput(false); setCustomDisciplineValue(""); }
                }}
              />
              <button
                type="button"
                onClick={addCustomDiscipline}
                className="rounded-lg bg-electric-teal px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => { setShowCustomDisciplineInput(false); setCustomDisciplineValue(""); }}
                className="rounded-lg border border-neutral-200 px-3 py-2.5 text-xs font-semibold text-neutral-500 transition-colors hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Session Price + Session Duration */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Session Duration
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={480}
                className={inputClass + " w-20"}
                value={sessionDuration}
                onChange={(e) => setSessionDuration(Number(e.target.value))}
                placeholder="60"
              />
              <span className="text-sm text-neutral-400">min</span>
            </div>
          </div>
        </div>

        {/* Free Intro Call Duration + Years of Experience */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Free Intro Call Duration
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={60}
                className={inputClass + " w-20"}
                value={introCallDuration}
                onChange={(e) => setIntroCallDuration(Number(e.target.value))}
                placeholder="15"
              />
              <span className="text-sm text-neutral-400">min</span>
            </div>
          </div>
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
        </div>

        {/* Languages */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Languages
          </label>
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((o) => !o)}
              className={inputClass + " flex items-center justify-between text-left"}
            >
              <span className={languages.length === 0 ? "text-neutral-400" : "text-neutral-900"}>
                {languages.length === 0
                  ? "Select languages…"
                  : languages.join(", ")}
              </span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-neutral-400 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langDropdownOpen && (
              <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-neutral-200 bg-white shadow-lg">
                {ALL_LANGUAGES.map((lang) => {
                  const selected = languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      {lang}
                      {selected && <Check size={14} className="text-electric-teal" />}
                    </button>
                  );
                })}

                {/* Divider */}
                <div className="mx-4 border-t border-neutral-100" />

                {/* Other option */}
                {!showCustomLangInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomLangInput(true)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-electric-teal hover:bg-neutral-50"
                  >
                    <Plus size={14} />
                    Other
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <input
                      autoFocus
                      className="flex-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm outline-none focus:border-electric-teal"
                      placeholder="Type a language…"
                      value={customLangValue}
                      onChange={(e) => setCustomLangValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); addCustomLanguage(); }
                        if (e.key === "Escape") { setShowCustomLangInput(false); setCustomLangValue(""); }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addCustomLanguage}
                      className="rounded-lg bg-electric-teal px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected chips */}
          {languages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="flex items-center gap-1 rounded-full bg-electric-teal/10 px-2.5 py-1 text-xs font-medium text-electric-teal"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className="ml-0.5 text-electric-teal/70 hover:text-electric-teal"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Intro Video Upload */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Intro Video
          </label>
          <p className="mb-2 text-xs text-neutral-400">
            Record a short 30-second to 1-minute video introducing yourself. This appears on your public profile.
          </p>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoSelect}
          />

          {!introVideoPreviewUrl ? (
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-4 py-8 text-center transition-colors hover:border-electric-teal/40 hover:bg-electric-teal/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-teal/10">
                <Video size={22} className="text-electric-teal" />
              </div>
              <p className="text-sm font-semibold text-neutral-700">Upload your intro video</p>
              <span className="mt-1 flex items-center gap-1.5 rounded-full border border-electric-teal px-4 py-1.5 text-xs font-semibold text-electric-teal">
                <Upload size={13} />
                Choose file
              </span>
            </button>
          ) : (
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-black">
              <video
                src={introVideoPreviewUrl}
                controls
                className="max-h-52 w-full object-contain"
              />
              <div className="flex items-center justify-between bg-neutral-50 px-4 py-2.5">
                <span className="truncate text-xs text-neutral-500">{introVideo?.name}</span>
                <button
                  type="button"
                  onClick={removeIntroVideo}
                  className="ml-3 flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  <X size={13} /> Remove
                </button>
              </div>
            </div>
          )}

          {introVideoDurationError && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{introVideoDurationError}</p>
          )}
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

      {/* ── Mobile Preview Overlay — full screen ── */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h3 className="font-display text-lg text-neutral-900">Preview</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="text-sm font-semibold text-electric-teal"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <Preview />
          </div>
        </div>
      )}
    </div>
  );
}

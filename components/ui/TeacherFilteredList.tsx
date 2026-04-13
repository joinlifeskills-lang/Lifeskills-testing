"use client";

import { useState, useMemo } from "react";
import FadeIn from "@/components/FadeIn";
import TeacherCard from "@/components/ui/TeacherCard";
import { teachers, type Discipline, type Teacher } from "@/lib/teachers";

// ─── Types & constants ────────────────────────────────────────────────────────

type Goal = "healing" | "stress" | "both" | "exploring";
type Sex = "any" | "male" | "female";

const PILLS: { id: Goal; label: string }[] = [
  { id: "healing", label: "Healing" },
  { id: "stress", label: "Learn skills for peace of mind" },
  { id: "both", label: "Both" },
  { id: "exploring", label: "Just exploring" },
];

const HEALING_DISCIPLINES: Discipline[] = ["Somatic", "Reiki"];
const STRESS_DISCIPLINES: Discipline[] = ["Breathwork", "Meditation", "Yoga"];
const ALL_DISCIPLINES: Discipline[] = [
  "Breathwork",
  "Somatic",
  "Meditation",
  "Reiki",
  "Yoga",
];

const TEACHER_PRICE_MIN = Math.min(...teachers.map((t) => t.price));
const TEACHER_PRICE_MAX = Math.max(...teachers.map((t) => t.price));

const FILTER_LANGUAGES = ["English", "Spanish"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function matchesGoal(disciplines: Discipline[], goal: Goal): boolean {
  if (goal === "both" || goal === "exploring") return true;
  const allowed = goal === "healing" ? HEALING_DISCIPLINES : STRESS_DISCIPLINES;
  return disciplines.some((d) => allowed.includes(d));
}

function matchesSearch(teacher: Teacher, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    teacher.name.toLowerCase().includes(q) ||
    teacher.tagline.toLowerCase().includes(q) ||
    teacher.disciplines.some((d) => d.toLowerCase().includes(q)) ||
    teacher.languages.some((l) => l.toLowerCase().includes(q))
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TeacherFilteredList() {
  const [activeGoal, setActiveGoal] = useState<Goal>("exploring");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [checkedDisciplines, setCheckedDisciplines] = useState<Set<Discipline>>(
    new Set(ALL_DISCIPLINES)
  );
  const [priceMinStr, setPriceMinStr] = useState("");
  const [priceMaxStr, setPriceMaxStr] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("any");
  const [selectedSex, setSelectedSex] = useState<Sex>("any");

  function toggleDiscipline(d: Discipline) {
    setCheckedDisciplines((prev) => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  }

  function clearAll() {
    setActiveGoal("exploring");
    setSearchQuery("");
    setCheckedDisciplines(new Set(ALL_DISCIPLINES));
    setPriceMinStr("");
    setPriceMaxStr("");
    setSelectedLanguage("any");
    setSelectedSex("any");
  }

  const priceMinVal = priceMinStr === "" ? 0 : Math.max(0, Number(priceMinStr) || 0);
  const priceMaxVal = priceMaxStr === "" ? Infinity : Number(priceMaxStr) || Infinity;

  function isVisible(teacher: Teacher): boolean {
    if (!matchesSearch(teacher, searchQuery)) return false;
    if (!matchesGoal(teacher.disciplines, activeGoal)) return false;
    if (!teacher.disciplines.some((d) => checkedDisciplines.has(d))) return false;
    if (teacher.price < priceMinVal) return false;
    if (teacher.price > priceMaxVal) return false;
    if (selectedLanguage !== "any" && !teacher.languages.includes(selectedLanguage)) return false;
    if (selectedSex !== "any" && teacher.sex !== selectedSex) return false;
    return true;
  }

  const visibleTeachers = teachers.filter(isVisible);

  const minBelowFloor =
    priceMinStr !== "" && priceMinVal > 0 && priceMinVal < TEACHER_PRICE_MIN;
  const maxBelowFloor =
    priceMaxStr !== "" && priceMaxVal !== Infinity && priceMaxVal < TEACHER_PRICE_MIN;

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── Desktop: label + pills + search aligned ───────────────────────── */}
      <div className="hidden md:flex gap-3 mb-1 items-start">
        <span className="font-sans text-[1rem] font-medium text-deep-sage shrink-0 pt-1.5">
          I am looking for…
        </span>

        <div className="flex-1 flex flex-col gap-2">
          {/* Pill row */}
          <div className="flex flex-wrap items-center gap-2">
            {PILLS.map((pill) => {
              const active = activeGoal === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveGoal(pill.id)}
                  className={[
                    "rounded-lg px-3.5 py-1.5 font-sans text-[0.8rem] font-medium transition-all duration-200 border",
                    active
                      ? "border-transparent text-white bg-deep-sage shadow-sm"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {pill.label}
                </button>
              );
            })}

            {/* More filters — inline after the last pill */}
            <button
              type="button"
              onClick={() => setShowMore((v) => !v)}
              className={[
                "rounded-lg px-3 py-1.5 font-sans text-[0.78rem] font-medium transition-all duration-200 border inline-flex items-center gap-1.5 ml-auto shrink-0",
                showMore
                  ? "bg-neutral-100 border-neutral-300 text-neutral-700"
                  : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700",
              ].join(" ")}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <line x1="1" y1="3" x2="11" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="2.5" y1="6" x2="9.5" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="4.5" y1="9" x2="7.5" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              More filters
              <svg
                width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"
                className={`transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}
              >
                <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Search bar — left edge aligns with first pill */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-8 py-2 font-sans text-[0.8rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-deep-sage/30 focus:border-deep-sage/60 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile: label + select + Filters button ───────────────────────── */}
      <div className="md:hidden mb-2">
        <p className="font-sans text-[1rem] font-medium text-deep-sage mb-1.5">I am looking for…</p>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={activeGoal}
              onChange={(e) => setActiveGoal(e.target.value as Goal)}
              className="w-full appearance-none bg-white border border-neutral-200 rounded-lg pl-3.5 pr-8 py-2.5 font-sans text-[0.82rem] text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#E8603A]/30 focus:border-[#E8603A]/60 transition-colors cursor-pointer"
            >
              <option value="exploring">Just exploring</option>
              <option value="healing">Healing</option>
              <option value="stress">Manage stress & anxiety</option>
              <option value="both">Both</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
              width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={[
              "flex items-center gap-1.5 rounded-lg px-3 py-2.5 font-sans text-[0.8rem] font-medium border transition-all duration-200 shrink-0",
              showMore
                ? "border-transparent text-white shadow-sm"
                : "border-neutral-200 bg-white text-neutral-600",
            ].join(" ")}
            style={
              showMore
                ? { background: "linear-gradient(135deg, #E8603A 0%, #F0A500 100%)" }
                : undefined
            }
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <line x1="1.5" y1="3.5" x2="11.5" y2="3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="3" y1="6.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="5" y1="9.5" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* ── Search — mobile only (desktop version is inside the pill row above) ── */}
      <div className="relative mt-2 mb-1 md:hidden">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-8 py-2 font-sans text-[0.8rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-deep-sage/30 focus:border-deep-sage/60 transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Expandable More Filters panel ────────────────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showMore ? "max-h-[640px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Discipline checkboxes */}
          <div>
            <p className="font-sans text-[0.67rem] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Discipline
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-2.5 gap-x-4">
              {ALL_DISCIPLINES.map((d) => (
                <label key={d} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checkedDisciplines.has(d)}
                    onChange={() => toggleDiscipline(d)}
                    className="w-3.5 h-3.5 rounded cursor-pointer accent-[#2D4A3E]"
                  />
                  <span className="font-sans text-[0.8rem] text-neutral-700 group-hover:text-deep-sage transition-colors select-none">
                    {d}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price inputs */}
          <div>
            <p className="font-sans text-[0.67rem] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Price per session
            </p>
            <div className="flex items-center gap-2 lg:flex-col lg:items-stretch">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-[0.82rem] text-neutral-400 pointer-events-none">$</span>
                <input
                  type="number"
                  min={0}
                  value={priceMinStr}
                  onChange={(e) => setPriceMinStr(e.target.value)}
                  placeholder="Min"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-6 pr-2 py-2 font-sans text-[0.82rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E8603A]/30 focus:border-[#E8603A]/60 transition-colors"
                />
              </div>
              <span className="font-sans text-[0.75rem] text-neutral-400 shrink-0 lg:text-center">—</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-[0.82rem] text-neutral-400 pointer-events-none">$</span>
                <input
                  type="number"
                  min={0}
                  value={priceMaxStr}
                  onChange={(e) => setPriceMaxStr(e.target.value)}
                  placeholder="Max"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-6 pr-2 py-2 font-sans text-[0.82rem] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E8603A]/30 focus:border-[#E8603A]/60 transition-colors"
                />
              </div>
            </div>

            {minBelowFloor && (
              <p className="font-sans text-[0.71rem] text-amber-600 mt-2 leading-snug">
                Our lowest session starts at ${TEACHER_PRICE_MIN} — try ${TEACHER_PRICE_MIN}+ to see matches.
              </p>
            )}
            {maxBelowFloor && (
              <p className="font-sans text-[0.71rem] text-red-500 mt-2 leading-snug">
                No teachers in this range — sessions start from ${TEACHER_PRICE_MIN}.
              </p>
            )}
          </div>

          {/* Language filter */}
          <div>
            <p className="font-sans text-[0.67rem] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Language
            </p>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-lg pl-3 pr-7 py-2 font-sans text-[0.8rem] text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#E8603A]/30 focus:border-[#E8603A]/60 transition-colors cursor-pointer"
              >
                <option value="any">Any language</option>
                {FILTER_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
                width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Sex filter */}
          <div>
            <p className="font-sans text-[0.67rem] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Teacher
            </p>
            <div className="flex flex-col gap-y-2.5">
              {(["any", "female", "male"] as Sex[]).map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="sex-filter"
                    value={option}
                    checked={selectedSex === option}
                    onChange={() => setSelectedSex(option)}
                    className="w-3.5 h-3.5 cursor-pointer accent-[#2D4A3E]"
                  />
                  <span className="font-sans text-[0.8rem] text-neutral-700 group-hover:text-deep-sage transition-colors select-none capitalize">
                    {option === "any" ? "Anyone" : option === "female" ? "Female" : "Male"}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Teacher list — single column ─────────────────────────────────── */}
      <div className="flex flex-col gap-5 mt-5">
        {visibleTeachers.map((teacher, i) => (
          <FadeIn key={teacher.slug} delay={i * 40}>
            <TeacherCard teacher={teacher} />
          </FadeIn>
        ))}

        {visibleTeachers.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-neutral-500 text-[0.9rem]">No teachers match your filters.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 font-sans text-[0.82rem] text-[#E8603A] hover:underline underline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

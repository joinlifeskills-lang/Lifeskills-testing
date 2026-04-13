"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Pencil } from "lucide-react";

const QUESTIONS = [
  {
    id: "bringing",
    question: "What's bringing you here?",
    subtitle: null,
    options: [
      "I want to let go of something I've been carrying",
      "I want to feel less stressed & anxious",
      "I want to build habits that actually stick",
      "I'm just curious",
    ],
  },
  {
    id: "best",
    question: "What does the best version of you look like?",
    subtitle: null,
    options: [
      "Feeling calm on a regular day",
      "Processing something I've been holding onto",
      "Having tools I can use anytime",
      "A deeper connection to myself",
    ],
  },
  {
    id: "explored",
    question: "Have you explored any of this before?",
    subtitle: "breathwork, meditation, yoga, somatic work, or spiritual practice",
    options: [
      "This is brand new to me",
      "I've tried a few things",
      "I have a practice but want more",
      "I'm experienced and ready to go deeper",
    ],
  },
];

const OTHER_KEY = "__other__";

function getDisplayAnswer(qId: string, answers: Record<string, string>, otherText: Record<string, string>) {
  const ans = answers[qId];
  if (!ans) return null;
  if (ans === OTHER_KEY) return otherText[qId]?.trim() || null;
  return ans;
}

export default function WellnessProfile() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(true);
  const [saved, setSaved] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function isAnswered(qId: string) {
    const ans = answers[qId];
    if (!ans) return false;
    if (ans === OTHER_KEY) return (otherText[qId] ?? "").trim().length > 0;
    return true;
  }

  const unanswered = QUESTIONS.filter((q) => !isAnswered(q.id));
  const canSave = unanswered.length === 0;

  function select(questionId: string, option: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === option ? "" : option,
    }));
    setSaved(false);
  }

  useEffect(() => {
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === OTHER_KEY) {
        inputRefs.current[q.id]?.focus();
      }
    });
  }, [answers]);

  function handleSave() {
    if (!canSave) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleClear() {
    setAnswers({});
    setOtherText({});
    setSaved(false);
    setAttempted(false);
  }

  function handleEdit() {
    setIsEditing(true);
    setSaved(false);
    setAttempted(false);
  }

  // ── Saved summary view ───────────────────────────────────────────────────────
  if (!isEditing && canSave) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-6 pt-6 pb-5 border-b border-neutral-100 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg text-neutral-900 leading-snug">
              Shape your experience
            </h3>
            <p className="text-sm text-neutral-500 mt-1">
              Help us personalise your journey so every session feels like it was made for you.
            </p>
          </div>
          <button
            onClick={handleEdit}
            className="shrink-0 flex items-center gap-1.5 rounded-full text-[0.82rem] font-semibold py-[7px] px-[16px] border border-[#2D4A3E] text-[#2D4A3E] hover:bg-[#2D4A3E] hover:text-white transition-colors"
          >
            <Pencil size={12} />
            Edit
          </button>
        </div>

        <div className="divide-y divide-neutral-100">
          {QUESTIONS.map((q, idx) => {
            const display = getDisplayAnswer(q.id, answers, otherText);
            return (
              <div key={q.id} className="px-6 py-5 flex items-start gap-3">
                <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                  <span className="font-display text-xs text-[#2D4A3E] leading-none">{idx + 1}</span>
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-neutral-400 font-medium mb-1">{q.question}</p>
                  <p className="text-sm text-neutral-800 font-medium leading-snug">{display}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Edit / first-time view ───────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-neutral-100 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg text-neutral-900 leading-snug">
            Shape your experience
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            Help us personalise your journey so every session feels like it was made for you.
          </p>
        </div>
        {/* Show Cancel only if previously saved answers exist */}
        {canSave && (
          <button
            onClick={() => setIsEditing(false)}
            className="shrink-0 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mt-1"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Questions */}
      <div className="divide-y divide-neutral-100">
        {QUESTIONS.map((q, idx) => {
          const selected = answers[q.id] ?? "";
          const otherSelected = selected === OTHER_KEY;

          return (
            <div key={q.id} className="px-6 py-7">
              <div className="flex items-start gap-3 mb-5">
                <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                  <span className="font-display text-xs text-[#2D4A3E] leading-none">{idx + 1}</span>
                </span>
                <div>
                  <p className="font-display text-[1.05rem] text-neutral-900 leading-snug">
                    {q.question}
                  </p>
                  {q.subtitle && (
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{q.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2.5 pl-9">
                {q.options.map((option) => {
                  const active = selected === option;
                  return (
                    <button
                      key={option}
                      onClick={() => select(q.id, option)}
                      className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-150 ${
                        active
                          ? "bg-[#F5F0E8] border-[#2D4A3E] text-[#2D4A3E]"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      <span className={`text-sm leading-snug ${active ? "font-medium" : ""}`}>
                        {option}
                      </span>
                      <span
                        className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          active ? "border-[#2D4A3E] bg-[#2D4A3E]" : "border-neutral-300"
                        }`}
                      >
                        {active && <Check size={9} className="text-white" strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}

                {/* Something else */}
                <button
                  onClick={() => select(q.id, OTHER_KEY)}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-150 ${
                    otherSelected
                      ? "bg-[#F5F0E8] border-[#2D4A3E] text-[#2D4A3E]"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span className={`flex items-center gap-2 text-sm leading-snug ${otherSelected ? "font-medium" : ""}`}>
                    <Pencil size={13} className={otherSelected ? "text-[#2D4A3E]" : "text-neutral-400"} />
                    Something else
                  </span>
                  <span
                    className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      otherSelected ? "border-[#2D4A3E] bg-[#2D4A3E]" : "border-neutral-300"
                    }`}
                  >
                    {otherSelected && <Check size={9} className="text-white" strokeWidth={3} />}
                  </span>
                </button>

                {otherSelected && (
                  <input
                    ref={(el) => { inputRefs.current[q.id] = el; }}
                    type="text"
                    value={otherText[q.id] ?? ""}
                    onChange={(e) => {
                      setOtherText((prev) => ({ ...prev, [q.id]: e.target.value }));
                      setSaved(false);
                    }}
                    placeholder="Tell us in your own words…"
                    className="w-full rounded-xl border border-[#2D4A3E]/30 bg-[#F5F0E8]/50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#2D4A3E]/20 focus:border-[#2D4A3E]/50 transition-shadow"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save */}
      <div className="px-6 py-5 border-t border-neutral-100 space-y-3">
        {attempted && !canSave && (
          <p className="text-sm text-vivid-coral">
            Please answer{" "}
            {unanswered.length === QUESTIONS.length
              ? "all 3 questions"
              : unanswered.length === 1
              ? `question ${QUESTIONS.findIndex((q) => q.id === unanswered[0].id) + 1}`
              : `questions ${unanswered.map((q) => QUESTIONS.findIndex((x) => x.id === q.id) + 1).join(" and ")}`}{" "}
            before saving.
          </p>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 rounded-full font-semibold text-[0.88rem] py-[10px] px-[26px] transition-opacity ${
              canSave
                ? "bg-[#2D4A3E] text-white hover:opacity-90"
                : "bg-[#2D4A3E] text-white opacity-40 cursor-not-allowed"
            }`}
          >
            {saved && <Check size={14} strokeWidth={2.5} />}
            {saved ? "Saved!" : "Save preferences"}
          </button>
          {Object.keys(answers).length > 0 && !saved && (
            <button
              onClick={handleClear}
              className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

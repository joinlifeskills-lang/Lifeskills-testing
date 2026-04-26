"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { FREQUENCY_LABEL } from "@/lib/journey/types";

const CLIENT_ID = "cl-1";
const CONFETTI_COLORS = ["#2D4A3E", "#0BA89A", "#F0A500", "#E8603A", "#6BAA3E", "#FFFFFF"];
const EMOJIS = ["\uD83C\uDF89", "\u2728", "\uD83D\uDD25", "\uD83D\uDCAB", "\uD83C\uDF1F", "\uD83D\uDE4C", "\u2B50", "\uD83C\uDF8A"];

function useConfetti(active: boolean) {
  const raf = useRef(0);
  useEffect(() => {
    if (!active) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;z-index:60;pointer-events:none;width:100vw;height:100vh";
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;
    const t0 = Date.now();
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width, y: -10 - Math.random() * 150,
      vx: (Math.random() - 0.5) * 3.5, vy: 1.5 + Math.random() * 3,
      w: 3 + Math.random() * 7, h: 2 + Math.random() * 5,
      r: Math.random() * Math.PI * 2, rs: (Math.random() - 0.5) * 0.12,
      c: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      circle: Math.random() > 0.6,
    }));
    const tick = () => {
      const elapsed = (Date.now() - t0) / 1000;
      const fade = elapsed > 2.2 ? Math.max(0, 1 - (elapsed - 2.2) / 1) : 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (fade <= 0) { canvas.remove(); return; }
      for (const p of particles) {
        p.vy += 0.05; p.y += p.vy; p.x += p.vx;
        p.vx += (Math.random() - 0.5) * 0.15; p.r += p.rs;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.globalAlpha = fade; ctx.fillStyle = p.c;
        if (p.circle) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
        ctx.restore();
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); canvas.remove(); };
  }, [active]);
}

function useFloatingEmojis(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;z-index:58;pointer-events:none;overflow:hidden";
    document.body.appendChild(container);
    for (let i = 0; i < 10; i++) {
      const span = document.createElement("span");
      const left = 10 + Math.random() * 80;
      const delay = Math.random() * 0.6;
      const dur = 1.8 + Math.random() * 0.8;
      const size = 18 + Math.random() * 14;
      span.textContent = EMOJIS[i % EMOJIS.length];
      span.style.cssText = `position:absolute;bottom:-30px;left:${left}%;font-size:${size}px;opacity:0;animation:hef ${dur}s ${delay}s ease-out forwards`;
      container.appendChild(span);
    }
    const style = document.createElement("style");
    style.textContent = `@keyframes hef{0%{transform:translateY(0) scale(.4);opacity:0}12%{opacity:1;transform:translateY(-80px) scale(1)}100%{transform:translateY(-500px) scale(.5);opacity:0}}`;
    container.appendChild(style);
    const timer = setTimeout(() => container.remove(), 3500);
    return () => { clearTimeout(timer); container.remove(); };
  }, [active]);
}

export default function HomePractices() {
  const { goals, toggleSubGoal, addJournalEntry } = useJourneyStore();
  const clientGoals = goals.filter(
    (g) => g.clientId === CLIENT_ID && g.status === "active"
  );
  const allSg = clientGoals.flatMap((g) => g.subGoals);
  const doneCount = allSg.filter((s) => s.completedToday).length;
  const allDone = allSg.length > 0 && doneCount === allSg.length;

  const [celebrating, setCelebrating] = useState(false);
  const prevAllDone = useRef(allDone);
  const firedRef = useRef(false);

  useConfetti(celebrating);
  useFloatingEmojis(celebrating);

  useEffect(() => {
    if (allDone && !prevAllDone.current && !firedRef.current) {
      firedRef.current = true;
      const t1 = setTimeout(() => {
        setCelebrating(true);
        addJournalEntry(
          CLIENT_ID,
          "All practices complete for today! Take a moment to reflect \u2014 how do you feel after showing up for yourself today?"
        );
      }, 500);
      const t2 = setTimeout(() => setCelebrating(false), 4000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    prevAllDone.current = allDone;
  }, [allDone, addJournalEntry]);

  return (
    <>
      {celebrating && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center"
          onClick={() => setCelebrating(false)}
          style={{ animation: "hCelebOverlay 3.5s ease forwards" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(245,240,232,0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              animation: "hCelebBgIn 1s ease-out forwards",
            }}
          />
          <div
            className="relative text-center"
            style={{ animation: "hCelebTextIn 1.4s cubic-bezier(0.22,1,0.36,1) forwards" }}
          >
            <div className="text-5xl mb-5" style={{ animation: "hCelebEmoji 1.4s ease-out forwards" }}>
              {"\uD83C\uDF89"}
            </div>
            <h3 className="font-display text-3xl lg:text-4xl text-deep-sage">
              You showed up for yourself today.
            </h3>
            <p className="font-sans text-base text-neutral-700/80 mt-3">
              All daily practices complete.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes hCelebOverlay { 0% { opacity: 1; } 75% { opacity: 1; } 100% { opacity: 0; pointer-events: none; } }
        @keyframes hCelebBgIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes hCelebTextIn { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 60% { opacity: 0.8; } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes hCelebEmoji { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 50% { transform: scale(1.05) rotate(3deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
      `}</style>

      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-neutral-900">
            Today&apos;s Practices
          </h3>
          <span className="font-sans text-xs text-neutral-500">
            {doneCount}/{allSg.length} done
          </span>
        </div>

        <div className="space-y-2">
          {clientGoals.map((goal) =>
            goal.subGoals.map((sg) => (
              <div key={sg.id} className="flex items-center gap-3 py-2">
                <button
                  onClick={sg.completedToday ? undefined : () => toggleSubGoal(goal.id, sg.id)}
                  disabled={sg.completedToday}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: sg.completedToday ? "#2D4A3E" : "transparent",
                    borderWidth: sg.completedToday ? "0px" : "2px",
                    borderStyle: "solid",
                    borderColor: sg.completedToday ? "transparent" : "#0BA89A",
                    cursor: sg.completedToday ? "default" : "pointer",
                    transition: "background-color 400ms ease, border-color 400ms ease",
                  }}
                >
                  {sg.completedToday ? (
                    <Check size={14} className="text-white" strokeWidth={3} />
                  ) : (
                    <Check size={14} className="text-electric-teal" strokeWidth={2} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-sans text-sm"
                    style={{
                      color: sg.completedToday ? "#7A7A7A" : "#1A1A1A",
                      transition: "color 300ms ease",
                    }}
                  >
                    {sg.title}
                  </p>
                  <p className="font-sans text-[0.6rem] text-neutral-500">
                    {FREQUENCY_LABEL[sg.frequency]}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {allSg.length === 0 && (
          <p className="font-sans text-sm text-neutral-500 text-center py-3">
            No practices yet.
          </p>
        )}

        <Link
          href="/customer-dashboard/journey"
          className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-neutral-100 font-sans text-sm font-medium text-electric-teal hover:text-deep-sage transition-colors"
        >
          View my journey
          <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}

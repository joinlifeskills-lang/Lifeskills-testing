"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Check } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { FREQUENCY_LABEL } from "@/lib/journey/types";
import type { JourneyGoal } from "@/lib/journey/types";

/* ── Confetti (canvas, no libraries) ── */

const COLORS = ["#2D4A3E", "#0BA89A", "#F0A500", "#E8603A", "#6BAA3E", "#FFFFFF"];

function useConfetti(active: boolean) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;z-index:60;pointer-events:none;width:100vw;height:100vh";
    document.body.appendChild(canvas);
    canvasRef.current = canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;
    const t0 = Date.now();

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 150,
      vx: (Math.random() - 0.5) * 3.5,
      vy: 1.5 + Math.random() * 3,
      w: 3 + Math.random() * 7,
      h: 2 + Math.random() * 5,
      r: Math.random() * Math.PI * 2,
      rs: (Math.random() - 0.5) * 0.12,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      circle: Math.random() > 0.6,
    }));

    const tick = () => {
      const elapsed = (Date.now() - t0) / 1000;
      const fade = elapsed > 2.2 ? Math.max(0, 1 - (elapsed - 2.2) / 1) : 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (fade <= 0) { canvas.remove(); return; }

      for (const p of particles) {
        p.vy += 0.05;
        p.y += p.vy;
        p.x += p.vx;
        p.vx += (Math.random() - 0.5) * 0.15;
        p.r += p.rs;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = fade;
        ctx.fillStyle = p.c;
        if (p.circle) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      canvas.remove();
    };
  }, [active]);
}

/* ── Weekly Streak ── */

function WeeklyStreak({ goals }: { goals: JourneyGoal[] }) {
  const activeGoals = goals.filter((g) => g.status === "active");
  const allSg = activeGoals.flatMap((g) => g.subGoals);
  const today = new Date().toISOString().slice(0, 10);
  const labels = ["S", "M", "T", "W", "T", "F", "S"];

  const days: { date: string; done: boolean; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const isToday = ds === today;
    const done = isToday
      ? allSg.length > 0 && allSg.every((s) => s.completedToday)
      : allSg.length > 0 && allSg.every((s) => s.completionHistory.includes(ds));
    days.push({ date: ds, done, isToday });
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {days.map((day) => {
        const dow = new Date(day.date + "T12:00:00").getDay();
        return (
          <div key={day.date} className="flex flex-col items-center gap-1.5">
            <span className="font-sans text-[0.6rem] font-semibold text-neutral-500 uppercase">
              {labels[dow]}
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                day.done
                  ? "bg-electric-teal"
                  : day.isToday
                  ? "border-2 border-electric-teal"
                  : "border-2 border-neutral-300"
              }`}
              style={
                day.isToday && !day.done
                  ? { animation: "pulse-ring 2s ease-in-out infinite" }
                  : undefined
              }
            >
              {day.done && <Check size={13} className="text-white" strokeWidth={3} />}
            </div>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(11,168,154,0.3); }
          50% { box-shadow: 0 0 0 5px rgba(11,168,154,0); }
        }
      `}</style>
    </div>
  );
}

/* ── Floating Emojis (rendered into a portal-style div) ── */

const EMOJIS = ["\uD83C\uDF89", "\u2728", "\uD83D\uDD25", "\uD83D\uDCAB", "\uD83C\uDF1F", "\uD83D\uDE4C", "\u2B50", "\uD83C\uDF8A"];

function useFloatingEmojis(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;z-index:58;pointer-events:none;overflow:hidden";
    document.body.appendChild(container);

    const spans: HTMLSpanElement[] = [];
    for (let i = 0; i < 10; i++) {
      const span = document.createElement("span");
      const left = 10 + Math.random() * 80;
      const delay = Math.random() * 0.6;
      const dur = 1.8 + Math.random() * 0.8;
      const drift = (Math.random() - 0.5) * 50;
      const size = 18 + Math.random() * 14;
      span.textContent = EMOJIS[i % EMOJIS.length];
      span.style.cssText = `position:absolute;bottom:-30px;left:${left}%;font-size:${size}px;opacity:0;animation:ef ${dur}s ${delay}s ease-out forwards`;
      container.appendChild(span);
      spans.push(span);
    }

    const style = document.createElement("style");
    style.textContent = `@keyframes ef{0%{transform:translateY(0) translateX(0) scale(.4);opacity:0}12%{opacity:1;transform:translateY(-80px) scale(1)}100%{transform:translateY(-500px) translateX(${40}px) scale(.5);opacity:0}}`;
    container.appendChild(style);

    const timer = setTimeout(() => container.remove(), 3500);
    return () => { clearTimeout(timer); container.remove(); };
  }, [active]);
}

/* ── Main Component ── */

export default function TodaysPractices({ clientId }: { clientId: string }) {
  const { goals, toggleSubGoal, addJournalEntry } = useJourneyStore();
  const clientGoals = goals.filter(
    (g) => g.clientId === clientId && g.status === "active"
  );
  const allSg = clientGoals.flatMap((g) => g.subGoals);
  const doneCount = allSg.filter((s) => s.completedToday).length;
  const allDone = allSg.length > 0 && doneCount === allSg.length;

  const [celebrating, setCelebrating] = useState(false);
  const [celebDone, setCelebDone] = useState(false);
  const prevAllDone = useRef(allDone);
  const firedRef = useRef(false);

  // Confetti + emojis are driven by hooks that inject into document.body
  // so they never cause layout shifts in the component tree
  useConfetti(celebrating);
  useFloatingEmojis(celebrating);

  const dismiss = useCallback(() => setCelebrating(false), []);

  useEffect(() => {
    if (allDone && !prevAllDone.current && !firedRef.current) {
      firedRef.current = true;

      // Delay celebration slightly so the card transition finishes first
      const t1 = setTimeout(() => {
        setCelebrating(true);

        addJournalEntry(
          clientId,
          "All practices complete for today! Take a moment to reflect \u2014 how do you feel after showing up for yourself today?"
        );
      }, 500);

      // Auto-dismiss after 4s (500ms delay + 3.5s visible), then show banner
      const t2 = setTimeout(() => {
        setCelebrating(false);
        setCelebDone(true);
      }, 4000);

      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    prevAllDone.current = allDone;
  }, [allDone, addJournalEntry, clientId]);

  return (
    <>
      {/* Celebration overlay — rendered outside the card to avoid layout shift */}
      {celebrating && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center"
          onClick={dismiss}
          style={{ animation: "celebOverlay 3.5s ease forwards" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(245,240,232,0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              animation: "celebBgIn 1s ease-out forwards",
            }}
          />
          <div
            className="relative text-center"
            style={{ animation: "celebTextIn 1.4s cubic-bezier(0.22,1,0.36,1) forwards" }}
          >
            <div className="text-5xl mb-5" style={{ animation: "celebEmoji 1.4s ease-out forwards" }}>
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
        @keyframes celebOverlay {
          0% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes celebBgIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes celebTextIn {
          0% { opacity: 0; transform: scale(0.92) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes celebEmoji {
          0% { opacity: 0; transform: scale(0) rotate(-15deg); }
          50% { opacity: 1; transform: scale(1.08) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes bannerIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="h-full flex flex-col">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex-1 flex flex-col">
          <h2 className="font-display text-2xl text-deep-sage text-center mb-6">
            Today&apos;s Practices
          </h2>

          <div className="mb-6 pb-5 border-b border-neutral-100">
            <WeeklyStreak goals={clientGoals} />
            <p className="font-sans text-xs text-neutral-500 text-center mt-3">
              {doneCount} of {allSg.length} complete today
            </p>
          </div>

          {allDone && celebDone && (
            <div
              className="bg-lime-sage/12 rounded-2xl p-5 mb-5 flex items-center gap-4"
              style={{ animation: "bannerIn 0.5s ease-out forwards" }}
            >
              <div className="w-10 h-10 rounded-full bg-lime-sage/20 flex items-center justify-center flex-shrink-0">
                <Check size={18} className="text-lime-sage" strokeWidth={3} />
              </div>
              <div>
                <p className="font-display text-base text-deep-sage">All done for today</p>
                <p className="font-sans text-xs text-neutral-500">
                  You showed up for yourself. That matters.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3 flex-1">
            {clientGoals.map((goal) =>
              goal.subGoals.map((sg) => (
                <div
                  key={sg.id}
                  className="rounded-2xl p-5 min-h-[72px]"
                  style={{
                    backgroundColor: sg.completedToday ? "#2D4A3E" : "rgba(245,240,232,0.5)",
                    transition: "background-color 400ms ease, box-shadow 300ms ease",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-sans text-sm font-medium leading-snug"
                        style={{
                          color: sg.completedToday ? "#FFFFFF" : "#1A1A1A",
                          transition: "color 350ms ease",
                        }}
                      >
                        {sg.title}
                      </p>
                      <p
                        className="font-sans text-[0.65rem] mt-0.5"
                        style={{
                          color: sg.completedToday ? "rgba(255,255,255,0.5)" : "#7A7A7A",
                          transition: "color 350ms ease",
                        }}
                      >
                        {FREQUENCY_LABEL[sg.frequency]}
                      </p>
                    </div>

                    <button
                      onClick={sg.completedToday ? undefined : () => toggleSubGoal(goal.id, sg.id)}
                      aria-label={sg.completedToday ? "Completed" : "Complete practice"}
                      disabled={sg.completedToday}
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: sg.completedToday ? "rgba(255,255,255,0.2)" : "transparent",
                        borderWidth: sg.completedToday ? "0px" : "2.5px",
                        borderStyle: "solid",
                        borderColor: sg.completedToday ? "transparent" : "#0BA89A",
                        cursor: sg.completedToday ? "default" : "pointer",
                        transition: "background-color 400ms ease, border-color 400ms ease, border-width 300ms ease, transform 200ms ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!sg.completedToday) e.currentTarget.style.backgroundColor = "#0BA89A";
                      }}
                      onMouseLeave={(e) => {
                        if (!sg.completedToday) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onMouseDown={(e) => {
                        if (!sg.completedToday) e.currentTarget.style.transform = "scale(0.92)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <Check
                        size={18}
                        strokeWidth={sg.completedToday ? 3 : 2.5}
                        style={{
                          color: sg.completedToday ? "#FFFFFF" : "#0BA89A",
                          transition: "color 350ms ease, transform 400ms cubic-bezier(0.34,1.56,0.64,1)",
                          transform: sg.completedToday ? "scale(1)" : "scale(0.85)",
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))
            )}

            {allSg.length === 0 && (
              <div className="text-center py-6">
                <p className="font-sans text-sm text-neutral-500">
                  No practices yet. Your teacher will add daily practices once your
                  goals are set.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

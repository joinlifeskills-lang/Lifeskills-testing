"use client";

import { Leaf } from "lucide-react";

const QUOTES: { text: string; author: string }[] = [
  { text: "You don't have to be perfect to make progress. You just have to keep showing up.", author: "" },
  { text: "Small steps every day add up to something you won't recognise in a year.", author: "" },
  { text: "The body keeps the score — and it keeps the score of your care, too.", author: "" },
  { text: "Rest is not the absence of effort. It is part of the work.", author: "" },
  { text: "What you practise, you become. Choose gently.", author: "" },
  { text: "You are not behind. You are exactly where your path requires you to be.", author: "" },
  { text: "The breath is always available. It has never left you.", author: "" },
  { text: "Healing isn't linear, but it is real.", author: "" },
  { text: "Notice one thing today. That's enough.", author: "" },
  { text: "Consistency doesn't mean perfection. It means returning.", author: "" },
  { text: "Your nervous system is learning. Give it time and gentleness.", author: "" },
  { text: "Slow down. The quality of your attention is the practice.", author: "" },
  { text: "Every morning is a chance to begin again — not from zero, but from here.", author: "" },
  { text: "The work you're doing right now is the most important work there is.", author: "" },
  { text: "Wellbeing is not a destination. It's a way of walking.", author: "" },
  { text: "You are building something real, one day at a time.", author: "" },
  { text: "Be patient with your body. It is trying its best.", author: "" },
  { text: "Peace is not something you find. It's something you practise.", author: "" },
  { text: "A moment of stillness today is a gift to your future self.", author: "" },
  { text: "The only practice that doesn't work is the one you didn't do.", author: "" },
  { text: "Your effort today won't always feel like effort tomorrow.", author: "" },
  { text: "Gentleness toward yourself is not weakness. It's the foundation.", author: "" },
  { text: "Something in you already knows the way. Trust it a little more today.", author: "" },
  { text: "You are not your worst day. You are the pattern of your choices.", author: "" },
  { text: "Breathing deeply is an act of courage in a world that moves too fast.", author: "" },
  { text: "Growth often feels like nothing is happening — until it does.", author: "" },
  { text: "You're allowed to feel good about the small things you do.", author: "" },
  { text: "The most powerful thing you can offer yourself is your full attention.", author: "" },
  { text: "Today's practice is enough. You are enough.", author: "" },
  { text: "Every time you return to the practice, you are reaffirming your worth.", author: "" },
];

function getDailyQuote() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

export default function DailyWellnessQuote() {
  const quote = getDailyQuote();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-deep-gradient px-6 py-5 shadow-[0_8px_32px_rgba(45,74,62,0.25)]">
      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 10% 60%, rgba(11,168,154,0.14) 0%, transparent 55%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div className="mt-0.5 h-10 w-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
          <Leaf size={18} className="text-electric-teal" />
        </div>
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
            Daily wellness
          </p>
          <p className="font-display text-xl leading-snug text-white">
            {quote.text}
          </p>
        </div>
      </div>
    </div>
  );
}

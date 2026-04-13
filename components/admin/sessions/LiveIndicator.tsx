interface LiveIndicatorProps {
  liveCount: number;
}

export default function LiveIndicator({ liveCount }: LiveIndicatorProps) {
  if (liveCount === 0) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-vivid-coral/5 px-4 py-3">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vivid-coral opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-vivid-coral" />
      </span>
      <span className="text-sm font-semibold text-vivid-coral">
        {liveCount} Live Now
      </span>
      <span className="text-sm text-neutral-500">
        {liveCount === 1 ? "session" : "sessions"} in progress
      </span>
    </div>
  );
}

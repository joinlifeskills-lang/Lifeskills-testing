export default function PayoutSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Payout Settings
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0BA89A]" />
          <span className="text-sm font-medium text-neutral-900">
            Stripe &middot; Connected
          </span>
        </div>

        <p className="text-sm text-neutral-500">
          Account ending in ****6789
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors">
          Update Payout Method
        </button>
        <button className="rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover transition-colors">
          Request Early Payout
        </button>
      </div>
    </div>
  );
}

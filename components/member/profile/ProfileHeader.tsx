import { Camera } from "lucide-react";
import { memberProfile } from "@/lib/member/data";

export default function ProfileHeader() {
  const memberDate = new Date(memberProfile.memberSince);
  const memberSinceFormatted = memberDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-20 w-20 rounded-full bg-electric-teal flex items-center justify-center text-white text-2xl font-bold">
            {memberProfile.avatarInitials}
          </div>
          <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white shadow-md flex items-center justify-center border border-neutral-100 hover:bg-neutral-50 transition-colors">
            <Camera size={14} className="text-neutral-700" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-display text-2xl text-neutral-900">
            {memberProfile.firstName} {memberProfile.lastName}
          </h2>
          <p className="text-neutral-500 mt-0.5">{memberProfile.email}</p>
          <p className="text-sm text-neutral-400 mt-1">
            Member since {memberSinceFormatted}
          </p>
        </div>

        {/* Edit button */}
        <button className="rounded-full font-semibold text-[0.88rem] py-[10px] px-[26px] border border-deep-sage text-deep-sage hover:bg-deep-sage/5 transition-colors shrink-0">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

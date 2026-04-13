import { Star, MessageSquare, Flag, ThumbsUp } from "lucide-react";
import StatCard from "@/components/admin/ui/StatCard";
import { Review } from "@/lib/admin/types";

interface ReviewStatsProps {
  reviews: Review[];
}

export default function ReviewStats({ reviews }: ReviewStatsProps) {
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";
  const flaggedCount = reviews.filter((r) => r.status === "flagged").length;
  const publishedCount = reviews.filter((r) => r.status === "published").length;
  const responseRate =
    totalReviews > 0 ? Math.round((publishedCount / totalReviews) * 100) : 0;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={<Star size={20} />}
        value={avgRating}
        label="Average Rating"
        change={3.2}
        trend="up"
      />
      <StatCard
        icon={<MessageSquare size={20} />}
        value={String(totalReviews)}
        label="Total Reviews"
        change={12}
        trend="up"
      />
      <StatCard
        icon={<Flag size={20} />}
        value={String(flaggedCount)}
        label="Flagged Reviews"
        change={flaggedCount > 2 ? 15 : 5}
        trend={flaggedCount > 2 ? "up" : "down"}
      />
      <StatCard
        icon={<ThumbsUp size={20} />}
        value={`${responseRate}%`}
        label="Published Rate"
        change={4.5}
        trend="up"
      />
    </div>
  );
}

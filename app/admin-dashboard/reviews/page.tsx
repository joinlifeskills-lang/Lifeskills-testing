"use client";

import { useState, useMemo } from "react";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import AdminTabs from "@/components/admin/ui/AdminTabs";
import SearchInput from "@/components/admin/ui/SearchInput";
import ReviewCard from "@/components/admin/reviews/ReviewCard";
import ReviewStats from "@/components/admin/reviews/ReviewStats";
import DisputePanel from "@/components/admin/reviews/DisputePanel";
import { reviews as allReviews } from "@/lib/admin/reviews";
import { Review, ReviewStatus } from "@/lib/admin/types";

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<ReviewStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedDispute, setSelectedDispute] = useState<Review | null>(null);

  const counts = useMemo(() => ({
    published: allReviews.filter((r) => r.status === "published").length,
    flagged: allReviews.filter((r) => r.status === "flagged").length,
    disputed: allReviews.filter((r) => r.status === "disputed").length,
    hidden: allReviews.filter((r) => r.status === "hidden").length,
  }), []);

  const tabs = [
    { label: "All", value: "all", count: allReviews.length },
    { label: "Published", value: "published", count: counts.published },
    { label: "Flagged", value: "flagged", count: counts.flagged },
    { label: "Disputed", value: "disputed", count: counts.disputed },
    { label: "Hidden", value: "hidden", count: counts.hidden },
  ];

  const filtered = useMemo(() => {
    let result = allReviews;

    if (activeTab !== "all") {
      result = result.filter((r) => r.status === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.memberName.toLowerCase().includes(q) ||
          r.teacherName.toLowerCase().includes(q) ||
          r.discipline.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, search]);

  const handlePublish = (id: string) => {
    console.log("Publish review:", id);
  };

  const handleHide = (id: string) => {
    console.log("Hide review:", id);
  };

  const handleDismiss = (id: string) => {
    console.log("Dismiss flag:", id);
  };

  const handleOpenDispute = (review: Review) => {
    setSelectedDispute(review);
  };

  const handleSideWithTeacher = (id: string) => {
    console.log("Sided with teacher on review:", id);
    setSelectedDispute(null);
  };

  const handleSideWithMember = (id: string) => {
    console.log("Sided with member on review:", id);
    setSelectedDispute(null);
  };

  return (
    <>
      <AdminTopBar title="Reviews" />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Stats */}
        <div className="mb-6">
          <ReviewStats reviews={allReviews} />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <AdminTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(v) => {
              setActiveTab(v as ReviewStatus | "all");
              setSelectedDispute(null);
            }}
          />
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by member, teacher, discipline, or comment..."
            className="w-full sm:max-w-sm"
          />
        </div>

        {/* Dispute panel */}
        {selectedDispute && (
          <div className="mb-6">
            <DisputePanel
              review={selectedDispute}
              onSideWithTeacher={handleSideWithTeacher}
              onSideWithMember={handleSideWithMember}
              onClose={() => setSelectedDispute(null)}
            />
          </div>
        )}

        {/* Review cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filtered.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onPublish={handlePublish}
                onHide={handleHide}
                onDismiss={handleDismiss}
                onDispute={handleOpenDispute}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <p className="text-sm text-neutral-500">No reviews found.</p>
          </div>
        )}
      </div>
    </>
  );
}

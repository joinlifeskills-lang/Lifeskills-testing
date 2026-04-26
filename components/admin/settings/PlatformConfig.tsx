"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import { defaultSettings } from "@/lib/admin/settings";
import { PlatformSettings } from "@/lib/admin/types";

export default function PlatformConfig() {
  const [settings, setSettings] = useState<PlatformSettings>({ ...defaultSettings });

  const updateField = <K extends keyof PlatformSettings>(
    key: K,
    value: PlatformSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Save settings:", settings);
  };

  return (
    <div className="space-y-6">
      {/* General */}
      <AdminCard className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">General</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Platform Name
            </label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => updateField("platformName", e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Support Email
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => updateField("supportEmail", e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
            />
          </div>
        </div>
      </AdminCard>

      {/* Pricing */}
      <AdminCard className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Pricing</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Platform Fee (%)
            </label>
            <input
              type="number"
              value={settings.platformFee}
              onChange={(e) => updateField("platformFee", Number(e.target.value))}
              min={0}
              max={100}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Min Session Price ($)
            </label>
            <input
              type="number"
              value={settings.minSessionPrice}
              onChange={(e) => updateField("minSessionPrice", Number(e.target.value))}
              min={0}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Max Session Price ($)
            </label>
            <input
              type="number"
              value={settings.maxSessionPrice}
              onChange={(e) => updateField("maxSessionPrice", Number(e.target.value))}
              min={0}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
            />
          </div>
        </div>
      </AdminCard>

      {/* Moderation */}
      <AdminCard className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Moderation</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Auto-approve Reviews
              </p>
              <p className="text-xs text-neutral-500">
                Automatically publish reviews without manual approval.
              </p>
            </div>
            <button
              onClick={() =>
                updateField("autoApproveReviews", !settings.autoApproveReviews)
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.autoApproveReviews ? "bg-electric-teal" : "bg-neutral-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  settings.autoApproveReviews ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Require Teacher Interview
              </p>
              <p className="text-xs text-neutral-500">
                New teachers must complete an interview before approval.
              </p>
            </div>
            <button
              onClick={() =>
                updateField(
                  "requireTeacherInterview",
                  !settings.requireTeacherInterview
                )
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.requireTeacherInterview
                  ? "bg-electric-teal"
                  : "bg-neutral-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  settings.requireTeacherInterview
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </AdminCard>

      {/* Save */}
      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={handleSave}>
          Save Changes
        </AdminButton>
      </div>
    </div>
  );
}

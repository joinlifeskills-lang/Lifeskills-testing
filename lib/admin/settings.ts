import { PlatformSettings } from "@/lib/admin/types";

export const defaultSettings: PlatformSettings = {
  platformName: "Lifeskills",
  platformFee: 15,
  minSessionPrice: 50,
  maxSessionPrice: 200,
  sessionDurations: [30, 45, 60, 90],
  supportEmail: "support@lifeskills.com",
  autoApproveReviews: false,
  requireTeacherInterview: true,
  maintenanceMode: false,
};

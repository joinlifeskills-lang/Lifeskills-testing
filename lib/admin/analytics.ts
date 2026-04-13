import type { TimeSeriesPoint, FunnelStep, DisciplineMetric } from "@/lib/admin/types";

export const userGrowthData: TimeSeriesPoint[] = [
  { date: "2025-05", value: 320, label: "May" },
  { date: "2025-06", value: 385, label: "Jun" },
  { date: "2025-07", value: 442, label: "Jul" },
  { date: "2025-08", value: 510, label: "Aug" },
  { date: "2025-09", value: 578, label: "Sep" },
  { date: "2025-10", value: 645, label: "Oct" },
  { date: "2025-11", value: 698, label: "Nov" },
  { date: "2025-12", value: 734, label: "Dec" },
  { date: "2026-01", value: 812, label: "Jan" },
  { date: "2026-02", value: 896, label: "Feb" },
  { date: "2026-03", value: 984, label: "Mar" },
  { date: "2026-04", value: 1052, label: "Apr" },
];

export const sessionGrowthData: TimeSeriesPoint[] = [
  { date: "2025-05", value: 480, label: "May" },
  { date: "2025-06", value: 562, label: "Jun" },
  { date: "2025-07", value: 638, label: "Jul" },
  { date: "2025-08", value: 724, label: "Aug" },
  { date: "2025-09", value: 810, label: "Sep" },
  { date: "2025-10", value: 876, label: "Oct" },
  { date: "2025-11", value: 932, label: "Nov" },
  { date: "2025-12", value: 1005, label: "Dec" },
  { date: "2026-01", value: 1124, label: "Jan" },
  { date: "2026-02", value: 1238, label: "Feb" },
  { date: "2026-03", value: 1356, label: "Mar" },
  { date: "2026-04", value: 1480, label: "Apr" },
];

export const revenueGrowthData: TimeSeriesPoint[] = [
  { date: "2025-05", value: 12400, label: "May" },
  { date: "2025-06", value: 14850, label: "Jun" },
  { date: "2025-07", value: 16920, label: "Jul" },
  { date: "2025-08", value: 19340, label: "Aug" },
  { date: "2025-09", value: 21780, label: "Sep" },
  { date: "2025-10", value: 23500, label: "Oct" },
  { date: "2025-11", value: 25100, label: "Nov" },
  { date: "2025-12", value: 27350, label: "Dec" },
  { date: "2026-01", value: 30200, label: "Jan" },
  { date: "2026-02", value: 33480, label: "Feb" },
  { date: "2026-03", value: 36750, label: "Mar" },
  { date: "2026-04", value: 39800, label: "Apr" },
];

export const funnelData: FunnelStep[] = [
  { label: "Visitors", value: 28500, percentage: 100 },
  { label: "Sign Ups", value: 3420, percentage: 12 },
  { label: "First Session", value: 1540, percentage: 45 },
  { label: "Repeat Members", value: 820, percentage: 53.2 },
  { label: "Regular Members", value: 412, percentage: 50.2 },
];

export const disciplineMetrics: DisciplineMetric[] = [
  { discipline: "Yoga", sessions: 4820, revenue: 120500, growth: 18.2 },
  { discipline: "Meditation", sessions: 3650, revenue: 91250, growth: 24.5 },
  { discipline: "Breathwork", sessions: 2940, revenue: 73500, growth: 32.1 },
  { discipline: "Somatic", sessions: 1860, revenue: 55800, growth: 15.8 },
];

export const retentionData = [
  { month: "Month 1", oct: 100, nov: 100, dec: 100, jan: 100, feb: 100, mar: 100 },
  { month: "Month 2", oct: 72, nov: 74, dec: 68, jan: 76, feb: 78, mar: 75 },
  { month: "Month 3", oct: 58, nov: 61, dec: 54, jan: 63, feb: 65, mar: null },
  { month: "Month 4", oct: 48, nov: 52, dec: 45, jan: 54, feb: null, mar: null },
  { month: "Month 5", oct: 42, nov: 46, dec: 40, jan: null, feb: null, mar: null },
  { month: "Month 6", oct: 38, nov: 41, dec: null, jan: null, feb: null, mar: null },
];

export type Discipline =
  | "Breathwork"
  | "Meditation"
  | "Yoga"
  | "Somatic"
  | "Reiki";

export type Badge = "Top Teacher" | "New" | "Most Booked";

export type Teacher = {
  name: string;
  initials: string;
  slug: string;
  tagline: string;
  disciplines: Discipline[];
  bgColor: string;
  price: number;
  nextAvailable: string;
  yearsExperience: number;
  languages: string[];
  sex: "male" | "female";
  badge: Badge;
  rating: number;
  sessions: number;
};

export const teachers: Teacher[] = [
  {
    name: "Maya Reyes",
    initials: "MR",
    slug: "maya-reyes",
    tagline: "I help you find calm in minutes through breathwork and nervous-system science.",
    disciplines: ["Breathwork", "Meditation"],
    bgColor: "bg-electric-teal",
    price: 65,
    nextAvailable: "Mon, Apr 14",
    yearsExperience: 8,
    languages: ["English", "Spanish"],
    sex: "female",
    badge: "Top Teacher",
    rating: 4.9,
    sessions: 142,
  },
  {
    name: "James Okafor",
    initials: "JO",
    slug: "james-okafor",
    tagline: "I help you reconnect with your body and build resilience through movement and breath.",
    disciplines: ["Yoga", "Breathwork"],
    bgColor: "bg-vivid-coral",
    price: 75,
    nextAvailable: "Tue, Apr 15",
    yearsExperience: 12,
    languages: ["English"],
    sex: "male",
    badge: "Most Booked",
    rating: 4.8,
    sessions: 210,
  },
  {
    name: "Lena Park",
    initials: "LP",
    slug: "lena-park",
    tagline: "I help high-achievers quiet the mental noise and unlock deep, sustainable focus.",
    disciplines: ["Meditation", "Yoga"],
    bgColor: "bg-bright-amber",
    price: 70,
    nextAvailable: "Wed, Apr 16",
    yearsExperience: 10,
    languages: ["English", "Korean"],
    sex: "female",
    badge: "Top Teacher",
    rating: 5.0,
    sessions: 98,
  },
  {
    name: "David Cohen",
    initials: "DC",
    slug: "david-cohen",
    tagline: "I give you practical tools you can use anywhere, anytime to manage stress instantly.",
    disciplines: ["Breathwork", "Yoga"],
    bgColor: "bg-lime-sage",
    price: 60,
    nextAvailable: "Thu, Apr 17",
    yearsExperience: 6,
    languages: ["English", "Hebrew"],
    sex: "male",
    badge: "New",
    rating: 4.7,
    sessions: 24,
  },
  {
    name: "Anika Sharma",
    initials: "AS",
    slug: "anika-sharma",
    tagline: "I help you release stored tension and gently heal your body from the inside out.",
    disciplines: ["Somatic", "Reiki", "Meditation"],
    bgColor: "bg-electric-teal",
    price: 80,
    nextAvailable: "Mon, Apr 14",
    yearsExperience: 14,
    languages: ["English", "Hindi"],
    sex: "female",
    badge: "Most Booked",
    rating: 4.9,
    sessions: 187,
  },
  {
    name: "Carlos Vega",
    initials: "CV",
    slug: "carlos-vega",
    tagline: "I guide you in opening your heart and reconnecting with your deepest self.",
    disciplines: ["Reiki", "Breathwork"],
    bgColor: "bg-vivid-coral",
    price: 85,
    nextAvailable: "Fri, Apr 18",
    yearsExperience: 15,
    languages: ["English", "Spanish", "Portuguese"],
    sex: "male",
    badge: "Top Teacher",
    rating: 5.0,
    sessions: 163,
  },
  {
    name: "Nora Eriksen",
    initials: "NE",
    slug: "nora-eriksen",
    tagline: "I help you inhabit your body again and recover fully from chronic stress and injury.",
    disciplines: ["Yoga", "Somatic"],
    bgColor: "bg-bright-amber",
    price: 70,
    nextAvailable: "Tue, Apr 15",
    yearsExperience: 9,
    languages: ["English", "Norwegian"],
    sex: "female",
    badge: "New",
    rating: 4.6,
    sessions: 18,
  },
  {
    name: "Kwame Mensah",
    initials: "KM",
    slug: "kwame-mensah",
    tagline: "I help you cultivate emotional clarity and sharpen focus through stillness practice.",
    disciplines: ["Meditation"],
    bgColor: "bg-lime-sage",
    price: 65,
    nextAvailable: "Wed, Apr 16",
    yearsExperience: 7,
    languages: ["English", "French"],
    sex: "male",
    badge: "Most Booked",
    rating: 4.8,
    sessions: 195,
  },
  {
    name: "Sofia Tanaka",
    initials: "ST",
    slug: "sofia-tanaka",
    tagline: "I help high-stress professionals regulate their nervous system in real time.",
    disciplines: ["Breathwork", "Somatic"],
    bgColor: "bg-electric-teal",
    price: 75,
    nextAvailable: "Thu, Apr 17",
    yearsExperience: 11,
    languages: ["English", "Japanese"],
    sex: "female",
    badge: "Top Teacher",
    rating: 4.9,
    sessions: 134,
  },
  {
    name: "Eli Brandt",
    initials: "EB",
    slug: "eli-brandt",
    tagline: "I help you find deeper meaning in everyday life through yoga and contemplative practice.",
    disciplines: ["Yoga"],
    bgColor: "bg-vivid-coral",
    price: 70,
    nextAvailable: "Mon, Apr 14",
    yearsExperience: 13,
    languages: ["English", "German"],
    sex: "male",
    badge: "New",
    rating: 4.7,
    sessions: 31,
  },
  {
    name: "Priya Nair",
    initials: "PN",
    slug: "priya-nair",
    tagline: "I guide you to your body's own wisdom for natural healing through Ayurvedic principles.",
    disciplines: ["Somatic", "Meditation"],
    bgColor: "bg-bright-amber",
    price: 80,
    nextAvailable: "Fri, Apr 18",
    yearsExperience: 16,
    languages: ["English", "Hindi", "Malayalam"],
    sex: "female",
    badge: "Top Teacher",
    rating: 5.0,
    sessions: 221,
  },
  {
    name: "Marco Rossi",
    initials: "MRo",
    slug: "marco-rossi",
    tagline: "I teach resilience through movement and conscious breathing drawn from competitive sport.",
    disciplines: ["Breathwork", "Yoga"],
    bgColor: "bg-lime-sage",
    price: 60,
    nextAvailable: "Tue, Apr 15",
    yearsExperience: 5,
    languages: ["English", "Italian"],
    sex: "male",
    badge: "Most Booked",
    rating: 4.8,
    sessions: 176,
  },
];

export const disciplineTagColors: Record<Discipline, { bg: string; text: string }> = {
  Breathwork: { bg: "#0BA89A", text: "#ffffff" },
  Meditation: { bg: "#6BAA3E", text: "#ffffff" },
  Yoga: { bg: "#D4940A", text: "#ffffff" },
  Somatic: { bg: "#E8603A", text: "#ffffff" },
  Reiki: { bg: "#C026A0", text: "#ffffff" },
};

/** @deprecated use disciplineTagColors with inline styles instead */
export const disciplineTagClasses: Record<Discipline, string> = {
  Breathwork: "bg-[#0BA89A] text-white",
  Meditation: "bg-[#6BAA3E] text-white",
  Yoga: "bg-[#D4940A] text-white",
  Somatic: "bg-[#E8603A] text-white",
  Reiki: "bg-[#C026A0] text-white",
};

/** Gradient CSS for the photo placeholder based on primary discipline */
export const disciplineGradient: Record<Discipline, string> = {
  Breathwork: "linear-gradient(135deg, #0BA89A, #3B6B5E)",
  Meditation: "linear-gradient(135deg, #0BA89A, #3B6B5E)",
  Yoga: "linear-gradient(135deg, #F0A500, #E8603A)",
  Somatic: "linear-gradient(135deg, #F0A500, #E8603A)",
  Reiki: "linear-gradient(135deg, #C026A0, #7C3AED)",
};

export const badgeClasses: Record<Badge, string> = {
  "Top Teacher": "bg-energy-gradient text-white",
  New: "bg-[#0BA89A] text-white",
  "Most Booked": "bg-[#F0A500] text-white",
};

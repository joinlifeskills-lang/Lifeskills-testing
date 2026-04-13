const columns = [
  {
    title: "Platform",
    links: ["Browse Teachers", "How It Works", "FAQs", "Get Started"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Become a Teacher", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Refund Policy"],
  },
];

const socials = [
  {
    name: "X",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.6V14h2.7v8z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.6 6.9a5.3 5.3 0 0 1-3.2-1.1 5.3 5.3 0 0 1-2-3.3h-3.3v13.3a2.5 2.5 0 1 1-1.8-2.4v-3.3a5.7 5.7 0 1 0 5.1 5.7V9.3a8.5 8.5 0 0 0 5.2 1.8z" />
      </svg>
    ),
  },
];

const footerHrefMap: Record<string, string> = {
  "Browse Teachers": "/find-a-teacher",
  "How It Works": "/how-it-works",
  FAQs: "/#faq",
  "Get Started": "/find-a-teacher",
  "About Us": "/about",
  Blog: "/blog",
  "Become a Teacher": "/become-a-teacher",
  Contact: "/contact",
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Refund Policy": "/refund-policy",
};

function footerHref(label: string) {
  return footerHrefMap[label] ?? "#";
}

export default function Footer() {
  return (
    <footer className="bg-deep-sage text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 md:gap-8 mb-12">
          <div className="max-w-[320px]">
            <img
              src="/logo.svg"
              alt="Lifeskills"
              className="h-9 w-auto mb-5 brightness-0 invert"
            />
            <p className="font-sans text-[0.9rem] text-white/70 leading-[1.6]">
              Real skills for lasting inner peace. Live 1-on-1 coaching in
              breathwork, meditation, and yoga.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-sans text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/50 mb-4">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={footerHref(link)}
                      className="font-sans text-[0.9rem] text-white/80 hover:text-white no-underline transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-sans text-[0.82rem] text-white/60">
            © 2026 Lifeskills. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

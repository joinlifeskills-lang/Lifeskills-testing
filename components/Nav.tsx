"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./ui/Button";

const mainLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Become a Teacher", href: "/become-a-teacher" },
];

const mobileLinks = [
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-warm-sand/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <Link href="/" aria-label="Lifeskills home" className="no-underline">
          <img
            src="/nav_logo.svg"
            alt="Lifeskills"
            className="h-8 md:h-9 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {mainLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-[0.88rem] font-medium text-neutral-700 hover:text-deep-sage transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            className="font-sans text-[0.88rem] font-medium text-deep-sage hover:text-deep-sage-hover no-underline"
          >
            Log In
          </a>
          <Button href="/find-a-teacher" variant="nav">
            Find a teacher
          </Button>

          {/* Desktop hamburger for extra links */}
          <div className="relative">
            <button
              type="button"
              className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md hover:bg-black/5 transition-colors"
              aria-label={desktopOpen ? "Close menu" : "Open menu"}
              aria-expanded={desktopOpen}
              onClick={() => setDesktopOpen(!desktopOpen)}
            >
              <span
                className={`block w-5 h-[2px] bg-deep-sage transition-transform ${
                  desktopOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-deep-sage transition-opacity ${
                  desktopOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-deep-sage transition-transform ${
                  desktopOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>

            {desktopOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-warm-sand border border-black/8 rounded-xl shadow-lg py-2">
                {mainLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setDesktopOpen(false)}
                    className="block px-4 py-2 font-sans text-[0.88rem] font-medium text-neutral-700 hover:text-deep-sage hover:bg-black/5 transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-black/5 my-1 mx-4" />
                {mobileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setDesktopOpen(false)}
                    className="block px-4 py-2 font-sans text-[0.88rem] font-medium text-neutral-700 hover:text-deep-sage hover:bg-black/5 transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-black/5 my-1 mx-4" />
                <a
                  href="/login"
                  onClick={() => setDesktopOpen(false)}
                  className="block px-4 py-2 font-sans text-[0.88rem] font-medium text-deep-sage hover:bg-black/5 transition-colors no-underline"
                >
                  Log In
                </a>
                <div className="px-4 pt-2 pb-1">
                  <Button href="/find-a-teacher" variant="nav" className="w-full text-center">
                    Find a teacher
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block w-5 h-[2px] bg-deep-sage transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-deep-sage transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-deep-sage transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-warm-sand px-5 py-6">
          <div className="flex flex-col gap-4">
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-[0.95rem] font-medium text-neutral-700 no-underline"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-black/5 my-1" />
            {mobileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-[0.95rem] font-medium text-neutral-700 no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="font-sans text-[0.95rem] font-medium text-deep-sage no-underline"
            >
              Log In
            </a>
            <div className="pt-2">
              <Button href="/find-a-teacher" variant="nav">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

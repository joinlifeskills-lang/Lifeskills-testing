"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

type Mode = "login" | "signup";

const inputBase =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[0.95rem] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-deep-sage/40 transition-shadow";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-72px)]">
        <div className="bg-warm-sand flex items-center justify-center px-5 md:px-8 py-16 md:py-20">
          <FadeIn>
            <div className="w-full max-w-[440px] md:max-w-[480px]">
              {/* Headline */}
              <h1 className="font-display font-normal text-deep-sage text-[1.8rem] md:text-[2.2rem] leading-[1.15] mb-8 text-center">
                {mode === "login" ? "Welcome back" : "Begin your journey"}
              </h1>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {mode === "signup" && (
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block font-sans text-[0.88rem] font-medium text-neutral-700 mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className={inputBase}
                      placeholder="Jane Doe"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block font-sans text-[0.88rem] font-medium text-neutral-700 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputBase}
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block font-sans text-[0.88rem] font-medium text-neutral-700 mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={inputBase}
                    placeholder="••••••••"
                  />
                  {mode === "login" && (
                    <a
                      href="#"
                      className="inline-block mt-1.5 font-sans text-[0.82rem] text-deep-sage hover:text-deep-sage-hover no-underline"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>

                {mode === "signup" && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block font-sans text-[0.88rem] font-medium text-neutral-700 mb-1.5"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className={inputBase}
                      placeholder="••••••••"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-semibold text-[0.95rem] tracking-[0.01em] px-[26px] py-[13px] transition-all duration-200 ease-out cursor-pointer bg-deep-sage text-white border-0 hover:bg-deep-sage-hover hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                >
                  {mode === "login" ? "Log in" : "Create account"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-black/10" />
                <span className="font-sans text-[0.82rem] text-neutral-400">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              {/* Social buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {}}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[0.88rem] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[0.88rem] font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Footer toggle */}
              <p className="text-center font-sans text-[0.88rem] text-neutral-500 mt-8">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-semibold text-deep-sage hover:text-deep-sage-hover cursor-pointer"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-semibold text-deep-sage hover:text-deep-sage-hover cursor-pointer"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </div>
          </FadeIn>
        </div>

      </main>
      <Footer />
    </>
  );
}

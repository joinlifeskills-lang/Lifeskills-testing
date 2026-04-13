"use client";

import { useState, type FormEvent } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/ui/Button";

const inputBase =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[0.95rem] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-deep-sage/40 transition-shadow";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  function validateWhatsapp(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) {
      setWhatsappError("Please include your area code (e.g. +1 555 123 4567)");
      return false;
    }
    setWhatsappError("");
    return true;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateWhatsapp(whatsapp)) return;
    setSubmitted(true);
  }

  return (
    <>
      <Nav />

      <section className="bg-warm-sand py-20 md:py-28 min-h-[calc(100vh-72px)]">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          {submitted ? (
            <FadeIn>
              <div className="bg-white rounded-[20px] border border-black/5 p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-deep-sage/10 mb-4">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-deep-sage"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h1 className="font-display text-2xl md:text-3xl text-deep-sage mb-3">
                  Thank you!
                </h1>
                <p className="font-sans text-[1rem] text-neutral-600 leading-relaxed">
                  We&rsquo;ve received your message and will get back to you
                  within 24 hours.
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="bg-warm-sand rounded-[20px] p-8 md:p-12">
                <h1 className="font-display text-2xl md:text-3xl text-deep-sage mb-2 text-center">
                  Get in touch
                </h1>
                <p className="font-sans text-[0.95rem] text-neutral-500 text-center mb-10">
                  Have a question? Drop us a line and we&rsquo;ll get back to
                  you within 24 hours.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <div>
                    <label className="block font-sans text-[0.85rem] font-medium text-neutral-700 mb-1.5">
                      Name <span className="text-bright-amber">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[0.85rem] font-medium text-neutral-700 mb-1.5">
                      Email <span className="text-bright-amber">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[0.85rem] font-medium text-neutral-700 mb-1.5">
                      WhatsApp <span className="text-bright-amber">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      placeholder="+1 555 123 4567"
                      onChange={(e) => { setWhatsapp(e.target.value); if (whatsappError) validateWhatsapp(e.target.value); }}
                      onBlur={() => validateWhatsapp(whatsapp)}
                      className={inputBase + (whatsappError ? " border-red-400 focus:ring-red-300/40" : "")}
                    />
                    {whatsappError && (
                      <p className="mt-1.5 font-sans text-[0.78rem] text-red-500">{whatsappError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-[0.85rem] font-medium text-neutral-700 mb-1.5">
                      I am a&hellip; <span className="text-bright-amber">*</span>
                    </label>
                    <select required defaultValue="" className={inputBase}>
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="customer">Customer</option>
                      <option value="teacher">Teacher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-sans text-[0.85rem] font-medium text-neutral-700 mb-1.5">
                      Message <span className="text-bright-amber">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className={inputBase + " resize-y"}
                    />
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-center">
                    <Button type="submit" variant="nav" className="px-12 py-3 text-[1rem]">
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

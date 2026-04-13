"use client";

import { useState, type FormEvent } from "react";
import { Mail, ChevronRight, ChevronDown, Check } from "lucide-react";

const inputBase =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-deep-sage/30 focus:border-deep-sage/50 transition-shadow";

export default function SupportSection() {
  const [open, setOpen] = useState(false);
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
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6 pb-2">
        <h3 className="font-display text-lg text-neutral-900">Support</h3>
      </div>

      {/* Contact Support row */}
      <button
        onClick={() => { setOpen((v) => !v); setSubmitted(false); }}
        className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-neutral-50 transition-colors"
      >
        <Mail size={20} className="text-neutral-500 shrink-0" />
        <span className="flex-1 text-sm text-neutral-700 text-left">Contact Support</span>
        {open ? (
          <ChevronDown size={16} className="text-neutral-400" />
        ) : (
          <ChevronRight size={16} className="text-neutral-300" />
        )}
      </button>

      {/* Inline contact form */}
      {open && (
        <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="h-12 w-12 rounded-full bg-deep-sage/10 flex items-center justify-center">
                <Check size={22} className="text-deep-sage" />
              </div>
              <p className="font-display text-base text-neutral-900">Message sent!</p>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                We&rsquo;ve received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setOpen(false); }}
                className="mt-2 text-sm text-deep-sage underline underline-offset-2"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-neutral-500 mt-3 mb-5">
                Have a question? Drop us a line and we&rsquo;ll get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Name <span className="text-vivid-coral">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Email <span className="text-vivid-coral">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    WhatsApp <span className="text-vivid-coral">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    placeholder="+1 555 123 4567"
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (whatsappError) validateWhatsapp(e.target.value);
                    }}
                    onBlur={() => validateWhatsapp(whatsapp)}
                    className={inputBase + (whatsappError ? " border-red-400 focus:ring-red-300/40" : "")}
                  />
                  {whatsappError && (
                    <p className="mt-1 text-[0.75rem] text-red-500">{whatsappError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    I am a&hellip; <span className="text-vivid-coral">*</span>
                  </label>
                  <select required defaultValue="" className={inputBase}>
                    <option value="" disabled>Select one</option>
                    <option value="customer">Customer</option>
                    <option value="teacher">Teacher</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Message <span className="text-vivid-coral">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help?"
                    className={inputBase + " resize-y"}
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-sm text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-sm font-medium bg-deep-sage text-white hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      <div className="pb-2" />
    </div>
  );
}

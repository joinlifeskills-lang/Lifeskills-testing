"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const baseInput =
  "w-full rounded-xl border bg-white px-4 py-3 font-sans text-[0.95rem] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 transition-shadow";

function inputClass(hasError: boolean) {
  return `${baseInput} ${
    hasError
      ? "border-red-400 focus:ring-red-300/40"
      : "border-black/10 focus:ring-deep-sage/40"
  }`;
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1 font-sans text-[0.75rem] text-red-500 flex items-center gap-1">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      {msg}
    </p>
  );
}

type Errors = Record<string, string>;

export default function CheckoutForm({
  teacherName,
  date,
  time,
  price,
}: {
  teacherName: string;
  date: string;
  time: string;
  price: number;
}) {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [mode, setMode] = useState<"signup" | "login">("signup");

  // Field values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const e: Errors = {};

    if (mode === "signup") {
      if (!firstName.trim()) e.firstName = "First name is required.";
      if (!lastName.trim()) e.lastName = "Last name is required.";
    }
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password.trim()) e.password = "Password is required.";

    if (!cardNumber.trim()) e.cardNumber = "Card number is required.";
    else if (cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid 16-digit card number.";
    if (!expiry.trim()) e.expiry = "Expiry date is required.";
    else if (!/^\d{2} \/ \d{2}$/.test(expiry)) e.expiry = "Enter expiry as MM / YY.";
    if (!cvc.trim()) e.cvc = "CVC is required.";
    else if (cvc.length < 3) e.cvc = "CVC must be 3–4 digits.";
    if (!nameOnCard.trim()) e.nameOnCard = "Name on card is required.";

    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const query = new URLSearchParams({
      teacherName,
      date,
      time,
      price: String(price),
    }).toString();
    router.push(`/book/${params.slug}/confirmation?${query}`);
  }

  function clear(field: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  // Format card number with spaces every 4 digits
  function handleCardNumber(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
    clear("cardNumber");
  }

  // Format expiry as MM / YY
  function handleExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
    setExpiry(formatted);
    clear("expiry");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Mode toggle */}
      <div className="flex rounded-xl border border-black/10 overflow-hidden">
        {(["signup", "login"] as const).map((m) => {
          const label = m === "signup" ? "Create account" : "Log in";
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setErrors({}); }}
              className="flex-1 py-2.5 font-sans font-semibold text-[0.88rem] transition-all cursor-pointer"
              style={
                active
                  ? { background: "#2D4A3E", color: "#fff" }
                  : { background: "transparent", color: "#2D4A3E" }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Account fields */}
      {mode === "signup" ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                className={inputClass(!!errors.firstName)}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); clear("firstName"); }}
              />
              {errors.firstName && <FieldError msg={errors.firstName} />}
            </div>
            <div>
              <input
                className={inputClass(!!errors.lastName)}
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); clear("lastName"); }}
              />
              {errors.lastName && <FieldError msg={errors.lastName} />}
            </div>
          </div>
          <div>
            <input
              className={inputClass(!!errors.email)}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clear("email"); }}
            />
            {errors.email && <FieldError msg={errors.email} />}
          </div>
          <div>
            <input
              className={inputClass(!!errors.password)}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clear("password"); }}
            />
            {errors.password && <FieldError msg={errors.password} />}
          </div>
        </>
      ) : (
        <>
          <div>
            <input
              className={inputClass(!!errors.email)}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clear("email"); }}
            />
            {errors.email && <FieldError msg={errors.email} />}
          </div>
          <div>
            <div className="relative">
              <input
                className={inputClass(!!errors.password)}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clear("password"); }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[0.78rem] text-deep-sage hover:underline cursor-pointer bg-transparent border-none"
              >
                Forgot password?
              </button>
            </div>
            {errors.password && <FieldError msg={errors.password} />}
          </div>
        </>
      )}

      {/* Payment section */}
      <div>
        <h3 className="font-sans font-semibold text-[0.88rem] text-neutral-500 uppercase tracking-wide mb-3">
          Payment details
        </h3>
        <div className="flex flex-col gap-3">
          <div>
            <input
              className={inputClass(!!errors.cardNumber)}
              type="text"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => handleCardNumber(e.target.value)}
              inputMode="numeric"
              maxLength={19}
            />
            {errors.cardNumber && <FieldError msg={errors.cardNumber} />}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                className={inputClass(!!errors.expiry)}
                type="text"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => handleExpiry(e.target.value)}
                inputMode="numeric"
                maxLength={7}
              />
              {errors.expiry && <FieldError msg={errors.expiry} />}
            </div>
            <div>
              <input
                className={inputClass(!!errors.cvc)}
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => { setCvc(e.target.value.replace(/\D/g, "").slice(0, 4)); clear("cvc"); }}
                inputMode="numeric"
                maxLength={4}
              />
              {errors.cvc && <FieldError msg={errors.cvc} />}
            </div>
          </div>
          <div>
            <input
              className={inputClass(!!errors.nameOnCard)}
              type="text"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => { setNameOnCard(e.target.value); clear("nameOnCard"); }}
            />
            {errors.nameOnCard && <FieldError msg={errors.nameOnCard} />}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center rounded-full font-sans font-semibold text-[0.95rem] py-3.5 text-white transition-all cursor-pointer hover:opacity-90"
        style={{ background: "#2D4A3E" }}
      >
        Confirm Booking · ${price}
      </button>

      {/* Below button */}
      <div className="text-center flex flex-col gap-1">
        <p className="font-sans text-[0.78rem] text-neutral-500">
          🔒 Secure checkout · No charge until confirmed
        </p>
        <p className="font-sans text-[0.75rem] text-neutral-400">
          By booking you agree to our{" "}
          <a href="/terms" className="underline hover:text-neutral-600 transition-colors">Terms of Service</a> and{" "}
          <a href="/privacy" className="underline hover:text-neutral-600 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
}

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LegalSection, LegalP, LegalUl, LegalLi, LegalSubheading } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Refund Policy | Lifeskills",
  description: "Lifeskills refund and cancellation policy for sessions booked on the platform.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "student-cancellations", label: "Student Cancellations" },
  { id: "teacher-cancellations", label: "Teacher Cancellations" },
  { id: "no-shows", label: "No-Shows" },
  { id: "technical-issues", label: "Technical Issues" },
  { id: "processing", label: "How Refunds Are Processed" },
  { id: "disputes", label: "Disputes" },
  { id: "contact", label: "Contact" },
];

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="April 8, 2026" sections={sections}>

      <LegalSection id="overview" title="Overview">
        <LegalP>
          At Lifeskills, we want every session to be valuable. This Refund Policy explains when you are entitled to a refund, how to request one, and how we handle disputes between Students and Teachers.
        </LegalP>
        <LegalP>
          This policy applies to all sessions booked through the Lifeskills Platform. By completing a booking, you agree to the terms set out below.
        </LegalP>

        {/* Summary table */}
        <div className="rounded-xl border border-black/8 overflow-hidden mt-2">
          <table className="w-full text-left text-[0.85rem]">
            <thead>
              <tr className="bg-warm-sand">
                <th className="font-sans font-semibold text-neutral-700 px-4 py-3">Situation</th>
                <th className="font-sans font-semibold text-neutral-700 px-4 py-3">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr>
                <td className="font-sans text-neutral-700 px-4 py-3">Student cancels 24+ hours before session</td>
                <td className="font-sans text-green-700 font-semibold px-4 py-3">Full refund</td>
              </tr>
              <tr>
                <td className="font-sans text-neutral-700 px-4 py-3">Student cancels less than 24 hours before session</td>
                <td className="font-sans text-red-600 font-semibold px-4 py-3">No refund</td>
              </tr>
              <tr>
                <td className="font-sans text-neutral-700 px-4 py-3">Student does not attend (no-show)</td>
                <td className="font-sans text-red-600 font-semibold px-4 py-3">No refund</td>
              </tr>
              <tr>
                <td className="font-sans text-neutral-700 px-4 py-3">Teacher cancels for any reason</td>
                <td className="font-sans text-green-700 font-semibold px-4 py-3">Full refund or free reschedule</td>
              </tr>
              <tr>
                <td className="font-sans text-neutral-700 px-4 py-3">Teacher does not attend (no-show)</td>
                <td className="font-sans text-green-700 font-semibold px-4 py-3">Full refund or free reschedule</td>
              </tr>
              <tr>
                <td className="font-sans text-neutral-700 px-4 py-3">Verified technical failure on Lifeskills&apos; platform</td>
                <td className="font-sans text-green-700 font-semibold px-4 py-3">Full refund or free reschedule</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="student-cancellations" title="Student Cancellations">
        <LegalSubheading>More than 24 hours before the session</LegalSubheading>
        <LegalP>
          You may cancel a booked session at any time up to 24 hours before the scheduled start time and receive a full refund to your original payment method. No questions asked.
        </LegalP>
        <LegalSubheading>Less than 24 hours before the session</LegalSubheading>
        <LegalP>
          Cancellations made within 24 hours of the scheduled session start time are not eligible for a refund. This is because Teachers reserve time specifically for your session and cannot recover that time on short notice.
        </LegalP>
        <LegalP>
          In exceptional circumstances — such as a documented medical emergency — you may contact support@lifeskills.com within 48 hours of the session. Lifeskills will review such requests on a case-by-case basis at its sole discretion.
        </LegalP>
        <LegalSubheading>How to Cancel</LegalSubheading>
        <LegalP>
          To cancel a session, log in to your account and navigate to your upcoming bookings, or contact support@lifeskills.com with your booking reference. Cancellations must be submitted through the Platform or via email — verbal cancellations communicated directly to the Teacher do not constitute a valid cancellation for refund purposes.
        </LegalP>
      </LegalSection>

      <LegalSection id="teacher-cancellations" title="Teacher Cancellations">
        <LegalP>
          If a Teacher cancels a booked session for any reason, you are entitled to:
        </LegalP>
        <LegalUl>
          <LegalLi>A full refund to your original payment method, processed within 5–10 business days; or</LegalLi>
          <LegalLi>A free rescheduled session with the same Teacher at a time of your choice, subject to their availability.</LegalLi>
        </LegalUl>
        <LegalP>
          You will be notified by email of the cancellation and given the option to choose your preferred resolution. If you do not respond within 7 days, a full refund will be issued automatically.
        </LegalP>
        <LegalP>
          Teachers who repeatedly cancel sessions may be suspended or removed from the Platform.
        </LegalP>
      </LegalSection>

      <LegalSection id="no-shows" title="No-Shows">
        <LegalSubheading>Student No-Show</LegalSubheading>
        <LegalP>
          If you do not attend your scheduled session without cancelling in advance, the session is forfeited and no refund will be issued. The Teacher will be compensated for their reserved time.
        </LegalP>
        <LegalSubheading>Teacher No-Show</LegalSubheading>
        <LegalP>
          If a Teacher fails to attend a scheduled session without prior notice, you are entitled to a full refund or a free rescheduled session, as described in the Teacher Cancellations section above.
        </LegalP>
        <LegalP>
          A Teacher is considered a no-show if they have not joined or initiated the session within 10 minutes of the scheduled start time and have not notified either the Student or Lifeskills support in advance. Please report Teacher no-shows to support@lifeskills.com within 24 hours of the missed session.
        </LegalP>
      </LegalSection>

      <LegalSection id="technical-issues" title="Technical Issues">
        <LegalSubheading>Issues on Lifeskills&apos; Platform</LegalSubheading>
        <LegalP>
          If a verified technical failure attributable to Lifeskills&apos; platform prevents a session from taking place — such as a booking system error, payment processing failure, or session delivery outage — you are entitled to a full refund or a free rescheduled session.
        </LegalP>
        <LegalP>
          To report a technical issue, contact support@lifeskills.com within 24 hours of the affected session with a description of the problem and, where possible, a screenshot or error message.
        </LegalP>
        <LegalSubheading>Issues Outside Our Control</LegalSubheading>
        <LegalP>
          Lifeskills is not responsible for session disruptions caused by factors outside our platform, including internet connectivity issues on your end or the Teacher&apos;s end, third-party video call software, or device failures. We encourage both parties to test their setup in advance and to reconnect promptly if disconnected.
        </LegalP>
        <LegalP>
          If both parties agree in writing (via email to support@lifeskills.com) that a session was substantially disrupted by a technical issue beyond either party&apos;s control, Lifeskills may, at its sole discretion, offer a partial refund or a discounted rescheduled session.
        </LegalP>
      </LegalSection>

      <LegalSection id="processing" title="How Refunds Are Processed">
        <LegalUl>
          <LegalLi><strong>Timeline:</strong> approved refunds are processed within 5–10 business days of approval. The time for funds to appear in your account depends on your card issuer and may take additional time.</LegalLi>
          <LegalLi><strong>Method:</strong> refunds are always returned to the original payment method used at the time of booking. We are unable to issue refunds to a different card or via an alternative method such as bank transfer.</LegalLi>
          <LegalLi><strong>Currency:</strong> refunds are issued in the original transaction currency. If your card issuer applies currency conversion, the refunded amount in your local currency may differ slightly due to exchange rate fluctuations. Lifeskills is not responsible for such differences.</LegalLi>
          <LegalLi><strong>Fees:</strong> Lifeskills does not charge any administration fee for processing refunds.</LegalLi>
        </LegalUl>
      </LegalSection>

      <LegalSection id="disputes" title="Disputes">
        <LegalP>
          If you believe you are entitled to a refund and have not received one, or if you disagree with a refund decision, you may raise a dispute by emailing support@lifeskills.com with:
        </LegalP>
        <LegalUl>
          <LegalLi>Your full name and email address</LegalLi>
          <LegalLi>Your booking reference number</LegalLi>
          <LegalLi>A clear description of the issue and the resolution you are seeking</LegalLi>
          <LegalLi>Any supporting evidence (screenshots, correspondence, etc.)</LegalLi>
        </LegalUl>
        <LegalP>
          We will acknowledge your dispute within 2 business days and aim to resolve it within 10 business days. Lifeskills&apos; decision on disputes is final, subject to your statutory rights under applicable consumer protection law.
        </LegalP>
        <LegalP>
          Nothing in this Refund Policy limits your statutory rights as a consumer. If you are located in the European Union or United Kingdom, you may also have the right to escalate unresolved complaints to your national alternative dispute resolution body or consumer protection authority.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <LegalP>
          For all refund requests, cancellations, and related enquiries:
        </LegalP>
        <LegalUl>
          <LegalLi><strong>Email:</strong> support@lifeskills.com</LegalLi>
          <LegalLi><strong>Response time:</strong> within 2 business days</LegalLi>
          <LegalLi><strong>Contact form:</strong> lifeskills.com/contact</LegalLi>
        </LegalUl>
      </LegalSection>

    </LegalLayout>
  );
}

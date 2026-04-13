import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LegalSection, LegalP, LegalUl, LegalLi, LegalSubheading } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Terms of Service | Lifeskills",
  description: "Read the Terms of Service governing your use of the Lifeskills platform.",
};

const sections = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "platform", label: "About the Platform" },
  { id: "accounts", label: "Accounts" },
  { id: "bookings", label: "Bookings & Payments" },
  { id: "teacher-relationship", label: "Teacher Relationship" },
  { id: "health-disclaimer", label: "Health Disclaimer" },
  { id: "conduct", label: "Prohibited Conduct" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 8, 2026" sections={sections}>

      <LegalSection id="acceptance" title="Acceptance of Terms">
        <LegalP>
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Lifeskills (&quot;Lifeskills,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the Lifeskills platform, including the website at lifeskills.com, all related features, and any services provided through the Platform (collectively, the &quot;Platform&quot;).
        </LegalP>
        <LegalP>
          By accessing or using the Platform, creating an account, or booking a session, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not access or use the Platform.
        </LegalP>
        <LegalP>
          You must be at least 18 years old to use the Platform. By using the Platform, you represent and warrant that you meet this requirement.
        </LegalP>
      </LegalSection>

      <LegalSection id="platform" title="About the Platform">
        <LegalP>
          Lifeskills is an online marketplace that connects individuals (&quot;Students&quot;) with independent wellness coaches and teachers (&quot;Teachers&quot;) for live, one-on-one sessions in disciplines including breathwork, meditation, yoga, somatic therapy, and spiritual guidance.
        </LegalP>
        <LegalP>
          Lifeskills provides the technology infrastructure, booking system, and payment processing that enables these connections. Lifeskills does not itself provide wellness coaching, therapy, medical treatment, or any form of health services. All sessions are conducted by independent Teachers, not by Lifeskills employees.
        </LegalP>
      </LegalSection>

      <LegalSection id="accounts" title="Accounts">
        <LegalSubheading>Registration</LegalSubheading>
        <LegalP>
          To book a session or apply as a Teacher, you must create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.
        </LegalP>
        <LegalSubheading>Account Security</LegalSubheading>
        <LegalP>
          You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately at support@lifeskills.com if you suspect unauthorised access to your account. Lifeskills will not be liable for any loss resulting from your failure to keep your credentials secure.
        </LegalP>
        <LegalSubheading>One Account Per Person</LegalSubheading>
        <LegalP>
          Each individual may maintain only one active Student account. Teachers may hold both a Student and Teacher account. Creating duplicate or fraudulent accounts is prohibited.
        </LegalP>
      </LegalSection>

      <LegalSection id="bookings" title="Bookings & Payments">
        <LegalSubheading>Booking Process</LegalSubheading>
        <LegalP>
          Sessions are booked through the Platform by selecting a Teacher, choosing an available date and time, and completing payment. A booking is confirmed upon receipt of your payment and confirmation email.
        </LegalP>
        <LegalSubheading>Pricing</LegalSubheading>
        <LegalP>
          Session prices are set by individual Teachers and displayed on their profiles. All prices are in USD unless otherwise stated. Lifeskills reserves the right to charge a platform fee on transactions, which will be disclosed clearly at checkout before payment is taken.
        </LegalP>
        <LegalSubheading>Payment</LegalSubheading>
        <LegalP>
          Payments are processed securely through a PCI-compliant third-party payment processor. By providing payment information, you authorise us to charge the stated amount for your booking. Lifeskills does not store full payment card details on its servers.
        </LegalP>
        <LegalSubheading>Cancellations & Refunds</LegalSubheading>
        <LegalP>
          Please refer to our Refund Policy at lifeskills.com/refund-policy for full details of cancellation and refund rights. In summary: Students may cancel and receive a full refund up to 24 hours before their scheduled session. No refund is available for cancellations made less than 24 hours before the session start time.
        </LegalP>
        <LegalSubheading>No-Shows</LegalSubheading>
        <LegalP>
          If a Student fails to attend a session without cancelling, the session is forfeited and no refund will be issued. If a Teacher fails to attend without prior notice, the Student is entitled to a full refund or a free rescheduled session at their choice.
        </LegalP>
      </LegalSection>

      <LegalSection id="teacher-relationship" title="Teacher Relationship">
        <LegalSubheading>Independent Contractors</LegalSubheading>
        <LegalP>
          Teachers on the Platform are independent contractors, not employees, agents, or partners of Lifeskills. Lifeskills does not supervise, direct, or control the content or delivery of sessions. Teachers are solely responsible for the services they provide and their compliance with all applicable laws and professional standards.
        </LegalP>
        <LegalSubheading>Teacher Screening</LegalSubheading>
        <LegalP>
          Lifeskills reviews Teacher applications and may conduct background checks or credential verification. However, Lifeskills does not guarantee the accuracy of any Teacher&apos;s qualifications, certifications, or representations. Students are encouraged to conduct their own due diligence and to raise any concerns to support@lifeskills.com.
        </LegalP>
        <LegalSubheading>Teacher Conduct</LegalSubheading>
        <LegalP>
          Teachers agree to maintain professional standards, treat Students with respect, and not engage in any conduct that is abusive, discriminatory, or otherwise harmful. Violations may result in immediate removal from the Platform.
        </LegalP>
      </LegalSection>

      <LegalSection id="health-disclaimer" title="Health Disclaimer">
        <LegalP>
          The services available through Lifeskills are wellness and coaching in nature. They are not medical treatment, psychotherapy, counselling, or any form of regulated health service. Nothing communicated through the Platform — by Lifeskills, a Teacher, or any other user — constitutes medical advice, diagnosis, or treatment.
        </LegalP>
        <LegalP>
          If you have or suspect you have a physical or mental health condition, please consult a qualified medical or mental health professional before beginning any wellness practice. Lifeskills does not recommend discontinuing any prescribed treatment in favour of sessions on the Platform.
        </LegalP>
        <LegalP>
          By participating in sessions, you acknowledge that wellness practices carry inherent risks — including physical discomfort, emotional activation, and psychological material arising during practice — and that you assume responsibility for your own participation and wellbeing.
        </LegalP>
      </LegalSection>

      <LegalSection id="conduct" title="Prohibited Conduct">
        <LegalP>You agree not to use the Platform to:</LegalP>
        <LegalUl>
          <LegalLi>Violate any applicable law, regulation, or third-party rights.</LegalLi>
          <LegalLi>Harass, threaten, abuse, or harm any Teacher, Student, or Lifeskills employee.</LegalLi>
          <LegalLi>Impersonate any person or entity, or misrepresent your qualifications or identity.</LegalLi>
          <LegalLi>Solicit or attempt to arrange sessions outside the Platform to circumvent our payment system.</LegalLi>
          <LegalLi>Record, copy, or distribute session content without the explicit written consent of all parties.</LegalLi>
          <LegalLi>Upload or transmit any content that is defamatory, obscene, hateful, or otherwise objectionable.</LegalLi>
          <LegalLi>Interfere with the Platform&apos;s infrastructure, security, or operation, including via hacking, scraping, or introducing malicious code.</LegalLi>
          <LegalLi>Use the Platform for any commercial purpose not expressly authorised by Lifeskills.</LegalLi>
          <LegalLi>Create fake reviews, ratings, or testimonials.</LegalLi>
        </LegalUl>
        <LegalP>
          Violation of these rules may result in immediate account suspension or termination, and may be reported to relevant authorities.
        </LegalP>
      </LegalSection>

      <LegalSection id="intellectual-property" title="Intellectual Property">
        <LegalSubheading>Lifeskills Content</LegalSubheading>
        <LegalP>
          All content on the Platform that is created by Lifeskills — including the website design, logo, written content, graphics, and software — is owned by or licensed to Lifeskills and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
        </LegalP>
        <LegalSubheading>User Content</LegalSubheading>
        <LegalP>
          You retain ownership of any content you submit to the Platform (such as profile information or reviews). By submitting content, you grant Lifeskills a non-exclusive, royalty-free, worldwide licence to use, display, and distribute that content in connection with the operation of the Platform.
        </LegalP>
        <LegalSubheading>Session Content</LegalSubheading>
        <LegalP>
          Teachers retain ownership of their session materials and methodologies. Students may not record, reproduce, or distribute session content without the Teacher&apos;s explicit written consent.
        </LegalP>
      </LegalSection>

      <LegalSection id="liability" title="Limitation of Liability">
        <LegalP>
          To the fullest extent permitted by applicable law, Lifeskills and its officers, directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, goodwill, or other intangible losses — arising from your use of or inability to use the Platform or any session booked through it.
        </LegalP>
        <LegalP>
          Lifeskills&apos; total liability to you for any claim arising from your use of the Platform shall not exceed the greater of (a) the total amount you paid to Lifeskills in the 12 months preceding the claim, or (b) $100 USD.
        </LegalP>
        <LegalP>
          The Platform and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including fitness for a particular purpose, merchantability, or non-infringement.
        </LegalP>
      </LegalSection>

      <LegalSection id="indemnification" title="Indemnification">
        <LegalP>
          You agree to indemnify, defend, and hold harmless Lifeskills and its officers, directors, employees, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any third-party right; or (d) any content you submit to the Platform.
        </LegalP>
      </LegalSection>

      <LegalSection id="termination" title="Termination">
        <LegalP>
          You may delete your account at any time by contacting support@lifeskills.com. Upon deletion, your right to use the Platform ceases immediately. Provisions that by their nature should survive termination will do so, including ownership, disclaimers, limitations of liability, and indemnification obligations.
        </LegalP>
        <LegalP>
          Lifeskills may suspend or terminate your account at any time, with or without notice, if we believe you have violated these Terms, pose a risk to other users, or for any other reason at our sole discretion. In the event of termination for cause, no refund will be issued for any unused session credits.
        </LegalP>
      </LegalSection>

      <LegalSection id="governing-law" title="Governing Law & Disputes">
        <LegalP>
          These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
        </LegalP>
        <LegalP>
          Any dispute arising from these Terms or your use of the Platform shall first be submitted to informal resolution by contacting support@lifeskills.com. If the dispute is not resolved within 30 days, it shall be resolved by binding individual arbitration under the rules of the American Arbitration Association. You waive any right to participate in a class action lawsuit or class-wide arbitration.
        </LegalP>
        <LegalP>
          Nothing in this section prevents either party from seeking injunctive or other equitable relief in a court of competent jurisdiction for matters involving intellectual property or confidentiality.
        </LegalP>
      </LegalSection>

      <LegalSection id="changes" title="Changes to Terms">
        <LegalP>
          We may update these Terms from time to time. When we make material changes, we will notify you by email or prominent notice on the Platform at least 14 days before the new Terms take effect. Your continued use of the Platform after that date constitutes acceptance of the revised Terms.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <LegalP>If you have questions about these Terms, please contact us:</LegalP>
        <LegalUl>
          <LegalLi><strong>Email:</strong> legal@lifeskills.com</LegalLi>
          <LegalLi><strong>Contact form:</strong> lifeskills.com/contact</LegalLi>
        </LegalUl>
      </LegalSection>

    </LegalLayout>
  );
}

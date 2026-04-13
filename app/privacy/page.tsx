import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LegalSection, LegalP, LegalUl, LegalLi, LegalSubheading } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy | Lifeskills",
  description: "Learn how Lifeskills collects, uses, and protects your personal information.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "sharing", label: "Sharing Your Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "security", label: "Security" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 8, 2026" sections={sections}>

      <LegalSection id="overview" title="Overview">
        <LegalP>
          Lifeskills (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Lifeskills platform, accessible at lifeskills.com (the &quot;Platform&quot;). This Privacy Policy explains what personal information we collect, why we collect it, how we use and protect it, and the rights you have over your data.
        </LegalP>
        <LegalP>
          By creating an account, booking a session, or otherwise using the Platform, you agree to the practices described in this policy. If you do not agree, please do not use the Platform.
        </LegalP>
      </LegalSection>

      <LegalSection id="information-we-collect" title="Information We Collect">
        <LegalSubheading>Information You Provide Directly</LegalSubheading>
        <LegalUl>
          <LegalLi><strong>Account information:</strong> name, email address, and password when you create an account.</LegalLi>
          <LegalLi><strong>Profile information:</strong> for teachers, this includes biography, disciplines, experience, languages, and profile photo.</LegalLi>
          <LegalLi><strong>Booking information:</strong> session date, time, and teacher selected.</LegalLi>
          <LegalLi><strong>Payment information:</strong> card number, expiry date, and CVC. Payment data is transmitted directly to our payment processor and is not stored on our servers.</LegalLi>
          <LegalLi><strong>Communications:</strong> messages sent through the Platform, contact form submissions, and support requests.</LegalLi>
          <LegalLi><strong>Teacher applications:</strong> information submitted via the Become a Teacher form, including qualifications, experience, and social media handles.</LegalLi>
        </LegalUl>

        <LegalSubheading>Information We Collect Automatically</LegalSubheading>
        <LegalUl>
          <LegalLi><strong>Usage data:</strong> pages visited, features used, time spent on the Platform, and actions taken.</LegalLi>
          <LegalLi><strong>Device information:</strong> browser type, operating system, IP address, and device identifiers.</LegalLi>
          <LegalLi><strong>Cookies and similar technologies:</strong> see the Cookies section below.</LegalLi>
        </LegalUl>
      </LegalSection>

      <LegalSection id="how-we-use" title="How We Use Your Information">
        <LegalP>We use the information we collect for the following purposes:</LegalP>
        <LegalUl>
          <LegalLi><strong>To provide the Platform:</strong> processing bookings, facilitating sessions, and managing your account.</LegalLi>
          <LegalLi><strong>To process payments:</strong> transmitting payment details securely to our payment processor.</LegalLi>
          <LegalLi><strong>To communicate with you:</strong> sending booking confirmations, reminders, support responses, and service updates.</LegalLi>
          <LegalLi><strong>To improve the Platform:</strong> analysing usage patterns to improve features, fix bugs, and develop new services.</LegalLi>
          <LegalLi><strong>To ensure safety:</strong> detecting, investigating, and preventing fraudulent or prohibited activity.</LegalLi>
          <LegalLi><strong>To comply with legal obligations:</strong> meeting applicable laws, regulations, and lawful requests from authorities.</LegalLi>
          <LegalLi><strong>Marketing:</strong> with your consent, sending newsletters and promotional content. You may opt out at any time via the unsubscribe link in any email.</LegalLi>
        </LegalUl>
        <LegalP>
          We do not sell your personal information to third parties. We do not use your data for automated decision-making that produces legal or similarly significant effects without your awareness.
        </LegalP>
      </LegalSection>

      <LegalSection id="sharing" title="Sharing Your Information">
        <LegalP>We share your information only in the following circumstances:</LegalP>
        <LegalUl>
          <LegalLi><strong>With teachers you book:</strong> when you book a session, the teacher receives your first name and booking details necessary to conduct the session.</LegalLi>
          <LegalLi><strong>With service providers:</strong> we engage trusted third-party companies to help operate the Platform, including payment processing, cloud hosting, email delivery, and analytics. These providers are contractually bound to use your data only as directed by us.</LegalLi>
          <LegalLi><strong>For legal compliance:</strong> we may disclose information when required by law, court order, or governmental authority, or when necessary to protect our rights, users, or the public.</LegalLi>
          <LegalLi><strong>Business transfers:</strong> in the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.</LegalLi>
          <LegalLi><strong>With your consent:</strong> in any other circumstances, only with your explicit agreement.</LegalLi>
        </LegalUl>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies & Tracking">
        <LegalP>
          We use cookies and similar tracking technologies to operate and improve the Platform. Cookies are small text files stored on your device that help us recognise you across sessions and understand how you use the Platform.
        </LegalP>
        <LegalSubheading>Types of Cookies We Use</LegalSubheading>
        <LegalUl>
          <LegalLi><strong>Essential cookies:</strong> required for the Platform to function. These cannot be disabled without impairing core features such as login and booking.</LegalLi>
          <LegalLi><strong>Analytics cookies:</strong> help us understand how users interact with the Platform so we can improve it. Data is aggregated and anonymised where possible.</LegalLi>
          <LegalLi><strong>Preference cookies:</strong> remember your settings and preferences to personalise your experience.</LegalLi>
        </LegalUl>
        <LegalP>
          You can control cookies through your browser settings. Note that disabling certain cookies may affect Platform functionality. We do not currently respond to &quot;Do Not Track&quot; browser signals, though we will update this policy if that changes.
        </LegalP>
      </LegalSection>

      <LegalSection id="data-retention" title="Data Retention">
        <LegalP>
          We retain your personal information for as long as your account is active or as needed to provide the Platform. We also retain data as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
        </LegalP>
        <LegalP>
          If you request account deletion, we will delete or anonymise your personal information within 30 days, except where retention is required by law (for example, financial records, which we retain for up to 7 years).
        </LegalP>
      </LegalSection>

      <LegalSection id="your-rights" title="Your Rights">
        <LegalP>
          Depending on your location, you may have the following rights regarding your personal data:
        </LegalP>
        <LegalUl>
          <LegalLi><strong>Access:</strong> the right to request a copy of the personal information we hold about you.</LegalLi>
          <LegalLi><strong>Correction:</strong> the right to have inaccurate or incomplete information corrected.</LegalLi>
          <LegalLi><strong>Deletion:</strong> the right to request deletion of your personal data (&quot;right to be forgotten&quot;), subject to legal retention requirements.</LegalLi>
          <LegalLi><strong>Portability:</strong> the right to receive your data in a structured, machine-readable format.</LegalLi>
          <LegalLi><strong>Objection:</strong> the right to object to processing based on our legitimate interests.</LegalLi>
          <LegalLi><strong>Withdrawal of consent:</strong> where processing is based on consent, the right to withdraw it at any time without affecting prior processing.</LegalLi>
          <LegalLi><strong>California residents (CCPA):</strong> the right to know what personal information is collected, to opt out of the sale of personal information (we do not sell personal information), and to non-discrimination for exercising privacy rights.</LegalLi>
        </LegalUl>
        <LegalP>
          To exercise any of these rights, contact us at privacy@lifeskills.com. We will respond within 30 days.
        </LegalP>
      </LegalSection>

      <LegalSection id="children" title="Children's Privacy">
        <LegalP>
          The Platform is intended for users aged 18 and over. We do not knowingly collect personal information from anyone under 18. If we become aware that a user under 18 has provided personal information, we will delete it promptly. If you believe a minor has created an account, please contact us at privacy@lifeskills.com.
        </LegalP>
      </LegalSection>

      <LegalSection id="security" title="Security">
        <LegalP>
          We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These include encrypted data transmission (TLS/HTTPS), access controls, and secure payment processing via PCI-compliant third-party processors.
        </LegalP>
        <LegalP>
          No method of transmission over the internet or electronic storage is 100% secure. While we take your security seriously and apply reasonable safeguards, we cannot guarantee absolute security. In the event of a data breach that affects your rights, we will notify you as required by applicable law.
        </LegalP>
      </LegalSection>

      <LegalSection id="changes" title="Changes to This Policy">
        <LegalP>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify you by email or by posting a prominent notice on the Platform at least 14 days before the changes take effect. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.
        </LegalP>
        <LegalP>
          Continued use of the Platform after the effective date of any changes constitutes your acceptance of the updated policy.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="Contact Us">
        <LegalP>
          If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
        </LegalP>
        <LegalUl>
          <LegalLi><strong>Email:</strong> privacy@lifeskills.com</LegalLi>
          <LegalLi><strong>Contact form:</strong> lifeskills.com/contact</LegalLi>
        </LegalUl>
      </LegalSection>

    </LegalLayout>
  );
}

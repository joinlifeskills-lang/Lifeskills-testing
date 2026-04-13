import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/ui/Button";

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-warm-sand min-h-[80vh] flex items-center">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
            <FadeIn>
              {/* Checkmark illustration */}
              <div className="mx-auto mb-8 w-24 h-24 md:w-28 md:h-28 rounded-full bg-deep-sage flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="md:w-14 md:h-14"
                >
                  <path
                    d="M12 25L20 33L36 15"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 className="font-display font-normal text-deep-sage text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] mb-6 text-balance">
                Thank you for applying
              </h1>
            </FadeIn>

            <FadeIn delay={140}>
              <p className="font-sans text-[1rem] md:text-[1.15rem] text-neutral-700 leading-[1.7] max-w-[520px] mx-auto mb-10">
                We&apos;ve received your application. You&apos;ll hear back from
                us within 24 hours. Here&apos;s what&apos;s next.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              {/* What happens next */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 max-w-2xl mx-auto">
                <div className="bg-white rounded-[16px] p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-deep-sage/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                        stroke="#2D4A3E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="font-sans font-semibold text-deep-sage text-[0.9rem] mb-1">
                    Check your email
                  </p>
                  <p className="font-sans text-[0.82rem] text-neutral-500 leading-[1.5]">
                    We&apos;ll send a confirmation shortly.
                  </p>
                </div>

                <div className="bg-white rounded-[16px] p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-deep-sage/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 10L19.553 7.724C19.7054 7.64784 19.8748 7.61188 20.045 7.61955C20.2152 7.62721 20.3806 7.67824 20.5256 7.76781C20.6706 7.85738 20.7902 7.98264 20.8731 8.13176C20.956 8.28087 20.9994 8.44895 21 8.62V15.38C20.9994 15.5511 20.956 15.7191 20.8731 15.8682C20.7902 16.0174 20.6706 16.1426 20.5256 16.2322C20.3806 16.3218 20.2152 16.3728 20.045 16.3805C19.8748 16.3881 19.7054 16.3522 19.553 16.276L15 14M5 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V8C15 7.46957 14.7893 6.96086 14.4142 6.58579C14.0391 6.21071 13.5304 6 13 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18Z"
                        stroke="#2D4A3E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="font-sans font-semibold text-deep-sage text-[0.9rem] mb-1">
                    Quick video call
                  </p>
                  <p className="font-sans text-[0.82rem] text-neutral-500 leading-[1.5]">
                    We&apos;ll schedule a call to get to know you.
                  </p>
                </div>

                <div className="bg-white rounded-[16px] p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-deep-sage/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#2D4A3E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="font-sans font-semibold text-deep-sage text-[0.9rem] mb-1">
                    Start teaching
                  </p>
                  <p className="font-sans text-[0.82rem] text-neutral-500 leading-[1.5]">
                    Get set up and welcome your first student.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={260}>
              <Button href="/" variant="nav">
                Back to Home
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

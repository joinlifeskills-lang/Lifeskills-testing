export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10 scroll-mt-28">
      <h2 className="font-display font-normal text-deep-sage text-[1.3rem] mb-4 pb-2 border-b border-black/8">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.92rem] text-neutral-700 leading-[1.8]">
      {children}
    </p>
  );
}

export function LegalUl({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-deep-sage/40">
      {children}
    </ul>
  );
}

export function LegalLi({ children }: { children: React.ReactNode }) {
  return (
    <li className="font-sans text-[0.92rem] text-neutral-700 leading-[1.8]">
      {children}
    </li>
  );
}

export function LegalSubheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans font-semibold text-[0.95rem] text-neutral-900 mt-2">
      {children}
    </h3>
  );
}

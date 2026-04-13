import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "white" | "nav";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

type Props = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-semibold text-[0.88rem] tracking-[0.01em] px-[26px] py-[10px] transition-all duration-200 ease-out no-underline cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-energy-gradient text-white border-0 hover:bg-energy-gradient-hover hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(232,96,58,0.35)]",
  secondary:
    "bg-transparent text-deep-sage border-[1.5px] border-deep-sage hover:bg-deep-sage hover:text-white",
  white:
    "bg-white text-deep-sage border-0 hover:bg-neutral-100",
  nav:
    "bg-deep-sage text-white border-0 hover:bg-deep-sage-hover",
};

export default function Button(props: Props) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}

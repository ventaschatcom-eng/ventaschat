import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  variant?: "default" | "love";
};

const LOGOS = {
  default: {
    src: "/brand/ventaschat-logo-chatmark.png",
    alt: "VentasChat",
    href: "/",
    width: 997,
    height: 166,
  },
  love: {
    src: "/brand/lovechat-logo.png",
    alt: "LoveChat",
    href: "/lovechat",
    width: 846,
    height: 182,
  },
} as const;

export function Logo({ compact = false, variant = "default" }: LogoProps) {
  const logo = LOGOS[variant];

  return (
    <Link href={logo.href} className={compact ? "logo logo-compact" : "logo"}>
      <span className={compact ? "logo-image-wrap logo-image-wrap-compact" : "logo-image-wrap"}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={compact ? "logo-image logo-image-compact" : "logo-image"}
          priority
        />
      </span>
    </Link>
  );
}

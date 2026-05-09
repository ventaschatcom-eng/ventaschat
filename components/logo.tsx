import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  const wrapClass = compact ? "logo logo-compact" : "logo";
  const imgWrapClass = compact ? "logo-image-wrap logo-image-wrap-compact" : "logo-image-wrap";
  const imgClass = compact ? "logo-image logo-image-compact" : "logo-image";

  return (
    <Link href="/" className={wrapClass}>
      <span className={imgWrapClass}>
        <Image
          src="/brand/logo-black.png"
          alt="VentasChat"
          width={437}
          height={115}
          className={`${imgClass} logo-light`}
          priority
        />
        <Image
          src="/brand/logo-white.png"
          alt="VentasChat"
          width={437}
          height={115}
          className={`${imgClass} logo-dark`}
          priority
        />
      </span>
    </Link>
  );
}

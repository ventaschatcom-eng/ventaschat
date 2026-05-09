import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link href="/" className={compact ? "logo logo-compact" : "logo"}>
      <span className={compact ? "logo-image-wrap logo-image-wrap-compact" : "logo-image-wrap"}>
        <Image
          src="/brand/ventaschat-logo-chatmark.png"
          alt="VentasChat"
          width={997}
          height={166}
          className={compact ? "logo-image logo-image-compact" : "logo-image"}
          priority
        />
      </span>
    </Link>
  );
}

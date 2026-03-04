import Image from "next/image";

export default function Logo({ size = 36, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
    />
  );
}
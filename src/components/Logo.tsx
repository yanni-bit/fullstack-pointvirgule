import Image from "next/image";

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Fullstack Point-Virgule"
      width={size}
      height={size}
    />
  );
}

import Image from "next/image";
import { siteConfig } from "@/config";

export default function Logo() {
  const { logo, name } = siteConfig.brand;
  return (
    <div className="nav-logo-box">
      {logo ? <Image src={logo} alt={`${name} logo`} width={54} height={54} priority /> : <span aria-hidden>🌊</span>}
    </div>
  );
}

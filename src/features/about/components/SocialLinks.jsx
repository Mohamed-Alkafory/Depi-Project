import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./Icons";

function SocialButton({ href, ariaLabel, children, isMailto = false }) {
  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      aria-label={ariaLabel}
      className="
        flex items-center justify-center
        w-11 h-11 md:w-12 md:h-12
        rounded-full
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        text-white
        transition-all duration-300
        hover:bg-teal-500
        hover:border-teal-400
        hover:scale-110
        hover:shadow-[0_0_30px_rgba(20,184,166,.45)]
        active:scale-95
      "
    >
      {children}
    </a>
  );
}

export function SocialLinks({ member, isMobile }) {
  const iconSize = isMobile ? 17 : 20;

  return (
    <div
      className="
        absolute
        right-5
        bottom-8
        md:right-10
        md:bottom-12
        flex
        flex-col
        gap-3
        z-40
      "
    >
      <SocialButton
        href={member.linkedin}
        ariaLabel={`${member.name} LinkedIn`}
      >
        <LinkedinIcon size={iconSize} color="currentColor" />
      </SocialButton>

      <SocialButton
        href={`mailto:${member.email}`}
        ariaLabel={`${member.name} Email`}
        isMailto
      >
        <Mail size={iconSize} strokeWidth={2.2} />
      </SocialButton>

      <SocialButton href={member.github} ariaLabel={`${member.name} GitHub`}>
        <GithubIcon size={iconSize} color="currentColor" />
      </SocialButton>
    </div>
  );
}

'use client';
import { useApp } from '@/components/providers/AppProvider';
import { siteConfig } from '@/config/site.config';

export function Footer() {
  const { FOOTER_LINKS, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN, SOCIAL_X } = siteConfig;
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <footer className={`border-t pt-12 sm:pt-16 pb-8 px-5 sm:px-8 md:px-12 transition-colors duration-400 ${
      isLight ? 'bg-white text-neutral-900 border-neutral-200' : 'bg-black text-white border-white/10'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16 font-mono">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-base tracking-[0.3em] mb-4 sm:mb-6 font-bold">KYA PEHNU?</p>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-neutral-500' : 'text-white/40'}`}>
              New outfit.<br />Under 60 minutes in Nagpur.
            </p>
          </div>
          <div>
            <p className={`text-[10px] sm:text-xs tracking-widest mb-4 sm:mb-5 ${isLight ? 'text-neutral-500 font-semibold' : 'text-white/40'}`}>
              EXPLORE
            </p>
            {Object.entries(FOOTER_LINKS.explore).map(([k, v]) => (
              <a
                key={k}
                href={v}
                className={`block text-xs sm:text-sm mb-2.5 sm:mb-3 capitalize transition-colors ${
                  isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/60 hover:text-white'
                }`}
              >
                {k.replace(/([A-Z])/g, ' $1')}
              </a>
            ))}
          </div>
          <div>
            <p className={`text-[10px] sm:text-xs tracking-widest mb-4 sm:mb-5 ${isLight ? 'text-neutral-500 font-semibold' : 'text-white/40'}`}>
              COMPANY
            </p>
            {Object.entries(FOOTER_LINKS.company).map(([k, v]) => (
              <a
                key={k}
                href={v}
                className={`block text-xs sm:text-sm mb-2.5 sm:mb-3 capitalize transition-colors ${
                  isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/60 hover:text-white'
                }`}
              >
                {k}
              </a>
            ))}
          </div>
          <div>
            <p className={`text-[10px] sm:text-xs tracking-widest mb-4 sm:mb-5 ${isLight ? 'text-neutral-500 font-semibold' : 'text-white/40'}`}>
              HELP
            </p>
            {Object.entries(FOOTER_LINKS.help).map(([k, v]) => (
              <a
                key={k}
                href={v}
                className={`block text-xs sm:text-sm mb-2.5 sm:mb-3 capitalize transition-colors ${
                  isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/60 hover:text-white'
                }`}
              >
                {k}
              </a>
            ))}
          </div>
        </div>

        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border-t pt-6 sm:pt-8 ${
          isLight ? 'border-neutral-200' : 'border-white/10'
        }`}>
          <p className={`text-[11px] sm:text-xs text-center md:text-left ${isLight ? 'text-neutral-500' : 'text-white/40'}`}>
            © 2026 Kya Pehnu? All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={SOCIAL_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] sm:text-xs tracking-widest transition-colors font-mono min-h-[44px] flex items-center ${
                isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/50 hover:text-white'
              }`}
              aria-label="Instagram"
            >
              INSTAGRAM
            </a>
            <a
              href={SOCIAL_X}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] sm:text-xs tracking-widest transition-colors font-mono min-h-[44px] flex items-center ${
                isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/50 hover:text-white'
              }`}
              aria-label="X (Twitter)"
            >
              X
            </a>
            <a
              href={SOCIAL_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] sm:text-xs tracking-widest transition-colors font-mono min-h-[44px] flex items-center ${
                isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/50 hover:text-white'
              }`}
              aria-label="LinkedIn"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { siteConfig } from '@/config/site.config';

export function Footer() {
  const { FOOTER_LINKS, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN, SOCIAL_X } = siteConfig;

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <p className="font-mono text-base tracking-[0.3em] mb-6">KYA PEHNU?</p>
            <p className="text-white/40 text-sm leading-relaxed">New outfit.<br />Under 60 minutes.</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/40 mb-5">EXPLORE</p>
            {Object.entries(FOOTER_LINKS.explore).map(([k, v]) => (
              <a key={k} href={v} className="block text-sm text-white/60 hover:text-white mb-3 capitalize transition-colors">
                {k.replace(/([A-Z])/g, ' $1')}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/40 mb-5">COMPANY</p>
            {Object.entries(FOOTER_LINKS.company).map(([k, v]) => (
              <a key={k} href={v} className="block text-sm text-white/60 hover:text-white mb-3 capitalize transition-colors">
                {k}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/40 mb-5">HELP</p>
            {Object.entries(FOOTER_LINKS.help).map(([k, v]) => (
              <a key={k} href={v} className="block text-sm text-white/60 hover:text-white mb-3 capitalize transition-colors">
                {k}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs">© 2026 Kya Pehnu? All rights reserved.</p>
          <div className="flex gap-6">
            <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs tracking-widest transition-colors" aria-label="Instagram">INSTAGRAM</a>
            <a href={SOCIAL_X} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs tracking-widest transition-colors" aria-label="X (Twitter)">X</a>
            <a href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs tracking-widest transition-colors" aria-label="LinkedIn">LINKEDIN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

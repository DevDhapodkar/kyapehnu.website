'use client';
import { siteConfig } from '@/config/site.config';

const PARTNER_NAMES = ['ZARA', 'H&M', 'UNIQLO', 'MANGO', 'MARKS & SPENCER', 'LEVI\'S'];

export function BrandPartners() {
  return (
    <section className="bg-neutral-950 py-16 px-8 md:px-16 border-t border-white/5">
      <p className="text-white/20 text-xs tracking-[0.5em] font-mono text-center mb-10">BRAND PARTNERS</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10">
        {PARTNER_NAMES.map((name) => (
          <span key={name} className="text-white/20 text-sm tracking-[0.3em] font-mono hover:text-white/40 transition-colors">
            {name}
          </span>
        ))}
      </div>
      <div className="text-center">
        <a
          href={siteConfig.PARTNER_CONTACT_URL}
          className="text-white/40 text-xs tracking-widest font-mono hover:text-white transition-colors"
        >
          BECOME A PARTNER →
        </a>
      </div>
    </section>
  );
}

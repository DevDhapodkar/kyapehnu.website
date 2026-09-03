'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useApp();

  const isLight = theme === 'light';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 transition-colors duration-300"
        style={{
          background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(5,5,8,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <a
          href="/"
          className={`font-mono text-sm sm:text-base tracking-[0.2em] transition-colors py-2 ${
            isLight ? 'text-neutral-900' : 'text-white'
          }`}
        >
          KYA PEHNU?
        </a>

        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-mono">
          <a
            href="#how-it-works"
            className={`transition-colors ${
              isLight ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/70 hover:text-white'
            }`}
          >
            HOW IT WORKS
          </a>
          <a
            href="#shop"
            className={`transition-colors ${
              isLight ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/70 hover:text-white'
            }`}
          >
            SHOP
          </a>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Theme Toggle Button optimized for mobile touch */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[11px] tracking-wider border transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
              isLight
                ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
            aria-label="Toggle light and dark theme"
          >
            <span className="text-xs">{isLight ? '🌙' : '☀️'}</span>
            <span className="hidden sm:inline">{isLight ? 'DARK' : 'LIGHT'}</span>
          </button>

          <MagneticButton
            className={`hidden md:block text-xs tracking-widest px-5 py-2 font-mono transition-colors ${
              isLight
                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
            onClick={() => {}}
          >
            GET THE APP
          </MagneticButton>

          {/* Mobile Menu Button with touch target */}
          <button
            className={`md:hidden text-xs tracking-widest font-mono px-2.5 py-2 min-h-[44px] flex items-center justify-center ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 p-6 ${
              isLight ? 'bg-white text-neutral-900' : 'bg-black text-white'
            }`}
          >
            <button
              className={`absolute top-5 right-6 text-xs tracking-widest font-mono p-3 min-h-[44px] flex items-center justify-center ${
                isLight ? 'text-neutral-500' : 'text-white/60'
              }`}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              CLOSE ✕
            </button>
            {[
              { label: 'HOW IT WORKS', href: '#how-it-works' },
              { label: 'SHOP', href: '#shop' },
              { label: 'OUTFIT CURATOR', href: '#stylist' },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-2xl sm:text-3xl tracking-[0.25em] font-thin hover:opacity-70 transition-opacity py-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

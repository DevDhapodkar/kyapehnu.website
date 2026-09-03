'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <a href="/" className="text-white font-mono text-sm tracking-[0.2em]">KYA PEHNU?</a>
        <div className="hidden md:flex gap-8 text-white/70 text-xs tracking-widest">
          <a href="#how-it-works" className="hover:text-white transition-colors">HOW IT WORKS</a>
          <a href="#shop" className="hover:text-white transition-colors">SHOP</a>
        </div>
        <MagneticButton
          className="hidden md:block bg-white text-black text-xs tracking-widest px-5 py-2 font-mono hover:bg-neutral-200 transition-colors"
          onClick={() => {}}
        >
          GET THE APP
        </MagneticButton>
        <button
          className="md:hidden text-white text-xs tracking-widest"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          MENU
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-6 text-white/50 text-xs tracking-widest"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              CLOSE
            </button>
            {['HOW IT WORKS', 'SHOP', 'GET THE APP'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-white text-2xl tracking-[0.3em] font-thin"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

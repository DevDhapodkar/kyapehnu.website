'use client';
import { useEffect, useState } from 'react';

export function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
      setSupported(!!ctx);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

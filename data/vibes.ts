import type { VibeCategory } from '@/types';

export const vibes: { label: VibeCategory; palette: { bg: string; accent: string } }[] = [
  { label: 'DATE NIGHT', palette: { bg: '#1a0a0a', accent: '#c9a96e' } },
  { label: 'COLLEGE', palette: { bg: '#0a0f1a', accent: '#7eb8f7' } },
  { label: 'PARTY', palette: { bg: '#1a0a1a', accent: '#c96ec9' } },
  { label: 'OFFICE', palette: { bg: '#0a0a0f', accent: '#9090d0' } },
  { label: 'STREET', palette: { bg: '#0f0f0a', accent: '#d0c060' } },
  { label: 'CASUAL', palette: { bg: '#0a1a0f', accent: '#6ec9a0' } },
  { label: 'WEEKEND', palette: { bg: '#1a1008', accent: '#e0a060' } },
];

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from '@/components/providers/AppProvider';
import { ScrollProvider } from '@/components/providers/ScrollProvider';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Kya Pehnu? — New Outfit Under 60 Minutes',
  description: 'Discover your next look and get your new outfit delivered in under 60 minutes with Kya Pehnu?',
  openGraph: {
    title: 'Kya Pehnu? — New Outfit Under 60 Minutes',
    description: 'Discover your next look and get your new outfit delivered in under 60 minutes.',
    url: 'https://kyapehnu.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </AppProvider>
      </body>
    </html>
  );
}

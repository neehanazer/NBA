import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers/Providers';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'PrintQ — College Print Shop Automation',
  description: 'Automated FCFS Print Queue with per-page pricing, duplex detection, and live tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}

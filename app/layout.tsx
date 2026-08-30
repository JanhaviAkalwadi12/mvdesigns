import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MV Designers | Structural Steel Detailing & 3D Modeling',
  description: 'MV Designers provides structural steel detailing, 3D modeling, shop drawings, erection drawings, CNC/DSTV files, material documentation and related detailing solutions for fabricators, engineers and construction professionals.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><body>{children}</body></html>; }

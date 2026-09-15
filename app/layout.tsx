import type { Metadata } from 'next';
import './globals.css';
import { company } from '@/data/company';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mvdesigners.com'),
  title: `${company.name} | Structural Steel Detailing & 3D Modeling | ${company.tagline}`,
  description: `${company.name} is a competent structural steel detailing company dedicated to delivering high-quality 3D modeling, shop drawings, erection drawings, CNC/DSTV data, and material management for fabricators and engineers worldwide. AISC & NISD standards compliant.`,
  keywords: [
    'MV Designers',
    'Structural Steel Detailing',
    '3D Modeling',
    'Shop Drawings',
    'Erection Drawings',
    'CNC DSTV Files',
    'KISS Files',
    'EJE Files',
    'AISC Detailing',
    'NISD Standards',
    'Steel Fabricators',
    'BIM Coordination',
    'Dharwad Karnataka',
  ],
  authors: [{ name: company.name, url: `https://${company.contact.web}` }],
  openGraph: {
    title: `${company.name} | Structural Steel Detailing & 3D Modeling`,
    description: `${company.description} ${company.tagline}.`,
    url: `https://${company.contact.web}`,
    siteName: company.name,
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 310,
        alt: `${company.name} Logo`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

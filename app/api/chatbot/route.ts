import { NextResponse } from 'next/server';
const replies: Record<string, string> = {
  services: 'MV Designers provides 3D modeling, erection and shop drawings, material documentation, CNC/DXF/DSTV files, and related detailing outputs.',
  quote: 'Please use the request-a-quote form and include your project requirements. The team can provide project-specific information.',
  hours: 'Please contact the MV Designers team for confirmed working hours and project-specific availability.',
};
export async function POST(request: Request) { const { topic = '' } = await request.json(); const key = topic.toLowerCase().includes('service') ? 'services' : topic.toLowerCase().includes('quote') ? 'quote' : topic.toLowerCase().includes('hour') ? 'hours' : ''; return NextResponse.json({ message: replies[key] || 'Please contact the MV Designers team for project-specific information.' }); }

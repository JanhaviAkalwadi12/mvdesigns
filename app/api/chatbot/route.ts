import { NextResponse } from 'next/server';
import { company } from '@/data/company';
const replies: Record<string, string> = {
  services: 'MV Designers provides 3D modeling, erection and shop drawings, material documentation, CNC/DXF/DSTV files, and related detailing outputs.',
  quote: 'Please use Request a Quote and include your project scope, service needs, available drawings, and timeline. Your email app will open with a prepared enquiry.',
  hours: 'Please contact the MV Designers team for confirmed working hours and project-specific availability.',
  contact: `You can reach the MV Designers team by email at ${company.contact.email}. Published phone and location details are not currently available.`,
  greeting: 'Welcome to MV Designers. I can help with services, requesting a quote, or how to contact the team.',
};
export async function POST(request: Request) { const { topic = '' } = await request.json(); const message = String(topic).trim().toLowerCase(); const key = /hello|hi\b|hey/.test(message) ? 'greeting' : /service|model|shop|erection|dstv|cnc/.test(message) ? 'services' : /quote|estimate|price|cost|proposal/.test(message) ? 'quote' : /hour|time|available|availability/.test(message) ? 'hours' : /contact|email|phone|address|location|reach/.test(message) ? 'contact' : ''; return NextResponse.json({ message: replies[key] || 'I can help with services, requesting a quote, or contact details. For project-specific guidance, please email the MV Designers team.' }); }

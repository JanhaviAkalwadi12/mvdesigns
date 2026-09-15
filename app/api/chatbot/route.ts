import { NextResponse } from 'next/server';
import { company } from '@/data/company';

interface KnowledgeEntry {
  patterns: RegExp;
  reply: string;
  suggestions: string[];
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    patterns: /\b(hi|hello|hey|greetings|morning|evening|afternoon)\b/i,
    reply: `Hello! Welcome to MV Designers — "${company.tagline}". We specialize in high-precision structural steel detailing, 3D modeling, shop drawings, erection plans, and CNC/DSTV fabrication deliverables for fabricators and engineers worldwide. How can we assist with your project today?`,
    suggestions: ['Our Services', 'Recent Projects', 'Request a Quote', 'Contact Details'],
  },
  {
    patterns: /\b(service|services|capabilities|offer|what do you do|specialt)\b/i,
    reply: `MV Designers provides full-lifecycle structural steel detailing solutions:\n\n• 3D Modeling (BIM, beams, columns, bracing, stairs, handrails, ladders)\n• 2D Erection Drawings & Anchor Bolt Layouts\n• 2D Shop Drawings & Gather Sheets\n• Advanced Bill of Materials (ABOM) for procurement\n• CNC, DXF & DSTV Production Files for automated machine tools\n• KISS Files (electronic specification & labor data)\n• EJE Files (Structural Material Manager integration)\n• Material Summaries with cut lengths\n• Field Bolt Summaries for site erection\n• As-Built Drawings incorporating field modifications.`,
    suggestions: ['3D Modeling details', 'Recent Projects', 'CNC & DSTV files', 'Request a Quote'],
  },
  {
    patterns: /\b(project|projects|portfolio|work|canopy|industrial|facility|completed)\b/i,
    reply: `Our recent completed projects include:\n\n1. Canopy & Curved Roof Structural Framing (Complex radial steel trusses & tubular core framing)\n2. Multi-Tier Industrial Steel Building (Heavy steel framing with crane beams & bracing)\n3. Commercial Facility & Warehouse (Long-span open-web joists & roof trusses)\n4. Curved Tubular Arch Portal Structure (High-clearance tubular portal frame)\n\nYou can explore these in the "Recent Projects" section on our website.`,
    suggestions: ['Our Services', 'Request a Quote', 'Software & Standards'],
  },
  {
    patterns: /\b(quote|quotation|cost|estimate|pricing|proposal|rates|hire|bid)\b/i,
    reply: `To receive a customized project quotation:\n\n1. Prepare your architectural and structural contract drawings (.PDF, .DWG, or 3D models).\n2. Specify project scope, estimated tonnage, and turnaround milestones.\n3. Email your drawings directly to ${company.contact.email} or call +91 9916502444 / USA: 585-364-6538.\n\nOur engineering team will review the scope and provide a comprehensive proposal.`,
    suggestions: ['Contact email & phone', 'Supported file formats', 'Our Process', 'Recent Projects'],
  },
  {
    patterns: /\b(process|workflow|pipeline|steps|how it works)\b/i,
    reply: `Our disciplined 7-step engineering workflow ensures fabrication-ready accuracy:\n\n1. Contract drawings review & RFI coordination\n2. 3D structural modeling of steel members & connections\n3. Quality control review & engineering checking\n4. Fabrication shop drawings & gather sheets\n5. Erection plans & anchor bolt layouts\n6. CNC, DSTV & DXF NC data extraction\n7. Fabrication support & As-Built drawing updates.`,
    suggestions: ['Quality standards', 'Recent Projects', 'Request a Quote'],
  },
  {
    patterns: /\b(software|tools|tekla|revit|autocad|navisworks|sds|bim)\b/i,
    reply: `MVD is equipped with both an exceptional team of experienced detailers and the highest standards of software technology. We produce quality shop drawings within the framework of international codes (AISC, NISD), specifications, and contract documents using modern 3D modeling and detailing platforms.`,
    suggestions: ['File formats delivered', 'Our Services', 'Request a Quote'],
  },
  {
    patterns: /\b(format|formats|files|dstv|dxf|cnc|kiss|eje|nc1|drawing)\b/i,
    reply: `We deliver production-oriented electronic data:\n\n• CNC / DSTV files converting length, hole positions, bevels, notches into machine coordinates\n• DXF files for automated plate cutting\n• KISS format files to eliminate repetitive data entry\n• EJE files for Structural Material Manager software\n• PDF & DWG fabrication shop drawings & erection sheets.`,
    suggestions: ['Our Services', 'Request a Quote', 'Recent Projects'],
  },
  {
    patterns: /\b(standard|standards|code|codes|aisc|nisd|cisc|osha|quality|accuracy)\b/i,
    reply: `MV Designers strength lies in steel detailing knowledge, experience, and skilled manpower with strict exposure to international standards (AISC, NISD). Our strong quality policy is geared toward global standards with a team of Structural Engineers, modelers, and checkers led by industry veterans.`,
    suggestions: ['Our Services', 'Recent Projects', 'Request a Quote'],
  },
  {
    patterns: /\b(time|hours|timezone|time zone|us|india|turnaround|timeline|schedule|available)\b/i,
    reply: `We operate with dual-timezone global coordination between US Eastern Time and India Standard Time (IST). Our US Cell is 585-364-6538 and India Cell is +91 9916502444. This ensures round-the-clock availability, prompt communication, and accelerated turnarounds.`,
    suggestions: ['Contact Details', 'Request a Quote', 'Our Services'],
  },
  {
    patterns: /\b(contact|email|reach|phone|cell|location|address|office|dharwad|karnataka)\b/i,
    reply: `You can reach the MV Designers team at:\n\n• Email: ${company.contact.email}\n• Web: ${company.contact.web}\n• India Cell: ${company.contact.phoneIndia}\n• USA Cell: ${company.contact.phoneUSA}\n• Office: ${company.contact.address.formatted}`,
    suggestions: ['Request a Quote', 'Our Services', 'Recent Projects'],
  },
  {
    patterns: /\b(about|who are you|company|mv designers|mission|vision|values)\b/i,
    reply: `${company.description}\n\n${company.extendedAbout}\n\nCore Values: ${company.values.join(', ')}.\nTagline: "${company.tagline}"`,
    suggestions: ['Our Services', 'Recent Projects', 'Contact Details', 'Request a Quote'],
  },
];

const fallbackEntry = {
  reply: `Thank you for your interest in MV Designers ("${company.tagline}"). We provide structural steel detailing, 3D modeling, shop drawings, erection drawings, and CNC data adhering to AISC & NISD standards.\n\nFor immediate assistance, please email ${company.contact.email} or call +91 9916502444 / USA: 585-364-6538.`,
  suggestions: ['Our Services', 'Recent Projects', 'Request a Quote', 'Contact Details'],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = String(body.topic || body.message || '').trim();

    if (!topic) {
      return NextResponse.json({
        reply: fallbackEntry.reply,
        message: fallbackEntry.reply,
        suggestions: fallbackEntry.suggestions,
      });
    }

    const matched = knowledgeBase.find((entry) => entry.patterns.test(topic));

    if (matched) {
      return NextResponse.json({
        reply: matched.reply,
        message: matched.reply,
        suggestions: matched.suggestions,
      });
    }

    return NextResponse.json({
      reply: fallbackEntry.reply,
      message: fallbackEntry.reply,
      suggestions: fallbackEntry.suggestions,
    });
  } catch {
    return NextResponse.json({
      reply: `Unable to process the request right now. Please email ${company.contact.email} or call +91 9916502444 for project assistance.`,
      message: `Unable to process the request right now. Please email ${company.contact.email} or call +91 9916502444 for project assistance.`,
      suggestions: ['Our Services', 'Request a Quote', 'Contact Details'],
    });
  }
}

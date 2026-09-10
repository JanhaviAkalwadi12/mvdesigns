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
    reply: `Hello! Welcome to MV Designers. We specialize in high-precision structural steel detailing, 3D modeling, and fabrication deliverables for fabricators and engineers worldwide. How can we assist your project today?`,
    suggestions: ['Our Services', 'Request a Quote', 'Software & Formats', 'Our Process'],
  },
  {
    patterns: /\b(service|services|capabilities|offer|what do you do|specialt)\b/i,
    reply: `MV Designers provides comprehensive structural steel detailing solutions, including:\n\n• 3D Structural Modeling (BIM/CAD)\n• 2D Shop Drawings & Gather Sheets\n• 2D Erection Drawings & Anchor Bolt Plans\n• CNC, DXF & DSTV Production Data\n• Advanced Bill of Materials (ABOM)\n• KISS & EJE Structural Management Files\n• Field Bolt & Material Cut Summaries\n• As-Built Drawing Updates`,
    suggestions: ['3D Modeling details', 'CNC & DSTV outputs', 'Request a Quote', 'Engineering Workflow'],
  },
  {
    patterns: /\b(quote|quotation|cost|estimate|pricing|proposal|rates|hire|bid)\b/i,
    reply: `To receive a project quotation:\n\n1. Prepare your architectural/structural contract drawings (.PDF, .DWG, or 3D models).\n2. Specify project scope, estimated tonnage, and schedule milestones.\n3. Send your enquiry to ${company.contact.email} or click "Request a Quote" to open a pre-formatted email template.\n\nOur engineering team will review the scope and provide a comprehensive proposal.`,
    suggestions: ['Contact email', 'Supported file formats', 'Turnaround time', 'Our Services'],
  },
  {
    patterns: /\b(process|workflow|pipeline|steps|how it works|how do you work)\b/i,
    reply: `Our disciplined 7-step engineering workflow ensures zero-defect detailing:\n\n1. Contract Drawings & Spec Review\n2. 3D Model Generation & Connection Setup\n3. Coordination & Quality Control Review\n4. Fabrication Shop Drawings\n5. Erection & Installation Drawings\n6. CNC / DSTV / NC Data Export\n7. Fabrication & Field Support (As-Built)`,
    suggestions: ['3D Modeling details', 'Quality control standards', 'Request a Quote'],
  },
  {
    patterns: /\b(software|tools|tekla|revit|autocad|navisworks|sds|bim)\b/i,
    reply: `We leverage industry-leading structural engineering platforms, including:\n\n• Tekla Structures for complex 3D BIM detailing\n• Autodesk Revit for multidisciplinary coordination\n• AutoCAD for 2D drafting and contract overlays\n• Navisworks for clash detection and digital twin validation\n• SDS/2 and specialized NC extraction tools.`,
    suggestions: ['File formats delivered', 'Our Services', 'Request a Quote'],
  },
  {
    patterns: /\b(format|formats|files|dstv|dxf|cnc|kiss|eje|nc1|drawing)\b/i,
    reply: `We deliver production-ready electronic files for seamless fabrication:\n\n• CNC / NC1 / DSTV files for automated beam lines & drill lines\n• DXF files for plate burning & plasma cutting\n• KISS & EJE data for MRP / ERP fabricator management\n• PDF & DWG erection and shop drawings\n• 3D IFC models for BIM coordination.`,
    suggestions: ['Our Services', 'Request a Quote', 'Our Process'],
  },
  {
    patterns: /\b(standard|standards|code|codes|aisc|nisd|cisc|osha|quality|accuracy)\b/i,
    reply: `MV Designers adheres strictly to international detailing and structural safety standards:\n\n• AISC (American Institute of Steel Construction)\n• NISD (National Institute of Steel Detailing)\n• CISC (Canadian Institute of Steel Construction)\n• OSHA safety requirements for erection and fall protection.`,
    suggestions: ['Our Services', 'Request a Quote', 'Company Background'],
  },
  {
    patterns: /\b(time|hours|timezone|time zone|us|india|turnaround|timeline|schedule|available)\b/i,
    reply: `We operate with dual-timezone global coordination between US Eastern Time (EST/EDT) and India Standard Time (IST). This provides seamless daily project handovers, accelerated turnarounds, and responsive support across global working hours.`,
    suggestions: ['Request a Quote', 'Contact Details', 'Our Process'],
  },
  {
    patterns: /\b(contact|email|reach|phone|location|address|office)\b/i,
    reply: `You can connect directly with the MV Designers engineering team at:\n\n• Email: ${company.contact.email}\n• Enquiries: Click "Request a Quote" or use the contact panel to open a pre-composed message with project scope details.\n• Verified telephone and office location details are provided upon initial project consultation.`,
    suggestions: ['Request a Quote', 'Our Services', 'Working hours'],
  },
  {
    patterns: /\b(about|who are you|company|mv designers|mission|vision|values)\b/i,
    reply: `${company.description}\n\nOur Vision: ${company.vision}\nCore Values: ${company.values.join(', ')}.\nTagline: "${company.tagline}"`,
    suggestions: ['Our Services', 'Our Process', 'Request a Quote', 'Contact Details'],
  },
  {
    patterns: /\b(model|3d|twin|digital twin)\b/i,
    reply: `Our 3D Modeling service builds comprehensive digital twins directly from contract drawings. We model structural columns, beams, bracing, miscellaneous steel (stairs, handrails, ladders), and clash-checked connection details before a single piece of steel is cut.`,
    suggestions: ['Shop Drawings', 'CNC & DSTV files', 'Request a Quote'],
  },
];

const fallbackEntry = {
  reply: `Thank you for your enquiry. MV Designers specializes in structural steel detailing, 3D modeling, shop drawings, erection drawings, and CNC data. \n\nFor project-specific scopes, drawings reviews, or technical questions, please email us directly at ${company.contact.email} or select one of the topics below:`,
  suggestions: ['Our Services', 'Request a Quote', 'Software & Standards', 'Working Hours', 'Contact Details'],
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

    const matched = knowledgeBase.find(entry => entry.patterns.test(topic));

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
      reply: `Unable to process the request right now. Please email ${company.contact.email} for immediate project assistance.`,
      message: `Unable to process the request right now. Please email ${company.contact.email} for immediate project assistance.`,
      suggestions: ['Our Services', 'Request a Quote', 'Contact Details'],
    });
  }
}

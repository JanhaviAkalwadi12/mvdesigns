export const servicesIntro =
  'Our team of skilled professionals are well versed with industry requirements, which affords us the ability to focus on accuracy and innovation. We know that precise and easy to read drawings are of the highest priority with any quality focused fabricator. We strive to take the complexity out of our drawings and deliver concise and accurate information, providing our clients true value at a reasonable price.';

export const services = [
  [
    '3D Modeling',
    'Building 3D model with the help of contract drawings. 3D model comprises of beams, columns, bracings, connections and miscellaneous items (stairs, handrails, ladders, grating etc.).',
  ],
  [
    '2D Erection Drawings',
    'Extraction of 2D erection drawings from the finalized 3D model.',
  ],
  [
    '2D Shop Drawings and Gather Sheets',
    'Extraction of 2D fabrication drawings from the finalized 3D model.',
  ],
  [
    'Advanced Bill of Materials',
    'For material procurement and early procurement scheduling.',
  ],
  [
    'CNC, DXF and DSTV Files',
    'NC files from 3D model will be provided which can be used by CNC machine tools. Structures transforms the part length, hole positions, bevels, notches, and cuts into sets of coordinates that the machine tools can use to create the part in a shop.',
  ],
  [
    'KISS Files',
    'The KISS format can transfer project specifications, bills of materials, sequencing data, labor requirements, and more. By exchanging such information electronically, steel software users can eliminate the need for repetitive data entry and significantly streamline their information management.',
  ],
  [
    'EJE Files',
    'File format used by E.J.E. Industries Structural Material Manager software to help steel professionals - fabricators, suppliers, and detailers - manage structural steel lists.',
  ],
  [
    'Material Summary',
    'Detailed material list with cut lengths.',
  ],
  [
    'Field Bolt Summary',
    'List of field bolts required for bolting at site.',
  ],
  [
    'As-Built drawings',
    'As built drawings are provided to reflect the changes in the original design drawings incorporating the changes made in the field.',
  ],
] as const;

export const recentProjects = [
  {
    id: 'canopy',
    title: 'Canopy & Curved Roof Structural Framing',
    category: 'Stadium / Transit Architecture',
    description:
      'Complex curved radial roof canopy featuring large tubular steel trusses, circular core connections, and precision-detailed purlin framing.',
    image: '/assets/project-1-canopy.jpg',
    imageHd: '/assets/project-1-canopy-hd.jpg',
    aspectRatio: 'landscape',
    scope: '3D BIM Modeling, Erection Plans, CNC Data',
    highlights: ['Curved Tubular Steel', 'Radial Purlins', 'Circular Core Ring'],
  },
  {
    id: 'industrial',
    title: 'Multi-Tier Industrial Steel Building',
    category: 'Industrial Manufacturing Plant',
    description:
      'Multi-story heavy industrial framework with wide-flange columns, integrated crane beams, diagonal bracing systems, and corrugated metal decking coordination.',
    image: '/assets/project-2-industrial.jpg',
    imageHd: '/assets/project-2-industrial-hd.jpg',
    aspectRatio: 'portrait',
    scope: 'Shop Drawings, Advanced BOM, Gather Sheets',
    highlights: ['Crane Runway Beams', 'Chevron Bracing', 'Multi-Floor Framing'],
  },
  {
    id: 'facility',
    title: 'Commercial Facility & Warehouse Framework',
    category: 'Commercial Distribution Facility',
    description:
      'Spacious industrial interior utilizing long-span open-web steel joists, tubular columns, perimeter framing, and high-capacity roof trusses.',
    image: '/assets/project-3-facility.jpg',
    imageHd: '/assets/project-3-facility-hd.jpg',
    aspectRatio: 'portrait',
    scope: '3D Modeling, Field Bolt Summary, NC Files',
    highlights: ['Long-Span Joists', 'High-Clearance Columns', 'Field Bolt Schedule'],
  },
  {
    id: 'arch',
    title: 'Curved Tubular Arch Portal Structure',
    category: 'Specialty Architectural Steel',
    description:
      'High-clearance circular tubular arch portal frame with continuous curved chords and stiffened base plate connections.',
    image: '/assets/project-4-arch.jpg',
    imageHd: '/assets/project-4-arch-hd.jpg',
    aspectRatio: 'landscape',
    scope: 'Complex Curved Detailing, DSTV Files, As-Built',
    highlights: ['Continuous Curved Chords', 'Gusset Plates', 'Base Plate Details'],
  },
];

export const sampleDrawings = [
  {
    title: 'Base Column Detail',
    subtitle: 'Plan & Elevation / Base Plate & Anchor Bolts',
    image: '/assets/drawing-base-column.png',
  },
  {
    title: 'Sample Beam Detail',
    subtitle: 'Cope Cuts, Clip Angles & Section A-A',
    image: '/assets/drawing-beam-detail.png',
  },
  {
    title: 'Anchor Bolt Layout Plan',
    subtitle: 'Foundation Grid & Coordinate Coordination',
    image: '/assets/drawing-anchor-bolts.png',
  },
];

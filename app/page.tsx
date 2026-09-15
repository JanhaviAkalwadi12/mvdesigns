'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  ShieldCheck,
  Sun,
  X,
  Maximize2,
} from 'lucide-react';
import { company } from '@/data/company';
import { services, servicesIntro, recentProjects, sampleDrawings } from '@/data/services';
import galleryStyles from './gallery.module.css';

import IntroScreen from './components/IntroScreen';
import SteelModel from './components/SteelModel';
import GalleryLightbox from './components/GalleryLightbox';
import ChatbotWidget from './components/ChatbotWidget';
import BackToTop from './components/BackToTop';
import TiltCard from './components/TiltCard';

const nav = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Process', '#process'],
  ['Capabilities', '#capabilities'],
  ['Projects', '#projects'],
  ['Gallery', '#gallery'],
  ['Why MV', '#why-mv'],
  ['Contact', '#contact'],
] as const;

const workflow = [
  'Contract drawings',
  '3D modeling',
  'Detailing',
  'Shop drawings',
  'Erection drawings',
  'CNC / NC data',
  'Fabrication',
];

const galleryImages = [
  { src: 'https://www.bossteel.com/wp-content/uploads/2025/02/Steel-Design.jpg', alt: 'Steel structure design' },
  { src: 'https://thumbs.dreamstime.com/b/engineers-helping-to-design-work-blueprints-collaborate-structural-analyzing-project-types-180062506.jpg', alt: 'Engineers reviewing structural blueprints' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROiuc0WkMkTscgdlte7hYCXpa1ygyYgpEfvTUDsYbX4C7yOI1Lxir7ICK&s=10', alt: 'Structural steel project detail' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGg5YEujhRayjnkmGKipI6WDVMkuMmUxEInM1FtSiBs73F3n_Yayf9Kik&s=10', alt: 'Engineering project view' },
  { src: 'https://img.magnific.com/free-photo/structural-glass-ceiling_1112-1176.jpg?semt=ais_hybrid&w=740&q=80', alt: 'Structural glass ceiling' },
  { src: 'https://www.asdipsoft.com/wp-content/uploads/2021/05/About-Pic-scaled.jpg', alt: 'Structural engineering planning' },
];

export default function Home() {
  const [light, setLight] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [intro, setIntro] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNav, setActiveNav] = useState('About');
  const [clocks, setClocks] = useState({ us: '—', india: '—' });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState(galleryImages);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Theme, scroll tracking, clock initialization
  useEffect(() => {
    const saved = localStorage.getItem('mv-theme');
    const isLight = saved ? saved === 'light' : matchMedia('(prefers-color-scheme: light)').matches;
    setLight(isLight);
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';

    const updateClocks = () =>
      setClocks({
        us: new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
        india: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      });
    updateClocks();
    const clockTimer = setInterval(updateClocks, 60000);

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearInterval(clockTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Active section scrollspy observer
  useEffect(() => {
    const sections = ['about', 'services', 'process', 'capabilities', 'projects', 'gallery', 'why-mv', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = nav.find(([, href]) => href === `#${entry.target.id}`);
            if (found) setActiveNav(found[0]);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Gallery autoplay
  useEffect(() => {
    if (galleryPaused || lightboxOpen) return;
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [galleryPaused, lightboxOpen]);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    localStorage.setItem('mv-theme', next ? 'light' : 'dark');
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
  };

  const selectGalleryImage = (index: number) => {
    setGalleryPaused(true);
    setGalleryIndex((index + galleryImages.length) % galleryImages.length);
  };

  const openLightboxWithImages = (images: Array<{ src: string; alt: string }>, idx: number) => {
    setLightboxImages(images);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(company.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main onContextMenu={(e) => e.preventDefault()}>
      {intro && <IntroScreen onComplete={() => setIntro(false)} />}

      {/* Top dynamic scroll progress */}
      <div className="progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Sticky Header */}
      <header className={scrolled ? 'scrolled' : ''}>
        <a className="brand" href="#home" aria-label="MV DESGINS Home">
          <div className="brand-wrap">
            <img
              src="/assets/mv-desgins-logo.png"
              alt="MV DESGINS"
              className="brand-logo-img"
            />
          </div>
        </a>

        <nav className={menu ? 'open' : ''}>
          {nav.map(([label, href]) => (
            <a
              key={label}
              className={activeNav === label ? 'active' : ''}
              onClick={() => setMenu(false)}
              href={href}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="head-actions">
          <button className="icon" onClick={toggleTheme} aria-label="Change color theme" type="button">
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a className="button compact" href="#contact">
            Request a Quote <ArrowUpRight size={15} />
          </a>
          <button
            className="icon mobile"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle navigation menu"
            type="button"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="eyebrow">
            <span /> DIGITAL DETAILING / GLOBAL COLLABORATION
          </div>
          <h1>
            Precision in Every Detail.
            <br />
            <em>Confidence</em> in Every Structure.
          </h1>
          <p>
            {company.name} delivers accurate, fabrication-ready structural steel detailing solutions for
            fabricators, engineers, and construction professionals.
          </p>
          <div className="hero-ctas">
            <a className="button" href="#services">
              Explore Capabilities <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href="#contact">
              Request a Quote <ChevronRight size={16} />
            </a>
          </div>
          <p className="trust">
            <Check size={14} /> {company.tagline} — Detailing knowledge, experience &amp; international standards (AISC, NISD).
          </p>
        </div>

        <SteelModel />

        <div className="tech-list">
          <span>
            <i /> 3D MODELING
          </span>
          <span>
            <i /> SHOP DRAWINGS
          </span>
          <span>
            <i /> ERECTION DRAWINGS
          </span>
          <span>
            <i /> CNC / DSTV
          </span>
        </div>

        <a className="scroll" href="#about">
          VIEW OUR PROCESS <ArrowDown size={16} />
        </a>
      </section>

      {/* Marquee Banner */}
      <div className="marquee" aria-hidden="true">
        <div>
          STRUCTURAL STEEL DETAILING <b>◆</b> 3D MODELING <b>◆</b> SHOP DRAWINGS <b>◆</b> ERECTION DRAWINGS <b>◆</b> CNC / DSTV <b>◆</b> AISC &amp; NISD STANDARDS <b>◆</b> ADVANCED BOM <b>◆</b> KISS FILES <b>◆</b> EJE FILES <b>◆</b> PRECISION <b>◆</b> QUALITY <b>◆</b> YOU BUILD, WE HELP <b>◆</b>
        </div>
      </div>

      {/* 01 / About Section */}
      <section className="about section" id="about">
        <aside>01 / ABOUT MV DESGINS</aside>
        <div>
          <p className="eyebrow">ENGINEERING, DELIVERED WITH PURPOSE</p>
          <h2>
            Clarity at every
            <br />
            <em>connection.</em>
          </h2>
        </div>
        <div className="bodycopy">
          <p>{company.description}</p>
          <p style={{ marginTop: '16px' }}>{company.extendedAbout}</p>

          <div className="about-metrics">
            <div className="metric-card">
              <strong>100%</strong>
              <span>Fabrication Accuracy</span>
            </div>
            <div className="metric-card">
              <strong>24/7</strong>
              <span>Global Project Cycle</span>
            </div>
            <div className="metric-card">
              <strong>AISC</strong>
              <span>&amp; NISD Standards Aligned</span>
            </div>
          </div>

          <div className="values">
            {company.values.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>

          <a className="text-link" href="#services">
            Discover our services <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Statement Section */}
      <section className="statement">
        <div className="micro-grid" />
        <p>Every connection matters. Every dimension carries responsibility. Every detail contributes to the final structure.</p>
      </section>

      {/* 02 / Services Section */}
      <section className="services section" id="services">
        <aside>02 / SERVICES</aside>
        <div className="services-copy">
          <p className="eyebrow">TECHNICAL CAPABILITIES</p>
          <h2>
            Detailing that moves
            <br />
            <em>the work forward.</em>
          </h2>
          <p>{servicesIntro}</p>
        </div>

        <div className="service-panel">
          <div className="service-nav">
            {services.map(([title], i) => (
              <button
                className={active === i ? 'selected' : ''}
                onClick={() => setActive(i)}
                key={title}
                type="button"
              >
                <b>{String(i + 1).padStart(2, '0')}</b>
                {title}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>

          <TiltCard as="article" maxTilt={4} scale={1.01}>
            <span className="service-no">{String(active + 1).padStart(2, '0')}</span>
            <h3>{services[active][0]}</h3>
            <p>{services[active][1]}</p>
            <div className="output">
              <span>MODEL-BASED</span>
              <span>PROJECT OUTPUT</span>
              <span>TECHNICAL REVIEW</span>
              <span>AISC / NISD ALIGNED</span>
            </div>
            <a className="button" href="#contact">
              Discuss this service <ArrowUpRight size={16} />
            </a>
          </TiltCard>
        </div>
      </section>

      {/* 03 / Engineering Workflow / Process */}
      <section className="process" id="process">
        <div className="section-heading">
          <p className="eyebrow">03 / ENGINEERING WORKFLOW</p>
          <h2>
            From contract drawing
            <br />
            to <em>fabrication.</em>
          </h2>
        </div>
        <div className="pipeline">
          {workflow.map((item, i) => (
            <div key={item}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{item}</span>
              {i < workflow.length - 1 && <i />}
            </div>
          ))}
        </div>
      </section>

      {/* 04 / Capabilities (Digital Twin & Engineering Drawings) */}
      <section className="twin section" id="capabilities">
        <aside>04 / CAPABILITIES</aside>
        <div>
          <p className="eyebrow">DIGITAL TWIN &amp; DRAWING EXCELLENCE</p>
          <h2>
            From contract drawing<br />
            to <em>digital twin.</em>
          </h2>
          <p>
            Structured engineering information becomes a coordinated 3D model, then a fabrication-ready
            set of outputs and verified shop drawings.
          </p>

          <div className="drawings-wrapper">
            <div className="drawings-heading">
              <p className="eyebrow" style={{ margin: 0 }}>SAMPLE ENGINEERING DELIVERABLES</p>
            </div>
            <div className="drawings-grid">
              {sampleDrawings.map((drawing, i) => (
                <div
                  key={drawing.title}
                  className="drawing-card"
                  onClick={() =>
                    openLightboxWithImages(
                      sampleDrawings.map((d) => ({ src: d.image, alt: `${d.title} - ${d.subtitle}` })),
                      i
                    )
                  }
                >
                  <img src={drawing.image} alt={drawing.title} />
                  <h4>{drawing.title}</h4>
                  <span>{drawing.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TiltCard className="blueprint" maxTilt={5}>
          <span>CONTRACT DRAWING OVERLAY / AISC SPEC</span>
          <div className="drawing">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span>MODEL COORDINATION / BIM LEVEL 300+</span>
        </TiltCard>
      </section>

      {/* 05 / Recent Completed Projects */}
      <section className="projects" id="projects">
        <div className="section-heading">
          <p className="eyebrow">05 / RECENT COMPLETED PROJECTS</p>
          <h2>
            Proven steelwork,<br />
            <em>validated in the field.</em>
          </h2>
          <p>
            Recent structural steel detailing projects executed by MV DESGINS for fabricators and
            contractors worldwide. Each project is detailed with complete fabrication accuracy and
            AISC/NISD standards compliance. Click any project to inspect full high-definition details.
          </p>
        </div>

        <div className="projects-grid">
          {recentProjects.map((project, i) => (
            <TiltCard key={project.title} className="project-card" maxTilt={3} scale={1.01}>
              <div
                className="project-image-stage"
                onClick={() =>
                  openLightboxWithImages(
                    recentProjects.map((p) => ({ src: p.imageHd, alt: `${p.title} — ${p.category}` })),
                    i
                  )
                }
              >
                <span className="project-category">{project.category}</span>
                <img
                  src={project.imageHd}
                  alt={project.title}
                  className="project-img-contain"
                  loading="lazy"
                />
                <div className="project-zoom-btn">
                  <Maximize2 size={12} />
                  <span>View Full Detail</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-highlights">
                  {project.highlights.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-scope">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={13} style={{ color: 'var(--cyan)' }} /> {project.scope}
                  </span>
                  <button
                    type="button"
                    className="text-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid var(--gold)',
                      padding: '0 0 2px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      openLightboxWithImages(
                        recentProjects.map((p) => ({ src: p.imageHd, alt: `${p.title} — ${p.category}` })),
                        i
                      )
                    }
                  >
                    HD Lightbox <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 06 / Gallery Showcase */}
      <section className={`showcase ${galleryStyles.gallery}`} id="gallery">
        <div
          className={galleryStyles.stage}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return;
            const distance = event.changedTouches[0].clientX - touchStart;
            if (Math.abs(distance) > 45) selectGalleryImage(galleryIndex + (distance < 0 ? 1 : -1));
            setTouchStart(null);
          }}
        >
          <div
            className={galleryStyles.track}
            style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
          >
            {galleryImages.map((image, index) => (
              <figure
                className={galleryStyles.slide}
                key={image.src}
                aria-hidden={index !== galleryIndex}
                onClick={() => openLightboxWithImages(galleryImages, galleryIndex)}
                style={{ cursor: 'zoom-in' }}
              >
                <img src={image.src} alt={image.alt} />
                <figcaption>
                  {String(index + 1).padStart(2, '0')} / {image.alt}
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            className={`${galleryStyles.control} ${galleryStyles.previous}`}
            type="button"
            onClick={() => selectGalleryImage(galleryIndex - 1)}
            aria-label="Previous gallery image"
          >
            ←
          </button>
          <button
            className={`${galleryStyles.control} ${galleryStyles.next}`}
            type="button"
            onClick={() => selectGalleryImage(galleryIndex + 1)}
            aria-label="Next gallery image"
          >
            →
          </button>

          <div className={galleryStyles.dots} aria-label="Gallery image selection">
            {galleryImages.map((image, index) => (
              <button
                type="button"
                key={image.src}
                className={index === galleryIndex ? galleryStyles.activeDot : ''}
                onClick={() => selectGalleryImage(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={index === galleryIndex}
              />
            ))}
          </div>
        </div>

        <div className="showcase-copy">
          <p className="eyebrow">06 / GALLERY</p>
          <h2>
            Explore our work,<br />
            <em>activities &amp; moments.</em>
          </h2>
          <p>
            See the detail, collaboration, and structural thinking that support clear, fabrication-ready
            project outputs. Click any image to view in high definition.
          </p>
          <div className="showcase-points">
            <span>
              <Check /> Structural detailing
            </span>
            <span>
              <Check /> Team coordination
            </span>
            <span>
              <Check /> Project precision
            </span>
          </div>
          <div style={{ marginTop: '24px' }}>
            <button
              type="button"
              className="text-link"
              onClick={() => openLightboxWithImages(galleryImages, galleryIndex)}
              style={{ background: 'none', border: '0', borderBottom: '1px solid var(--gold)', cursor: 'pointer' }}
            >
              <Maximize2 size={14} /> Open Fullscreen Lightbox
            </button>
          </div>
        </div>
      </section>

      {/* 07 / Why MV DESGINS */}
      <section className="why" id="why-mv">
        <div className="section-heading">
          <p className="eyebrow">07 / WHY MV DESGINS</p>
          <h2>
            Built on discipline.<br />
            <em>Driven by detail.</em>
          </h2>
          <p style={{ marginTop: '14px', color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7' }}>
            MV DESGINS is equipped with both an exceptional team of experienced detailers and the highest
            standards of software technology to take on any structural steel detailing project.
          </p>
        </div>
        <div className="feature-grid">
          {[
            ['01', 'Precision', 'Accurate and clear detailing within international codes (AISC, NISD).'],
            ['02', 'Quality', 'Stringent quality processes in place to ensure each job is done right the first time.'],
            ['03', 'Efficiency', 'Streamlined technical workflows and automated CNC/DSTV file extraction.'],
            ['04', 'Innovation', 'Modern 3D modeling and digital twin techniques that remove drawing complexity.'],
            ['05', 'Reliability', 'Consistent project-focused service, time-bound deliverables, and responsive communication.'],
            ['06', 'Integrity', 'Professional, customer-centric relationships creating tangible value for clients.'],
          ].map((x) => (
            <TiltCard as="article" key={x[1]} maxTilt={6} scale={1.02}>
              <b>{x[0]}</b>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
              <span>+</span>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality">
        <div className="crosshair">⊹</div>
        <p className="eyebrow">QUALITY CONTROL / VERIFIED CLARITY</p>
        <h2>
          Getting it right<br />
          <em>the first time.</em>
        </h2>
        <div>
          <span>ACCURACY</span>
          <span>CLARITY</span>
          <span>CONSISTENCY</span>
          <span>FABRICATION-READY</span>
          <span>AISC &amp; NISD COMPLIANT</span>
        </div>
      </section>

      {/* Global Collaboration */}
      <section className="global">
        <div>
          <p className="eyebrow">GLOBAL COLLABORATION</p>
          <h2>
            Seamless support.<br />
            <em>One connected team.</em>
          </h2>
          <p>
            Supporting global structural steel detailing requirements through coordinated India-based
            engineering capabilities and dual-timezone coverage.
          </p>
          <div style={{ marginTop: '20px', display: 'grid', gap: '8px', font: '11px var(--mono)', color: 'var(--muted)' }}>
            <div><span style={{ color: 'var(--gold)' }}>INDIA CELL:</span> {company.contact.phoneIndia}</div>
            <div><span style={{ color: 'var(--cyan)' }}>USA CELL:</span> {company.contact.phoneUSA}</div>
          </div>
        </div>

        <div className="world">
          <span className="us">
            US
            <br />
            <b>Eastern Time (Cell: {company.contact.phoneUSA})</b>
            <strong>{clocks.us}</strong>
          </span>
          <i />
          <span className="india">
            INDIA
            <br />
            <b>IST (Cell: {company.contact.phoneIndia})</b>
            <strong>{clocks.india}</strong>
          </span>
          <small>● GLOBAL SUPPORT AVAILABLE</small>
        </div>
      </section>

      {/* 08 / Contact Section */}
      <section className="contact contact-direct" id="contact">
        <aside>08 / CONTACT</aside>
        <div style={{ textAlign: 'center', justifySelf: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            START A CONVERSATION
          </p>
          <h2>
            Let’s detail your<br />
            <em>next project.</em>
          </h2>
          <p style={{ marginInline: 'auto' }}>
            Have a structural steel project in development? Connect directly with the MV DESGINS team to
            discuss your detailing requirements.
          </p>
        </div>

        <TiltCard className="connect-panel" maxTilt={4}>
          <Mail size={28} />
          <span>PROJECT ENQUIRIES — {company.tagline.toUpperCase()}</span>

          <div className="connect-email-row">
            <a href={`mailto:${company.contact.email}?subject=MV%20DESGINS%20Project%20Enquiry`}>
              {company.contact.email}
            </a>
            <button
              type="button"
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div style={{ display: 'grid', gap: '10px', fontSize: '13px', margin: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={15} style={{ color: 'var(--gold)' }} />
              <span>
                India: <a href={`tel:${company.contact.phoneIndia.replace(/\s/g, '')}`} style={{ color: 'var(--ink)', fontWeight: 600 }}>{company.contact.phoneIndia}</a>
                {' | '}
                USA: <a href={`tel:${company.contact.phoneUSA.replace(/[-\s]/g, '')}`} style={{ color: 'var(--ink)', fontWeight: 600 }}>{company.contact.phoneUSA}</a>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <MapPin size={15} style={{ color: 'var(--cyan)', marginTop: '3px', flexShrink: 0 }} />
              <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: '1.5' }}>
                {company.contact.address.formatted}
              </span>
            </div>
          </div>

          <p>Opens your default email app—Gmail, Outlook, Apple Mail, or another configured mail client.</p>

          <a
            className="button"
            href={`mailto:${company.contact.email}?subject=MV%20DESGINS%20Project%20Enquiry`}
          >
            Connect with us <Send size={16} />
          </a>

          <small>
            <ShieldCheck size={13} /> Official company inbox: {company.contact.email} • Web: {company.contact.web}
          </small>
        </TiltCard>
      </section>

      {/* Final CTA */}
      <section className="final">
        <p className="eyebrow">MV DESGINS / STRUCTURAL DETAILING</p>
        <h2>
          Precision starts with the right<br />
          <em>detailing partner.</em>
        </h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
          {company.tagline} — High-quality detailing for steel fabricators, engineers, and construction professionals.
        </p>
        <a className="button" href="#contact">
          Request a Quote <ArrowUpRight size={17} />
        </a>
      </section>

      {/* Footer */}
      <footer>
        <div className="brand-wrap">
          <img
            src="/assets/mv-desgins-logo.png"
            alt="MV DESGINS"
            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
          />
        </div>
        <div>
          <p style={{ margin: '0 0 10px', fontWeight: 700, color: 'var(--ink)' }}>
            {company.name} — {company.tagline}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>
            {company.contact.address.formatted}
            <br />
            India: {company.contact.phoneIndia} | USA: {company.contact.phoneUSA}
            <br />
            Email: {company.contact.email} | Web: {company.contact.web}
          </p>
        </div>
        <div>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="/contact">Contact Page</a>
          <a href="/privacy">Privacy</a>
        </div>
        <small>
          STRUCTURAL DETAILING • DIGITAL PRECISION • GLOBAL COLLABORATION
          <br />© {new Date().getFullYear()} MV DESGINS. All Rights Reserved. AISC &amp; NISD Standards Compliant.
        </small>
      </footer>

      {/* Gallery & Project Lightbox Modal */}
      <GalleryLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelect={(idx) => setLightboxIndex(idx)}
      />

      {/* MV Assistant Chatbot */}
      <ChatbotWidget />

      {/* Back to top button with circular progress */}
      <BackToTop />
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Mail,
  Menu,
  Moon,
  Send,
  ShieldCheck,
  Sun,
  X,
  Maximize2,
} from 'lucide-react';
import { company } from '@/data/company';
import { services } from '@/data/services';
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
    const sections = ['about', 'services', 'process', 'capabilities', 'gallery', 'why-mv', 'contact'];
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
        <a className="brand" href="#home">
          <small>STRUCTURAL</small>
          MV DESIGNERS
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
            MV Designers delivers accurate, fabrication-ready structural steel detailing solutions for
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
            <Check size={14} /> Precision-led detailing for complex structural steel requirements.
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
          STRUCTURAL STEEL DETAILING <b>◆</b> 3D MODELING <b>◆</b> AUTOCAD <b>◆</b> REVIT <b>◆</b> NAVISWORKS <b>◆</b> SHOP DRAWINGS <b>◆</b> ERECTION DRAWINGS <b>◆</b> CNC / DSTV <b>◆</b> PRECISION <b>◆</b> QUALITY <b>◆</b> INNOVATION <b>◆</b>
        </div>
      </div>

      {/* 01 / About Section */}
      <section className="about section" id="about">
        <aside>01 / ABOUT MV DESIGNERS</aside>
        <div>
          <p className="eyebrow">ENGINEERING, DELIVERED WITH PURPOSE</p>
          <h2>
            Clarity at every
            <br />
            <em>connection.</em>
          </h2>
        </div>
        <div className="bodycopy">
          <p>
            {company.description} We focus on the accuracy and innovation needed to turn complex design
            information into concise, easy-to-read deliverables.
          </p>

          <div className="about-metrics">
            <div className="metric-card">
              <strong>100%</strong>
              <span>Fabrication Accuracy</span>
            </div>
            <div className="metric-card">
              <strong>24/7</strong>
              <span>Global Delivery Cycle</span>
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
            Discover our approach <ArrowUpRight size={16} />
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
          <p>Each output is designed to support a clear, coordinated path from model to fabrication.</p>
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
              <span>AISC ALIGNED</span>
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

      {/* 04 / Capabilities (Digital Twin) */}
      <section className="twin section" id="capabilities">
        <aside>04 / CAPABILITIES</aside>
        <div>
          <p className="eyebrow">DIGITAL TWIN THINKING</p>
          <h2>
            From drawing to
            <br />
            <em>digital twin.</em>
          </h2>
          <p>Structured information becomes a coordinated model, then a fabrication-ready set of outputs.</p>
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

      {/* 05 / Why MV Designers */}
      <section className="why" id="why-mv">
        <div className="section-heading">
          <p className="eyebrow">05 / WHY MV DESIGNERS</p>
          <h2>
            Built on discipline.
            <br />
            <em>Driven by detail.</em>
          </h2>
        </div>
        <div className="feature-grid">
          {[
            ['01', 'Precision', 'Accurate and clear detailing.'],
            ['02', 'Quality', 'A focused approach to deliverables.'],
            ['03', 'Efficiency', 'Streamlined technical workflows.'],
            ['04', 'Innovation', 'Modern detailing techniques.'],
            ['05', 'Reliability', 'Consistent project-focused service.'],
            ['06', 'Integrity', 'Professional, transparent relationships.'],
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
          Getting it right
          <br />
          <em>the first time.</em>
        </h2>
        <div>
          <span>ACCURACY</span>
          <span>CLARITY</span>
          <span>CONSISTENCY</span>
          <span>FABRICATION-READY</span>
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
                onClick={() => setLightboxOpen(true)}
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
            Explore our work,
            <br />
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
              onClick={() => setLightboxOpen(true)}
              style={{ background: 'none', border: '0', borderBottom: '1px solid var(--gold)', cursor: 'pointer' }}
            >
              <Maximize2 size={14} /> Open Fullscreen Lightbox
            </button>
          </div>
        </div>
      </section>

      {/* Global Collaboration */}
      <section className="global">
        <div>
          <p className="eyebrow">GLOBAL COLLABORATION</p>
          <h2>
            Seamless support.
            <br />
            <em>One connected team.</em>
          </h2>
          <p>
            Supporting global structural steel detailing requirements through coordinated India-based
            engineering capabilities.
          </p>
        </div>

        <div className="world">
          <span className="us">
            US
            <br />
            <b>Eastern Time</b>
            <strong>{clocks.us}</strong>
          </span>
          <i />
          <span className="india">
            INDIA
            <br />
            <b>India Standard Time</b>
            <strong>{clocks.india}</strong>
          </span>
          <small>● GLOBAL SUPPORT AVAILABLE</small>
        </div>
      </section>

      {/* 07 / Contact Section */}
      <section className="contact contact-direct" id="contact">
        <aside>07 / CONTACT</aside>
        <div style={{ textAlign: 'center', justifySelf: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            START A CONVERSATION
          </p>
          <h2>
            Let’s detail your
            <br />
            <em>next project.</em>
          </h2>
          <p style={{ marginInline: 'auto' }}>
            Have a structural steel project in development? Connect directly with the MV Designers team to
            discuss your detailing requirements.
          </p>
        </div>

        <TiltCard className="connect-panel" maxTilt={4}>
          <Mail size={28} />
          <span>PROJECT ENQUIRIES</span>

          <div className="connect-email-row">
            <a href={`mailto:${company.contact.email}?subject=MV%20Designers%20Project%20Enquiry`}>
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

          <p>Opens your default email app—Gmail, Outlook, Apple Mail, or another configured mail client.</p>

          <a
            className="button"
            href={`mailto:${company.contact.email}?subject=MV%20Designers%20Project%20Enquiry`}
          >
            Connect with us <Send size={16} />
          </a>

          <small>
            <ShieldCheck size={13} /> Private project details should be shared only through a confirmed company email.
          </small>
        </TiltCard>
      </section>

      {/* Final CTA */}
      <section className="final">
        <p className="eyebrow">MV DESIGNERS / STRUCTURAL DETAILING</p>
        <h2>
          Precision starts with the right
          <br />
          <em>detailing partner.</em>
        </h2>
        <a className="button" href="#contact">
          Request a Quote <ArrowUpRight size={17} />
        </a>
      </section>

      {/* Footer */}
      <footer>
        <a className="brand" href="#home">
          <small>STRUCTURAL</small>
          MV DESIGNERS
        </a>
        <p>{company.tagline}</p>
        <div>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="/contact">Direct Form</a>
          <a href="/privacy">Privacy</a>
        </div>
        <small>
          STRUCTURAL DETAILING • DIGITAL PRECISION • GLOBAL COLLABORATION
          <br />© {new Date().getFullYear()} MV Designers. All Rights Reserved.
        </small>
      </footer>

      {/* Gallery Lightbox Modal */}
      <GalleryLightbox
        images={galleryImages}
        currentIndex={galleryIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelect={(idx) => setGalleryIndex(idx)}
      />

      {/* MV Assistant Chatbot */}
      <ChatbotWidget />

      {/* Back to top button with circular progress */}
      <BackToTop />
    </main>
  );
}

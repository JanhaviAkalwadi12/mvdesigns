'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Moon,
  Phone,
  Send,
  Sun,
} from 'lucide-react';
import { company } from '@/data/company';
import styles from '../contact-premium.module.css';
import TiltCard from '../components/TiltCard';
import BackToTop from '../components/BackToTop';

const help = [
  'Request Quote',
  'Project Inquiry',
  '3D Modeling',
  'Shop Drawings',
  'Erection Drawings',
  'CNC / DSTV Data',
  'Advanced BOM',
  'General Inquiry',
];

const faqs = [
  [
    'How do I request a project quote?',
    'Email your contract drawings (.PDF, .DWG, or 3D models) and project scope to mallanagouda@mvdesigners.com, or call +91 9916502444 / USA: 585-364-6538. Our engineering team will review the scope and provide a comprehensive proposal.',
  ],
  [
    'What standards and codes do you detail to?',
    'MV DESGINS operates with strict adherence to AISC (American Institute of Steel Construction), NISD (National Institute of Steel Detailing), and CISC standards, ensuring all shop drawings, erection sheets, and connections meet strict fabrication criteria.',
  ],
  [
    'Which fabrication and CNC files do you deliver?',
    'We extract and provide production-ready CNC / DSTV / NC files, DXF plate files, KISS files, and EJE Structural Material Manager files directly from the coordinated 3D model.',
  ],
  [
    'What are your working hours and timezone coverage?',
    'We coordinate seamlessly between US Eastern Time (USA Cell: 585-364-6538) and India Standard Time (India Cell: +91 9916502444), offering round-the-clock handover and rapid turnarounds.',
  ],
];

const emailLink = `mailto:${company.contact.email}?subject=${encodeURIComponent(
  'MV DESGINS | Project Enquiry'
)}&body=${encodeURIComponent(
  'Hello MV DESGINS team,\n\nI would like to discuss the following structural steel detailing requirement:\n\nProject / scope:\nRequired service(s):\nTimeline / additional notes:\n\nName:\nCompany:\nPhone:\n'
)}`;

export default function ContactPage() {
  const [clocks, setClocks] = useState({ us: '—', india: '—' });
  const [open, setOpen] = useState(0);
  const [light, setLight] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', service: 'Project Inquiry', message: '' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('mv-theme');
    const isLight = saved ? saved === 'light' : matchMedia('(prefers-color-scheme: light)').matches;
    setLight(isLight);
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';

    const tick = () =>
      setClocks({
        us: new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
        india: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
      });
    tick();
    const timer = setInterval(tick, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    localStorage.setItem('mv-theme', next ? 'light' : 'dark');
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
  };

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Unable to send');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.contact.address.formatted
  )}`;

  return (
    <main className={`contact-page ${styles.page}`}>
      <div style={{ position: 'fixed', top: '22px', left: '5vw', zIndex: 30 }}>
        <a
          href="/"
          className="text-link"
          style={{
            background: 'rgba(7, 21, 37, 0.75)',
            backdropFilter: 'blur(10px)',
            padding: '8px 16px',
            border: '1px solid var(--line)',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ArrowLeft size={14} /> Back to Home
        </a>
      </div>

      <button
        className="contact-theme-toggle icon"
        onClick={toggleTheme}
        aria-label="Change color theme"
        type="button"
      >
        {light ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <section className={`contact-hero ${styles.hero}`}>
        <div className="contact-grid" />
        <div className="contact-beam">
          <i />
          <i />
          <i />
        </div>
        <p className="eyebrow">MV DESIGNERS / CONTACT — {company.tagline.toUpperCase()}</p>
        <h1>
          Let’s talk about<br />
          <em>your next project.</em>
        </h1>
        <p>
          Connect directly with the MV Designers team to discuss structural steel detailing, 3D modeling,
          shop drawings, and fabrication requirements.
        </p>
        <a className="button" href={emailLink}>
          Request a Quote <ArrowUpRight size={17} />
        </a>
      </section>

      <section className={`contact-intro ${styles.intro}`}>
        <div>
          <p className="eyebrow">DIRECT ENGINEERING CONNECTION</p>
          <h2>
            Clear communication,<br />
            <em>from the first note.</em>
          </h2>
        </div>
        <p>
          All project enquiries are handled directly by experienced structural engineers and detailers. We
          work in tandem with our clients to create tangible value and uncompromised quality.
        </p>
      </section>

      <section className={styles.visuals} aria-label="Structural engineering details">
        <figure>
          <img
            src="/assets/project-1-canopy.jpg"
            alt="Canopy and Curved Roof Structural Framing Project"
            loading="lazy"
          />
          <figcaption>RECENT COMPLETED PROJECT / CANOPY FRAMING</figcaption>
        </figure>
        <figure>
          <img
            src="/assets/project-2-industrial.jpg"
            alt="Multi-tier Industrial Steel Structure Project"
            loading="lazy"
          />
          <figcaption>RECENT COMPLETED PROJECT / INDUSTRIAL STEEL</figcaption>
        </figure>
      </section>

      <section className={`contact-details ${styles.cards}`}>
        <TiltCard as="a" className="contact-card" href={emailLink} maxTilt={5}>
          <Mail />
          <small>EMAIL</small>
          <strong>{company.contact.email}</strong>
          <span>
            Email our team <ArrowUpRight size={15} />
          </span>
        </TiltCard>

        <TiltCard
          as="a"
          className="contact-card"
          href={`tel:${company.contact.phoneIndia.replace(/\s/g, '')}`}
          maxTilt={5}
        >
          <Phone />
          <small>PHONE (INDIA &amp; USA)</small>
          <strong>{company.contact.phoneIndia}</strong>
          <span style={{ marginTop: '4px', fontSize: '11px', color: 'var(--muted)' }}>
            USA: {company.contact.phoneUSA}
          </span>
          <span style={{ marginTop: 'auto' }}>
            Call our team <ArrowUpRight size={15} />
          </span>
        </TiltCard>

        <TiltCard
          as="a"
          className="contact-card"
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          maxTilt={5}
        >
          <MapPin />
          <small>OFFICE LOCATION</small>
          <strong style={{ fontSize: '12px', lineHeight: '1.4' }}>
            {company.contact.address.building}, {company.contact.address.city}, {company.contact.address.country}
          </strong>
          <span style={{ marginTop: 'auto' }}>
            View on Google Maps <ArrowUpRight size={15} />
          </span>
        </TiltCard>

        <TiltCard as="div" className="contact-card" maxTilt={5}>
          <Clock3 />
          <small>GLOBAL COVERAGE</small>
          <strong>US EST &amp; India IST</strong>
          <span style={{ marginTop: 'auto' }}>
            Dual-timezone project support
          </span>
        </TiltCard>
      </section>

      <section className={`contact-form-section ${styles.formSection}`}>
        <div>
          <p className="eyebrow">PROJECT ENQUIRY</p>
          <h2>
            Bring the details.<br />
            <em>We’ll bring clarity.</em>
          </h2>
          <p>
            Share your project essentials and our engineering team will begin with the right context. You can
            also email drawings directly to {company.contact.email}.
          </p>
          <div className="form-note">
            <CheckCircle2 size={17} />
            <span>Adheres to AISC &amp; NISD standards. Private project details remain strictly confidential.</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={submitContact}>
          {formState === 'success' ? (
            <div className="form-success">
              <CheckCircle2 size={26} />
              <strong>Enquiry received.</strong>
              <span>The MV Designers engineering team will review your scope and respond promptly.</span>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setForm({ name: '', email: '', service: 'Project Inquiry', message: '' });
                  setFormState('idle');
                }}
              >
                Send another enquiry <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <label>
                NAME
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                />
              </label>
              <label>
                BUSINESS EMAIL
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@company.com"
                />
              </label>
              <label>
                SERVICE NEEDED
                <select
                  value={form.service}
                  onChange={(event) => setForm({ ...form, service: event.target.value })}
                >
                  <option>Project Inquiry</option>
                  <option>3D Modeling</option>
                  <option>2D Shop Drawings</option>
                  <option>2D Erection Drawings</option>
                  <option>CNC / DXF / DSTV Files</option>
                  <option>Advanced Bill of Materials (ABOM)</option>
                  <option>KISS / EJE Files</option>
                  <option>As-Built Drawings</option>
                </select>
              </label>
              <label className="wide">
                PROJECT SCOPE &amp; DETAILS
                <textarea
                  required
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Provide approximate tonnage, contract drawings availability, timeline, and structural scope"
                />
              </label>
              {formState === 'error' && (
                <p className="form-error">Please check your details and try again, or use direct email.</p>
              )}
              <button className="button" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending' ? 'Sending…' : 'Send Project Scope'} <Send size={16} />
              </button>
            </>
          )}
        </form>
      </section>

      <section className={`contact-help ${styles.centeredSection}`}>
        <div className="help-sticky">
          <p className="eyebrow">HOW CAN WE HELP?</p>
          <h2>
            Choose the right<br />
            <em>starting point.</em>
          </h2>
          <p>Each enquiry opens a tailored email so you can provide the useful project context upfront.</p>
        </div>
        <div className="help-list">
          {help.map((item, i) => (
            <a
              key={item}
              href={`mailto:${company.contact.email}?subject=${encodeURIComponent(
                'MV Designers | ' + item
              )}&body=${encodeURIComponent(
                'Hello MV Designers team,\n\nI am contacting you about: ' + item + '\n\nProject details:\n'
              )}`}
            >
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{item}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>

      <section className={`time-zone ${styles.time}`}>
        <div>
          <p className="eyebrow">US ↔ INDIA COORDINATION</p>
          <h2>
            Connected across<br />
            <em>working worlds.</em>
          </h2>
          <p>
            Live time displays in US Eastern Time and India Standard Time ensure coordinated project handovers
            and immediate engineering assistance.
          </p>
        </div>
        <TiltCard className="clock-glass" maxTilt={4}>
          <article>
            <span>UNITED STATES</span>
            <b>Eastern Time (Cell: {company.contact.phoneUSA})</b>
            <strong>{clocks.us}</strong>
            <small>America / New York</small>
          </article>
          <i>↔</i>
          <article>
            <span>INDIA</span>
            <b>IST (Cell: {company.contact.phoneIndia})</b>
            <strong>{clocks.india}</strong>
            <small>Asia / Kolkata</small>
          </article>
        </TiltCard>
      </section>

      <section className={`prefer ${styles.prefer}`}>
        <Mail />
        <div>
          <p className="eyebrow">PREFER DIRECT EMAIL?</p>
          <h2>Write to our team.</h2>
          <p>Send your drawings and RFP directly to {company.contact.email}.</p>
        </div>
        <a className="text-link" href={emailLink}>
          Email Our Team <ArrowUpRight size={17} />
        </a>
      </section>

      <section className={`contact-faq ${styles.faq}`}>
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
        <h2>
          Helpful before<br />
          <em>you reach out.</em>
        </h2>
        <div>
          {faqs.map(([question, answer], i) => (
            <article className={open === i ? 'active' : ''} key={question}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                type="button"
              >
                <span>{question}</span>
                <ChevronDown />
              </button>
              {open === i && <p>{answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className={`contact-final ${styles.final}`}>
        <p className="eyebrow">MV DESIGNERS / PROJECT ENQUIRY</p>
        <h2>
          Have a project<br />
          <em>in mind?</em>
        </h2>
        <p>Bring clarity and confidence to your next structural steel project.</p>
        <div>
          <a className="button" href={emailLink}>
            Request a Quote <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href={emailLink}>
            Email Our Team <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <footer>
        <div className="brand-wrap">
          <img src="/assets/logo.png" alt="MV Designers Official Logo" style={{ height: '36px', width: 'auto' }} />
          <a className="brand" href="/">
            <small>STRUCTURAL</small>
            MV DESIGNERS
          </a>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--ink)' }}>{company.tagline}</p>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', lineHeight: '1.6' }}>
            {company.contact.address.formatted}
            <br />
            India: {company.contact.phoneIndia} | USA: {company.contact.phoneUSA}
            <br />
            Email: {company.contact.email} | Web: {company.contact.web}
          </p>
        </div>
        <div>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#projects">Projects</a>
          <a href="/privacy">Privacy</a>
        </div>
        <small>
          STRUCTURAL DETAILING • DIGITAL PRECISION • GLOBAL COLLABORATION
          <br />© {new Date().getFullYear()} MV Designers. All Rights Reserved.
        </small>
      </footer>

      <BackToTop />
    </main>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon, Menu, X, Download, Mail, ExternalLink } from "lucide-react";
import { profile, projects, skills, about } from "./data";

const links = [["about", "About"], ["projects", "Projects"], ["skills", "Skills"], ["contact", "Contact"]];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
);

const btn = "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const primary = `${btn} bg-accent text-[#06101f] hover:brightness-110`;
const ghost = `${btn} border border-line bg-card hover:border-accent`;

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <h2 className="font-display mb-10 text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Nav({ light, setLight }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-lg font-bold">{profile.name}<span className="text-accent">.</span></a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} className="text-sm text-mute hover:text-ink">{label}</a>)}
          <button onClick={() => setLight(!light)} aria-label="Ganti tema" className="rounded-lg border border-line p-2 hover:border-accent">
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
        <div className="flex gap-2 md:hidden">
          <button onClick={() => setLight(!light)} aria-label="Ganti tema" className="rounded-lg border border-line p-2">{light ? <Moon size={18} /> : <Sun size={18} />}</button>
          <button onClick={() => setOpen(!open)} aria-label="Buka menu" className="rounded-lg border border-line p-2">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      {open && (
        <div className="flex flex-col border-t border-line px-5 py-3 md:hidden">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="py-3 text-mute">{label}</a>)}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const first = () => profile.name.split(" ")[0];
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-10 pt-24 md:grid-cols-[1fr_340px]">
      <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm text-mute">
          <span className="h-2 w-2 rounded-full bg-accent" /> Terbuka untuk magang
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-tight sm:text-7xl">Hi, i'm Theo</h1>
        <p className="font-display mt-3 text-2xl font-semibold text-mute sm:text-3xl">{profile.role}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{profile.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className={primary}>Projects</a>
          <a href={profile.cvUrl} download className={ghost}><Download size={16} /> Download CV</a>
          <a href="#contact" className={ghost}>Contact </a>
        </div>
        <p className="mt-10 border-t border-line pt-4 text-sm text-mute">Stack: {profile.stack.join(", ")}</p>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto w-full max-w-xs rounded-2xl border border-line bg-card p-3 md:max-w-none"
      >
        <img src={profile.photo} alt={`Foto ${profile.name}`} className="aspect-[4/5] w-full rounded-xl object-cover" />
        <div className="px-2 pb-1 pt-3">
          <p className="font-display font-semibold">{profile.name}</p>
          <p className="text-sm text-accent">Frontend Developer</p>
        </div>
      </motion.div>
    </section>
  );
}

function Thumb({ p }) {
  if (p.image) return <img src={p.image} alt={`Tampilan ${p.title}`} className="h-44 w-full object-cover" />;
  return (
    <div className="font-display flex h-44 items-center justify-center bg-gradient-to-br from-accent/30 to-card text-5xl font-extrabold text-accent/70">
      {p.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
    </div>
  );
}

function Projects() {
  const cats = ["All", ...new Set(projects.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);
  const shown = projects.filter((p) => cat === "All" || p.category === cat);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <Section id="projects" title="Project">
      <div className="mb-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-accent bg-accent text-[#06101f]" : "border-line text-mute hover:border-accent"}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <motion.article layout key={p.title} className="flex flex-col overflow-hidden rounded-xl border border-line bg-card">
            <button onClick={() => setSel(p)} className="text-left" aria-label={`Detail ${p.title}`}><Thumb p={p} /></button>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.problem}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => <span key={t} className="rounded-md bg-bg px-2 py-1 text-xs text-accent">{t}</span>)}
              </div>
              <div className="mt-5 flex gap-4 text-sm">
                <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-accent hover:underline"><ExternalLink size={14} /> Live demo</a>
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-mute hover:text-ink"><GithubIcon /> Source</a>}
                <button onClick={() => setSel(p)} className="ml-auto text-mute hover:text-ink">Detail</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5" role="dialog" aria-modal="true">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-xl border border-line bg-card">
              <Thumb p={sel} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold">{sel.title}</h3>
                  <button onClick={() => setSel(null)} aria-label="Tutup" className="rounded-lg border border-line p-1.5"><X size={16} /></button>
                </div>
                <p className="mt-4 text-mute">{sel.problem}</p>
                <p className="mt-4 text-sm"><b>Peranku:</b> <span className="text-mute">{sel.role}</span></p>
                <div className="mt-4 flex flex-wrap gap-2">{sel.tech.map((t) => <span key={t} className="rounded-md bg-bg px-2 py-1 text-xs text-accent">{t}</span>)}</div>
                <div className="mt-6 flex gap-3">
                  <a href={sel.demo} target="_blank" rel="noreferrer" className={primary}>Buka live demo</a>
                  {sel.repo && <a href={sel.repo} target="_blank" rel="noreferrer" className={ghost}>GitHub</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skill & tech stack">
      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="rounded-xl border border-line bg-card p-6">
            <h3 className="font-display mb-4 font-semibold">{group}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => <li key={s} className="rounded-md border border-line px-3 py-1.5 text-sm text-mute">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-mute">
        {about.map((t) => <p key={t}>{t}</p>)}
      </div>
    </Section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    data.append("access_key", profile.web3formsKey);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setStatus("ok"); e.target.reset(); } else setStatus("error");
    } catch { setStatus("error"); }
  }
  const input = "w-full rounded-lg border border-line bg-card px-4 py-2.5 text-sm outline-none focus:border-accent";
  return (
    <Section id="contact" title="Contact Me">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="max-w-sm text-lg text-mute">Interested in discussing internship opportunities or project collaborations? Feel free to send a message using the form below, and I will get back to you as soon as possible.</p>
          <div className="mt-6 flex gap-3">
            <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-lg border border-line p-3 hover:border-accent"><Mail size={20} /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg border border-line p-3 hover:border-accent"><GithubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg border border-line p-3 hover:border-accent"><LinkedinIcon /></a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="name" required placeholder="Nama" aria-label="Nama" className={input} />
          <input name="email" type="email" required placeholder="Email" aria-label="Email" className={input} />
          <textarea name="message" required rows={5} placeholder="Pesan" aria-label="Pesan" className={input} />
          <button disabled={status === "sending"} className={primary}>{status === "sending" ? "Mengirim..." : "Kirim pesan"}</button>
          {status === "ok" && <p className="text-sm text-accent">Pesan terkirim. Terima kasih!</p>}
          {status === "error" && <p className="text-sm text-red-400">Pesan gagal terkirim. Cek koneksi atau access key Web3Forms, lalu coba lagi.</p>}
        </form>
      </div>
    </Section>
  );
}

export default function App() {
  const [light, setLight] = useState(() => localStorage.getItem("theme") === "light");
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);
  return (
    <>
      <Nav light={light} setLight={setLight} />
      <main>
        <Hero /><About /><Projects /><Skills /><Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-mute">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}

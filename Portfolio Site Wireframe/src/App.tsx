import { useEffect, useMemo, useState } from "react";

type Page = "home" | "work" | "gallery" | "about" | "scrapbook";
type Filter = "All" | "Web" | "Music" | "Visual";

const navItems: { id: Page; label: string; mark: string }[] = [
  { id: "home", label: "Start", mark: "P1" },
  { id: "work", label: "Quests", mark: "Q2" },
  { id: "gallery", label: "Sprites", mark: "G3" },
  { id: "about", label: "Player", mark: "XP" },
  { id: "scrapbook", label: "Logs", mark: "L5" },
];

const projects = [
  {
    title: "Starry Knight",
    type: "Web",
    year: "2026",
    status: "Live concept",
    summary: "A compact personal site with journal blocks, art previews, and a tactile old-web navigation system.",
    palette: "from-[#2f4f2f] via-[#14213d] to-[#0b1020]",
  },
  {
    title: "Daft Patience",
    type: "Music",
    year: "2025",
    status: "Release kit",
    summary: "Album page, listening links, press notes, and a tidy archive for singles, EPs, and collaborations.",
    palette: "from-[#607744] via-[#23351f] to-[#0b1020]",
  },
  {
    title: "Pocket Gallery",
    type: "Visual",
    year: "2024",
    status: "Prototype",
    summary: "A responsive gallery system for illustrations, sketches, prints, thumbnails, and process notes.",
    palette: "from-[#8b7d4a] via-[#3c3a2e] to-[#111318]",
  },
  {
    title: "Net Label Desk",
    type: "Web",
    year: "2024",
    status: "Case study",
    summary: "A dashboard-like microsite for catalog browsing, event notes, contributor credits, and shop links.",
    palette: "from-[#465362] via-[#252a34] to-[#080b10]",
  },
];

const gallery = [
  { title: "Poster Grid", tag: "layout", color: "bg-[#607744]" },
  { title: "Tape Insert", tag: "print", color: "bg-[#8b7d4a]" },
  { title: "Pixel Shrine", tag: "web", color: "bg-[#2f4f2f]" },
  { title: "Moon Logo", tag: "brand", color: "bg-[#465362]" },
  { title: "Show Flyer", tag: "event", color: "bg-[#6f5e3f]" },
  { title: "Icon Sheet", tag: "system", color: "bg-[#38423b]" },
];

const updates = [
  "Quest slot open: small web commissions for September.",
  "Inventory update: music archive is being cleaned.",
  "New sprites unlocked: sketchbook scans are moving in.",
];

const links = ["Email", "Bandcamp", "SoundCloud", "Instagram", "Ko-fi"];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8d98b] [text-shadow:2px_2px_0_#080b10]">
      {children}
    </span>
  );
}

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="retro-panel">
      <div className="retro-panel-header">
        <div className="flex min-w-0 items-center gap-2">
          <span className="window-light bg-[#c8d98b]" />
          <span className="window-light bg-[#8b7d4a]" />
          <span className="window-light bg-[#465362]" />
          <Kicker>{title}</Kicker>
        </div>
        {action}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function PixelPreview({ palette, label }: { palette: string; label: string }) {
  return (
    <div className={`relative min-h-40 overflow-hidden border-2 border-[#1a1423] bg-gradient-to-br ${palette}`}>
      <div className="pixel-grid absolute inset-0 opacity-45" />
      <div className="absolute left-4 top-4 h-12 w-20 border-2 border-[#1a1423] bg-[#fff8dc] shadow-[6px_6px_0_#1a1423]" />
      <div className="absolute right-6 top-8 h-10 w-10 rotate-12 border-2 border-[#1a1423] bg-[#ff5d73]" />
      <div className="absolute bottom-4 right-4 h-16 w-24 border-2 border-[#1a1423] bg-[#240046] p-2 shadow-[6px_6px_0_rgba(26,20,35,.55)]">
        <div className="mb-2 h-2 w-full bg-[#ffd166]" />
        <div className="h-2 w-2/3 bg-[#41ead4]" />
      </div>
      <span className="absolute bottom-3 left-4 border-2 border-[#1a1423] bg-[#fff8dc] px-2 py-1 font-mono text-[10px] font-black uppercase">
        {label}
      </span>
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="hero-window min-h-[430px] px-5 py-6 sm:px-7 sm:py-8">
          <Kicker>Player 1 portfolio / art / music / web</Kicker>
          <h1 className="retro-title mt-4 max-w-2xl text-5xl font-black leading-[0.95] text-[#1a1423] sm:text-7xl">
            Davinci
            <span className="mt-2 block text-[#d8c170]">arcade files</span>
          </h1>
          <p className="mt-5 max-w-xl border-l-4 border-[#c8d98b] bg-[#080b10]/90 px-4 py-3 text-base font-semibold leading-7 text-[#d7dec5] sm:text-lg">
            A playable retro portfolio for projects, releases, gallery work, notes, and contact links. Browse it like a
            save file: quick menus, bright rewards, and every section ready to update.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => document.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: "work" }))} className="btn-primary">
              Press Start
            </button>
            <a className="btn-secondary" href="mailto:hello@example.com">
              Send Message
            </a>
          </div>
          <div className="hud-bars mt-7 max-w-lg">
            <div>
              <span>HP</span>
              <strong style={{ width: "92%" }} />
            </div>
            <div>
              <span>XP</span>
              <strong style={{ width: "76%" }} />
            </div>
          </div>
        </div>

        <Panel title="Quest Log">
          <div className="space-y-3">
            {updates.map((update) => (
              <div key={update} className="flex gap-3 border-2 border-[#080b10] bg-[#1f2a24] p-3 shadow-[3px_3px_0_#080b10]">
                <span className="mt-1 h-3 w-3 shrink-0 bg-[#c8d98b] shadow-[3px_3px_0_#080b10]" />
                <p className="text-sm font-black text-[#d7dec5]">{update}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <Panel title="Featured Quests">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="group border-2 border-[#1a1423] bg-[#fff8dc] p-3 shadow-[6px_6px_0_#1a1423] transition-transform hover:-translate-y-1">
      <PixelPreview palette={project.palette} label={project.type} />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-[#1a1423]">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#153243]">
            {project.year} / {project.status}
          </p>
        </div>
        <span className="border-2 border-[#080b10] bg-[#c8d98b] px-2 py-1 font-mono text-[10px] font-black uppercase text-[#080b10]">
          Play
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#2f243a]">{project.summary}</p>
    </article>
  );
}

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.type === filter)),
    [filter],
  );

  return (
    <div className="space-y-5">
      <Panel
        title="Quest Select"
        action={
          <span className="border-2 border-[#080b10] bg-[#111318] px-2 py-1 font-mono text-[10px] uppercase text-[#c8d98b]">
            {visibleProjects.length} carts
          </span>
        }
      >
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {(["All", "Web", "Music", "Visual"] as Filter[]).map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={filter === item ? "chip-active" : "chip"}>
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function GalleryPage() {
  return (
    <Panel title="Sprite Gallery">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <article key={item.title} className="border-2 border-[#1a1423] bg-[#fff8dc] p-3 shadow-[4px_4px_0_#1a1423]">
            <div className={`${item.color} pixel-grid grid aspect-[4/3] place-items-center border-2 border-[#1a1423]`}>
              <div className="h-20 w-20 rotate-3 border-4 border-[#1a1423] bg-[#fff8dc] shadow-[8px_8px_0_rgba(26,20,35,.45)]" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <h3 className="font-black text-[#1a1423]">{item.title}</h3>
              <Kicker>{item.tag}</Kicker>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function AboutPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
      <Panel title="Player Card">
        <div className="mx-auto mb-4 grid h-40 w-40 place-items-center border-4 border-[#080b10] bg-[#607744] shadow-[8px_8px_0_#080b10]">
          <span className="font-mono text-5xl font-black text-[#080b10]">DV</span>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black text-[#1a1423]">Digital maker</h2>
          <p className="text-sm font-semibold leading-6 text-[#2f243a]">Art direction, small websites, release pages, visual systems, and indie-web experiments.</p>
        </div>
      </Panel>
      <Panel title="Player Stats">
        <div className="space-y-4 text-[#2f243a]">
          <p className="leading-7">
            This site is designed as a playable portfolio: part homepage, part archive, part studio notebook. The layout
            keeps every level reachable in one tap while leaving room for personality, notes, and evolving work.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["React", "Art direction", "Responsive UI"].map((skill) => (
              <div key={skill} className="border-2 border-[#1a1423] bg-[#fff275] p-3 font-mono text-xs font-black uppercase shadow-[3px_3px_0_#1a1423]">
                {skill}
              </div>
            ))}
          </div>
          <div className="border-2 border-[#1a1423] bg-[#fff8dc] p-4">
            <Kicker>Available for</Kicker>
            <p className="mt-2 font-black text-[#1a1423]">Portfolio sites, microsites, release pages, landing pages, and visual identity support.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ScrapbookPage() {
  return (
    <div className="space-y-5">
      <Panel title="Save Files">
        <div className="space-y-3">
          {[
            ["04 Sep 2026", "Refining the homepage into a usable launch version."],
            ["28 Aug 2026", "Collecting references for a warmer retro palette."],
            ["12 Aug 2026", "Sorting old drawings into printable collections."],
          ].map(([date, note]) => (
            <article key={date} className="border-2 border-[#1a1423] bg-[#fff8dc] p-4 shadow-[4px_4px_0_#1a1423]">
              <Kicker>{date}</Kicker>
              <p className="mt-2 font-black text-[#1a1423]">{note}</p>
            </article>
          ))}
        </div>
      </Panel>
      <Panel title="Link Portal">
        <div className="grid gap-2 sm:grid-cols-5">
          {links.map((link) => (
            <a key={link} href={link === "Email" ? "mailto:hello@example.com" : "#"} className="link-tile">
              {link}
            </a>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    const handler = (event: Event) => {
      const nextPage = (event as CustomEvent<Page>).detail;
      if (nextPage) setPage(nextPage);
    };
    document.addEventListener("portfolio:navigate", handler);
    return () => document.removeEventListener("portfolio:navigate", handler);
  }, []);

  const pageContent: Record<Page, React.ReactNode> = {
    home: <HomePage />,
    work: <WorkPage />,
    gallery: <GalleryPage />,
    about: <AboutPage />,
    scrapbook: <ScrapbookPage />,
  };

  return (
    <div className="site-shell min-h-full text-[#d7dec5]">
      <header className="sticky top-0 z-40 border-b-4 border-[#080b10] bg-[#111318]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left">
            <span className="grid h-11 w-11 place-items-center border-2 border-[#080b10] bg-[#607744] font-mono text-sm font-black text-[#080b10] shadow-[4px_4px_0_#080b10]">
              DV
            </span>
            <span>
              <span className="block font-black leading-none text-[#d7dec5]">Davinci</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c8d98b]">Arcade OS</span>
            </span>
          </button>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setPage(item.id)} className={page === item.id ? "nav-active" : "nav-item"}>
                <span>{item.mark}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 pb-28 md:py-7 md:pb-10">{pageContent[page]}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t-4 border-[#080b10] bg-[#111318] md:hidden">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setPage(item.id)} className={page === item.id ? "mobile-nav-active" : "mobile-nav-item"}>
            <span className="font-mono text-[10px]">{item.mark}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

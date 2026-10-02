import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@/tatafa.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import { content, LANGS, type Lang, type ZoneId } from "@/tatafa-content";

const A = import.meta.env.BASE_URL + "assets/tatafa/";
// Full-size image on desktop, a ~1100px copy on phones; small() is for thumbnails and insets everywhere.
const pic = (name: string, mobile: string = name) => ({ src: `${A}${name}.webp`, srcSet: `${A}m/${mobile}.webp 1100w, ${A}${name}.webp 2400w`, sizes: "(max-width:700px) 360px, 100vw" });
const small = (name: string) => `${A}s/${name}.webp`;
const MAPS_URL = "https://maps.app.goo.gl/nLr2LjTFY4kTdrXP9";
const WIKI_URL = "https://en.wikipedia.org/wiki/Tatafa";
// Where the "discuss entry terms" button leads: put the real address here, e.g. "mailto:name@domain" or a Telegram link.
const CONTACT_URL = "mailto:";
const LANG_KEY = "tatafa-lang";

// Structure only. Every word shown on the page comes from tatafa-content.ts.
type Zone = { id: ZoneId; x: number; y: number; images: string[]; category: "proposed" | "concept"; build?: string };
const zones: Zone[] = [
  { id: "marina", x: 15, y: 42, images: ["marina", "marina-view"], category: "proposed" },
  { id: "air", x: 6, y: 50, images: ["seaplanes", "seaplane-pier", "ekranoplan"], category: "concept" },
  { id: "coast", x: 30, y: 70, images: ["coast-sunset", "coast"], category: "concept" },
  { id: "domes", x: 67, y: 81, images: ["domes", "dome-pier", "dome-interior"], category: "concept", build: "dome-assembly" },
  { id: "medical", x: 55, y: 84, images: ["medical"], category: "concept" },
  { id: "center", x: 69, y: 51, images: ["civic", "centre-plaza"], category: "concept" },
  { id: "north", x: 69, y: 21, images: ["northern", "northern-top"], category: "concept" },
  { id: "east", x: 92, y: 63, images: ["eastern-sunset", "eastern"], category: "concept" },
  { id: "manta", x: 91, y: 29, images: ["manta", "manta-sunset"], category: "concept" },
];
const historyImages: { image: string; pos?: string }[] = [
  { image: "history-1", pos: "20% center" },
  { image: "history-2", pos: "30% center" },
  { image: "history-3" },
  { image: "history-4", pos: "55% center" },
  { image: "history-5", pos: "25% center" },
];
// Map points are real coordinates on a 1000x800 canvas that matches the satellite crop (138°E–162°W, 5°S–48°S).
const places = [
  { id: "fiji", x: 674, y: 244 },
  { id: "nz", x: 613, y: 593 },
  { id: "au", x: 220, y: 537 },
] as const;
const routeIds = ["arrival", "mobility", "pedestrian"] as const;
const routePaths: Record<(typeof routeIds)[number], string> = {
  arrival: "M 40 255 L 84 245 L 143 232 L 189 280 L 264 273",
  mobility: "M 214 330 Q 430 310 590 265 Q 710 240 843 267",
  pedestrian: "M 746 355 Q 720 310 700 273 Q 690 210 704 152",
};
const privilegeImages = [
  { image: "northern-top", pos: "42% center" },
  { image: "coast-sunset", pos: "78% center" },
  { image: "history-5", pos: "30% center" },
  { image: "centre-plaza", pos: "22% center" },
  { image: "trade-cruise", pos: "48% center" },
  { image: "dome-interior", pos: "30% center" },
];
const economicsSources = [
  { label: "COMO Laucala rates · Matador Network", url: "https://matadornetwork.com/watch/como-laucala-island/" },
  { label: "COMO Laucala rates · Blue Sky Luxury Travels", url: "https://www.blueskyluxurytravels.com/islands/laucala-fiji/rates.html" },
  { label: "Kokomo Private Island · InsideHook", url: "https://www.insidehook.com/travel/fijis-private-island-resort-100000" },
  { label: "Kokomo Private Island · Luxury Travel Magazine", url: "https://www.luxurytravelmag.com.au/accommodations/kokomo-private-island-fiji" },
  { label: "Maldives villa returns · FinancialContent", url: "https://markets.financialcontent.com/wral/article/abnewswire-2025-10-29-the-true-math-behind-maldives-villa-returns" },
  { label: "Maldives tourism report · Corporate Maldives", url: "https://corporatemaldives.com/report-from-volume-to-value-rethinking-success-in-maldives-tourism/" },
  { label: "2024 Tonga Visitor Survey · Pacific Tourism Organisation", url: "https://southpacificislands.travel/pacific-tourism-organisation-releases-2024-tonga-visitor-survey-new-data-highlights-tourism-trends-and-economic-impact/" },
  { label: "Tonga tourism statistics · The Contemporary Tourist", url: "https://intelligence.thecontemporarytourist.com/countries/tonga" },
  { label: "Tonga welcomes 30 cruise ships in 2025 · Talanoa ʻo Tonga", url: "https://talanoaotonga.to/tonga-welcomes-30-cruise-ships-in-2025/" },
];
// Revenue in $ million; ranges are the low/high estimates for the neighbours.
const ECO_MAX = 100;
const ecoBars: { kind: "neighbour" | "ours"; index: number; value: number; range?: [number, number]; base?: boolean }[] = [
  { kind: "neighbour", index: 0, value: 26, range: [16, 37] },
  { kind: "neighbour", index: 1, value: 20, range: [13, 27] },
  { kind: "ours", index: 0, value: 25 },
  { kind: "ours", index: 1, value: 55, base: true },
  { kind: "ours", index: 2, value: 95 },
];
const neighbourSources = [[0, 1], [2, 3]];
const investorKinds = ["fixed", "state", "open"];
const sectionHrefs = ["#today", "#tonga", "#location", "#masterplan", "#objects", "#privileges", "#investor"];
const byId = (id: string) => zones.find((z) => z.id === id) ?? zones[0];
const two = (n: number) => String(n).padStart(2, "0");
const isLang = (v: unknown): v is Lang => LANGS.some((l) => l.id === v);

export const Route = createFileRoute("/")({ component: TatafaPage });

function TatafaPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [selected, setSelected] = useState<ZoneId>("marina");
  const [hovered, setHovered] = useState<ZoneId | null>(null);
  const [comparison, setComparison] = useState(38);
  const [infra, setInfra] = useState("");
  const [shot, setShot] = useState(0);
  const [menu, setMenu] = useState(false);
  const [priv, setPrivRaw] = useState(0);
  const [seenPriv, setSeenPriv] = useState([0]);
  const setPriv = (i: number) => { setPrivRaw(i); setSeenPriv((seen) => (seen.includes(i) ? seen : [...seen, i])); };
  const t = content[lang];
  const pick = (id: ZoneId) => { setSelected(id); setShot(0); };
  const active = byId(hovered ?? selected);
  const current = byId(selected);
  const activeText = t.zones[active.id];
  const currentText = t.zones[current.id];
  const many = current.images.length > 1;

  // Language: ?lang= in the address wins, then the last choice, then the browser language. Russian is the default.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(LANG_KEY); } catch { /* storage may be blocked */ }
    const browser = navigator.language.toLowerCase();
    const guess = browser.startsWith("zh") ? "zh" : browser.startsWith("ru") ? "ru" : browser.startsWith("en") ? "en" : null;
    const next = [fromUrl, stored, guess].find(isLang);
    if (next) setLang(next);
  }, []);
  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.id === lang)?.htmlLang ?? lang;
    document.title = t.meta.title;
  }, [lang, t]);
  const chooseLang = (next: Lang) => {
    setLang(next);
    try { window.localStorage.setItem(LANG_KEY, next); } catch { /* storage may be blocked */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  };

  const root = useRef<HTMLElement>(null);
  // Blocks ease in as they enter the viewport. Without JS (or before hydration) everything is simply visible.
  // Position is checked on scroll and on a slow timer, so nothing can stay hidden if a scroll event is missed.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const selector = ".section-wrap > *:not(.is-in), .offer-content > *:not(.is-in), .footer-main > *:not(.is-in)";
    // Queried live on every pass: blocks can be re-created (language switch, hot reload) after the first render.
    const check = () => {
      const limit = window.innerHeight * 0.94;
      el.querySelectorAll<HTMLElement>(selector).forEach((item) => {
        if (item.getBoundingClientRect().top <= limit) item.classList.add("is-in");
      });
    };
    const timer = window.setInterval(check, 500);
    const stop = () => { window.clearInterval(timer); window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    el.classList.add("reveal-ready");
    check();
    return stop;
  }, []);
  const mapScroll = useRef<HTMLDivElement>(null);
  // On phones the map is wider than the screen: keep the selected zone in view.
  useEffect(() => {
    const el = mapScroll.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: (byId(selected).x / 100) * el.scrollWidth - el.clientWidth / 2, behavior: "smooth" });
  }, [selected]);
  const objectTabs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = objectTabs.current;
    const tab = el?.querySelector<HTMLElement>("button.active");
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: tab.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  }, [selected]);

  const arrow = <span aria-hidden="true">↗</span>;
  const sectionLinks = sectionHrefs.map((href, i) => <a key={href} href={href} onClick={() => setMenu(false)}>{t.nav.sections[i]}</a>);
  const langSwitch = (
    <div className="lang-switch" role="group" aria-label={t.nav.langAria}>
      <svg className="lang-globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" /></svg>
      {LANGS.map((l) => (
        <button type="button" key={l.id} lang={l.htmlLang} aria-pressed={lang === l.id} className={lang === l.id ? "active" : ""} onClick={() => chooseLang(l.id)}>{l.label}</button>
      ))}
    </div>
  );

  return (
    <main id="top" className="tatafa-site" ref={root} data-lang={lang}>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label={t.nav.homeAria}>TATAFA<span className="wordmark-rule" /></a>
        <nav aria-label={t.nav.mainAria}>{sectionLinks}</nav>
        {langSwitch}
        <button type="button" className="nav-menu" aria-expanded={menu} aria-controls="site-menu" onClick={() => setMenu(!menu)}>{menu ? t.nav.close : t.nav.menu}</button>
        <div id="site-menu" className={`site-menu ${menu ? "is-open" : ""}`} hidden={!menu}>
          <nav aria-label={t.nav.menuAria}>
            {sectionLinks}
            <a className="site-menu-cta" href="#contact" onClick={() => setMenu(false)}>{t.nav.cta} {arrow}</a>
          </nav>
        </div>
      </header>

      <section className="hero-vision" aria-label={t.hero.aria}>
        <img {...pic("master", "hero")} alt={t.hero.alt} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-heading"><p>{t.hero.kicker}</p><h1>TATAFA</h1><span>{t.hero.tagline}</span></div>
        <a className="hero-explore" href="#masterplan">{t.nav.openMap} {arrow}</a>
        <span className="hero-status">{t.hero.status}</span>
      </section>

      <section id="today" className="today-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.today.kicker}</span><h2>{t.today.title}</h2></div>
        <div className="today-composition">
          <figure>
            <div className="comparison-frame">
              <img {...pic("existing-compare")} alt={t.today.altExisting} loading="lazy" />
              <img className="comparison-future" {...pic("master")} alt={t.today.altProposed} loading="lazy" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }} />
              <div className="comparison-divider" style={{ left: `${comparison}%` }} />
              <label className="comparison-access">{t.today.sliderLabel}<input aria-label={t.today.sliderAria} type="range" min="0" max="100" value={comparison} onChange={(e) => setComparison(Number(e.target.value))} /></label>
              <span className="comparison-current">{t.today.existing}</span>
              <span className="comparison-proposed">{t.today.proposed}</span>
            </div>
            <figcaption><span>{t.today.caption}</span><a href={MAPS_URL} target="_blank" rel="noreferrer">{t.today.mapsLink} {arrow}</a></figcaption>
          </figure>
          <aside className="today-facts">
            <span>{t.today.place[0]}<br />{t.today.place[1]}<em>{t.today.region}</em></span>
            {t.today.facts.map((f) => (
              <div key={f.label}><strong>{f.value.split("\n").map((line, i) => <span key={line}>{i > 0 ? <br /> : null}{line}</span>)}</strong><small>{f.label}</small></div>
            ))}
            <p className="today-source">{t.today.source}</p>
            <nav className="today-links" aria-label={t.today.sourcesAria}>
              <a href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps {arrow}</a>
              <a href={WIKI_URL} target="_blank" rel="noreferrer">Wikipedia {arrow}</a>
            </nav>
          </aside>
        </div>
      </section>

      <section id="tonga" className="history-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.history.kicker}</span><h2>{t.history.title}</h2><p>{t.history.lead}</p></div>
        <ol className="history-track">
          {t.history.items.map((h, i) => (
            <li key={h.year} className="history-card">
              <div className="history-image" style={{ backgroundImage: `url(${A}m/${historyImages[i].image}.webp)`, backgroundPosition: historyImages[i].pos }} role="img" aria-label={h.title} />
              <span className="history-year">{h.year}</span><h3>{h.title}</h3><p>{h.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="location" className="location-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.location.kicker}</span><h2>{t.location.title}</h2><p>{t.location.lead}</p></div>
        <div className="location-layout">
          <figure className="location-figure">
            <svg className="location-map" viewBox="0 0 1000 800" role="img" aria-label={t.location.mapAria}>
              <image href={A + "region-map.webp"} x="0" y="0" width="1000" height="800" preserveAspectRatio="none" />
              <rect className="location-shade" x="0" y="0" width="1000" height="800" />
              <g className="location-rings"><circle cx="793" cy="277" r="167" /><circle cx="793" cy="277" r="334" /><circle cx="793" cy="277" r="501" /><text x="793" y="462">{t.location.ring1}</text><text x="793" y="629">{t.location.ring2}</text></g>
              <g className="location-lines">{places.map((p) => <line key={p.id} x1="793" y1="277" x2={p.x} y2={p.y} />)}<line x1="793" y1="277" x2="780" y2="300" /></g>
              {places.map((p) => (
                <g key={p.id} className="location-place">
                  <circle cx={p.x} cy={p.y} r="7" />
                  <text x={p.x} y={p.y - 20} textAnchor="middle">{t.location.places[p.id].name}</text>
                  <text className="location-dist" x={p.x} y={p.y + 30} textAnchor="middle">{t.location.places[p.id].dist}</text>
                </g>
              ))}
              <g className="location-place location-minor"><circle cx="780" cy="300" r="5" /><text x="798" y="322" textAnchor="start">{t.location.capital}</text></g>
              <g className="location-home"><circle cx="793" cy="277" r="22" /><circle cx="793" cy="277" r="8" /><text x="824" y="270" textAnchor="start">TATAFA</text></g>
            </svg>
            <figcaption>{t.location.credit}</figcaption>
          </figure>
          <div className="location-facts">
            {places.map((p) => <div key={p.id}><span>{t.location.places[p.id].time}</span><h3>{t.location.places[p.id].name}</h3><p>{t.location.places[p.id].text}</p></div>)}
            <div><span>{t.location.local.time}</span><h3>{t.location.local.title}</h3><p>{t.location.local.text}</p></div>
          </div>
        </div>
        <div className="location-cruise">
          <img className="location-cruise-image" {...pic("location-cruise")} alt={t.location.cruise.alt} loading="lazy" />
          <div className="location-cruise-copy">
            <span className="micro-kicker">{t.location.cruise.kicker}</span>
            <h3>{t.location.cruise.title}</h3>
            <dl>{t.location.cruise.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}</dl>
            <p>{t.location.cruise.text}</p>
          </div>
        </div>
      </section>

      <section id="masterplan" className="map-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.map.kicker}</span><h2>{t.map.title}</h2><p>{t.map.lead}</p></div>
        <div className="masterplan-layout">
          <div className="map-column">
            <div className="map-scroll" ref={mapScroll}>
              <div className="map-canvas">
                <img {...pic("master")} alt={t.map.alt} loading="lazy" />
                <svg className="map-routes" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
                  {routeIds.map((id) => <path key={id} className={infra === id ? "route-on" : ""} d={routePaths[id]} />)}
                </svg>
                {zones.map((z) => (
                  <button key={z.id} type="button" className={`map-hotspot ${selected === z.id ? "is-active" : ""}`} style={{ left: `${z.x}%`, top: `${z.y}%` }}
                    onClick={() => pick(z.id)} onMouseEnter={() => setHovered(z.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(z.id)} onBlur={() => setHovered(null)}
                    aria-label={`${t.map.show}: ${t.zones[z.id].title}`} aria-pressed={selected === z.id}><span /></button>
                ))}
              </div>
            </div>
            <p className="map-hint" aria-hidden="true">{t.map.hint}</p>
          </div>
          <aside className="map-inspector">
            <span className="inspector-status">{t.categories[active.category]}</span>
            <div className="inspector-image" style={{ backgroundImage: `url('${A}m/master.webp')`, backgroundSize: "270%", backgroundPosition: `${active.x}% ${active.y}%` }} role="img" aria-label={`${t.map.zoom}: ${activeText.title}`} />
            <img className="inspector-detail" src={small(active.images[0])} alt={`${t.map.visual}: ${activeText.title}`} loading="lazy" />
            <h3>{activeText.title}</h3><p>{activeText.subtitle}</p><small>{activeText.note}</small>
            <a href="#objects" onClick={() => pick(active.id)}>{t.map.view} {arrow}</a>
          </aside>
        </div>
        <div className="map-index" aria-label={t.map.indexAria}>
          {zones.map((z) => <button type="button" key={z.id} className={selected === z.id ? "active" : ""} onClick={() => pick(z.id)}>{t.zones[z.id].title}</button>)}
        </div>
        <div className="map-routes-bar">
          <span className="map-routes-label">{t.map.routesLabel}</span>
          {routeIds.map((id) => (
            <button type="button" key={id} onClick={() => setInfra(infra === id ? "" : id)} aria-pressed={infra === id} className={infra === id ? "active" : ""}><strong>{t.map.routes[id].label}</strong><small>{t.map.routes[id].detail}</small></button>
          ))}
          <p className="map-routes-note">{t.map.routesNote}</p>
        </div>
      </section>

      <section id="objects" className="objects-section section-wrap">
        <div className="section-heading"><h2>{t.objects.title}</h2><p>{t.objects.lead}</p></div>
        <div className="objects-layout">
          <div className="objects-list" ref={objectTabs} role="tablist" aria-label={t.objects.tabsAria}>
            {zones.map((z) => <button type="button" role="tab" key={z.id} aria-selected={selected === z.id} onClick={() => pick(z.id)} className={selected === z.id ? "active" : ""}><span>{t.zones[z.id].title}</span>{arrow}</button>)}
          </div>
          <div className="object-stage" role="tabpanel">
            <figure>
              <div className="object-frame">
                <img className="object-shot" key={selected + shot} {...pic(current.images[shot])} alt={`${t.objects.shotAlt}: ${currentText.title}, ${t.objects.shot.toLowerCase()} ${shot + 1}`} loading="lazy" />
                <div className="object-location"><img src={small("master")} alt={t.objects.locationAlt} loading="lazy" /><span style={{ left: `${current.x}%`, top: `${current.y}%` }} /></div>
                {many ? (
                  <>
                    <button type="button" className="object-arrow object-prev" onClick={() => setShot((shot + current.images.length - 1) % current.images.length)} aria-label={t.objects.prev}><span aria-hidden="true">←</span></button>
                    <button type="button" className="object-arrow object-next" onClick={() => setShot((shot + 1) % current.images.length)} aria-label={t.objects.next}><span aria-hidden="true">→</span></button>
                    <span className="object-count" aria-live="polite">{shot + 1} / {current.images.length}</span>
                  </>
                ) : null}
              </div>
              {many ? (
                <div className="object-thumbs" role="group" aria-label={t.objects.shotsAria}>
                  {current.images.map((img, i) => <button type="button" key={img} onClick={() => setShot(i)} aria-pressed={shot === i} aria-label={`${t.objects.shot} ${i + 1}`} className={shot === i ? "active" : ""}><img src={small(img)} alt="" loading="lazy" /></button>)}
                  <span className="object-thumbs-hint">{t.objects.shotsCount(current.images.length)}</span>
                </div>
              ) : null}
              <figcaption><strong>{currentText.title}</strong><span>{currentText.subtitle}</span><small>{t.categories[current.category]}</small></figcaption>
            </figure>
            {currentText.stats ? <dl className="object-stats">{currentText.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}</dl> : null}
            <p className="object-note">{currentText.note}</p>
            {currentText.includes ? <ul className="object-includes" aria-label={t.objects.includesAria}>{currentText.includes.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            {current.build && currentText.build ? (
              <div className="object-build">
                <img {...pic(current.build)} alt={t.objects.buildAlt} loading="lazy" />
                <div><span className="micro-kicker">{currentText.build.kicker}</span><h3>{currentText.build.title}</h3><p>{currentText.build.text}</p><small>{t.objects.buildCredit}</small></div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="privileges" className="privileges-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.privileges.kicker}</span><h2>{t.privileges.title}</h2><p>{t.privileges.lead}</p></div>
        <div className="privileges-layout">
          <div className="privileges-visual" aria-hidden="true">
            {privilegeImages.map((p, i) => seenPriv.includes(i) ? <img key={p.image} {...pic(p.image)} alt="" loading="lazy" style={{ objectPosition: p.pos }} className={priv === i ? "is-on" : ""} /> : null)}
            <div className="privileges-visual-caption"><strong>{two(priv + 1)}</strong><span>{t.privileges.items[priv].tag}</span></div>
          </div>
          <ol className="privileges-list">
            {t.privileges.items.map((p, i) => (
              <li key={p.title} className={priv === i ? "is-on" : ""}>
                <button type="button" onClick={() => setPriv(i)} onMouseEnter={() => setPriv(i)} onFocus={() => setPriv(i)} aria-pressed={priv === i}>
                  <span className="privilege-number">{two(i + 1)}</span>
                  <span className="privilege-body"><span className="privilege-tag">{p.tag}</span><span className="privilege-title">{p.title}</span><span className="privilege-text">{p.text}</span></span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="privileges-note">{t.privileges.note}</p>
      </section>

      <section id="why-now" className="why-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.why.kicker}</span><h2>{t.why.title}</h2><p>{t.why.lead}</p></div>
        <ol className="why-list">{t.why.items.map((w, i) => <li key={w.title}><span className="why-number">{two(i + 1)}</span><h3>{w.title}</h3><p>{w.text}</p></li>)}</ol>
      </section>

      <section id="economics" className="economics-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.economics.kicker}</span><h2>{t.economics.title}</h2><p>{t.economics.lead}</p></div>

        <figure className="eco-chart">
          <figcaption><span>{t.economics.chartTitle}</span><span className="eco-badge">{t.economics.badge}</span></figcaption>
          <ol>
            {ecoBars.map((bar) => {
              const name = bar.kind === "neighbour" ? t.economics.neighbours[bar.index].name : `${t.economics.tatafa} · ${t.economics.scenarios[bar.index].name}`;
              const value = bar.kind === "neighbour" ? t.economics.neighbours[bar.index].revenue : t.economics.scenarios[bar.index].total;
              return (
                <li key={bar.kind + bar.index} className={`eco-bar eco-bar-${bar.kind} ${bar.base ? "is-base" : ""}`}>
                  <span className="eco-bar-name">{name}</span>
                  <span className="eco-bar-track">
                    {bar.range ? <i className="eco-bar-range" style={{ left: `${bar.range[0] / ECO_MAX * 100}%`, width: `${(bar.range[1] - bar.range[0]) / ECO_MAX * 100}%` }} /> : null}
                    <i className="eco-bar-fill" style={{ width: `${bar.value / ECO_MAX * 100}%` }} />
                  </span>
                  <strong className="eco-bar-value">{value}</strong>
                </li>
              );
            })}
          </ol>
        </figure>

        <div className="eco-block">
          <h3 className="eco-title">{t.economics.neighboursTitle}</h3>
          <div className="eco-neighbours">
            {t.economics.neighbours.map((n, i) => (
              <article key={n.name} className="eco-card">
                <header><strong>{n.name}</strong><span>{n.place}</span></header>
                <div className="eco-figure"><b>{n.revenue}</b><span>{t.economics.labels.revenue} · {n.range}</span></div>
                <dl>
                  <div><dt>{t.economics.labels.keys}</dt><dd>{n.keys}</dd></div>
                  <div><dt>{t.economics.labels.rate}</dt><dd>{n.rate}</dd></div>
                  <div><dt>{t.economics.labels.assumed}</dt><dd>{n.assumed}</dd></div>
                </dl>
                <p className="eco-refs">{t.economics.source}: {neighbourSources[i].map((s) => <a key={s} href={economicsSources[s].url} target="_blank" rel="noreferrer" title={economicsSources[s].label}>[{s + 1}]</a>)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="eco-block">
          <h3 className="eco-title">{t.economics.oursTitle}</h3>
          <p className="eco-lead">{t.economics.oursLead} <a className="eco-ref" href={economicsSources[4].url} target="_blank" rel="noreferrer" title={economicsSources[4].label}>[5]</a><a className="eco-ref" href={economicsSources[5].url} target="_blank" rel="noreferrer" title={economicsSources[5].label}>[6]</a></p>
          <div className="eco-scenarios">
            {t.economics.scenarios.map((s, i) => (
              <article key={s.name} className={`eco-card eco-scenario ${i === 1 ? "is-base" : ""}`}>
                <header><strong>{s.name}</strong><span>{t.economics.scLabels.occupancy} {s.occupancy}</span></header>
                <div className="eco-figure"><b>{s.total}</b><span>{t.economics.scLabels.total}</span></div>
                <div className="eco-pair">
                  <div><b>{s.profit}</b><span>{t.economics.scLabels.profit}</span></div>
                  <div><b>{s.payback}</b><span>{t.economics.scLabels.payback}</span></div>
                </div>
                <dl>
                  <div><dt>{t.economics.scLabels.rates}</dt><dd>{s.rates}</dd></div>
                  <div><dt>{t.economics.scLabels.rooms}</dt><dd>{s.rooms}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="eco-note">{t.economics.cruise} <a className="eco-ref" href={economicsSources[8].url} target="_blank" rel="noreferrer" title={economicsSources[8].label}>[9]</a></p>
        </div>

        <aside className="eco-caveat">
          <h3>{t.economics.risksTitle}</h3>
          <ul>
            <li>{t.economics.risks[0]} <a className="eco-ref" href={economicsSources[6].url} target="_blank" rel="noreferrer" title={economicsSources[6].label}>[7]</a><a className="eco-ref" href={economicsSources[7].url} target="_blank" rel="noreferrer" title={economicsSources[7].label}>[8]</a></li>
            <li>{t.economics.risks[1]}</li>
          </ul>
        </aside>

        <details className="eco-sources">
          <summary><span>{t.economics.sourcesTitle}</span><em>{economicsSources.length}</em></summary>
          <ol>{economicsSources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label} {arrow}</a></li>)}</ol>
        </details>
      </section>

      <section id="investor" className="investor-section section-wrap">
        <div className="section-heading"><span className="micro-kicker">{t.investor.kicker}</span><h2>{t.investor.title}</h2><p>{t.investor.lead}</p></div>
        <div className="investor-grid">
          {t.investor.groups.map((g, i) => (
            <div key={g.status} className={`investor-col investor-${investorKinds[i]}`}><span className="investor-status">{g.status}</span><ul>{g.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          ))}
        </div>
      </section>

      <section id="contact" className="offer-section" aria-labelledby="offer-title">
        <img {...pic("dome-pier")} alt="" loading="lazy" />
        <div className="offer-content">
          <span className="micro-kicker">{t.offer.kicker}</span>
          <h2 id="offer-title">{t.offer.title}</h2>
          <p>{t.offer.text}</p>
          <div className="offer-raise"><strong>{t.offer.raiseValue}</strong><span>{t.offer.raiseLabel}</span></div>
          <a className="offer-button" href={CONTACT_URL}>{t.offer.button}</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-wordmark" href="#top" aria-label={t.footer.brandAria}>TATAFA</a>
            <p>{t.footer.tagline}</p>
            <small>{t.footer.region}<br />{t.footer.coords}</small>
          </div>
          <nav className="footer-col" aria-label={t.footer.sectionsAria}>
            <span>{t.footer.sectionsTitle}</span>
            {sectionHrefs.map((href, i) => <a key={href} href={href}>{t.footer.links[i]}</a>)}
          </nav>
          <div className="footer-col">
            <span>{t.footer.contactsTitle}</span>
            <a href={CONTACT_URL}>{t.footer.contact} {arrow}</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer">{t.footer.maps} {arrow}</a>
            <a href={WIKI_URL} target="_blank" rel="noreferrer">{t.footer.wiki} {arrow}</a>
          </div>
        </div>
        <div className="footer-legal"><p>{t.footer.legal}</p><a href="#top" className="footer-top">{t.footer.top}</a></div>
      </footer>
    </main>
  );
}

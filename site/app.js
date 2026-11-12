// OrbitEngine plugin explorer. Plain ES module, no build step, no dependency.
//
// Data: ./index.json (deployed: pages.yml copies the repo-root index.json into the
// site artifact), falling back to ../index.json (serving the repo root locally).
// `?sample=1` loads ./sample-index.json INSTEAD: FICTIONAL data used ONLY to check the
// design without real data. It is never used otherwise.
//
// Security: every catalog string reaches the DOM through textContent / createElement
// (never innerHTML), and catalog URLs are only used when they are http(s).

const SUPPORTED_SCHEMA = 1;

const I18N = {
  en: {
    skip: "Skip to plugins",
    hero_title: "Plugin explorer",
    hero_lead: "Browse the official OrbitEngine plugins and extend the editor with new tools.",
    hero_cta: "Browse plugins",
    hero_install: "Install from the editor",
    plugins_h: "Plugins",
    search_label: "Search",
    search_ph: "Name, id, tag, author…",
    source_label: "Source",
    all_sources: "All sources",
    all_tags: "All",
    official: "Official",
    loading: "Loading the catalog…",
    count: (n, t) => (n === t ? `${t} plugin${t === 1 ? "" : "s"}` : `${n} of ${t} plugins`),
    empty_catalog: "No plugin has been published yet. Come back soon: the first official plugins are on their way.",
    empty_filter: "No plugin matches your search.",
    err_fetch: "Could not load the catalog (index.json). Check your connection and reload the page.",
    err_schema: "This catalog uses a newer format than this page understands. Reload the page, or update the site.",
    sample_banner: "Sample data (fictional): ?sample=1",
    theme_to_light: "Light theme",
    theme_to_dark: "Dark theme",
    lang_label: "Language",
    close: "Close",
    by: "by",
    latest: "Latest",
    no_versions: "No version published.",
    author: "Author",
    license: "License",
    homepage: "Homepage",
    tags: "Tags",
    id: "Id",
    source: "Source",
    versions: "Versions",
    released: "Released",
    changelog: "Changelog",
    no_builds: "No build in this version.",
    th_editor: "Editor",
    th_platform: "Platform",
    th_profile: "Profile",
    th_size: "Size",
    th_sha: "SHA-256",
    th_sig: "Signature",
    th_dl: "Download",
    download: "Download",
    copy: "Copy",
    copied: "Copied",
    signed: "Signed (official key)",
    signed_other: "Signed",
    unsigned: "Not signed",
    compat_note:
      "A native plugin only works in the exact editor build it was compiled for (see the \"Editor\" column). Installing from the editor (Tools > Extensions > Plugins… > Store) is recommended: it picks the right build and verifies the SHA-256 and the signature before installing.",
    not_found: "Plugin not found.",
    install_h: "Install from the editor",
    install_1: "Open OrbitEngine and go to Tools > Extensions > Plugins….",
    install_2: "Open the Store tab. The official catalog is enabled by default.",
    install_3: "Search for a plugin, check the details (changelog, license) and press Install.",
    install_4: "Restart the editor when asked. The editor verifies the SHA-256 and the signature of the download.",
    install_file: "You can also download a .orbitplugin file here and use \"Install from a file…\" on the Installed tab (no automatic checks beyond the installer's own).",
    install_deeplink: "Planned: a one-click deep link of the form orbitengine://install?id=<id>. Not available yet.",
    own_h: "Add your own repository",
    own_intro: "The store reads one or several catalogs (\"sources\"). The official one is built in; you can add others.",
    own_1: "Tools > Extensions > Plugins… > Sources tab > add a URL. A GitHub repository URL (https://github.com/owner/repo) is resolved to its raw index.json automatically.",
    own_2: "Optional public key: with a key, the source is Trusted and only builds signed by that key are accepted. Without a key it is Unsigned: the SHA-256 is still checked, and a red warning is shown before each install.",
    own_3: "Plugin ids starting with orbit. are reserved to the official source.",
    own_4: "Plugins are native code: only add sources you trust.",
    own_format_h: "Catalog format",
    own_format_p: "A catalog is one index.json file plus the .orbitplugin files it points to. Texts can be a string or an {en, fr} map. Minimal example:",
    own_docs: "Full documentation (docs/plugin-store.md)",
    foot_text: "OrbitEngine plugin catalog. Official plugins are built and signed by the OrbitEngine team.",
  },
  fr: {
    skip: "Aller aux plugins",
    hero_title: "Explorateur de plugins",
    hero_lead: "Parcourez les plugins officiels d'OrbitEngine et étendez l'éditeur avec de nouveaux outils.",
    hero_cta: "Parcourir les plugins",
    hero_install: "Installer depuis l'éditeur",
    plugins_h: "Plugins",
    search_label: "Recherche",
    search_ph: "Nom, id, tag, auteur…",
    source_label: "Source",
    all_sources: "Toutes les sources",
    all_tags: "Tous",
    official: "Officiel",
    loading: "Chargement du catalogue…",
    count: (n, t) => (n === t ? `${t} plugin${t === 1 ? "" : "s"}` : `${n} plugin${n === 1 ? "" : "s"} sur ${t}`),
    empty_catalog: "Aucun plugin n'est encore publié. Revenez bientôt : les premiers plugins officiels arrivent.",
    empty_filter: "Aucun plugin ne correspond à votre recherche.",
    err_fetch: "Impossible de charger le catalogue (index.json). Vérifiez votre connexion et rechargez la page.",
    err_schema: "Ce catalogue utilise un format plus récent que celui compris par cette page. Rechargez la page ou mettez le site à jour.",
    sample_banner: "Données d'exemple (fictives) : ?sample=1",
    theme_to_light: "Thème clair",
    theme_to_dark: "Thème sombre",
    lang_label: "Langue",
    close: "Fermer",
    by: "par",
    latest: "Dernière",
    no_versions: "Aucune version publiée.",
    author: "Auteur",
    license: "Licence",
    homepage: "Site web",
    tags: "Tags",
    id: "Id",
    source: "Source",
    versions: "Versions",
    released: "Publiée le",
    changelog: "Changelog",
    no_builds: "Aucun build dans cette version.",
    th_editor: "Éditeur",
    th_platform: "Plateforme",
    th_profile: "Profil",
    th_size: "Taille",
    th_sha: "SHA-256",
    th_sig: "Signature",
    th_dl: "Téléchargement",
    download: "Télécharger",
    copy: "Copier",
    copied: "Copié",
    signed: "Signé (clé officielle)",
    signed_other: "Signé",
    unsigned: "Non signé",
    compat_note:
      "Un plugin natif ne fonctionne que dans le build exact de l'éditeur pour lequel il a été compilé (voir la colonne « Éditeur »). Il est recommandé d'installer depuis l'éditeur (Outils > Extensions > Plugins… > Store) : il choisit le bon build et vérifie le SHA-256 et la signature avant d'installer.",
    not_found: "Plugin introuvable.",
    install_h: "Installer depuis l'éditeur",
    install_1: "Ouvrez OrbitEngine puis Outils > Extensions > Plugins….",
    install_2: "Ouvrez l'onglet Store. Le catalogue officiel est activé par défaut.",
    install_3: "Cherchez un plugin, consultez les détails (changelog, licence) puis cliquez sur Installer.",
    install_4: "Redémarrez l'éditeur quand il le demande. L'éditeur vérifie le SHA-256 et la signature du téléchargement.",
    install_file: "Vous pouvez aussi télécharger un fichier .orbitplugin ici et utiliser « Installer depuis un fichier… » dans l'onglet Installés (pas d'autre vérification que celles de l'installateur).",
    install_deeplink: "Prévu : un lien direct en un clic de la forme orbitengine://install?id=<id>. Pas encore disponible.",
    own_h: "Ajouter votre propre dépôt",
    own_intro: "Le store lit un ou plusieurs catalogues (« sources »). Le catalogue officiel est intégré ; vous pouvez en ajouter d'autres.",
    own_1: "Outils > Extensions > Plugins… > onglet Sources > ajouter une URL. Une URL de dépôt GitHub (https://github.com/owner/repo) est résolue automatiquement vers son index.json brut.",
    own_2: "Clé publique facultative : avec une clé, la source est Fiable (Trusted) et seuls les builds signés par cette clé sont acceptés. Sans clé, elle est Non signée (Unsigned) : le SHA-256 reste vérifié et un avertissement rouge s'affiche avant chaque installation.",
    own_3: "Les ids commençant par orbit. sont réservés à la source officielle.",
    own_4: "Les plugins sont du code natif : n'ajoutez que des sources de confiance.",
    own_format_h: "Format du catalogue",
    own_format_p: "Un catalogue est un fichier index.json et les fichiers .orbitplugin vers lesquels il pointe. Les textes peuvent être une chaîne ou une table {en, fr}. Exemple minimal :",
    own_docs: "Documentation complète (docs/plugin-store.md)",
    foot_text: "Catalogue de plugins OrbitEngine. Les plugins officiels sont compilés et signés par l'équipe OrbitEngine.",
  },
};

const $ = (id) => document.getElementById(id);
const state = {
  lang: "en",
  theme: "dark",
  catalog: null, // { source, plugins, generated }
  indexUrl: location.href,
  error: null, // i18n key
  query: "",
  tag: "",
  source: "",
  openId: null,
  lastFocus: null,
};

const t = (k, ...a) => {
  const v = (I18N[state.lang] && I18N[state.lang][k]) ?? I18N.en[k] ?? k;
  return typeof v === "function" ? v(...a) : v;
};

// ---- storage (try/catch: can throw in private windows) ----
function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (_) {}
  return null;
}

// ---- helpers ----
function el(tag, props, ...children) {
  const n = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v === true ? "" : String(v));
    }
  }
  for (const c of children) if (c) n.append(c);
  return n;
}

function safeUrl(u, base) {
  if (typeof u !== "string" || !u) return null;
  try {
    const url = new URL(u, base || location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch (_) {
    return null;
  }
}

function pick(v) {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    for (const k of [state.lang, "en"]) if (typeof v[k] === "string" && v[k]) return v[k];
    for (const x of Object.values(v)) if (typeof x === "string" && x) return x;
  }
  return "";
}

function humanSize(n) {
  if (typeof n !== "number" || !isFinite(n) || n < 0) return "?";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return (i === 0 ? n : n.toFixed(n >= 100 ? 0 : 1)) + " " + u[i];
}

function platformOf(target) {
  const s = String(target || "").toLowerCase();
  const arch = /^(x86_64|amd64)/.test(s) ? "x64" : /^(aarch64|arm64)/.test(s) ? "arm64" : s.split("-")[0] || "?";
  if (s.includes("windows")) return "Windows " + arch;
  if (s.includes("apple") || s.includes("darwin")) return "macOS " + arch;
  if (s.includes("linux")) return "Linux " + arch;
  return String(target || "?");
}

function cmpVersion(a, b) {
  const parse = (v) => {
    const [core, pre] = String(v).split("-", 2);
    return { n: core.split(".").map((x) => parseInt(x, 10) || 0), pre: pre ?? null };
  };
  const x = parse(a), y = parse(b);
  for (let i = 0; i < 3; i++) {
    const d = (x.n[i] || 0) - (y.n[i] || 0);
    if (d) return d;
  }
  if (x.pre === y.pre) return 0;
  if (x.pre === null) return 1;
  if (y.pre === null) return -1;
  return x.pre < y.pre ? -1 : 1;
}

const str = (v) => (typeof v === "string" ? v : "");

// ---- data ----
async function fetchJson(url) {
  const r = await fetch(url, { cache: "no-cache" });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return { data: await r.json(), url: new URL(url, location.href).href };
}

async function load() {
  const sample = new URLSearchParams(location.search).get("sample") === "1";
  const candidates = sample ? ["./sample-index.json"] : ["./index.json", "../index.json"];
  let res = null;
  for (const c of candidates) {
    try { res = await fetchJson(c); break; } catch (_) {}
  }
  if (!res || !res.data || typeof res.data !== "object") { state.error = "err_fetch"; return; }
  const d = res.data;
  if (typeof d.schema_version !== "number" || d.schema_version > SUPPORTED_SCHEMA) {
    state.error = typeof d.schema_version === "number" ? "err_schema" : "err_fetch";
    return;
  }
  state.indexUrl = res.url;
  const plugins = (Array.isArray(d.plugins) ? d.plugins : [])
    .filter((p) => p && typeof p === "object" && /^[a-z0-9_]+(\.[a-z0-9_]+)+$/.test(str(p.id)))
    .map((p) => ({
      id: p.id,
      name: str(p.name) || p.id,
      description: p.description,
      author: str(p.author),
      homepage: safeUrl(p.homepage),
      license: str(p.license),
      icon: safeUrl(p.icon, res.url),
      tags: (Array.isArray(p.tags) ? p.tags : []).filter((x) => typeof x === "string"),
      versions: (Array.isArray(p.versions) ? p.versions : [])
        .filter((v) => v && typeof v === "object" && str(v.version))
        .map((v) => ({
          version: v.version,
          released: str(v.released),
          changelog: v.changelog,
          builds: (Array.isArray(v.builds) ? v.builds : []).filter((b) => b && typeof b === "object"),
        }))
        .sort((a, b) => cmpVersion(b.version, a.version)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const s = d.source && typeof d.source === "object" ? d.source : {};
  state.catalog = { source: str(s.name) || "OrbitEngine", plugins, generated: str(d.generated) };
}

// ---- rendering: list ----
function filtered() {
  const q = state.query.trim().toLowerCase();
  return state.catalog.plugins.filter((p) => {
    if (state.tag && !p.tags.includes(state.tag)) return false;
    if (!q) return true;
    const hay = [p.name, p.id, p.author, pick(p.description), ...p.tags].join("\n").toLowerCase();
    return q.split(/\s+/).every((w) => hay.includes(w));
  });
}

function renderChips() {
  const box = $("tags");
  box.replaceChildren();
  if (!state.catalog) return;
  const tags = [...new Set(state.catalog.plugins.flatMap((p) => p.tags))].sort();
  if (!tags.length) return;
  for (const tag of ["", ...tags]) {
    const b = el("button", { type: "button", class: "chip", "aria-pressed": String(state.tag === tag), text: tag || t("all_tags") });
    b.addEventListener("click", () => { state.tag = tag; renderChips(); renderGrid(); });
    box.append(b);
  }
}

function renderSource() {
  const sel = $("source");
  sel.replaceChildren(el("option", { value: "", text: t("all_sources") }));
  if (state.catalog) sel.append(el("option", { value: state.catalog.source, text: state.catalog.source }));
  sel.value = state.source;
}

function card(p) {
  const latest = p.versions[0];
  const pic = p.icon
    ? el("img", { class: "pic", src: p.icon, alt: "", loading: "lazy", referrerpolicy: "no-referrer", width: 48, height: 48 })
    : el("span", { class: "pic", "aria-hidden": "true", text: p.name.charAt(0).toUpperCase() });
  if (p.icon) pic.addEventListener("error", () => pic.replaceWith(el("span", { class: "pic", "aria-hidden": "true", text: p.name.charAt(0).toUpperCase() })), { once: true });
  const meta = el("div", { class: "meta" },
    el("span", { class: "badge ok", title: state.catalog.source, text: t("official") }),
    latest ? el("span", { class: "badge", text: "v" + latest.version }) : null,
    ...p.tags.slice(0, 4).map((x) => el("span", { class: "tag", text: x })));
  return el("a", { class: "card", href: "#/plugin/" + encodeURIComponent(p.id), "data-id": p.id },
    el("div", { class: "card-head" }, pic,
      el("div", { style: "min-width:0" }, el("h3", { text: p.name }), el("div", { class: "pid", text: p.id }))),
    el("p", { class: "desc", text: pick(p.description) }),
    p.author ? el("div", { class: "small", text: t("by") + " " + p.author }) : null,
    meta);
}

function renderGrid() {
  const grid = $("grid"), status = $("status");
  grid.replaceChildren();
  status.className = "status";
  if (state.error) {
    status.classList.add("error");
    status.textContent = t(state.error);
    return;
  }
  if (!state.catalog) { status.textContent = t("loading"); return; }
  const all = state.catalog.plugins, list = filtered();
  const sampleNote = new URLSearchParams(location.search).get("sample") === "1" ? " · " + t("sample_banner") : "";
  status.textContent = all.length ? t("count", list.length, all.length) + sampleNote : sampleNote.slice(3);
  if (!all.length) { grid.append(el("p", { class: "empty", text: t("empty_catalog") })); return; }
  if (!list.length) { grid.append(el("p", { class: "empty", text: t("empty_filter") })); return; }
  for (const p of list) grid.append(card(p));
}

// ---- rendering: detail dialog ----
function copyButton(text) {
  const b = el("button", { type: "button", class: "btn small", text: t("copy"), "aria-label": t("copy") + " SHA-256" });
  b.addEventListener("click", async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch (_) {
      const ta = el("textarea", { "aria-hidden": "true", style: "position:fixed;opacity:0" });
      ta.value = text; document.body.append(ta); ta.select();
      try { ok = document.execCommand("copy"); } catch (_) {}
      ta.remove(); b.focus();
    }
    b.textContent = ok ? t("copied") : t("copy");
    setTimeout(() => (b.textContent = t("copy")), 1500);
  });
  return b;
}

function buildsTable(v) {
  if (!v.builds.length) return el("p", { class: "small", text: t("no_builds") });
  const head = el("tr", null, ...["th_editor", "th_platform", "th_profile", "th_size", "th_sha", "th_sig", "th_dl"].map((k) => el("th", { scope: "col", text: t(k) })));
  const rows = v.builds.map((b) => {
    const sha = str(b.sha256);
    const url = safeUrl(b.url, state.indexUrl);
    const sig = str(b.signature);
    return el("tr", null,
      el("td", null, el("div", { text: str(b.editor_version) || "?" }), b.fingerprint ? el("div", { class: "mono", title: "editor build id", text: str(b.fingerprint) }) : null),
      el("td", { text: platformOf(b.target) }),
      el("td", { text: str(b.profile) || "?" }),
      el("td", { text: humanSize(b.size) }),
      el("td", null, sha ? el("div", { class: "hash" }, el("span", { class: "mono", text: sha }), copyButton(sha)) : "?"),
      el("td", null, sig
        ? el("span", { class: "badge ok", title: sig.slice(0, 16) + "…", text: t("signed") })
        : el("span", { class: "badge warn", text: t("unsigned") })),
      el("td", null, url ? el("a", { href: url, rel: "noopener", text: t("download") }) : "-"));
  });
  return el("div", { class: "table-wrap" }, el("table", null, el("thead", null, head), el("tbody", null, ...rows)));
}

function renderDialog(p) {
  const dlg = $("dialog");
  const close = el("button", { type: "button", class: "btn", id: "dlg-close", text: t("close"), "aria-label": t("close") });
  close.addEventListener("click", closeDialog);
  const facts = el("dl", { class: "facts" });
  const fact = (k, v) => { if (v) facts.append(el("dt", { text: t(k) }), el("dd", null, v)); };
  fact("id", el("span", { class: "mono", text: p.id }));
  fact("source", el("span", { class: "badge ok", text: t("official") + " · " + state.catalog.source }));
  fact("author", p.author);
  fact("license", p.license);
  fact("homepage", p.homepage ? el("a", { href: p.homepage, rel: "noopener", text: p.homepage }) : null);
  fact("tags", p.tags.length ? el("span", { class: "meta" }, ...p.tags.map((x) => el("span", { class: "tag", text: x }))) : null);

  const versions = p.versions.length
    ? p.versions.map((v, i) => el("section", { class: "version", "aria-label": "v" + v.version },
        el("h4", null, "v" + v.version + " ", i === 0 ? el("span", { class: "badge", text: t("latest") }) : null),
        v.released ? el("div", { class: "small", text: t("released") + " " + v.released }) : null,
        pick(v.changelog) ? el("p", { text: pick(v.changelog) }) : null,
        buildsTable(v)))
    : [el("p", { class: "small", text: t("no_versions") })];

  dlg.replaceChildren(
    el("div", { class: "dlg-head" }, el("div", null, el("h2", { id: "dlg-title", text: p.name })), close),
    el("p", { text: pick(p.description) }),
    facts,
    el("p", { class: "note", text: t("compat_note") }),
    el("h3", { text: t("versions") }),
    ...versions);
}

const focusables = () => [...$("dialog").querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];

function openDialog(p) {
  const wasOpen = !$("overlay").hidden;
  if (!wasOpen) state.lastFocus = document.activeElement;
  state.openId = p.id;
  renderDialog(p);
  $("overlay").hidden = false;
  document.body.style.overflow = "hidden";
  if (!wasOpen) { $("dialog").scrollTop = 0; $("dlg-close").focus(); }
}

function hideDialog() {
  if ($("overlay").hidden) return;
  $("overlay").hidden = true;
  document.body.style.overflow = "";
  state.openId = null;
  const back = state.lastFocus;
  state.lastFocus = null;
  if (back && document.contains(back)) back.focus();
}

function closeDialog() {
  if (/^#\/plugin\//.test(location.hash)) history.replaceState(null, "", location.pathname + location.search + "#plugins");
  hideDialog();
}

function route() {
  const m = /^#\/plugin\/(.+)$/.exec(location.hash);
  if (!m || !state.catalog) { hideDialog(); return; }
  let id = m[1];
  try { id = decodeURIComponent(id); } catch (_) {}
  const p = state.catalog.plugins.find((x) => x.id === id);
  if (p) openDialog(p);
  else { hideDialog(); $("status").textContent = t("not_found"); }
}

document.addEventListener("keydown", (e) => {
  if ($("overlay").hidden) return;
  if (e.key === "Escape") { e.preventDefault(); closeDialog(); return; }
  if (e.key !== "Tab") return;
  const f = focusables();
  if (!f.length) { e.preventDefault(); $("dialog").focus(); return; }
  const first = f[0], last = f[f.length - 1];
  if (!$("dialog").contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
$("overlay").addEventListener("mousedown", (e) => { if (e.target === $("overlay")) closeDialog(); });
window.addEventListener("hashchange", route);

// ---- language / theme ----
function applyLang() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
  document.querySelectorAll("#lang-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)));
  $("lang-switch").setAttribute("aria-label", t("lang_label"));
  applyTheme();
  renderSource();
  renderChips();
  renderGrid();
  if (state.openId && state.catalog) {
    const p = state.catalog.plugins.find((x) => x.id === state.openId);
    if (p) { const h = $("dialog").scrollTop; renderDialog(p); $("dialog").scrollTop = h; $("dlg-close").focus(); }
  }
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  const b = $("theme-toggle");
  b.textContent = state.theme === "dark" ? t("theme_to_light") : t("theme_to_dark");
}

function init() {
  const savedLang = store("orbit-lang");
  state.lang = savedLang === "fr" || savedLang === "en" ? savedLang : /^fr\b/i.test(navigator.language || "") ? "fr" : "en";
  const savedTheme = store("orbit-theme");
  state.theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  document.querySelectorAll("#lang-switch button").forEach((b) =>
    b.addEventListener("click", () => { state.lang = b.dataset.lang; store("orbit-lang", state.lang); applyLang(); }));
  $("theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    store("orbit-theme", state.theme);
    applyTheme();
  });
  $("q").addEventListener("input", (e) => { state.query = e.target.value; renderGrid(); });
  $("source").addEventListener("change", (e) => { state.source = e.target.value; renderGrid(); });

  applyLang();
  load().then(() => { applyLang(); route(); });
}

init();

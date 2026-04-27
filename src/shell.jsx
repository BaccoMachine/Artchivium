/* global React, RESTAURO_DATA, Icon, BrandMark */
const { useState: uSs, useEffect: uEs, useMemo: uMs } = React;

// Dipinti famosi in pubblico dominio (Wikimedia Commons) — atmosfere coerenti
// con un'app di restauro. Sfocati e desaturati dietro al vetro.
const BG_PAINTINGS = {
  madonna: {
    label: "Madonna — dipinto B/N",
    url: "uploads/madonna-bw.jpg"
  },
  craquelure: {
    label: "UV — craquelure (artefatti blu)",
    url: "uploads/uv-craquelure.png"
  },
  ir: {
    label: "IR — Cosima e Damiano (libro)",
    url: "uploads/ir-libro-cosima-damiano.png"
  },
  uv: {
    label: "UV — Cosima e Damiano (mano)",
    url: "uploads/uv-cosima-damiano.png"
  }
};

// Atmosfere a gradiente (fallback senza immagine)
const BG_PRESETS = {
  studio: `radial-gradient(ellipse at 30% 25%, oklch(0.38 0.01 240) 0%, transparent 55%),
           radial-gradient(ellipse at 75% 70%, oklch(0.28 0.01 230) 0%, transparent 55%),
           linear-gradient(160deg, oklch(0.22 0.005 240) 0%, oklch(0.16 0.005 240) 100%)`,
  linen: `radial-gradient(ellipse at 40% 40%, oklch(0.42 0.015 80) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 65%, oklch(0.30 0.01 60) 0%, transparent 55%),
          linear-gradient(160deg, oklch(0.22 0.005 60) 0%, oklch(0.15 0.005 50) 100%)`,
  ink: `radial-gradient(ellipse at 50% 30%, oklch(0.30 0.015 250) 0%, transparent 55%),
        linear-gradient(180deg, oklch(0.16 0.008 250) 0%, oklch(0.12 0.006 250) 100%)`,
  pietra: `radial-gradient(ellipse at 30% 40%, oklch(0.38 0.005 200) 0%, transparent 55%),
           linear-gradient(135deg, oklch(0.24 0.004 220) 0%, oklch(0.18 0.003 220) 100%)`
};

const BackgroundLayer = ({ variant = "studio", painting = "none", theme = "scuro", bgBlur = 18, bgOpacity = 0.85 }) => {
  const p = BG_PAINTINGS[painting];
  const isLight = theme === "chiaro";
  return (
    <div className="bg-layer" data-theme={theme}>
      {p ?
      <div
        className="bg-painting"
        style={{
          position: "absolute",
          top: "-10%", left: "-10%",
          width: "120%", height: "120%",
          backgroundImage: `url("${p.url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isLight ?
          `blur(${bgBlur}px) saturate(0.85) brightness(1.05)` :
          `blur(${bgBlur}px) saturate(0.7) brightness(0.7)`,
          opacity: bgOpacity
        }} /> :


      <div className="bg-image" style={{ background: BG_PRESETS[variant] || BG_PRESETS.studio }} />
      }
      <div className={"bg-vignette " + (isLight ? "is-light" : "is-dark")} />
      <div className="bg-grain" />
    </div>);

};

const Topbar = ({ page, setPage }) => {
  const items = [
  { id: "chat", label: "Chat" },
  { id: "archivio", label: "Archivio" },
  { id: "materiali", label: "Materiali" },
  { id: "tecniche", label: "Tecniche" },
  { id: "info", label: "Info" }];

  return (
    <header className="topbar">
      <div className="tb-brand">
        <BrandMark size={22} />
        <div className="tb-brand-name">artchivium</div>
      </div>
      <nav className="tb-nav">
        {items.map((i) =>
        <button
          key={i.id}
          className={"tb-nav-item" + (page === i.id ? " active" : "")}
          onClick={() => setPage(i.id)}>
          
            {i.label}
          </button>
        )}
      </nav>
      <div className="tb-right">
        <div className="tb-kbd">⌘K</div>
        <button className="tb-user">
          <span className="tb-user-dot">G</span>
          <span className="tb-user-name">Ginevra</span>
        </button>
      </div>
    </header>);

};

const ConvPanel = ({ activeConv, setActiveConv, onNewChat }) => {
  const convs = RESTAURO_DATA.conversazioni;
  const groups = uMs(() => {
    const g = {};
    convs.forEach((c) => {(g[c.data] = g[c.data] || []).push(c);});
    return g;
  }, [convs]);

  return (
    <aside className="conv-panel glass">
      <div className="conv-panel-head">
        <span>Conversazioni</span>
        <button className="btn-new" onClick={onNewChat}>+ nuova</button>
      </div>
      <div className="conv-list">
        {Object.keys(groups).map((g) =>
        <div key={g}>
            <div className="conv-group">{g}</div>
            {groups[g].map((c) =>
          <button
            key={c.id}
            className={"conv-item" + (c.id === activeConv ? " active" : "")}
            onClick={() => setActiveConv(c.id)}>
            
                {c.titolo}
              </button>
          )}
          </div>
        )}
      </div>
    </aside>);

};

Object.assign(window, { BackgroundLayer, Topbar, ConvPanel, BG_PRESETS, BG_PAINTINGS });
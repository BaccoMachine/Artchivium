/* global React */
const { useState: uST, useEffect: uET } = React;

const TweaksPanel = ({ open, tweaks, setTweaks }) => {
  if (!open) return null;
  const set = (k, v) => setTweaks((t) => ({ ...t, [k]: v }));
  return (
    <div className="tweaks glass-strong">
      <h5>Tweaks</h5>

      <div className="tweak-row">
        <label>Tema</label>
        <div className="tweak-opts">
          {["chiaro", "scuro"].map((t) => (
            <button key={t} className={tweaks.theme === t ? "active" : ""} onClick={() => set("theme", t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Dipinto sullo sfondo</label>
        <div className="tweak-opts">
          {["none", "madonna", "craquelure", "ir", "uv"].map((p) => (
            <button key={p} className={tweaks.painting === p ? "active" : ""} onClick={() => set("painting", p)}>{p}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Atmosfera sfondo (se nessun dipinto)</label>
        <div className="tweak-opts">
          {["studio", "linen", "ink", "pietra"].map((b) => (
            <button key={b} className={tweaks.bg === b ? "active" : ""} onClick={() => set("bg", b)}>{b}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Accento</label>
        <div className="tweak-opts">
          {[
            { id: "acciaio", v: "0.72 0.08 220" },
            { id: "oliva", v: "0.72 0.08 110" },
            { id: "neutro", v: "0.80 0.01 240" },
            { id: "bruno", v: "0.68 0.06 45" },
            { id: "verde", v: "0.70 0.07 160" },
          ].map((a) => (
            <button key={a.id} className={tweaks.accent === a.id ? "active" : ""} onClick={() => set("accent", a.id)}>{a.id}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Font principale</label>
        <div className="tweak-opts">
          {[
            { id: "Helvetica", v: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
            { id: "Inter", v: '"Inter", sans-serif' },
            { id: "IBM Plex", v: '"IBM Plex Sans", sans-serif' },
            { id: "Space Grotesk", v: '"Space Grotesk", sans-serif' },
            { id: "Söhne-like", v: '"Söhne", "Inter", sans-serif' },
          ].map((f) => (
            <button key={f.id} className={tweaks.font === f.id ? "active" : ""} onClick={() => set("font", f.id)} style={{ fontFamily: f.v }}>{f.id}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Base — tonalità</label>
        <div className="tweak-opts">
          {[
            { id: "notte", v: "0.14 0.006 240" },
            { id: "grafite", v: "0.17 0.004 260" },
            { id: "cenere", v: "0.20 0.002 200" },
            { id: "carta", v: "0.95 0.004 80" },
          ].map((t) => (
            <button key={t.id} className={tweaks.tone === t.id ? "active" : ""} onClick={() => set("tone", t.id)}>{t.id}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Sfondo — sfocatura {tweaks.bgBlur}px</label>
        <input type="range" min="0" max="80" value={tweaks.bgBlur} onChange={(e) => set("bgBlur", +e.target.value)} />
      </div>

      <div className="tweak-row">
        <label>Sfondo — opacità {Math.round(tweaks.bgOpacity * 100)}%</label>
        <input type="range" min="0" max="100" value={tweaks.bgOpacity * 100} onChange={(e) => set("bgOpacity", +e.target.value / 100)} />
      </div>

      <div className="tweak-row">
        <label>Vetro — sfocatura {tweaks.blur}px</label>
        <input type="range" min="0" max="50" value={tweaks.blur} onChange={(e) => set("blur", +e.target.value)} />
      </div>

      <div className="tweak-row">
        <label>Vetro — opacità {Math.round(tweaks.glassOp * 100)}%</label>
        <input type="range" min="0" max="20" value={tweaks.glassOp * 100} onChange={(e) => set("glassOp", +e.target.value / 100)} />
      </div>

      <div className="tweak-row">
        <label>Densità</label>
        <div className="tweak-opts">
          {["compatta", "standard", "aria"].map((d) => (
            <button key={d} className={tweaks.density === d ? "active" : ""} onClick={() => set("density", d)}>{d}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Colonna conversazioni</label>
        <div className="tweak-opts">
          {["visibile", "nascosta"].map((d) => (
            <button key={d} className={tweaks.convPanel === d ? "active" : ""} onClick={() => set("convPanel", d)}>{d}</button>
          ))}
        </div>
      </div>

    </div>
  );
};

Object.assign(window, { TweaksPanel });

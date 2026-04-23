/* global React, ReactDOM, BackgroundLayer, Topbar, ConvPanel, ChatPage, ArchivePage, MethodologyPage, GuidePage, PreviewPanel, TweaksPanel, RESTAURO_DATA */
const { useState: uSA, useEffect: uEA } = React;

const ACCENTS = {
  acciaio: "0.72 0.08 220",
  oliva: "0.72 0.08 110",
  neutro: "0.80 0.01 240",
  bruno: "0.68 0.06 45",
  verde: "0.70 0.07 160",
};
const TONES = {
  notte: { base: "0.14 0.006 240", ink0: "0.98 0.003 240", ink1: "0.88 0.004 240", ink2: "0.70 0.005 240", ink3: "0.52 0.005 240", ink4: "0.38 0.005 240" },
  grafite: { base: "0.17 0.004 260", ink0: "0.98 0.003 260", ink1: "0.88 0.004 260", ink2: "0.70 0.005 260", ink3: "0.52 0.005 260", ink4: "0.38 0.005 260" },
  cenere: { base: "0.20 0.002 200", ink0: "0.98 0.002 200", ink1: "0.88 0.003 200", ink2: "0.72 0.003 200", ink3: "0.55 0.003 200", ink4: "0.40 0.003 200" },
  carta: { base: "0.95 0.004 80", ink0: "0.18 0.008 250", ink1: "0.30 0.006 250", ink2: "0.45 0.005 250", ink3: "0.62 0.005 250", ink4: "0.75 0.004 250" },
};
const FONTS = {
  "Helvetica": '"Helvetica Neue", Helvetica, Arial, sans-serif',
  "Inter": '"Inter", "Helvetica Neue", sans-serif',
  "IBM Plex": '"IBM Plex Sans", sans-serif',
  "Space Grotesk": '"Space Grotesk", sans-serif',
  "Söhne-like": '"Inter", "Helvetica Neue", sans-serif',
};

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "bg": "studio",
  "accent": "acciaio",
  "font": "Helvetica",
  "tone": "notte",
  "blur": 28,
  "glassOp": 0.045,
  "density": "standard",
  "convPanel": "visibile"
}/*EDITMODE-END*/;

const App = () => {
  const [page, setPage] = uSA(() => {
    try { return localStorage.getItem("art_page") || "chat"; } catch { return "chat"; }
  });
  const [activeConvId, setActiveConvId] = uSA(() => {
    try { return localStorage.getItem("art_conv") || RESTAURO_DATA.conversazioni[0].id; }
    catch { return RESTAURO_DATA.conversazioni[0].id; }
  });
  const [preview, setPreview] = uSA(null);
  const [tweaks, setTweaks] = uSA(DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = uSA(false);

  uEA(() => { try { localStorage.setItem("art_conv", activeConvId); } catch {} }, [activeConvId]);
  uEA(() => { try { localStorage.setItem("art_page", page); } catch {} }, [page]);

  uEA(() => {
    if (page !== "chat" && page !== "archivio") setPreview(null);
  }, [page]);

  uEA(() => {
    const r = document.documentElement.style;
    const tone = TONES[tweaks.tone];
    r.setProperty("--bg-0", `oklch(${tone.base})`);
    r.setProperty("--ink-0", `oklch(${tone.ink0})`);
    r.setProperty("--ink-1", `oklch(${tone.ink1})`);
    r.setProperty("--ink-2", `oklch(${tone.ink2})`);
    r.setProperty("--ink-3", `oklch(${tone.ink3})`);
    r.setProperty("--ink-4", `oklch(${tone.ink4})`);

    r.setProperty("--accent", `oklch(${ACCENTS[tweaks.accent]})`);
    const accParts = ACCENTS[tweaks.accent].split(" ");
    const strongL = Math.min(parseFloat(accParts[0]) + 0.06, 0.95).toFixed(2);
    r.setProperty("--accent-strong", `oklch(${strongL} ${accParts[1]} ${accParts[2]})`);
    r.setProperty("--rel-accent", `oklch(${ACCENTS[tweaks.accent]})`);

    r.setProperty("--font-sans", FONTS[tweaks.font]);
    r.setProperty("--font-display", FONTS[tweaks.font]);

    r.setProperty("--glass-blur", tweaks.blur + "px");
    const op = tweaks.glassOp;
    r.setProperty("--glass-bg", `oklch(0.98 0.003 240 / ${op})`);
    r.setProperty("--glass-bg-strong", `oklch(0.98 0.003 240 / ${(op * 1.8).toFixed(3)})`);

    // density
    const dens = tweaks.density;
    r.setProperty("--topbar-h", dens === "compatta" ? "46px" : dens === "aria" ? "62px" : "54px");
  }, [tweaks]);

  uEA(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  uEA(() => {
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: tweaks }, "*"); } catch {}
  }, [tweaks]);

  const handleNewChat = () => {
    const empty = RESTAURO_DATA.conversazioni.find((c) => !c.messaggi || c.messaggi.length === 0);
    setActiveConvId((empty || RESTAURO_DATA.conversazioni[1]).id);
    setPage("chat");
  };

  const showPreview = page === "chat" || page === "archivio";
  const showConvPanel = page === "chat" && tweaks.convPanel === "visibile";

  const bodyClasses = ["app-body"];
  if (preview && showPreview) bodyClasses.push("with-preview");
  if (!showConvPanel) bodyClasses.push("hide-conv");

  return (
    <>
      <BackgroundLayer variant={tweaks.bg} />
      <div className="app-shell" data-screen-label={"01 " + page}>
        <Topbar page={page} setPage={setPage} />
        <div className={bodyClasses.join(" ")}>
          {showConvPanel && (
            <ConvPanel
              activeConv={activeConvId}
              setActiveConv={(id) => { setActiveConvId(id); setPage("chat"); }}
              onNewChat={handleNewChat}
            />
          )}

          {page === "chat" && (
            <ChatPage activeConvId={activeConvId} setActiveConvId={setActiveConvId} openPreview={setPreview} />
          )}
          {page === "archivio" && <ArchivePage openPreview={setPreview} />}
          {page === "metodologia" && <MethodologyPage />}
          {page === "guida" && <GuidePage />}

          {preview && showPreview && (
            <PreviewPanel ref={preview} onClose={() => setPreview(null)} />
          )}
        </div>
      </div>

      <TweaksPanel open={tweaksOpen} tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* global React, RESTAURO_DATA */
const { useState: uS, useEffect: uE, useRef: uR } = React;

/* =======================================================================
   Citation — link inline con hover mini-modale + click = apre preview
   Sintassi nel testo:
     @REL:<id>            -> link con nome della relazione
     @REL:<id>@frase@      -> link su una frase specifica (evidenzia in preview)
     @FONT:<id>            -> link a fonte accademica
     @FONT:<id>@frase@     -> come sopra per fonte
   ======================================================================= */

function findItem(id) {
  const r = RESTAURO_DATA.relazioni.find((x) => x.id === id);
  if (r) return { kind: "relazione", item: r };
  const f = RESTAURO_DATA.fonti.find((x) => x.id === id);
  if (f) return { kind: "fonte", item: f };
  return null;
}

const Citation = ({ kind, id, phrase, idxRef, onOpen }) => {
  const [hover, setHover] = uS(false);
  const [pos, setPos] = uS({ x: 0, y: 0, side: "bottom" });
  const ref = uR(null);
  const hoverTimer = uR(null);

  const found = findItem(id);
  if (!found) return <span>{phrase || id}</span>;
  const { item } = found;

  const label = phrase || (kind === "relazione" ? item.titolo : `${item.autore}, ${item.titolo}`);

  const onEnter = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const below = spaceBelow > 200;
    setPos({
      x: Math.min(r.left, window.innerWidth - 340),
      y: below ? r.bottom + 10 : r.top - 10,
      side: below ? "bottom" : "top",
    });
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHover(true), 120);
  };
  const onLeave = () => {
    clearTimeout(hoverTimer.current);
    setHover(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    onOpen({ kind, id, phrase });
    setHover(false);
  };

  const classes = "cit" + (kind === "fonte" ? " kind-fonte" : "");

  return (
    <>
      <a
        ref={ref}
        href="#"
        className={classes}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={handleClick}
      >
        {label}
        <span className="cit-ref">[{idxRef}]</span>
      </a>
      {hover && (
        <div
          className={"cit-popover glass-strong" + (kind === "fonte" ? " kind-fonte" : "")}
          style={{
            left: pos.x,
            top: pos.side === "bottom" ? pos.y : "auto",
            bottom: pos.side === "top" ? window.innerHeight - pos.y : "auto",
          }}
        >
          <div className="cit-popover-kind">
            {kind === "relazione" ? "● Relazione pratica" : "○ Fonte accademica"}
          </div>
          <div className="cit-popover-title">{item.titolo}</div>
          <div className="cit-popover-meta">
            {kind === "relazione"
              ? `${item.autore} · ${item.datazione} · ${item.anno_intervento}`
              : `${item.autore} · ${item.tipo}`}
          </div>
          {kind === "relazione" ? (
            <div className="cit-popover-extract">
              {phrase ? `«${phrase}»` : item.abstract}
            </div>
          ) : (
            <div style={{ color: "var(--ink-2)", fontSize: 12 }}>
              Argomenti: {item.argomenti.join(", ")}
            </div>
          )}
          <div className="cit-popover-hint">Clicca per aprire la scheda →</div>
        </div>
      )}
    </>
  );
};

/* Parser: trasforma stringa "testo @REL:id@frase@ altro testo" in array di nodi React */
function parseCitations(text, refMap, onOpen) {
  const parts = [];
  const re = /@(REL|FONT):([a-z0-9\-]+)(?:@([^@]+)@)?/gi;
  let last = 0;
  let m;
  let nodeIdx = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const kind = m[1].toUpperCase() === "REL" ? "relazione" : "fonte";
    const id = m[2];
    const phrase = m[3];
    const refKey = id;
    if (!(refKey in refMap)) refMap[refKey] = Object.keys(refMap).length + 1;
    parts.push(
      <Citation
        key={`c-${nodeIdx++}`}
        kind={kind}
        id={id}
        phrase={phrase}
        idxRef={refMap[refKey]}
        onOpen={onOpen}
      />
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

Object.assign(window, { Citation, parseCitations, findItem });

/* global React, RESTAURO_DATA, findItem, Icon */
const { useState: uSp, useEffect: uEp, useRef: uRp } = React;

/* =======================================================================
   PreviewPanel — pannello laterale per relazione o fonte
   props: ref = { kind, id, phrase }, onClose
   ======================================================================= */
const PreviewPanel = ({ ref: refObj, onClose }) => {
  const [highlightKey, setHighlightKey] = uSp(0);
  uEp(() => setHighlightKey((k) => k + 1), [refObj?.id, refObj?.phrase]);

  if (!refObj) return null;
  const found = findItem(refObj.id);
  if (!found) return null;
  const { kind, item } = found;

  return (
    <section className="preview-panel glass">
      <header className="preview-header">
        <div className="preview-kind">
          {kind === "relazione" ? "● Relazione pratica" : "○ Fonte accademica"}
        </div>
        <button className="preview-close" onClick={onClose} aria-label="Chiudi">
          <Icon.Close width={16} height={16} />
        </button>
      </header>
      <div className="preview-body">
        {kind === "relazione" ? <PreviewRelazione item={item} phrase={refObj.phrase} highlightKey={highlightKey} /> : <PreviewFonte item={item} />}
      </div>
    </section>
  );
};

const PreviewRelazione = ({ item, phrase, highlightKey }) => {
  const extract = phrase || item.estratto_pulitura || item.abstract;
  return (
    <>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {item.codice}.pdf
      </div>
      <h2 className="preview-title">{item.titolo}</h2>
      <div className="preview-subtitle">{item.autore} · {item.datazione}</div>

      <div className="preview-thumb">
        {item.tecnica.toUpperCase()} · {item.dimensioni}
      </div>

      <dl className="preview-meta-grid">
        <dt>Supporto</dt><dd>{item.supporto}</dd>
        <dt>Tecnica</dt><dd>{item.tecnica}</dd>
        <dt>Dimensioni</dt><dd>{item.dimensioni}</dd>
        <dt>Intervento</dt><dd>{item.anno_intervento} · {item.durata}</dd>
        <dt>Committente</dt><dd>{item.committente}</dd>
        <dt>Stato</dt><dd><span className={"status-dot " + (item.stato === "completato" ? "completato" : "in-corso")} />{item.stato}</dd>
      </dl>

      {phrase && (
        <>
          <div className="preview-section-title">Estratto citato</div>
          <blockquote key={highlightKey} className="preview-extract highlighted">
            «{phrase}»
          </blockquote>
        </>
      )}

      <div className="preview-section-title">Abstract</div>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-0)", margin: 0 }}>
        {item.abstract}
      </p>

      {item.estratto_pulitura && !phrase && (
        <>
          <div className="preview-section-title">Dalla sezione "Pulitura"</div>
          <blockquote className="preview-extract">{item.estratto_pulitura}</blockquote>
        </>
      )}

      {item.estratto_consolidamento && (
        <>
          <div className="preview-section-title">Dalla sezione "Consolidamento"</div>
          <blockquote className="preview-extract">{item.estratto_consolidamento}</blockquote>
        </>
      )}

      <div className="preview-section-title">Problematiche</div>
      <div className="tag-row">
        {item.problematiche.map((p, i) => (
          <span className="tag" key={i}>{p}</span>
        ))}
      </div>

      <div className="preview-section-title">Materiali impiegati</div>
      <div className="tag-row">
        {item.materiali.map((p, i) => (
          <span className="tag accent" key={i}>{p}</span>
        ))}
      </div>

      <div className="preview-section-title">Tag</div>
      <div className="tag-row">
        {item.tags.map((t, i) => (
          <span className="tag" key={i}>#{t}</span>
        ))}
      </div>
    </>
  );
};

const PreviewFonte = ({ item }) => (
  <>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
      {item.tipo}
    </div>
    <h2 className="preview-title">{item.titolo}</h2>
    <div className="preview-subtitle">{item.autore}</div>

    <div className="preview-thumb">
      MANUALE / SAGGIO
    </div>

    <div className="preview-section-title">Argomenti trattati</div>
    <div className="tag-row">
      {item.argomenti.map((a, i) => (
        <span className="tag" key={i}>{a}</span>
      ))}
    </div>

    <div className="preview-section-title">Note</div>
    <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-1)", margin: 0 }}>
      Riferimento bibliografico incluso nella knowledge base. Appunti e sbobine personali associati a questo testo sono indicizzati separatamente e possono essere richiamati nelle risposte del bot.
    </p>
  </>
);

Object.assign(window, { PreviewPanel });

/* global React, RESTAURO_DATA */

/* =======================================================================
   GuidePage — pigmenti + tecniche
   ======================================================================= */
const GuidePage = () => {
  const { pigmenti, tecniche } = RESTAURO_DATA.guida;
  return (
    <div className="main glass">
      <header className="main-header">
        <div>
          <div className="main-title">Guida</div>
          <div className="main-sub">Pigmenti, leganti, tecniche · prontuario</div>
        </div>
      </header>
      <div className="main-body">
        <div className="doc-page">
          <div className="doc-eyebrow">Prontuario · consultazione rapida</div>
          <h1 className="doc-title">
            Materiali e <span>tecniche</span> del dipinto mobile.
          </h1>
          <p className="doc-lede">
            Voci sintetiche su pigmenti storici, tecniche pittoriche e criticità ricorrenti.
            Le informazioni qui raccolte alimentano anche le risposte del bot.
          </p>

          <section className="doc-section">
            <h2>Pigmenti storici</h2>
            <div className="pigmento-grid">
              {pigmenti.map((p) => (
                <div className="pigmento" key={p.nome}>
                  <div className="pigmento-swatch" style={{ background: p.colore }} />
                  <div>
                    <div className="pigmento-name">{p.nome}</div>
                    <div className="pigmento-formula">{p.formula}</div>
                  </div>
                  <div className="pigmento-period">{p.periodo}</div>
                  <div className="pigmento-note">{p.note}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="doc-section">
            <h2>Tecniche</h2>
            {tecniche.map((t) => (
              <div key={t.id} className="tecnica">
                <h4>{t.nome}</h4>
                <div className="tecnica-body">{t.riassunto}</div>
                <div className="tecnica-critical">
                  {t.criticita.map((c, i) => (<span className="tag" key={i}>{c}</span>))}
                </div>
              </div>
            ))}
          </section>

          <section className="doc-section">
            <h2>Glossario operativo</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-1)" }}>
              <strong>Velinatura</strong> — Applicazione di carta giapponese con adesivo reversibile
              a protezione temporanea del film pittorico. &nbsp;&nbsp;
              <strong>Foderatura</strong> — Applicazione di una seconda tela (lino) sul retro
              dell'originale per restituire integrità strutturale. &nbsp;&nbsp;
              <strong>Mestica</strong> — Preparazione di gesso e colla animale stesa in più mani sulla
              tavola. &nbsp;&nbsp; <strong>Craquelure</strong> — Reticolo di fessurazioni generato
              dal ritiro differenziale degli strati pittorici. &nbsp;&nbsp; <strong>Ritocco a selezione cromatica</strong>  —
              Reintegrazione riconoscibile a tratteggio che distingue le lacune dall'originale.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { GuidePage });

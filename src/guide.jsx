/* global React, RESTAURO_DATA */

/* =======================================================================
   MaterialiPage — pigmenti / leganti
   ======================================================================= */
const MaterialiPage = () => {
  const { pigmenti } = RESTAURO_DATA.guida;
  return (
    <div className="main glass">
      <header className="main-header">
        <div>
          <div className="main-title">Materiali</div>
          <div className="main-sub">Pigmenti storici · prontuario</div>
        </div>
      </header>
      <div className="main-body">
        <div className="doc-page">
          <div className="doc-eyebrow">Prontuario · consultazione rapida</div>
          <h1 className="doc-title">
            Pigmenti e <span>leganti</span> del dipinto mobile.
          </h1>
          <p className="doc-lede">
            Voci sintetiche su pigmenti storici e criticità ricorrenti. Le informazioni qui raccolte
            alimentano anche le risposte del bot.
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
            <h2>Glossario materiali</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-1)" }}>
              <strong>Mestica</strong> — Preparazione di gesso e colla animale stesa in più mani sulla
              tavola. &nbsp;&nbsp;
              <strong>Craquelure</strong> — Reticolo di fessurazioni generato dal ritiro differenziale
              degli strati pittorici.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

/* =======================================================================
   TecnichePage — tecniche pittoriche e di restauro
   ======================================================================= */
const TecnichePage = () => {
  const { tecniche } = RESTAURO_DATA.guida;
  return (
    <div className="main glass">
      <header className="main-header">
        <div>
          <div className="main-title">Tecniche</div>
          <div className="main-sub">Tecniche pittoriche e di restauro</div>
        </div>
      </header>
      <div className="main-body">
        <div className="doc-page">
          <div className="doc-eyebrow">Prontuario · consultazione rapida</div>
          <h1 className="doc-title">
            Tecniche del <span>dipinto mobile</span>.
          </h1>
          <p className="doc-lede">
            Tecniche pittoriche storiche e operazioni di restauro più ricorrenti, con le criticità
            tipiche di ciascuna.
          </p>

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
              <strong>Ritocco a selezione cromatica</strong> — Reintegrazione riconoscibile a tratteggio
              che distingue le lacune dall'originale.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { MaterialiPage, TecnichePage });

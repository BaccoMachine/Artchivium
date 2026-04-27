/* global React, RESTAURO_DATA */

/* =======================================================================
   MethodologyPage — argomentazione fonti per la tesi
   ======================================================================= */
const MethodologyPage = () => (
  <div className="main glass">
    <header className="main-header">
      <div>
        <div className="main-title">Info</div>
        <div className="main-sub">Metodologia · criteri di selezione e affidabilità delle fonti</div>
      </div>
    </header>
    <div className="main-body">
      <div className="doc-page">
        <div className="doc-eyebrow">Tesi magistrale · aprile 2026</div>
        <h1 className="doc-title">
          La conoscenza <span>sedimentata</span> di una pratica di restauro.
        </h1>
        <p className="doc-lede">
          Questo sistema non inventa. Consulta due corpi di documenti, distinti per natura e autorità,
          e risponde citandoli esplicitamente.
        </p>

        <section className="doc-section">
          <h2>Due corpora, due livelli di evidenza</h2>
          <h3>1. Relazioni pratiche</h3>
          <p>
            Circa cento relazioni di intervento accumulate nel corso dell'attività professionale.
            Sono la memoria operativa della bottega: ogni documento registra un caso concreto — opera,
            problematica, test di solubilità, scelte di materiali, esiti. Vengono indicizzate senza
            ri‑editing, mantenendo la grafia e l'ordine originali, perché la loro affidabilità sta
            nell'essere testimonianza diretta di un lavoro eseguito.
          </p>
          <h3>2. Fonti accademiche</h3>
          <p>
            Manuali di riferimento per il restauro pittorico italiano (Costantini, Cremonesi,
            De Luca) e saggi sulla storia dei pigmenti, integrati con appunti e sbobine personali
            dei corsi. Fungono da cornice teorica: ancorano le scelte operative a protocolli
            riconosciuti dalla comunità disciplinare.
          </p>
        </section>

        <section className="doc-section">
          <h2>Criteri di selezione</h2>
          <p>
            Le relazioni entrano nell'indice se riguardano <strong>restauro pittorico su tela o tavola</strong> — olio,
            tempera, preparazioni a gesso e colla, ridipinture, foderature, integrazioni pittoriche.
            Affreschi, stampe e supporti cartacei sono esclusi per ragioni di coerenza metodologica.
          </p>
          <p>
            Le fonti accademiche sono state scelte tra i testi utilizzati nei corsi di laurea in
            conservazione e restauro, privilegiando quelli che offrono protocolli replicabili
            e bibliografia trasparente.
          </p>
        </section>

        <section className="doc-section">
          <h2>Come risponde il bot</h2>
          <p>
            Ogni risposta è il risultato di una ricerca semantica sui due corpora. Il modello genera
            il testo <strong>solo a partire dai passaggi recuperati</strong>: le citazioni inline —
            evidenziate con colore diverso per relazioni (ocra) e fonti accademiche (rame) —
            rimandano al documento esatto e alla frase da cui proviene l'informazione.
          </p>
          <p>
            Se l'informazione richiesta non è reperibile nella knowledge base, il bot lo dichiara.
            Questo è un requisito non negoziabile, data la natura tecnica della disciplina.
          </p>
        </section>

        <section className="doc-section">
          <h2>Corpus accademico indicizzato</h2>
          <table className="sources-table">
            <tbody>
              {RESTAURO_DATA.fonti.map((f, i) => (
                <tr key={f.id}>
                  <td className="s-idx">F·{String(i + 1).padStart(2, "0")}</td>
                  <td>
                    <div className="s-title">{f.titolo}</div>
                    <div className="s-author">{f.autore} · {f.tipo}</div>
                  </td>
                  <td className="s-tags">
                    <div className="tag-row">
                      {f.argomenti.map((a, j) => (<span className="tag" key={j}>{a}</span>))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="doc-section">
          <h2>Limiti dichiarati</h2>
          <p>
            La knowledge base copre un sottoinsieme circoscritto della disciplina. Le relazioni
            riflettono lo sguardo di una singola restauratrice; le fonti accademiche sono in prevalenza
            in lingua italiana. Il sistema non sostituisce il giudizio di un restauratore: è uno
            strumento di consultazione rapida che rende interrogabile un archivio che altrimenti
            resterebbe cartaceo e silenzioso.
          </p>
        </section>
      </div>
    </div>
  </div>
);

Object.assign(window, { MethodologyPage });

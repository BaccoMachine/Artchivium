/* global React, BackgroundLayer, Topbar, ConvPanel, ChatPage, ArchivePage, MaterialiPage, TecnichePage, MethodologyPage, RESTAURO_DATA */

/* =======================================================================
   PrintApp — un'unica pagina che monta tutte le schermate, una per pagina
   pdf, senza interattività. Il vetro/blur è disabilitato in @media print.
   ======================================================================= */

const PrintScreen = ({ label, children, screenLabel }) => (
  <section className="print-page" data-screen-label={screenLabel}>
    <div className="print-page-tag">{label}</div>
    <div className="print-page-frame">
      {children}
    </div>
  </section>
);

// Wrap che simula l'app-shell ma per stampa, con topbar finta e panel
const PrintFrame = ({ page, children, withConvPanel = false }) => (
  <div className="app-shell print-shell">
    <Topbar page={page} setPage={() => {}} />
    <div className={"app-body" + (withConvPanel ? "" : " hide-conv")}>
      {withConvPanel && (
        <ConvPanel
          activeConv={RESTAURO_DATA.conversazioni[0].id}
          setActiveConv={() => {}}
          onNewChat={() => {}}
        />
      )}
      {children}
    </div>
  </div>
);

// Una versione statica della Chat: non strea, mostra subito i messaggi
const StaticChatPage = ({ convId }) => {
  const conv = RESTAURO_DATA.conversazioni.find((c) => c.id === convId) || RESTAURO_DATA.conversazioni[0];
  const refMap = {};
  return (
    <div className="main glass">
      <header className="main-header">
        <div>
          <div className="main-title" style={{ fontSize: 18 }}>{conv.titolo}</div>
          <div className="main-sub">{(conv.messaggi || []).length} messaggi · knowledge base aggiornata</div>
        </div>
      </header>
      <div className="main-body">
        <div className="chat-thread">
          {(conv.messaggi || []).map((m, i) => {
            if (m.ruolo === "utente") {
              return (
                <div key={i} className="msg-user">
                  <div className="msg-user-bubble">{m.testo}</div>
                </div>
              );
            }
            return (
              <div key={i} className="msg-bot">
                <div className="msg-bot-meta">
                  <span className="msg-bot-meta-dot" />
                  Risposta · knowledge base
                </div>
                <div className="msg-bot-body">
                  {m.blocchi.map((b, j) => (
                    <p key={j}>{window.parseCitations(b.testo, refMap, () => {})}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PrintApp = () => {
  // Forza tema scuro + sfondo dipinto come default
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", "scuro");
  }, []);

  // Conversazione con messaggi per il print della chat
  const convWithMsgs = RESTAURO_DATA.conversazioni.find((c) => c.messaggi && c.messaggi.length > 0)
    || RESTAURO_DATA.conversazioni[0];

  return (
    <>
      <BackgroundLayer
        variant="studio"
        painting="madonna"
        theme="scuro"
        bgBlur={18}
        bgOpacity={0.85}
      />
      <div className="print-stack">
        <PrintScreen label="01 · Chat" screenLabel="01 chat">
          <PrintFrame page="chat" withConvPanel>
            <StaticChatPage convId={convWithMsgs.id} />
          </PrintFrame>
        </PrintScreen>

        <PrintScreen label="02 · Archivio" screenLabel="02 archivio">
          <PrintFrame page="archivio">
            <ArchivePage openPreview={() => {}} />
          </PrintFrame>
        </PrintScreen>

        <PrintScreen label="03 · Materiali" screenLabel="03 materiali">
          <PrintFrame page="materiali">
            <MaterialiPage />
          </PrintFrame>
        </PrintScreen>

        <PrintScreen label="04 · Tecniche" screenLabel="04 tecniche">
          <PrintFrame page="tecniche">
            <TecnichePage />
          </PrintFrame>
        </PrintScreen>

        <PrintScreen label="05 · Info" screenLabel="05 info">
          <PrintFrame page="info">
            <MethodologyPage />
          </PrintFrame>
        </PrintScreen>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<PrintApp />);

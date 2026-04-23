/* global React, RESTAURO_DATA, parseCitations, Icon */
const { useState: uSc, useEffect: uEc, useRef: uRc, useMemo: uMc } = React;

/* =======================================================================
   ChatPage
   ======================================================================= */
const ChatPage = ({ activeConvId, setActiveConvId, openPreview }) => {
  const conv = RESTAURO_DATA.conversazioni.find((c) => c.id === activeConvId);
  const isEmpty = !conv || !conv.messaggi || conv.messaggi.length === 0;

  const [draft, setDraft] = uSc("");
  const [liveMessages, setLiveMessages] = uSc(null); // override when streaming
  const [streaming, setStreaming] = uSc(null); // { text, target }
  const scrollRef = uRc(null);

  // Reset local state when conversation changes
  uEc(() => {
    setLiveMessages(null);
    setStreaming(null);
  }, [activeConvId]);

  const messages = liveMessages || (conv ? conv.messaggi : []);

  uEc(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  // refMap accumulated across the full conversation for consistent numbering
  const refMap = uMc(() => ({}), [activeConvId, liveMessages]);

  const handleSend = (overrideText) => {
    const text = (overrideText || draft).trim();
    if (!text) return;
    setDraft("");

    const userMsg = { ruolo: "utente", testo: text };
    const existing = messages.slice();
    const newMsgs = [...existing, userMsg];
    setLiveMessages(newMsgs);

    // Find a matching pre-scripted bot answer
    const reply = pickReply(text);

    // Stream
    const target = reply.blocchi.map((b) => b.testo).join("\n\n");
    setStreaming({ text: "", target, reply, baseMsgs: newMsgs });
  };

  // Streaming effect
  uEc(() => {
    if (!streaming) return;
    const { text, target, reply, baseMsgs } = streaming;
    if (text.length >= target.length) {
      // commit
      setLiveMessages([...baseMsgs, { ruolo: "bot", ...reply }]);
      setStreaming(null);
      return;
    }
    // Advance character(s). Speed scaled to look natural.
    const step = text.length < 50 ? 3 : text.length < 200 ? 6 : 10;
    const t = setTimeout(() => {
      setStreaming({ ...streaming, text: target.slice(0, text.length + step) });
    }, 18);
    return () => clearTimeout(t);
  }, [streaming]);

  if (isEmpty) {
    return (
      <div className="main glass">
        <header className="main-header">
          <div>
            <div className="main-title">Nuova conversazione</div>
            <div className="main-sub">Restauro pittorico · olio e tempera</div>
          </div>
        </header>
        <div className="main-body" ref={scrollRef}>
          <div className="empty-chat">
            <h1>
              Cosa cerchi <span>nell'archivio?</span>
            </h1>
            <p>
              Interroga la knowledge base — relazioni pratiche e fonti accademiche — per ricostruire
              metodologie, materiali e interventi documentati. Ogni risposta cita il documento di origine.
            </p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
              Domande per iniziare
            </div>
            <div className="suggestions" style={{ margin: 0 }}>
              {RESTAURO_DATA.domande_consigliate.map((q) => (
                <button key={q} className="suggestion" onClick={() => handleSend(q)}>{q}</button>
              ))}
            </div>
          </div>
        </div>
        <Composer draft={draft} setDraft={setDraft} onSend={() => handleSend()} />
      </div>
    );
  }

  return (
    <div className="main glass">
      <header className="main-header">
        <div>
          <div className="main-title" style={{ fontSize: 18 }}>{conv.titolo}</div>
          <div className="main-sub">{messages.length} messaggi · knowledge base aggiornata</div>
        </div>
      </header>
      <div className="main-body" ref={scrollRef}>
        <div className="chat-thread">
          {messages.map((m, i) => (
            <MessageRow key={i} msg={m} refMap={refMap} openPreview={openPreview} />
          ))}
          {streaming && (
            <StreamingBotMessage text={streaming.text} refMap={refMap} openPreview={openPreview} />
          )}
        </div>
      </div>
      <Composer draft={draft} setDraft={setDraft} onSend={() => handleSend()} disabled={!!streaming} />
    </div>
  );
};

const MessageRow = ({ msg, refMap, openPreview }) => {
  if (msg.ruolo === "utente") {
    return (
      <div className="msg-user">
        <div className="msg-user-bubble">{msg.testo}</div>
      </div>
    );
  }
  // bot
  return (
    <div className="msg-bot">
      <div className="msg-bot-meta">
        <span className="msg-bot-meta-dot" />
        Risposta · knowledge base
      </div>
      <div className="msg-bot-body">
        {msg.blocchi.map((b, i) => (
          <p key={i}>{parseCitations(b.testo, refMap, openPreview)}</p>
        ))}
      </div>
    </div>
  );
};

const StreamingBotMessage = ({ text, refMap, openPreview }) => {
  const paras = text.split("\n\n");
  return (
    <div className="msg-bot">
      <div className="msg-bot-meta">
        <span className="msg-bot-meta-dot" />
        Sto leggendo le fonti…
      </div>
      <div className="msg-bot-body">
        {paras.map((p, i) => {
          const isLast = i === paras.length - 1;
          return (
            <p key={i}>
              {parseCitations(p, refMap, openPreview)}
              {isLast && <span className="caret" />}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const Composer = ({ draft, setDraft, onSend, disabled }) => {
  const taRef = uRc(null);
  uEc(() => {
    if (!taRef.current) return;
    taRef.current.style.height = "auto";
    taRef.current.style.height = Math.min(taRef.current.scrollHeight, 140) + "px";
  }, [draft]);

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) onSend();
    }
  };

  return (
    <div className="composer-wrap">
      <div className="composer glass-strong">
        <textarea
          ref={taRef}
          rows={1}
          placeholder="Chiedi della pulitura, dei solventi, di una relazione…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          disabled={disabled}
        />
        <button className="composer-send" onClick={onSend} disabled={disabled || !draft.trim()}>
          <Icon.Send width={16} height={16} />
        </button>
      </div>
      <div className="composer-hint">Ogni risposta cita le fonti · Invio per inviare · Shift+Invio per andare a capo</div>
    </div>
  );
};

/* Pre-scripted replies for the demo */
function pickReply(q) {
  const qq = q.toLowerCase();
  if (qq.includes("san marco") || qq.includes("solvent")) return REPLIES.pala_san_marco;
  if (qq.includes("sollevamento") || qq.includes("lino")) return REPLIES.sollevamento_lino;
  if (qq.includes("ridipint") || qq.includes("gesso")) return REPLIES.ridipinture_gesso;
  if (qq.includes("paraloid")) return REPLIES.paraloid_filter;
  return REPLIES.default;
}

const REPLIES = {
  pala_san_marco: {
    blocchi: [
      { tipo: "p", testo: "Nella @REL:rel-001@Pala di San Marco@ (inizio XVI sec., bottega di Cima da Conegliano, attr.) la pulitura è stata condotta in due fasi sulla base di test di solubilità preliminari eseguiti secondo il protocollo descritto in @FONT:font-cremonesi-solventi." },
      { tipo: "p", testo: "La miscela di base è stata @REL:rel-001@Ligroina:Acetone 70:30, applicata a tampone con tempi di contatto di circa 30 secondi@. Sulle aree a maggiore accumulo di protettivo ossidato si è passati a 60:40, mantenendo lo stesso tempo di applicazione." },
      { tipo: "p", testo: "Il solvente di risciacquo è stato ligroina pura. Il consolidamento preliminare dei sollevamenti pittorici è stato eseguito con @REL:rel-001@Paraloid B-72 al 3% in ligroina@, previa velinatura con carta giapponese." },
    ],
  },
  sollevamento_lino: {
    blocchi: [
      { tipo: "p", testo: "Per un sollevamento della pellicola pittorica su tela di lino il protocollo tipico, ricostruito incrociando @FONT:font-costantini e @FONT:font-deluca con i casi pratici a disposizione, prevede tre fasi: velinatura provvisoria, consolidamento, riadesione sotto peso." },
      { tipo: "p", testo: "Nella @REL:rel-001@Pala di San Marco@ e nella @REL:rel-008@Pietà di bottega veneta@ il consolidamento è stato eseguito con colla di storione al 3–4% in acqua deionizzata, iniettata sotto il sollevamento con siringa previa velinatura a carta giapponese." },
      { tipo: "p", testo: "In casi con scarsa igroscopia o ambienti instabili si predilige @REL:rel-008@Paraloid B-72 al 3% in ligroina@, con riadesione a spatola calda a 55–60 °C sotto peso per 48 ore. La scelta è motivata dalla reversibilità del materiale e dal controllo del tempo di apertura." },
    ],
  },
  ridipinture_gesso: {
    blocchi: [
      { tipo: "p", testo: "Su tavola con ridipinture a olio sovrapposte a preparazione a gesso e colla, il punto di partenza è sempre una mappatura stratigrafica e una batteria di test di solubilità: si veda l'impostazione metodologica proposta in @FONT:font-cremonesi-solventi." },
      { tipo: "p", testo: "Il caso di riferimento più vicino nell'archivio è la @REL:rel-002@Madonna col Bambino, Anonimo veneto (XVI sec.)@: la scelta è stata di passare a un @REL:rel-002@gel di Pemulen TR-2 caricato con DMSO al 30%, con tempo di applicazione di 4–6 minuti e risciacquo in isoottano@, per evitare migrazioni del solvente nello strato originale." },
      { tipo: "p", testo: "Un secondo esempio utile è la @REL:rel-010@tavola di San Sebastiano (Maestro di Padova)@, attualmente in corso, dove sulla preparazione gessosa fragile si sta sperimentando un @REL:rel-010@gel di agar con ammonio citrato@, più selettivo sulle patinature superficiali." },
    ],
  },
  paraloid_filter: {
    blocchi: [
      { tipo: "p", testo: "Nell'archivio risultano cinque relazioni in cui è documentato l'uso di Paraloid B-72: @REL:rel-001@Pala di San Marco (2023)@, @REL:rel-002@Madonna col Bambino (2021)@, @REL:rel-003@Crocifissione (2022)@, @REL:rel-004@San Giovanni Battista (2020)@ e @REL:rel-008@Pietà di bottega (2022)@." },
      { tipo: "p", testo: "Le concentrazioni oscillano tra il 3% e il 5% in ligroina, in funzione della densità desiderata per l'applicazione (velinatura, consolidamento, strato isolante tra originale e ritocco)." },
      { tipo: "p", testo: "Per un elenco filtrabile completo puoi passare alla pagina Archivio e attivare il filtro «Paraloid B-72»." },
    ],
  },
  default: {
    blocchi: [
      { tipo: "p", testo: "Sto consultando la knowledge base. Questo è un prototipo per la tesi: nella versione finale la risposta sarà composta dinamicamente incrociando le relazioni pratiche in archivio con le fonti accademiche indicizzate (Costantini, Cremonesi, De Luca)." },
      { tipo: "p", testo: "Prova una delle domande suggerite per vedere una risposta completa con citazioni, oppure cerca un intervento specifico nella pagina Archivio." },
    ],
  },
};

Object.assign(window, { ChatPage });

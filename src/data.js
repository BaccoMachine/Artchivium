// Dati finti plausibili per la demo della tesi.
// Le relazioni sono invenzioni ma rispettano convenzioni del restauro pittorico
// italiano (solventi, tecniche, pigmenti, tempi d'intervento).

window.RESTAURO_DATA = {
  // -------------------------------------------------------------------------
  // RELAZIONI PRATICHE (casi di restauro)
  // -------------------------------------------------------------------------
  relazioni: [
    {
      id: "rel-001",
      codice: "relazione_pala_san_marco_2023",
      titolo: "Pala di San Marco",
      autore: "Bottega di Cima da Conegliano (attr.)",
      datazione: "inizio XVI sec.",
      supporto: "tela",
      dimensioni: "182 × 124 cm",
      tecnica: "olio su tela",
      anno_intervento: 2023,
      durata: "9 mesi",
      committente: "Parrocchia di S. Marco, Pordenone",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["olio", "tela", "pulitura", "Paraloid B-72", "foderatura"],
      materiali: ["Paraloid B-72", "Regalrez 1094", "Ligroina", "Acetone", "Colla di storione"],
      problematiche: ["Vernice ossidata ingiallita", "Sollevamenti pellicola", "Lacune nella preparazione"],
      abstract:
        "Intervento su pala d'altare con vernice pesantemente ossidata e diffusi sollevamenti della pellicola pittorica. Rimozione delle ridipinture tramite test di solubilità e pulitura selettiva con miscele Ligroina:Acetone.",
      estratto_pulitura:
        "La pulitura è stata condotta con miscela Ligroina:Acetone 70:30 tamponata su zone campione, a seguito di test di solubilità eseguiti secondo il protocollo Cremonesi. Nelle aree a maggiore accumulo di protettivo si è passati a 60:40 con tempi di contatto di 30 secondi.",
      estratto_consolidamento:
        "I sollevamenti sono stati consolidati con colla di storione al 4% in acqua deionizzata, previa velinatura con carta giapponese e Paraloid B-72 al 3% in ligroina.",
    },
    {
      id: "rel-002",
      codice: "relazione_madonna_bambino_2021",
      titolo: "Madonna col Bambino",
      autore: "Anonimo veneto",
      datazione: "seconda metà XVI sec.",
      supporto: "tavola",
      dimensioni: "64 × 48 cm",
      tecnica: "olio su tavola, preparazione a gesso e colla",
      anno_intervento: 2021,
      durata: "5 mesi",
      committente: "Collezione privata, Treviso",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["olio", "tavola", "ridipinture", "gesso", "Paraloid B-72"],
      materiali: ["Paraloid B-72", "Dimetilsolfossido", "Isoottano", "Gel di Pemulen TR-2"],
      problematiche: ["Ridipinture estese a olio", "Distacco preparazione", "Cretti di ritiro"],
      abstract:
        "Rimozione di ridipinture novecentesche a olio sovrapposte alla stesura originale, con preparazione a gesso e colla in parte distaccata. Utilizzo di gel tensioattivi per il controllo del solvente.",
      estratto_pulitura:
        "Sulle ridipinture si è operato con gel di Pemulen TR-2 caricato con DMSO al 30%, tempo di applicazione 4–6 minuti, risciacquo con isoottano. Il metodo è stato preferito alla miscela libera per evitare migrazioni nel film originale.",
    },
    {
      id: "rel-003",
      codice: "relazione_crocifissione_lignea_2022",
      titolo: "Crocifissione",
      autore: "Pittore friulano",
      datazione: "fine XV sec.",
      supporto: "tavola",
      dimensioni: "96 × 72 cm",
      tecnica: "tempera e olio su tavola",
      anno_intervento: 2022,
      durata: "7 mesi",
      committente: "Museo Diocesano, Udine",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["tempera", "tavola", "xilofagi", "consolidamento", "Regalrez"],
      materiali: ["Regalrez 1094", "Paraloid B-72", "Permetrina", "Balsite"],
      problematiche: ["Attacco xilofagi (pregresso)", "Fenditure tavola", "Vernici disomogenee"],
      abstract:
        "Tavola con pregresso attacco di insetti xilofagi, fenditure longitudinali e stesure di vernice disomogenee applicate in interventi successivi.",
    },
    {
      id: "rel-004",
      codice: "relazione_san_giovanni_battista_2020",
      titolo: "San Giovanni Battista",
      autore: "Scuola bolognese",
      datazione: "XVII sec.",
      supporto: "tela",
      dimensioni: "145 × 98 cm",
      tecnica: "olio su tela",
      anno_intervento: 2020,
      durata: "11 mesi",
      committente: "Parrocchia di S. Petronio, Bologna",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["olio", "tela", "foderatura", "strappi", "cera-resina"],
      materiali: ["Beva 371", "Tela di lino", "Paraloid B-72", "Ligroina"],
      problematiche: ["Strappi multipli", "Deformazioni del supporto", "Cadute di colore"],
      abstract:
        "Tela con quattro strappi principali e diffuse deformazioni. Foderatura a freddo con Beva 371 e nuova tela di lino preparata.",
    },
    {
      id: "rel-005",
      codice: "relazione_annunciazione_predella_2024",
      titolo: "Annunciazione (predella)",
      autore: "Cerchia di Lorenzo Lotto",
      datazione: "primo quarto XVI sec.",
      supporto: "tavola",
      dimensioni: "32 × 96 cm",
      tecnica: "olio e tempera su tavola",
      anno_intervento: 2024,
      durata: "6 mesi",
      committente: "Fondazione privata, Bergamo",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["predella", "tavola", "foglia oro", "pulitura selettiva"],
      materiali: ["Paraloid B-72", "Ligroina", "Ammonio citrato", "Agar"],
      problematiche: ["Foglia oro abrasa", "Vernice ingiallita", "Depositi superficiali"],
      abstract:
        "Predella con fondo oro parzialmente abraso. Pulitura differenziata tra zone auree (gel di agar con ammonio citrato) e campiture a olio.",
    },
    {
      id: "rel-006",
      codice: "relazione_ritratto_gentiluomo_2019",
      titolo: "Ritratto di gentiluomo",
      autore: "Pittore lombardo",
      datazione: "inizio XVIII sec.",
      supporto: "tela",
      dimensioni: "78 × 62 cm",
      tecnica: "olio su tela",
      anno_intervento: 2019,
      durata: "4 mesi",
      committente: "Collezione privata, Milano",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["olio", "tela", "ritratto", "vernice"],
      materiali: ["Regalrez 1094", "Shellsol D40", "Paraloid B-72"],
      problematiche: ["Vernice fortemente ingiallita", "Piccole lacune"],
      abstract:
        "Ritratto con vernice ossidata che alterava significativamente la lettura cromatica. Pulitura con Shellsol D40 al 15% in gel.",
    },
    {
      id: "rel-007",
      codice: "relazione_sacra_famiglia_2023",
      titolo: "Sacra Famiglia",
      autore: "Pittore emiliano",
      datazione: "XVII sec.",
      supporto: "tela",
      dimensioni: "120 × 95 cm",
      tecnica: "olio su tela",
      anno_intervento: 2023,
      durata: "8 mesi",
      committente: "Parrocchia di S. Giuseppe, Modena",
      restauratrice: "C. Bianchi",
      stato: "in corso",
      tags: ["olio", "tela", "muffe", "biocida"],
      materiali: ["Preventol R80", "Ligroina", "Paraloid B-72"],
      problematiche: ["Attacco biologico pregresso", "Macchie da umidità", "Tela indebolita"],
      abstract:
        "Dipinto proveniente da ambiente umido con presenza di macchie da colonizzazione microbica e tela strutturalmente compromessa.",
    },
    {
      id: "rel-008",
      codice: "relazione_pieta_di_bottega_2022",
      titolo: "Pietà",
      autore: "Bottega veneta",
      datazione: "metà XVI sec.",
      supporto: "tela",
      dimensioni: "168 × 110 cm",
      tecnica: "olio su tela",
      anno_intervento: 2022,
      durata: "10 mesi",
      committente: "Parrocchia di S. Maria, Vicenza",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["olio", "tela", "foderatura", "Paraloid B-72", "strappi"],
      materiali: ["Beva 371", "Paraloid B-72", "Ligroina", "Acetone"],
      problematiche: ["Strappo centrale", "Vernice disomogenea", "Sollevamenti diffusi"],
      abstract:
        "Intervento completo su grande tela con strappo centrale verticale di 38 cm. Foderatura con Beva 371 film.",
    },
    {
      id: "rel-009",
      codice: "relazione_natura_morta_2021",
      titolo: "Natura morta con frutta",
      autore: "Anonimo napoletano",
      datazione: "fine XVII sec.",
      supporto: "tela",
      dimensioni: "82 × 116 cm",
      tecnica: "olio su tela",
      anno_intervento: 2021,
      durata: "3 mesi",
      committente: "Collezione privata, Napoli",
      restauratrice: "C. Bianchi",
      stato: "completato",
      tags: ["olio", "tela", "pulitura", "ritocco"],
      materiali: ["Regalrez 1094", "Ligroina", "Gamblin Conservation Colors"],
      problematiche: ["Vernice giallastra", "Piccole cadute di colore"],
      abstract:
        "Pulitura e reintegrazione pittorica a selezione cromatica su natura morta di piccolo formato.",
    },
    {
      id: "rel-010",
      codice: "relazione_san_sebastiano_tavola_2024",
      titolo: "San Sebastiano",
      autore: "Maestro di Padova",
      datazione: "seconda metà XV sec.",
      supporto: "tavola",
      dimensioni: "112 × 58 cm",
      tecnica: "tempera all'uovo su tavola",
      anno_intervento: 2024,
      durata: "in corso",
      committente: "Museo Civico, Padova",
      restauratrice: "C. Bianchi",
      stato: "in corso",
      tags: ["tempera", "tavola", "preparazione gessosa", "gel"],
      materiali: ["Gel di agar", "Ammonio citrato", "Paraloid B-72"],
      problematiche: ["Preparazione gessosa fragile", "Ridipinture", "Cretti"],
      abstract:
        "Tavola quattrocentesca con tempera all'uovo su preparazione a gesso e colla. Intervento in corso, fase di pulitura.",
    },
  ],

  // -------------------------------------------------------------------------
  // FONTI ACCADEMICHE
  // -------------------------------------------------------------------------
  fonti: [
    {
      id: "font-costantini",
      titolo: "Il restauro dei dipinti olio su tela",
      autore: "G. Costantini",
      tipo: "manuale",
      argomenti: ["olio", "tela", "foderatura", "pulitura"],
    },
    {
      id: "font-cremonesi-solventi",
      titolo: "Solventi organici nella pulitura di opere policrome",
      autore: "P. Cremonesi",
      tipo: "manuale",
      argomenti: ["solventi", "pulitura", "test solubilità"],
    },
    {
      id: "font-cremonesi-tensioattivi",
      titolo: "Tensioattivi e chelanti per il trattamento di opere policrome",
      autore: "P. Cremonesi",
      tipo: "manuale",
      argomenti: ["tensioattivi", "chelanti", "gel", "pulitura acquosa"],
    },
    {
      id: "font-cremonesi-mobili",
      titolo: "Un approccio alla pulitura dei dipinti mobili",
      autore: "P. Cremonesi",
      tipo: "manuale",
      argomenti: ["pulitura", "dipinti mobili", "metodologia"],
    },
    {
      id: "font-pigmenti",
      titolo: "I pigmenti nell'arte (dalla preistoria alla rivoluzione industriale)",
      autore: "AA.VV.",
      tipo: "saggio",
      argomenti: ["pigmenti", "storia"],
    },
    {
      id: "font-deluca",
      titolo: "I manufatti dipinti su supporto tessile",
      autore: "D. De Luca",
      tipo: "manuale",
      argomenti: ["tela", "supporto tessile", "conservazione"],
    },
  ],

  // -------------------------------------------------------------------------
  // VOCI GUIDA (teoria: pigmenti, tecniche)
  // -------------------------------------------------------------------------
  guida: {
    pigmenti: [
      { nome: "Bianco di piombo", formula: "2PbCO₃·Pb(OH)₂", periodo: "antichità – XIX sec.", colore: "#f4eee1", note: "Coprente, essiccante rapido con olio. Annerisce in presenza di H₂S." },
      { nome: "Terra d'ombra naturale", formula: "ossidi Fe/Mn idrati", periodo: "preistoria – oggi", colore: "#5c4432", note: "Pigmento bruno caldo. Essicca rapidamente (ricco di manganese)." },
      { nome: "Ocra gialla", formula: "FeO(OH) · n H₂O", periodo: "preistoria – oggi", colore: "#c89a4a", note: "Stabile, compatibile con tutti i leganti." },
      { nome: "Azzurrite", formula: "Cu₃(CO₃)₂(OH)₂", periodo: "antichità – XVII sec.", colore: "#3a6a9a", note: "Blu freddo. Vira al verde (malachite) in ambienti alcalini." },
      { nome: "Lacca di garanza", formula: "alizarina su allume", periodo: "medioevo – oggi", colore: "#8a2d3a", note: "Pigmento organico trasparente. Sensibile alla luce." },
      { nome: "Vermiglione", formula: "HgS", periodo: "antichità – XIX sec.", colore: "#b23a2a", note: "Rosso intenso. Annerisce in superficie se esposto a UV e umidità." },
      { nome: "Verde rame / verderame", formula: "acetato di rame", periodo: "medioevo – XVIII sec.", colore: "#4a7558", note: "Varia da azzurro-verde a bruno. Instabile in tempera." },
      { nome: "Nero di vite", formula: "C (amorfo)", periodo: "antichità – oggi", colore: "#1a1a1a", note: "Carbone vegetale da tralci. Neutro, freddo." },
    ],
    tecniche: [
      {
        id: "tec-olio-tela",
        nome: "Olio su tela",
        riassunto: "Tecnica dominante dal XVI secolo. Pigmenti legati con olio siccativo (lino, noce, papavero) stesi su tela preparata con colla animale e imprimitura.",
        criticita: ["Ingiallimento della vernice", "Sollevamenti", "Craquelure da essiccazione"],
      },
      {
        id: "tec-olio-tavola",
        nome: "Olio su tavola",
        riassunto: "Preparazione a gesso e colla (mestica), imprimitura, stesura oleosa. Tipica del XV–XVI sec.",
        criticita: ["Fenditure del supporto", "Distacchi della preparazione", "Attacchi xilofagi"],
      },
      {
        id: "tec-tempera",
        nome: "Tempera all'uovo",
        riassunto: "Tecnica medievale e rinascimentale. Tuorlo come legante, stesure sottili sovrapposte.",
        criticita: ["Fragilità del film pittorico", "Sensibilità all'umidità", "Ritocchi successivi a olio"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CONVERSAZIONI DEMO (cronologia)
  // -------------------------------------------------------------------------
  conversazioni: [
    {
      id: "conv-1",
      titolo: "Solventi per la Pala di San Marco",
      data: "oggi",
      attiva: true,
      messaggi: [
        {
          ruolo: "utente",
          testo: "Quali solventi sono stati usati per la pulitura della Pala di San Marco?",
        },
        {
          ruolo: "bot",
          blocchi: [
            {
              tipo: "p",
              testo:
                "Nella Pala di San Marco (inizio XVI sec., bottega di Cima da Conegliano, attr.) la pulitura è stata condotta in due fasi sulla base di test di solubilità preliminari eseguiti secondo il protocollo @FONT:font-cremonesi-solventi.",
            },
            {
              tipo: "p",
              testo:
                "La miscela di base è stata @REL:rel-001@fraseLigroina:Acetone 70:30, applicata a tampone con tempi di contatto di circa 30 secondi@. Sulle aree a maggiore accumulo di protettivo ossidato si è passati a 60:40, mantenendo lo stesso tempo di applicazione.",
            },
            {
              tipo: "p",
              testo:
                "Il solvente di risciacquo è stato ligroina pura. Il consolidamento preliminare dei sollevamenti pittorici è stato eseguito con @REL:rel-001@fraseParaloid B-72 al 3% in ligroina@, previa velinatura.",
            },
          ],
          citazioni: [
            { id: "rel-001", tipo: "relazione" },
            { id: "font-cremonesi-solventi", tipo: "fonte" },
          ],
        },
      ],
    },
    {
      id: "conv-2",
      titolo: "Sollevamento pellicola su lino",
      data: "oggi",
      messaggi: [],
    },
    {
      id: "conv-3",
      titolo: "Ridipinture su preparazione a gesso",
      data: "ieri",
      messaggi: [],
    },
    {
      id: "conv-4",
      titolo: "Opere con Paraloid B-72",
      data: "ieri",
      messaggi: [],
    },
    {
      id: "conv-5",
      titolo: "Trattamento xilofagi su tavola",
      data: "3 giorni fa",
      messaggi: [],
    },
    {
      id: "conv-6",
      titolo: "Foderatura con Beva 371",
      data: "la settimana scorsa",
      messaggi: [],
    },
    {
      id: "conv-7",
      titolo: "Gel di agar per fondi oro",
      data: "la settimana scorsa",
      messaggi: [],
    },
  ],

  // Domande consigliate per stato vuoto
  domande_consigliate: [
    "Quali solventi sono stati usati per la pulitura della Pala di San Marco?",
    "Come si tratta un sollevamento della pellicola pittorica su tela di lino?",
    "Ho una tavola con ridipinture a olio su preparazione a gesso, come procedo?",
    "Mostrami tutte le relazioni che hanno usato Paraloid B-72.",
  ],
};

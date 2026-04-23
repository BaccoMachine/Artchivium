/* global React, RESTAURO_DATA, Icon */
const { useState: uSa, useMemo: uMa } = React;

/* =======================================================================
   ArchivePage — card / tabella con filtri
   ======================================================================= */
const ArchivePage = ({ openPreview }) => {
  const [view, setView] = uSa("card"); // "card" | "tabella"
  const [q, setQ] = uSa("");
  const [filters, setFilters] = uSa({ supporto: null, tecnica: null, anno: null, materiale: null, stato: null });

  const rels = RESTAURO_DATA.relazioni;

  const supporti = [...new Set(rels.map((r) => r.supporto))];
  const tecniche = [...new Set(rels.map((r) => r.tecnica))];
  const anni = [...new Set(rels.map((r) => r.anno_intervento))].sort((a, b) => b - a);
  const materiali = [...new Set(rels.flatMap((r) => r.materiali))].sort();

  const filtered = uMa(() => {
    return rels.filter((r) => {
      if (q) {
        const qq = q.toLowerCase();
        const hay = [r.titolo, r.autore, r.abstract, ...r.materiali, ...r.tags].join(" ").toLowerCase();
        if (!hay.includes(qq)) return false;
      }
      if (filters.supporto && r.supporto !== filters.supporto) return false;
      if (filters.tecnica && r.tecnica !== filters.tecnica) return false;
      if (filters.anno && r.anno_intervento !== filters.anno) return false;
      if (filters.materiale && !r.materiali.includes(filters.materiale)) return false;
      if (filters.stato && r.stato !== filters.stato) return false;
      return true;
    });
  }, [q, filters, rels]);

  const toggle = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));

  const resetAll = () => { setQ(""); setFilters({ supporto: null, tecnica: null, anno: null, materiale: null, stato: null }); };
  const hasFilters = Object.values(filters).some(Boolean) || q;

  return (
    <div className="main glass">
      <header className="main-header">
        <div>
          <div className="main-title">Archivio relazioni</div>
          <div className="main-sub">{rels.length} interventi documentati · 2019–2024</div>
        </div>
        <div className="view-toggle">
          <button className={view === "card" ? "active" : ""} onClick={() => setView("card")}>Schede</button>
          <button className={view === "tabella" ? "active" : ""} onClick={() => setView("tabella")}>Tabella</button>
        </div>
      </header>
      <div className="main-body">
        <div className="archive-controls">
          <div className="archive-search">
            <Icon.Search width={15} height={15} color="var(--ink-3)" />
            <input
              placeholder="Cerca per titolo, autore, materiale, parola chiave…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-row">
          <FilterGroup label="Supporto" values={supporti} active={filters.supporto} onToggle={(v) => toggle("supporto", v)} />
          <FilterGroup label="Anno" values={anni} active={filters.anno} onToggle={(v) => toggle("anno", v)} />
          <FilterGroup label="Stato" values={["completato", "in corso"]} active={filters.stato} onToggle={(v) => toggle("stato", v)} />
        </div>
        <div className="filter-row">
          <FilterGroup label="Materiale" values={materiali} active={filters.materiale} onToggle={(v) => toggle("materiale", v)} compact />
        </div>

        <div className="archive-results-meta" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{filtered.length} / {rels.length} risultati</span>
          {hasFilters && <button onClick={resetAll} style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>azzera filtri ×</button>}
        </div>

        {view === "card" ? (
          <div className="card-grid">
            {filtered.map((r) => (
              <button key={r.id} className="rel-card glass" onClick={() => openPreview({ kind: "relazione", id: r.id })}>
                <div className="rel-card-thumb">{r.tecnica.toUpperCase()}</div>
                <div className="rel-card-body">
                  <div className="rel-card-meta">
                    <span>{r.supporto}</span>
                    <span>·</span>
                    <span>{r.anno_intervento}</span>
                    <span style={{ marginLeft: "auto" }}>
                      <span className={"status-dot " + (r.stato === "completato" ? "completato" : "in-corso")} />
                    </span>
                  </div>
                  <div className="rel-card-title">{r.titolo}</div>
                  <div className="rel-card-author">{r.autore}</div>
                  <div className="tag-row rel-card-tags">
                    {r.tags.slice(0, 3).map((t, i) => (<span className="tag" key={i}>#{t}</span>))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="archive-table-wrap glass" style={{ padding: "4px 0" }}>
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Titolo / Autore</th>
                  <th>Codice</th>
                  <th>Supporto</th>
                  <th>Anno</th>
                  <th>Materiali chiave</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} onClick={() => openPreview({ kind: "relazione", id: r.id })}>
                    <td>
                      <div className="tbl-title">{r.titolo}</div>
                      <div className="tbl-author">{r.autore}</div>
                    </td>
                    <td className="tbl-code">{r.codice}</td>
                    <td>{r.supporto}</td>
                    <td>{r.anno_intervento}</td>
                    <td>
                      <div className="tbl-tags">
                        {r.materiali.slice(0, 3).map((m, i) => (
                          <span className="tag accent" key={i}>{m}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={"status-dot " + (r.stato === "completato" ? "completato" : "in-corso")} />
                      {r.stato}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterGroup = ({ label, values, active, onToggle, compact }) => (
  <>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", alignSelf: "center", marginRight: 6 }}>
      {label}
    </span>
    {values.map((v) => (
      <button
        key={v}
        className={"filter-chip" + (active === v ? " active" : "")}
        onClick={() => onToggle(v)}
        style={compact ? { fontSize: 10.5, padding: "4px 9px" } : null}
      >
        {v}
      </button>
    ))}
  </>
);

Object.assign(window, { ArchivePage });

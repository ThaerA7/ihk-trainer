import { useState } from 'react';

// === IHK AP1 – Nur Freitextfragen mit Navigation & Musterlösung ===

type AP1Item = {
  id: string;
  prompt: string; // Fragestellung
  solution: string; // Musterlösung (einblendbar)
};

const ap1Items: AP1Item[] = [
  {
    id: 'ap1-1',
    prompt: `Netzwerk-Subnetting:
Gegeben ist ein IPv4-Netz 192.168.10.0/24. Es werden mind. 5 Subnetze benötigt, in denen jeweils mindestens 25 Hosts adressierbar sein müssen.

Aufgabe: Wähle eine geeignete Subnetzmaske und gib für EIN Beispiel-Subnetz die Netzadresse, Broadcast-Adresse und den gültigen Hostbereich an. Begründe kurz deine Wahl.`,
    solution: `Lösungsidee: /27 (255.255.255.224) liefert 32 Adressen pro Subnetz → 30 nutzbare Hosts, und 8 Subnetze aus /24. Damit sind ≥5 Subnetze mit je ≥25 Hosts erfüllt.

Beispiel-Subnetz 1:
Netz: 192.168.10.0/27
Broadcast: 192.168.10.31
Hostbereich: 192.168.10.1 – 192.168.10.30

Weitere Subnetze wären z. B. 192.168.10.32/27, 192.168.10.64/27, …`,
  },
  {
    id: 'ap1-2',
    prompt: `SQL-Auswertung:
Tabellen: kunde(id, name), auftrag(id, kunde_id, betrag, datum).

Aufgabe: Formuliere eine SQL-Abfrage, die für das Jahr 2024 die Summe der Auftragsbeträge je Kunde ermittelt. Zeige nur Kunden mit Summe > 10000 und sortiere absteigend nach Summe.`,
    solution: `SELECT k.name, SUM(a.betrag) AS summe
FROM kunde k
JOIN auftrag a ON a.kunde_id = k.id
WHERE a.datum >= '2024-01-01' AND a.datum < '2025-01-01'
GROUP BY k.name
HAVING SUM(a.betrag) > 10000
ORDER BY summe DESC;`,
  },
  {
    id: 'ap1-3',
    prompt: `Algorithmik/Programmierung:
Schreibe (z. B. in JavaScript/Pseudocode) eine Funktion, die das erste doppelt vorkommende Element in einem Integer-Array findet und zurückgibt. Falls kein Duplikat existiert, gib null zurück. Zielkomplexität: O(n).`,
    solution: `JavaScript-Variante:
function erstesDuplikat(arr) {
  const gesehen = new Set();
  for (const x of arr) {
    if (gesehen.has(x)) return x;
    gesehen.add(x);
  }
  return null;
}`,
  },
  {
    id: 'ap1-4',
    prompt: `UML/OO-Grundlagen:
Erkläre den Unterschied zwischen Aggregation und Komposition und gib je ein kurzes Beispiel (in Worten oder mit minimalem Code).`,
    solution: `Aggregation: „hat-eine”-Beziehung, schwache Bindung. Das Teil kann auch ohne das Ganze existieren.
Beispiel: Klasse Team aggregiert Mitarbeiter – Mitarbeiter können auch ohne Team existieren.

Komposition: starke Besitzbeziehung, Lebenszyklus gekoppelt. Das Teil existiert nicht sinnvoll ohne das Ganze.
Beispiel: Klasse Haus komponiert Räume – werden i. d. R. mit dem Haus erstellt/gelöscht.`,
  },
  {
    id: 'ap1-5',
    prompt: `Speicher-/Datenmengenberechnung:
Ein unkomprimiertes RGB-Video hat 1920×1080 Pixel, 24 Bit Farbtiefe und 60 FPS. Spieldauer: 10 Sekunden.

Aufgabe: Berechne die ungefähre Datenmenge in Byte und gib zusätzlich Größenordnungen in GiB und in GB an.`,
    solution: `Berechnung pro Frame: 1920×1080×24 Bit ≈ 49.766.400 Bit = 6.220.800 Byte ≈ 5,93 MiB.
Anzahl Frames: 60 FPS × 10 s = 600 Frames.
Gesamt: 6.220.800 × 600 = 3.732.480.000 Byte ≈ 3,476 GiB (≈ 3,73 GB).`,
  },
];

export default function InformationUndGrundbegriffe() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const current = ap1Items[index];
  const total = ap1Items.length;

  const gotoPrev = () => setIndex((i) => Math.max(0, i - 1));
  const gotoNext = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">IHK AP1 Übungsfragen</h2>
        <p className="text-sm text-white/70">
          Freitextaufgaben mit Lösungen & Navigation
        </p>
      </header>

      <article className="rounded-xl border border-white/40 bg-white/5 p-4 text-white/90 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-white/70">
            Frage {index + 1} / {total}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={gotoPrev}
              disabled={index === 0}
              aria-label="Zur vorherigen Frage"
              className="rounded-md border border-white/50 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Zurück
            </button>
            <button
              type="button"
              onClick={gotoNext}
              disabled={index === total - 1}
              aria-label="Zur nächsten Frage"
              className="rounded-md border border-white/50 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Weiter →
            </button>
          </div>
        </div>

        {/* Frage in Rechteck */}
        <div className="rounded-lg border border-white/50 bg-white/5 p-4">
          <p className="whitespace-pre-wrap leading-relaxed">
            {current.prompt}
          </p>
        </div>

        {/* Freitextfeld in Rechteck */}
        <label
          className="mt-3 block text-sm font-medium text-white/80"
          htmlFor="ap1-answer"
        >
          Deine Antwort
        </label>
        <textarea
          id="ap1-answer"
          className="mt-1 w-full min-h-[160px] resize-y rounded-lg border border-white/50 bg-white/5 text-white placeholder-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-white/40"
          placeholder="Schreibe hier deine Antwort..."
          value={answers[current.id] ?? ''}
          onChange={(e) =>
            setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))
          }
        />

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setAnswers((prev) => ({ ...prev, [current.id]: '' }))
            }
            className="rounded-md border border-white/50 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            Antwort löschen
          </button>
          <button
            type="button"
            onClick={() =>
              setRevealed((prev) => ({
                ...prev,
                [current.id]: !prev[current.id],
              }))
            }
            aria-pressed={!!revealed[current.id]}
            className="rounded-md border border-white/50 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            {revealed[current.id] ? 'Lösung verbergen' : 'Lösung anzeigen'}
          </button>
        </div>

        {revealed[current.id] && (
          <div className="mt-3 rounded-lg border border-green-300/40 bg-green-500/10 p-3">
            <p className="text-sm font-medium text-green-200">Musterlösung</p>
            <pre className="mt-1 whitespace-pre-wrap text-sm text-white/90">
              {current.solution}
            </pre>
          </div>
        )}
      </article>
    </section>
  );
}

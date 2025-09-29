import { useProgress } from '../store/useProgress';

const sampleQuestions = [
  {
    id: 'q1',
    subject: 'OOP',
    stem: 'Welche Aussage zu Polymorphie trifft zu?',
    choices: [
      'Ein Objekt kann nur eine Klasse erben.',
      'Methoden können zur Laufzeit unterschiedlich implementiert sein.',
      'Kapselung bedeutet öffentliche Felder.',
      'Interfaces dürfen keine Methoden enthalten.',
    ],
    answerIndex: 1,
  },
];

export default function Practice() {
  const { correct, attempts, addResult } = useProgress();

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Practice</h2>
        <div className="text-sm text-gray-600">
          Score: <span className="font-medium">{correct}/{attempts}</span>
        </div>
      </header>

      {sampleQuestions.map((q) => (
        <article key={q.id} className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-medium">{q.stem}</h3>
          <div className="mt-3 grid gap-2">
            {q.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => addResult(i === q.answerIndex)}
                className="rounded-lg border px-3 py-2 text-left hover:bg-gray-50"
              >
                {c}
              </button>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

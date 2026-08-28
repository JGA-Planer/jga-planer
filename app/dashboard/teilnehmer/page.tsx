export default function TeilnehmerPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Teilnehmer 👥</h1>
        <p className="mt-2 text-muted-foreground">
          Hier verwaltest du alle Personen für den JGA.
        </p>

        <div className="mt-8 rounded-xl border p-5">
          <h2 className="text-lg font-semibold">Teilnehmer hinzufügen</h2>

          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              className="rounded-lg border px-4 py-3"
            />

            <input
              type="email"
              placeholder="E-Mail"
              className="rounded-lg border px-4 py-3"
            />

            <button className="rounded-lg bg-black px-4 py-3 text-white">
              Hinzufügen
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

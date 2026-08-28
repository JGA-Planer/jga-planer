export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Mein JGA 🎉</h1>
        <p className="mt-2 text-muted-foreground">
          Plane euren perfekten Junggesellenabschied an einem Ort.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-5">
            <h2 className="text-lg font-semibold">👥 Teilnehmer</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Gäste einladen und Zusagen verwalten.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="text-lg font-semibold">💰 Budget</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kosten planen und fair aufteilen.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="text-lg font-semibold">🎯 Aktivitäten</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ideen und geplante Aktivitäten sammeln.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="text-lg font-semibold">✅ Aufgaben</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Organisieren, verteilen und abhaken.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

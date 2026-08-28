"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function TeilnehmerPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [teilnehmer, setTeilnehmer] = useState<
    { name: string; email: string }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function hinzufuegen() {
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.from("teilnehmer").insert({
      name: name.trim(),
      email: email.trim(),
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setTeilnehmer([
      ...teilnehmer,
      {
        name: name.trim(),
        email: email.trim(),
      },
    ])

    setName("")
    setEmail("")
    setLoading(false)
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Teilnehmer 👥</h1>

        <p className="mt-2 text-muted-foreground">
          Hier verwaltest du alle Personen für den JGA.
        </p>

        <div className="mt-8 rounded-xl border p-5">
          <h2 className="text-lg font-semibold">
            Teilnehmer hinzufügen
          </h2>

          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border px-4 py-3"
            />

            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border px-4 py-3"
            />

            {error && (
              <p className="rounded-lg border p-3 text-sm">
                {error}
              </p>
            )}

            <button
              onClick={hinzufuegen}
              disabled={loading}
              className="rounded-lg bg-black px-4 py-3 text-white"
            >
              {loading ? "Wird gespeichert..." : "Hinzufügen"}
            </button>
          </div>
        </div>

        {teilnehmer.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold">Teilnehmerliste</h2>

            <div className="mt-4 flex flex-col gap-3">
              {teilnehmer.map((person, index) => (
                <div key={index} className="rounded-xl border p-4">
                  <p className="font-semibold">{person.name}</p>

                  {person.email && (
                    <p className="text-sm text-muted-foreground">
                      {person.email}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button, Input, Label, Card } from "@/components/ui"
import { PartyPopper } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage("Fast geschafft! Bitte bestätige deine E-Mail.")
    setLoading(false)
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <PartyPopper className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold">JGA-Planer</span>
        </Link>

        <Card className="p-6">
          <h1 className="font-display text-2xl font-bold">
            Konto erstellen
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Registriere dich, um deinen JGA zu planen.
          </p>

          <form onSubmit={handleSignUp} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="du@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="rounded-lg border p-3 text-sm">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-lg border p-3 text-sm">
                {message}
              </p>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Wird erstellt..." : "Registrieren"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Schon ein Konto?{" "}
            <Link href="/auth/login" className="text-primary">
              Anmelden
            </Link>
          </p>
        </Card>
      </div>
    </main>
  )
}

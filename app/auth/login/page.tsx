"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button, Input, Label, Card } from "@/components/ui"
import { PartyPopper } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setError("Bitte bestätige zuerst deine E-Mail-Adresse über den Link in deinem Postfach.")
      } else {
        setError("E-Mail oder Passwort ist ungültig.")
      }
      setLoading(false)
      return
    }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PartyPopper className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold">JGA-Planer</span>
        </Link>
        <Card className="p-6">
          <h1 className="font-display text-2xl font-bold text-balance">Willkommen zurück</h1>
          <p className="mt-1 text-sm text-muted-foreground">Melde dich an, um weiterzuplanen.</p>
          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
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
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Wird angemeldet…" : "Anmelden"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Noch kein Konto?{" "}
            <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
              Jetzt registrieren
            </Link>
          </p>
        </Card>
      </div>
    </main>
  )
}

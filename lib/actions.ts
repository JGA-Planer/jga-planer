"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")
  return { supabase, user }
}

/* ---------- Events ---------- */

export async function createEvent(formData: FormData) {
  const { supabase, user } = await requireUser()
  const title = String(formData.get("title") || "").trim()
  if (!title) return

  const { data, error } = await supabase
    .from("events")
    .insert({
      owner_id: user.id,
      title,
      honoree: String(formData.get("honoree") || "").trim() || null,
      location: String(formData.get("location") || "").trim() || null,
      description: String(formData.get("description") || "").trim() || null,
      event_date: String(formData.get("event_date") || "") || null,
    })
    .select("id")
    .single()

  if (error) throw new Error(error.message)
  revalidatePath("/dashboard")
  redirect(`/dashboard/${data.id}`)
}

export async function updateEvent(eventId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const title = String(formData.get("title") || "").trim()
  if (!title) return

  const { error } = await supabase
    .from("events")
    .update({
      title,
      honoree: String(formData.get("honoree") || "").trim() || null,
      location: String(formData.get("location") || "").trim() || null,
      description: String(formData.get("description") || "").trim() || null,
      event_date: String(formData.get("event_date") || "") || null,
    })
    .eq("id", eventId)

  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteEvent(eventId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("events").delete().eq("id", eventId)
  if (error) throw new Error(error.message)
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

/* ---------- Participants ---------- */

export async function addParticipant(eventId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const name = String(formData.get("name") || "").trim()
  if (!name) return
  const { error } = await supabase.from("participants").insert({
    event_id: eventId,
    name,
    email: String(formData.get("email") || "").trim() || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function setParticipantStatus(
  eventId: string,
  participantId: string,
  status: "pending" | "accepted" | "declined",
) {
  const { supabase } = await requireUser()
  const { error } = await supabase
    .from("participants")
    .update({ status })
    .eq("id", participantId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteParticipant(eventId: string, participantId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("participants").delete().eq("id", participantId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

/* ---------- Agenda ---------- */

export async function addAgendaItem(eventId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const title = String(formData.get("title") || "").trim()
  if (!title) return
  const { error } = await supabase.from("agenda_items").insert({
    event_id: eventId,
    title,
    location: String(formData.get("location") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    start_time: String(formData.get("start_time") || "") || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteAgendaItem(eventId: string, itemId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("agenda_items").delete().eq("id", itemId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

/* ---------- Expenses ---------- */

export async function addExpense(eventId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const title = String(formData.get("title") || "").trim()
  const amount = Number.parseFloat(String(formData.get("amount") || "0"))
  const splitCount = Math.max(1, Number.parseInt(String(formData.get("split_count") || "1"), 10) || 1)
  if (!title || !Number.isFinite(amount) || amount < 0) return
  const { error } = await supabase.from("expenses").insert({
    event_id: eventId,
    title,
    amount,
    paid_by: String(formData.get("paid_by") || "").trim() || null,
    split_count: splitCount,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteExpense(eventId: string, expenseId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("expenses").delete().eq("id", expenseId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

/* ---------- Tasks ---------- */

export async function addTask(eventId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const title = String(formData.get("title") || "").trim()
  if (!title) return
  const { error } = await supabase.from("tasks").insert({
    event_id: eventId,
    title,
    assignee: String(formData.get("assignee") || "").trim() || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function toggleTask(eventId: string, taskId: string, done: boolean) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("tasks").update({ done }).eq("id", taskId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteTask(eventId: string, taskId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("tasks").delete().eq("id", taskId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

/* ---------- Date voting ---------- */

export async function addDateOption(eventId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const optionDate = String(formData.get("option_date") || "")
  if (!optionDate) return
  const { error } = await supabase.from("date_options").insert({
    event_id: eventId,
    option_date: optionDate,
    note: String(formData.get("note") || "").trim() || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteDateOption(eventId: string, optionId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("date_options").delete().eq("id", optionId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function addDateVote(eventId: string, optionId: string, formData: FormData) {
  const { supabase } = await requireUser()
  const voterName = String(formData.get("voter_name") || "").trim()
  if (!voterName) return
  const { error } = await supabase.from("date_votes").insert({
    event_id: eventId,
    date_option_id: optionId,
    voter_name: voterName,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

export async function deleteDateVote(eventId: string, voteId: string) {
  const { supabase } = await requireUser()
  const { error } = await supabase.from("date_votes").delete().eq("id", voteId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/${eventId}`)
}

/* ---------- Auth ---------- */

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}

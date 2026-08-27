export type EventRow = {
  id: string
  owner_id: string
  title: string
  honoree: string | null
  description: string | null
  location: string | null
  event_date: string | null
  created_at: string
}

export type Participant = {
  id: string
  event_id: string
  name: string
  email: string | null
  status: "pending" | "accepted" | "declined"
  created_at: string
}

export type AgendaItem = {
  id: string
  event_id: string
  title: string
  description: string | null
  location: string | null
  start_time: string | null
  sort_order: number
  created_at: string
}

export type Expense = {
  id: string
  event_id: string
  title: string
  amount: number
  paid_by: string | null
  split_count: number
  created_at: string
}

export type Task = {
  id: string
  event_id: string
  title: string
  assignee: string | null
  done: boolean
  created_at: string
}

export type DateOption = {
  id: string
  event_id: string
  option_date: string
  note: string | null
  created_at: string
}

export type DateVote = {
  id: string
  date_option_id: string
  event_id: string
  voter_name: string
  created_at: string
}

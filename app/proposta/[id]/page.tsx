import { createClient } from "@supabase/supabase-js"
import { notFound, redirect } from "next/navigation"
import PropostaView from "./proposta-view"

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ preview?: string; token?: string }>
}

export default async function PropostaPage({ params, searchParams }: Props) {
  const { id } = await params
  const { preview, token } = await searchParams
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // If it's a preview (internal user), allow access without auth

  // Fetch proposal
  const { data: proposal, error } = await supabase.from("proposals").select("*").eq("id", id).single()

  if (error || !proposal) {
    notFound()
  }

  // If not preview and no token, redirect to access page
  if (preview !== "true" && !token) {
    redirect(`/proposta/${id}/acesso`)
  }

  // If token provided, validate it
  if (token && token !== proposal.client_access_token) {
    redirect(`/proposta/${id}/acesso?error=invalid`)
  }

  return <PropostaView proposal={proposal} isPreview={preview === "true"} />
}

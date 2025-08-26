import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { accessToken, password } = await request.json()

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data: proposal, error } = await supabase
      .from("proposals")
      .select("client_access_token, client_password")
      .eq("id", id)
      .single()

    if (error || !proposal) {
      return NextResponse.json({ error: "Proposta não encontrada" }, { status: 404 })
    }

    if (proposal.client_access_token === accessToken && proposal.client_password === password) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

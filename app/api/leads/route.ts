import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const body = await request.json()

    const {
      name,
      email,
      phone,
      cnpj,
      companyWebsite,
      monthlyRevenue,
      conversionRate,
      averageTicket,
      companySize,
      productInterest,
      aiScore,
      biScore,
      crmScore,
      processesScore,
      additionalDetails,
      recommendedService,
      recommendedLevel,
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Nome e email são obrigatórios" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        cnpj,
        company_website: companyWebsite,
        monthly_revenue: monthlyRevenue ? Number.parseFloat(monthlyRevenue) : null,
        conversion_rate: conversionRate ? Number.parseFloat(conversionRate) : null,
        average_ticket: averageTicket ? Number.parseFloat(averageTicket) : null,
        company_size: companySize,
        product_interest: productInterest,
        ai_score: aiScore ? Number.parseInt(aiScore) : null,
        bi_score: biScore ? Number.parseInt(biScore) : null,
        crm_score: crmScore ? Number.parseInt(crmScore) : null,
        processes_score: processesScore ? Number.parseInt(processesScore) : null,
        additional_details: additionalDetails,
        recommended_service: recommendedService,
        recommended_level: recommendedLevel,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Erro ao salvar dados" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Lead cadastrado com sucesso!",
        leadId: data.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

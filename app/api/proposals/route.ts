import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const body = await request.json()

    // Generate unique proposal number and access credentials
    const proposalNumber = `PROP-${Date.now()}`
    const accessToken = Math.random().toString(36).substring(2, 15)
    const accessPassword = Math.random().toString(36).substring(2, 10)

    const { data, error } = await supabase
      .from("proposals")
      .insert({
        proposal_number: proposalNumber,
        company_name: body.companyName,
        company_logo: body.companyLogo,
        selected_products: body.selectedProducts,
        total_value: body.totalValue,
        discount_percentage: body.discountPercentage,
        final_value: body.finalValue,
        custom_notes: body.customNotes,
        client_access_token: accessToken,
        client_password: accessPassword,
        created_by: null, // Set to null since no authenticated user
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating proposal:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      proposal: data,
      accessToken,
      accessPassword,
    })
  } catch (error) {
    console.error("Error in proposal creation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

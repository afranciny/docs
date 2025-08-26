"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Check, Building2, Calendar, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Proposal {
  id: string
  proposal_number: string
  company_name: string
  company_logo?: string
  selected_products: any[]
  total_value: number
  discount_percentage: number
  final_value: number
  custom_notes?: string
  status: string
  created_at: string
  client_access_token: string
}

interface Props {
  proposal: Proposal
  isPreview: boolean
}

export default function PropostaView({ proposal, isPreview }: Props) {
  const [isAccepting, setIsAccepting] = useState(false)

  const handleAccept = () => {
    // Redirect to acceptance form
    window.location.href = `/proposta/${proposal.id}/aceitar`
  }

  const generatePDF = () => {
    // PDF generation logic would go here
    window.print()
  }

  const monthlyMaintenance = proposal.selected_products.reduce((total, product) => {
    return total + (product.maintenance || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[#E6E4E3]/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            {proposal.company_logo && (
              <img
                src={proposal.company_logo || "/placeholder.svg"}
                alt={`${proposal.company_name} logo`}
                className="h-16 w-auto"
              />
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#413328]">Proposta Comercial</h1>
              <p className="text-lg text-[#995925]">{proposal.company_name}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#995925]">
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {proposal.proposal_number}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(proposal.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
            <Badge variant={proposal.status === "accepted" ? "default" : "secondary"}>
              {proposal.status === "accepted" ? "Aceita" : "Pendente"}
            </Badge>
          </div>
        </div>

        {/* Proposal Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Sobre a Proposta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#413328] leading-relaxed">
                Apresentamos nossa proposta de implementação de Revenue Operations com Inteligência Artificial para{" "}
                <strong>{proposal.company_name}</strong>. Nossa solução integrada transformará seus processos de vendas,
                marketing e customer success através de automação inteligente e análise preditiva.
              </p>
            </CardContent>
          </Card>

          {/* Selected Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos e Serviços Inclusos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposal.selected_products.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-[#413328]">{product.name}</h3>
                        <Badge variant="outline" className="capitalize mt-1">
                          Nível {product.level}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#EB6A00]">R$ {product.price.toLocaleString("pt-BR")}</div>
                        {product.maintenance > 0 && (
                          <div className="text-sm text-[#995925]">
                            + R$ {product.maintenance.toLocaleString("pt-BR")}/mês
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Notes */}
          {proposal.custom_notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações Específicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#413328] whitespace-pre-wrap">{proposal.custom_notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Resumo Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal dos Serviços:</span>
                  <span>R$ {proposal.total_value.toLocaleString("pt-BR")}</span>
                </div>

                {proposal.discount_percentage > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({proposal.discount_percentage}%):</span>
                    <span>- R$ {(proposal.total_value - proposal.final_value).toLocaleString("pt-BR")}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-bold text-xl">
                  <span>Valor Total:</span>
                  <span className="text-[#EB6A00]">R$ {proposal.final_value.toLocaleString("pt-BR")}</span>
                </div>

                {monthlyMaintenance > 0 && (
                  <div className="flex justify-between text-[#995925] font-medium">
                    <span>Manutenção Mensal:</span>
                    <span>R$ {monthlyMaintenance.toLocaleString("pt-BR")}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={generatePDF} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>

            {!isPreview && proposal.status !== "accepted" && (
              <Button
                onClick={handleAccept}
                className="bg-[#EB6A00] hover:bg-[#995925] flex items-center gap-2"
                disabled={isAccepting}
              >
                <Check className="w-4 h-4" />
                {isAccepting ? "Processando..." : "Aceitar Proposta"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

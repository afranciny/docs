"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  category: string
  levels: {
    essencial: { price: number; maintenance?: number }
    profissional: { price: number; maintenance?: number }
    avancado: { price: number; maintenance?: number }
  }
}

const products: Product[] = [
  {
    id: "processos",
    name: "Processos & Rituais RevOps",
    category: "RevOps",
    levels: {
      essencial: { price: 4000 },
      profissional: { price: 12000 },
      avancado: { price: 20000 },
    },
  },
  {
    id: "crm",
    name: "CRM Inteligente",
    category: "Technology",
    levels: {
      essencial: { price: 4000, maintenance: 1000 },
      profissional: { price: 12000, maintenance: 2500 },
      avancado: { price: 20000, maintenance: 5000 },
    },
  },
  {
    id: "bi",
    name: "BI Analytics powered by AI",
    category: "Analytics",
    levels: {
      essencial: { price: 4000, maintenance: 1000 },
      profissional: { price: 12000, maintenance: 2500 },
      avancado: { price: 20000, maintenance: 5000 },
    },
  },
  {
    id: "agentes-ia",
    name: "Agentes Conversacionais com IA",
    category: "AI",
    levels: {
      essencial: { price: 4000, maintenance: 1000 },
      profissional: { price: 12000, maintenance: 2500 },
      avancado: { price: 20000, maintenance: 5000 },
    },
  },
]

export default function GeradorProposta() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")
  const [customNotes, setCustomNotes] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: string }>({})
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth/login")
      return
    }
    setUser(user)
    setLoading(false)
  }

  const handleProductSelection = (productId: string, level: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: level,
    }))
  }

  const calculateTotals = () => {
    let subtotal = 0
    let monthlyMaintenance = 0

    Object.entries(selectedProducts).forEach(([productId, level]) => {
      const product = products.find((p) => p.id === productId)
      if (product && level) {
        const levelKey = level as keyof typeof product.levels
        subtotal += product.levels[levelKey].price
        if (product.levels[levelKey].maintenance) {
          monthlyMaintenance += product.levels[levelKey].maintenance!
        }
      }
    })

    const discountAmount = (subtotal * discountPercentage) / 100
    const finalValue = subtotal - discountAmount

    return { subtotal, discountAmount, finalValue, monthlyMaintenance }
  }

  const generateProposal = async () => {
    if (!companyName || Object.keys(selectedProducts).length === 0) {
      alert("Preencha o nome da empresa e selecione pelo menos um produto")
      return
    }

    setIsGenerating(true)

    try {
      const { subtotal, finalValue, monthlyMaintenance } = calculateTotals()
      const proposalNumber = `PROP-${Date.now()}`
      const accessToken = Math.random().toString(36).substring(2, 15)
      const clientPassword = Math.random().toString(36).substring(2, 10)

      const selectedProductsData = Object.entries(selectedProducts).map(([productId, level]) => {
        const product = products.find((p) => p.id === productId)!
        const levelKey = level as keyof typeof product.levels
        return {
          id: productId,
          name: product.name,
          level,
          price: product.levels[levelKey].price,
          maintenance: product.levels[levelKey].maintenance || 0,
        }
      })

      const { data, error } = await supabase
        .from("proposals")
        .insert({
          proposal_number: proposalNumber,
          company_name: companyName,
          company_logo: companyLogo,
          selected_products: selectedProductsData,
          total_value: subtotal,
          discount_percentage: discountPercentage,
          final_value: finalValue,
          custom_notes: customNotes,
          client_access_token: accessToken,
          client_password: clientPassword,
          created_by: user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Redirect to proposal view
      router.push(`/proposta/${data.id}?preview=true`)
    } catch (error) {
      console.error("Error generating proposal:", error)
      alert("Erro ao gerar proposta. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  const { subtotal, discountAmount, finalValue, monthlyMaintenance } = calculateTotals()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[#E6E4E3]/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#413328] mb-2">Gerador de Propostas</h1>
          <p className="text-lg text-[#995925]">Crie propostas personalizadas para seus clientes</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Company Info & Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nome da Empresa *</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Digite o nome da empresa cliente"
                  />
                </div>
                <div>
                  <Label htmlFor="companyLogo">URL do Logo da Empresa</Label>
                  <Input
                    id="companyLogo"
                    value={companyLogo}
                    onChange={(e) => setCompanyLogo(e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Seleção de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-[#413328]">{product.name}</h3>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3">
                        {Object.entries(product.levels).map(([level, pricing]) => (
                          <div key={level} className="border rounded p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                id={`${product.id}-${level}`}
                                checked={selectedProducts[product.id] === level}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleProductSelection(product.id, level)
                                  } else {
                                    setSelectedProducts((prev) => {
                                      const newState = { ...prev }
                                      delete newState[product.id]
                                      return newState
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={`${product.id}-${level}`} className="capitalize font-medium">
                                {level}
                              </Label>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="font-semibold text-[#EB6A00]">
                                R$ {pricing.price.toLocaleString("pt-BR")}
                              </div>
                              {pricing.maintenance && (
                                <div className="text-[#995925]">
                                  + R$ {pricing.maintenance.toLocaleString("pt-BR")}/mês
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Observações Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Adicione observações específicas para esta proposta..."
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Proposta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toLocaleString("pt-BR")}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="discount">Desconto (%):</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercentage}
                      onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto:</span>
                      <span>- R$ {discountAmount.toLocaleString("pt-BR")}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-[#EB6A00]">R$ {finalValue.toLocaleString("pt-BR")}</span>
                  </div>

                  {monthlyMaintenance > 0 && (
                    <div className="flex justify-between text-[#995925]">
                      <span>Manutenção/mês:</span>
                      <span>R$ {monthlyMaintenance.toLocaleString("pt-BR")}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={generateProposal}
                    disabled={isGenerating || !companyName || Object.keys(selectedProducts).length === 0}
                    className="w-full bg-[#EB6A00] hover:bg-[#995925]"
                  >
                    {isGenerating ? (
                      "Gerando..."
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Gerar Proposta
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Products Preview */}
            {Object.keys(selectedProducts).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Selecionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(selectedProducts).map(([productId, level]) => {
                      const product = products.find((p) => p.id === productId)!
                      return (
                        <div key={productId} className="flex justify-between items-center text-sm">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-[#995925] capitalize">{level}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              R$ {product.levels[level as keyof typeof product.levels].price.toLocaleString("pt-BR")}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

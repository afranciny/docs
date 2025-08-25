"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Clock,
  Target,
  Zap,
  Rocket,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Users,
  ChevronDown,
  Sparkles,
  Cog,
  Brain,
  Crown,
  DollarSign,
  LineChart,
} from "lucide-react"
import Link from "next/link"

export default function AxendRevOpsLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    website: "",
    monthlyRevenue: "",
    conversionRate: "",
    averageTicket: "",
    companySize: "",
    productInterest: "",
    crm: 3,
    bi: 3,
    ia: 3,
    processos: 3,
    details: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [isFormMinimized, setIsFormMinimized] = useState(false)
  const [showEvaluationSection, setShowEvaluationSection] = useState(false)
  const [showNeedsSection, setShowNeedsSection] = useState(false)
  const [recommendation, setRecommendation] = useState("")
  const [selectedPillars, setSelectedPillars] = useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = useState<string>("essencial")
  const [auditForm, setAuditForm] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    website: "",
    companySize: "",
    productInterest: "",
    aiUsage: 3,
    biQuality: 3,
    crmAdoption: 3,
    processMaturity: 3,
    additionalDetails: "",
  })
  const [auditRecommendation, setAuditRecommendation] = useState<{
    description: string
    estimatedInvestment: string
  } | null>(null)
  const [submitError, setSubmitError] = useState("")
  const [showCalendarPopup, setShowCalendarPopup] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const serviceLevels = {
    essencial: {
      name: "Essencial",
      description: "Para empresas iniciando a jornada RevOps",
      services: {
        processos: {
          name: "Processos Essencial",
          features: ["Mapeamento básico", "SOP inicial", "Treinamento equipe"],
        },
        crm: {
          name: "CRM Essencial",
          features: ["Configuração HubSpot/Pipedrive", "Automações básicas", "Dashboards iniciais"],
        },
        bi: {
          name: "BI Essencial",
          features: ["Relatórios básicos", "KPIs principais", "Dashboard executivo"],
        },
        ia: {
          name: "IA Essencial",
          features: ["Chatbot básico", "Automação emails", "Lead scoring simples"],
        },
      },
    },
    profissional: {
      name: "Profissional",
      description: "Para empresas em crescimento acelerado",
      services: {
        processos: {
          name: "Processos Profissional",
          features: ["Processos avançados", "Automação workflows", "Métricas detalhadas"],
        },
        crm: {
          name: "CRM Profissional",
          features: ["CRM customizado", "Integrações avançadas", "Automação completa"],
        },
        bi: {
          name: "BI Profissional",
          features: ["Analytics avançado", "Previsões IA", "Dashboards interativos"],
        },
        ia: {
          name: "IA Profissional",
          features: ["IA conversacional", "Análise preditiva", "Automação inteligente"],
        },
      },
    },
    avancado: {
      name: "Avançado",
      description: "Para empresas que buscam excelência operacional",
      services: {
        processos: {
          name: "Processos Avançado",
          features: ["Otimização contínua", "IA nos processos", "Benchmarking"],
        },
        crm: {
          name: "CRM Avançado",
          features: ["Plataforma enterprise", "IA integrada", "Customizações ilimitadas"],
        },
        bi: { name: "BI Avançado", features: ["Data Science", "ML avançado", "Insights preditivos"] },
        ia: {
          name: "IA Avançado",
          features: ["IA generativa", "Automação total", "Insights estratégicos"],
        },
      },
    },
  }

  const fourPillars = [
    {
      id: "processos",
      name: "Processos & Rituais",
      icon: Cog,
      description: "Estruturação completa da operação comercial",
      color: "#995925",
    },
    {
      id: "crm",
      name: "CRM Vivo",
      icon: Users,
      description: "CRM de alta performance com 100% de adoção",
      color: "#EB6A00",
    },
    {
      id: "bi",
      name: "Business Intelligence",
      icon: BarChart3,
      description: "Visibilidade total com dashboards em tempo real",
      color: "#6B4A2E",
    },
    {
      id: "ia",
      name: "Agentes de IA",
      icon: Brain,
      description: "IA aplicada para automação e insights preditivos",
      color: "#413328",
    },
  ]

  const togglePillar = (pillarId: string) => {
    setSelectedPillars((prev) => (prev.includes(pillarId) ? prev.filter((id) => id !== pillarId) : [...prev, pillarId]))
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auditForm),
      })

      if (!response.ok) throw new Error("Erro ao enviar auditoria")

      const lowScores = [
        auditForm.aiUsage <= 3 ? "IA" : null,
        auditForm.biQuality <= 3 ? "BI" : null,
        auditForm.crmAdoption <= 3 ? "CRM" : null,
        auditForm.processMaturity <= 3 ? "Processos" : null,
      ].filter(Boolean)

      const companyLevelMap = {
        pequena: "essencial",
        media: "profissional",
        grande: "avancado",
      }

      const recommendedLevel = companyLevelMap[auditForm.companySize as keyof typeof companyLevelMap] || "essencial"

      let recommendation = ""
      let estimatedInvestment = ""

      if (lowScores.length >= 3) {
        recommendation = `Recomendamos o Pacote Completo ${serviceLevels[recommendedLevel as keyof typeof serviceLevels].name} para transformação integral do seu RevOps`
        estimatedInvestment = `R$ ${serviceLevels[recommendedLevel as keyof typeof serviceLevels].packagePrice.toLocaleString()}`
      } else if (lowScores.length > 0) {
        recommendation = `Recomendamos focar nos pilares: ${lowScores.join(", ")} no nível ${serviceLevels[recommendedLevel as keyof typeof serviceLevels].name}`
        const totalPrice = lowScores.reduce((sum, pilar) => {
          const services = serviceLevels[recommendedLevel as keyof typeof serviceLevels].services
          return sum + (services[pilar.toLowerCase() as keyof typeof services]?.price || 0)
        }, 0)
        estimatedInvestment = `R$ ${totalPrice.toLocaleString()}`
      } else {
        recommendation = `Sua operação está bem estruturada! Recomendamos otimizações pontuais no nível ${serviceLevels[recommendedLevel as keyof typeof serviceLevels].name}`
        estimatedInvestment = `R$ ${serviceLevels[recommendedLevel as keyof typeof serviceLevels].originalPrice.toLocaleString()}`
      }

      setAuditRecommendation({ description: recommendation, estimatedInvestment })
      setSubmitSuccess(true)
      setShowCalendarPopup(true)

      setTimeout(() => setShowCalendarPopup(false), 10000)
    } catch (error) {
      setSubmitError("Erro ao processar auditoria. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToAuditForm = () => {
    document.getElementById("audit-form-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAuditFormWithProduct = (product: string) => {
    setAuditForm((prev) => ({ ...prev, productInterest: product }))
    scrollToAuditForm()
  }

  const calculateSelectedTotal = () => {
    const currentLevel = serviceLevels[selectedLevel as keyof typeof serviceLevels]
    if (!currentLevel || !currentLevel.services) return "R$ 0"

    let total = 0
    selectedPillars.forEach((pillarId) => {
      const service = currentLevel?.services?.[pillarId]
      if (service) {
        total += Number.parseInt(service.price.replace(/[^0-9]/g, ""))
      }
    })
    return `R$ ${total.toLocaleString()}`
  }

  const scrollToForm = () => {
    document.getElementById("audit-form-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleProductSelection = (product: string) => {
    setAuditForm((prev) => ({ ...prev, productInterest: product }))
    scrollToAuditForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#E6E4E3]/10 to-background text-foreground overflow-x-hidden">
      <header className="border-b border-[#E6E4E3]/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#413328]">
              Grupo Axend
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-[#EB6A00] font-semibold">
                Início
              </Link>
              <Link href="/solucoes" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                Soluções
              </Link>
              <Button asChild className="bg-[#EB6A00] hover:bg-[#995925]">
                <Link href="#auditoria">Auditoria Gratuita</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#E6E4E3]/20 to-background pt-16">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>

        <div
          className="absolute top-20 left-2 sm:left-4 lg:left-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-primary/10 rounded-full animate-float backdrop-blur-sm border border-primary/20"
          style={{ transform: `translateZ(${Math.sin(scrollY * 0.01) * 20}px)` }}
        />
        <div
          className="absolute top-32 sm:top-40 right-2 sm:right-4 lg:right-20 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-[#995925]/10 rounded-full animate-float-delayed backdrop-blur-sm border border-[#995925]/20"
          style={{ transform: `translateZ(${Math.cos(scrollY * 0.01) * 15}px)` }}
        />
        <div
          className="absolute bottom-20 left-2 sm:left-4 lg:left-20 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-[#6B4A2E]/10 rounded-full animate-float backdrop-blur-sm border border-[#6B4A2E]/20"
          style={{ transform: `translateZ(${Math.sin(scrollY * 0.015) * 10}px)` }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center space-y-6 sm:space-y-8 lg:space-y-12 max-w-5xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs sm:text-sm animate-pulse mx-auto w-fit">
              ✅ Baseado em estudos Gartner, Forrester e Revenue Operations Alliance
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              <span className="text-primary bg-gradient-to-r from-primary to-[#995925] bg-clip-text text-transparent animate-gradient">
                Previsibilidade não é sorte.
              </span>{" "}
              <span className="text-[#413328]">É sistema!</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#6B4A2E] max-w-3xl mx-auto leading-relaxed">
              Transforme sua operação com metodologia RevOps comprovada por{" "}
              <span className="font-bold text-primary">771% de ROI</span>
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {[
                { icon: TrendingUp, label: "771% ROI médio", sublabel: "(Forrester)", color: "text-primary" },
                { icon: Clock, label: "36% mais receita", sublabel: "em 90 dias", color: "text-[#995925]" },
                { icon: Target, label: "19% ciclo mais rápido", sublabel: "de vendas", color: "text-[#6B4A2E]" },
                { icon: Zap, label: "Implementação", sublabel: "90 dias", color: "text-primary" },
              ].map(({ icon: Icon, label, sublabel, color }, index) => (
                <div
                  key={index}
                  className="group hover:scale-105 transition-transform cursor-pointer p-3 sm:p-4 rounded-lg hover:bg-white/50 backdrop-blur-sm"
                >
                  <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${color} mx-auto mb-2 group-hover:animate-bounce`} />
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-base text-[#413328]">{label}</div>
                    <div className="text-xs sm:text-sm text-[#6B4A2E]">{sublabel}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToAuditForm}
                size="lg"
                className="bg-gradient-to-r from-primary to-[#995925] hover:from-primary/90 hover:to-[#995925]/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Receber Auditoria Gratuita
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-[#E6E4E3]/20 to-[#995925]/10"
        id="audit-form-section"
        data-animate
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#413328]">
                Auditoria RevOps Gratuita
              </h2>
              <p className="text-base sm:text-lg text-[#6B4A2E]">
                Nossa IA analisará sua operação e criará uma proposta personalizada
              </p>
            </div>

            <Card className="glass-strong shadow-2xl border-primary/20 hover:shadow-3xl transition-all duration-300">
              <CardHeader className="pb-4 px-4 sm:px-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary animate-spin" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#413328] text-center">Diagnóstico Personalizado</h3>
                  <Brain className="h-5 w-5 text-[#995925] animate-pulse" />
                </div>
                <p className="text-center text-sm sm:text-base text-[#6B4A2E] font-medium animate-pulse">
                  Preencha mais informações e receba uma proposta personalizada
                </p>
              </CardHeader>

              {!isFormMinimized ? (
                <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
                  <form onSubmit={handleAuditSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                          Nome *
                        </label>
                        <input
                          type="text"
                          required
                          value={auditForm.name}
                          onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                          className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="group">
                        <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={auditForm.email}
                          onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                          className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={auditForm.phone}
                          onChange={(e) => setAuditForm({ ...auditForm, phone: e.target.value })}
                          className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="group">
                        <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          value={auditForm.cnpj}
                          onChange={(e) => setAuditForm({ ...auditForm, cnpj: e.target.value })}
                          className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                          placeholder="00.000.000/0001-00"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                        Site da Empresa
                      </label>
                      <input
                        type="url"
                        value={auditForm.website}
                        onChange={(e) => setAuditForm({ ...auditForm, website: e.target.value })}
                        className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                        placeholder="https://suaempresa.com"
                      />
                    </div>

                    <div className="group">
                      <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                        Porte da Empresa *
                      </label>
                      <select
                        required
                        value={auditForm.companySize}
                        onChange={(e) => setAuditForm({ ...auditForm, companySize: e.target.value })}
                        className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                      >
                        <option value="">Selecione o porte</option>
                        <option value="pequena">Pequena Empresa (até R$ 100k/mês)</option>
                        <option value="media">Média Empresa (R$ 100k - R$ 500k/mês)</option>
                        <option value="grande">Grande Empresa (R$ 500k+/mês)</option>
                      </select>
                    </div>

                    <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowEvaluationSection(!showEvaluationSection)}
                        className="w-full flex items-center justify-between text-[#413328] hover:text-primary hover:bg-primary/10"
                      >
                        <span className="font-medium">Avalie sua empresa (1-5)</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${showEvaluationSection ? "rotate-180" : ""}`}
                        />
                      </Button>

                      {showEvaluationSection && (
                        <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                          {[
                            { key: "aiUsage", label: "Uso de IA na empresa", icon: Brain },
                            { key: "biQuality", label: "Qualidade do BI/Relatórios", icon: BarChart3 },
                            { key: "crmAdoption", label: "Adoção do CRM pela equipe", icon: Users },
                            { key: "processMaturity", label: "Maturidade dos processos", icon: Cog },
                          ].map(({ key, label, icon: Icon }) => (
                            <div key={key} className="group">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="h-4 w-4 text-primary group-hover:animate-pulse" />
                                <label className="text-sm font-medium text-[#413328] group-hover:text-primary transition-colors">
                                  {label}
                                </label>
                              </div>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setAuditForm({ ...auditForm, [key]: rating })}
                                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                                      auditForm[key] >= rating
                                        ? "bg-primary border-primary text-white"
                                        : "border-[#995925]/30 hover:border-primary/50"
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowNeedsSection(!showNeedsSection)}
                        className="w-full flex items-center justify-between text-[#413328] hover:text-primary hover:bg-primary/10"
                      >
                        <span className="font-medium">Conte-nos mais sobre suas necessidades</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${showNeedsSection ? "rotate-180" : ""}`}
                        />
                      </Button>

                      {showNeedsSection && (
                        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                          <textarea
                            value={auditForm.additionalDetails}
                            onChange={(e) => setAuditForm({ ...auditForm, additionalDetails: e.target.value })}
                            className="w-full px-3 py-2 sm:py-3 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 resize-none text-sm sm:text-base"
                            rows={4}
                            placeholder="Explique nas suas palavras o que vc sente falta na sua empresa ou o que a Axend pode te ajudar"
                          />
                        </div>
                      )}
                    </div>

                    {auditRecommendation && (
                      <div className="bg-gradient-to-r from-primary/10 to-[#995925]/5 border border-primary/30 rounded-lg p-4 animate-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="h-5 w-5 text-primary animate-spin" />
                          <span className="font-semibold text-primary">Recomendação Personalizada</span>
                          <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                            IA
                          </Badge>
                        </div>
                        <p className="text-sm text-[#6B4A2E] mb-2">{auditRecommendation.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#413328]">Investimento estimado:</span>
                          <span className="text-lg font-bold text-primary">
                            {auditRecommendation.estimatedInvestment}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-primary/5 to-[#995925]/5 border border-primary/20 rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-primary mb-2">
                        📋 Preencha mais informações e receba uma proposta personalizada
                      </p>
                      <p className="text-xs text-[#6B4A2E]">
                        Nossa IA analisará seus dados e criará uma solução sob medida
                      </p>
                    </div>

                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm animate-in slide-in-from-top-2">
                        {submitError}
                      </div>
                    )}

                    {submitSuccess && (
                      <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Auditoria Enviada com Sucesso!</h3>
                        <p className="text-green-700 mb-4">{auditRecommendation}</p>
                        <p className="text-green-600 font-medium">
                          Um popup será aberto para você agendar sua consultoria personalizada!
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-[#995925] hover:from-primary/90 hover:to-[#995925]/90 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processando com IA...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 justify-center">
                          <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
                          Receber Auditoria Gratuita
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              ) : (
                <CardContent className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-[#413328] font-medium mb-2">Auditoria enviada com sucesso!</p>
                  <p className="text-sm text-[#6B4A2E] mb-4">
                    Nossa IA está processando seus dados. Entraremos em contato em até 24h.
                  </p>
                  <Button
                    onClick={() => setIsFormMinimized(false)}
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Expandir Formulário
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#E6E4E3]/20 to-[#995925]/10 relative overflow-hidden"
        data-animate
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#413328]">
                Os 4 Pilares do RevOps
              </h2>
              <p className="text-lg sm:text-xl text-[#6B4A2E] mb-6 sm:mb-8 px-4">
                Cada pilar pode ser contratado individualmente de acordo com a sua necessidade
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {fourPillars.map((pillar) => {
                const currentLevel = serviceLevels[selectedLevel as keyof typeof serviceLevels]
                const currentService = currentLevel?.services?.[pillar.id]
                const isSelected = selectedPillars.includes(pillar.id)

                if (!currentService) return null

                return (
                  <Card
                    key={pillar.id}
                    className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-lg scale-105"
                        : "border-[#E6E4E3] hover:border-primary/50 bg-white"
                    }`}
                    onClick={() => togglePillar(pillar.id)}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div
                        className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                        }`}
                      >
                        <pillar.icon className="h-6 sm:h-8 w-6 sm:w-8" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-2 text-[#413328]">{pillar.name}</h3>
                      <p className="text-xs sm:text-sm text-[#6B4A2E] mb-3 sm:mb-4 leading-relaxed">
                        {currentService.description}
                      </p>

                      <div className="text-xs sm:text-sm text-[#995925] font-medium">{currentService.timeline}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Package Deal Section */}
            <div className="bg-gradient-to-r from-[#413328] to-[#6B4A2E] rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EB6A00]/20 to-transparent" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-[#EB6A00] px-4 py-2 rounded-full mb-4">
                    <Crown className="h-5 w-5" />
                    <span className="font-bold">OFERTA ESPECIAL</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Pacote Completo - 4 Pilares</h3>
                  <p className="text-lg opacity-90 mb-6">Contrate todos os 4 pilares e receba desconto especial</p>
                </div>

                <div className="text-center mt-8">
                  <Button
                    size="lg"
                    className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => scrollToForm()}
                  >
                    <Crown className="h-5 w-5 mr-2" />
                    Solicitar Pacote Completo
                  </Button>
                </div>
              </div>
            </div>

            {/* Selected Pillars Summary */}
            {selectedPillars.length > 0 && selectedPillars.length < 4 && (
              <div className="mt-8 bg-white rounded-xl border-2 border-[#E6E4E3] p-6">
                <h4 className="text-lg font-bold text-[#413328] mb-4">
                  Pilares Selecionados ({selectedPillars.length}/4)
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedPillars.map((pillarId) => {
                    const pillar = fourPillars.find((p) => p.id === pillarId)
                    const currentLevel = serviceLevels[selectedLevel as keyof typeof serviceLevels]
                    const service = currentLevel?.services?.[pillarId]

                    if (!service || !pillar) return null

                    return (
                      <div key={pillarId} className="flex items-center justify-between p-3 bg-[#E6E4E3]/30 rounded-lg">
                        <span className="font-medium text-[#413328]">{pillar.name}</span>
                        <span className="font-bold text-[#EB6A00]">{service.price}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#413328]">Total: {calculateSelectedTotal()}</span>
                  <Button className="bg-[#EB6A00] hover:bg-[#995925] text-white" onClick={() => scrollToForm()}>
                    Solicitar Pilares Selecionados
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#E6E4E3]/20 to-[#995925]/10 relative overflow-hidden"
        data-animate
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 sm:mb-6 animate-pulse text-xs sm:text-sm">
              📊 Dados de Mercado Validados
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#413328] px-4">
              Por que <span className="text-primary">agora</span> é o momento crítico?
            </h2>
            <p className="text-lg sm:text-xl text-[#6B4A2E] px-4">
              Pesquisas globais confirmam: empresas que adotam RevOps primeiro dominam seus mercados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                stat: "75%",
                label: "das empresas B2B adotarão RevOps até 2025",
                source: "Gartner Research",
                icon: TrendingUp,
                color: "text-primary",
                bgColor: "bg-primary/10",
                delay: "0s",
              },
              {
                stat: "36%",
                label: "mais receita para empresas com RevOps maduro",
                source: "Forrester Research",
                icon: DollarSign,
                color: "text-[#995925]",
                bgColor: "bg-[#995925]/10",
                delay: "0.2s",
              },
              {
                stat: "19%",
                label: "redução no ciclo de vendas médio",
                source: "DemandSage Study",
                icon: Clock,
                color: "text-[#6B4A2E]",
                bgColor: "bg-[#6B4A2E]/10",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 cursor-pointer border-2 border-[#E6E4E3] hover:border-primary/30 bg-white hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: item.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB6A00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="text-center p-4 sm:p-6 relative z-10">
                  <div
                    className={`w-12 sm:w-16 h-12 sm:h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className={`h-6 sm:h-8 w-6 sm:w-8 ${item.color}`} />
                  </div>
                  <div className={`text-3xl sm:text-4xl font-bold mb-2 ${item.color} group-hover:animate-pulse`}>
                    {item.stat}
                  </div>
                  <p className="text-sm sm:text-base text-[#6B4A2E] mb-3 sm:mb-4 font-medium leading-relaxed px-2">
                    {item.label}
                  </p>
                  <div className="text-xs sm:text-sm text-[#995925] font-semibold bg-[#995925]/10 px-2 sm:px-3 py-1 rounded-full">
                    {item.source}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-background to-[#E6E4E3]/20 relative" data-animate>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#413328]">
              Sua operação de receita está <span className="text-destructive animate-pulse">sangrando dinheiro</span>?
            </h2>
            <p className="text-xl text-[#6B4A2E]">
              Cada dia sem disciplina operacional custa milhares em oportunidades perdidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: BarChart3,
                title: "Forecast que sempre falha",
                desc: "Previsões baseadas em achismo, não em dados confiáveis",
                impact: "Custo: R$50k+/mês em decisões erradas",
                severity: "critical",
                animation: "animate-bounce",
              },
              {
                icon: Users,
                title: "CRM virou cemitério",
                desc: "Dados desatualizados e processos que ninguém segue",
                impact: "Perda: 30% dos leads qualificados",
                severity: "high",
                animation: "animate-pulse",
              },
              {
                icon: LineChart,
                title: "Decisões feitas em planilhas",
                desc: "Falta de visibilidade real sobre o funil de vendas",
                impact: "Tempo perdido: 15h/semana da equipe",
                severity: "medium",
                animation: "animate-ping",
              },
              {
                icon: Clock,
                title: "Leads perdidos no limbo",
                desc: "Tempo de resposta lento mata oportunidades valiosas",
                impact: "Conversão 40% menor que o potencial",
                severity: "high",
                animation: "animate-spin",
              },
            ].map((problem, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-destructive/30 hover:scale-105 bg-white/90 backdrop-blur-sm relative overflow-hidden"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Changed hover gradient from white to orange */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB6A00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-6 text-center relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <problem.icon
                      className={`h-8 w-8 text-amber-500 group-hover:text-destructive transition-colors duration-300 ${hoveredService === index ? problem.animation : ""}`}
                    />
                  </div>

                  <Badge
                    className={`mb-3 ${
                      problem.severity === "critical"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : problem.severity === "high"
                          ? "bg-orange-100 text-orange-800 border-orange-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}
                  >
                    {problem.severity === "critical"
                      ? "🚨 Crítico"
                      : problem.severity === "high"
                        ? "⚠️ Alto"
                        : "⚡ Médio"}
                  </Badge>

                  <h3 className="font-semibold mb-2 text-[#413328] group-hover:text-destructive transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-[#6B4A2E] mb-3">{problem.desc}</p>
                  <div className="bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 rounded-lg p-2">
                    <p className="text-xs font-medium text-amber-700 group-hover:text-red-700 transition-colors duration-300">
                      {problem.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-destructive/10 to-amber/10 border border-destructive/20 rounded-xl px-8 py-4">
              <Zap className="h-6 w-6 text-destructive animate-pulse" />
              <div className="text-left">
                <p className="font-bold text-destructive">Impacto Total Estimado:</p>
                <p className="text-sm text-[#6B4A2E]">R$200k+ perdidos anualmente por empresa sem RevOps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-br from-primary via-primary to-[#995925] relative overflow-hidden"
        data-animate
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1200)')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              RevOps: O Sistema Operacional da sua Receita
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Não vendemos templates. Cada implementação é{" "}
              <strong className="text-white animate-pulse">desenhada sob medida</strong> para seu estágio, mercado e
              complexidade.
            </p>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-8 mb-8 hover:bg-white/20 transition-all duration-300 border border-white/30 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center justify-center gap-3">
                <Brain className="h-8 w-8 animate-pulse text-white" />
                Os 4 Pilares Fundamentais do RevOps
                <Sparkles className="h-6 w-6 animate-spin text-white" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <Cog className="h-8 w-8 text-white mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm">Processos</h4>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <Users className="h-8 w-8 text-white mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm">CRM</h4>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <BarChart3 className="h-8 w-8 text-white mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm">BI</h4>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <Brain className="h-8 w-8 text-white mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm">IA</h4>
                </div>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                Nossa metodologia integra <strong className="text-white">Processos & Rituais</strong>,{" "}
                <strong className="text-white">CRM Vivo</strong>,
                <strong className="text-white"> Business Intelligence</strong> e{" "}
                <strong className="text-white">Agentes de IA</strong>
                em uma solução completa que transforma sua operação de receita em uma máquina previsível e escalável.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Cog,
                title: "Processos & Rituais de Vendas",
                description:
                  "Estruturação completa da sua operação comercial com processos padronizados e rituais que garantem consistência e previsibilidade.",
                benefits: [
                  "Padronização de processos de vendas",
                  "Rituais de forecast e pipeline review",
                  "Metodologia de qualificação de leads",
                  "Playbooks de vendas personalizados",
                ],
                timeline: "Semanas 1-3",
              },
              {
                icon: Users,
                title: "CRM Vivo & Adoção",
                description:
                  "Transformamos seu CRM em ferramenta de alta performance com 100% de adoção da equipe e dados sempre atualizados.",
                benefits: [
                  "Configuração otimizada do CRM",
                  "Treinamento e adoção da equipe",
                  "Automações inteligentes",
                  "Integração com outras ferramentas",
                ],
                timeline: "Semanas 4-6",
              },
              {
                icon: BarChart3,
                title: "Business Intelligence & Dashboards",
                description:
                  "Visibilidade total sobre sua operação de receita com dashboards em tempo real e relatórios automatizados.",
                benefits: [
                  "Dashboards executivos em tempo real",
                  "Relatórios automatizados",
                  "Análise de performance por vendedor",
                  "Métricas de saúde do pipeline",
                ],
                timeline: "Semanas 7-9",
              },
              {
                icon: Brain,
                title: "Agentes de IA & Automação",
                description:
                  "Inteligência artificial aplicada à sua operação para automatizar tarefas repetitivas e gerar insights preditivos.",
                benefits: [
                  "Automação de follow-ups",
                  "Scoring automático de leads",
                  "Previsões de vendas com IA",
                  "Chatbots para qualificação inicial",
                ],
                timeline: "Semanas 10-12",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-white/90 bg-white/5 backdrop-blur-sm text-white hover:scale-105 relative overflow-hidden"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  transform:
                    hoveredService === index
                      ? `perspective(1000px) rotateY(${Math.sin(Date.now() * 0.001) * 5}deg)`
                      : "none",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="pb-4 relative z-10">
                  <div
                    className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      hoveredService === index ? "bg-white/30 scale-110 animate-pulse" : ""
                    }`}
                  >
                    <service.icon
                      className={`h-6 w-6 text-white transition-all duration-300 ${
                        hoveredService === index ? "scale-110 animate-bounce" : ""
                      }`}
                    />
                  </div>
                  <CardTitle
                    className={`text-xl mb-2 transition-colors duration-300 text-white ${
                      hoveredService === index ? "animate-pulse" : ""
                    }`}
                  >
                    {service.title}
                  </CardTitle>
                  <Badge className="bg-white/20 text-white border-white/30 mb-4">{service.timeline}</Badge>
                  <CardDescription className="text-base text-white/80">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300"
                        style={{ transitionDelay: `${benefitIndex * 0.1}s` }}
                      >
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-white group-hover:animate-pulse" />
                        <span className="text-sm text-white/90">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-20">
            <h3 className="text-2xl font-bold text-center mb-8 text-white flex items-center justify-center gap-2">
              <Clock className="h-6 w-6 animate-spin" />
              Timeline de Implementação - 90 Dias
              <Rocket className="h-6 w-6 animate-bounce" />
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-white via-white/50 to-white/20 rounded-full z-0"></div>
              <div className="space-y-8">
                {[
                  {
                    week: "Semanas 1-3",
                    title: "Diagnóstico e Arquitetura - O Sábio Analisa",
                    color: "bg-white",
                    textColor: "text-[#995925]",
                  },
                  {
                    week: "Semanas 4-6",
                    title: "Implementação de Dados - O Criador Constrói",
                    color: "bg-white",
                    textColor: "text-primary",
                  },
                  {
                    week: "Semanas 7-9",
                    title: "Automação e Integração - O Herói Age",
                    color: "bg-white",
                    textColor: "text-[#6B4A2E]",
                  },
                  {
                    week: "Semanas 10-12",
                    title: "IA e Otimização Final - A Vitória Completa",
                    color: "bg-white",
                    textColor: "text-[#413328]",
                  },
                ].map((phase, index) => (
                  <div key={index} className="flex items-center justify-center group">
                    <div className="relative z-10 flex items-center gap-4 bg-white p-6 rounded-xl shadow-2xl border-2 border-white/20 group-hover:scale-105 transition-all duration-300 hover:shadow-3xl backdrop-blur-sm">
                      <div
                        className={`w-6 h-6 rounded-full ${phase.color} border-2 border-primary group-hover:animate-pulse`}
                      ></div>
                      <div>
                        <div className={`font-semibold ${phase.textColor} group-hover:animate-pulse`}>{phase.week}</div>
                        <div className="text-sm text-[#6B4A2E] group-hover:text-primary transition-colors duration-300">
                          {phase.title}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <CheckCircle className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Levels Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#E6E4E3]/20 to-[#995925]/10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#413328]">
              Nossos Níveis de Serviço
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6B4A2E] max-w-3xl mx-auto leading-relaxed">
              Cada pilar disponível em 3 níveis de complexidade, ou adquira o pacote completo com desconto
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                level: "Essencial",
                subtitle: "Para pequenas empresas",
                description: "Fundação sólida para começar sua jornada RevOps",
                features: [
                  "Setup básico de CRM",
                  "Dashboards essenciais",
                  "Processos fundamentais",
                  "Suporte por 30 dias",
                ],
                popular: false,
                bgColor: "bg-white",
                borderColor: "border-[#E6E4E3]",
                textColor: "text-[#413328]",
              },
              {
                level: "Profissional",
                subtitle: "Para médias empresas",
                description: "Solução completa para crescimento acelerado",
                features: [
                  "CRM avançado + automações",
                  "BI completo + alertas",
                  "Processos otimizados",
                  "Suporte por 60 dias",
                  "Treinamento da equipe",
                ],
                popular: true,
                bgColor: "bg-gradient-to-br from-primary/5 to-[#995925]/5",
                borderColor: "border-primary",
                textColor: "text-[#413328]",
              },
              {
                level: "Avançado",
                subtitle: "Para grandes empresas",
                description: "Transformação completa com IA e automação total",
                features: [
                  "CRM enterprise + IA",
                  "BI preditivo + ML",
                  "Automação completa",
                  "Suporte por 90 dias",
                  "Consultoria estratégica",
                  "Integração com sistemas legados",
                ],
                popular: false,
                bgColor: "bg-gradient-to-br from-[#413328]/10 to-[#6B4A2E]/5",
                borderColor: "border-[#413328]",
                textColor: "text-[#413328]",
              },
            ].map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${tier.borderColor} ${tier.bgColor} group`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-xs sm:text-sm font-bold">
                    MAIS POPULAR
                  </div>
                )}

                <CardContent className={`p-4 sm:p-6 lg:p-8 ${tier.popular ? "pt-12 sm:pt-14" : ""}`}>
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${tier.textColor}`}>{tier.level}</h3>
                    <p className="text-sm sm:text-base text-[#6B4A2E] mb-3 sm:mb-4">{tier.subtitle}</p>
                    <p className="text-xs sm:text-sm text-[#995925] leading-relaxed px-2">{tier.description}</p>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-[#413328] mb-3 text-center">4 Pilares Inclusos:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center bg-white/50 rounded p-2">
                        <span className="text-[#6B4A2E]">🔧 CRM</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 rounded p-2">
                        <span className="text-[#6B4A2E]">📊 BI</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 rounded p-2">
                        <span className="text-[#6B4A2E]">⚙️ Processos</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 rounded p-2">
                        <span className="text-[#6B4A2E]">🤖 IA</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-[#6B4A2E]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Button
                      onClick={scrollToAuditForm}
                      className="w-full bg-gradient-to-r from-primary to-[#995925] hover:from-primary/90 hover:to-[#995925]/90 text-white font-semibold py-2 sm:py-3 transition-all duration-300 hover:scale-105"
                    >
                      Solicitar Orçamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#413328] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#EB6A00]">Grupo Axend</h3>
              <p className="text-white/80 mb-4">
                Especialistas em Revenue Operations para empresas B2B que buscam crescimento previsível.
              </p>
              <div className="text-sm text-white/60">
                <p>CNPJ: 48.929.432/0001-08</p>
                <p>contato@grupoaxend.com</p>
                <p>WhatsApp: +55 (33) 984605718</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Soluções</h4>
              <ul className="space-y-2 text-white/80">
                <li>CRM Intelligence</li>
                <li>Business Intelligence</li>
                <li>Processos & Rituais</li>
                <li>Agentes de IA</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Níveis</h4>
              <ul className="space-y-2 text-white/80">
                <li>Essencial</li>
                <li>Profissional</li>
                <li>Avançado</li>
                <li>Pacotes Completos</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="#auditoria" className="hover:text-[#EB6A00] transition-colors">
                    Auditoria Gratuita
                  </Link>
                </li>
                <li>
                  <Link href="/solucoes" className="hover:text-[#EB6A00] transition-colors">
                    Soluções Detalhadas
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Grupo Axend. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

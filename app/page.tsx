"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Target,
  Award,
  Sparkles,
  LineChart,
  Zap,
  Cog,
  Brain,
  Shield,
  CreditCard,
  FileText,
  Smartphone,
  ChevronDown,
} from "lucide-react"

export default function AxendRevOpsLanding() {
  const [isFormMinimized, setIsFormMinimized] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [selectedLevel, setSelectedLevel] = useState("professional")
  const [showEvaluationSection, setShowEvaluationSection] = useState(false)
  const [showNeedsSection, setShowNeedsSection] = useState(false)
  const [auditRecommendation, setAuditRecommendation] = useState<any>(null)
  const [roiCalculatorRevenue, setRoiCalculatorRevenue] = useState("")

  const [auditForm, setAuditForm] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    website: "",
    productInterest: "",
    additionalDetails: "",
    companySize: "",
    aiUsage: 0,
    biQuality: 0,
    crmAdoption: 0,
    processMaturity: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const serviceLevels = {
    essential: {
      name: "Essencial",
      subtitle: "Para empresas iniciando a jornada RevOps - O Sábio orienta os primeiros passos",
      duration: "60 dias",
      originalPrice: "R$ 45.000",
      packagePrice: "R$ 35.000",
      packageDiscount: "22%",
      popular: false,
      services: {
        crm: { price: "R$ 8.000", features: ["Setup básico CRM", "Treinamento equipe", "Automações essenciais"] },
        bi: { price: "R$ 10.000", features: ["Dashboard executivo", "Relatórios básicos", "Métricas fundamentais"] },
        ia: { price: "R$ 12.000", features: ["Chatbot qualificação", "Automação follow-up", "Scoring básico"] },
        processos: { price: "R$ 15.000", features: ["Mapeamento processos", "Playbooks vendas", "Rituais básicos"] },
      },
    },
    professional: {
      name: "Profissional",
      subtitle: "Para empresas em crescimento acelerado - O Criador constrói sistemas robustos",
      duration: "90 dias",
      originalPrice: "R$ 85.000",
      packagePrice: "R$ 65.000",
      packageDiscount: "23%",
      popular: true,
      services: {
        crm: { price: "R$ 15.000", features: ["CRM avançado", "Integrações múltiplas", "Automações complexas"] },
        bi: { price: "R$ 18.000", features: ["BI completo", "Análises preditivas", "Dashboards personalizados"] },
        ia: { price: "R$ 22.000", features: ["IA conversacional", "Previsões vendas", "Insights automáticos"] },
        processos: {
          price: "R$ 30.000",
          features: ["Processos otimizados", "Rituais avançados", "Metodologia própria"],
        },
      },
    },
    advanced: {
      name: "Avançado",
      subtitle: "Para empresas que querem dominar o mercado - O Herói conquista a liderança",
      duration: "120 dias",
      originalPrice: "R$ 150.000",
      packagePrice: "R$ 115.000",
      packageDiscount: "23%",
      popular: false,
      services: {
        crm: { price: "R$ 25.000", features: ["CRM enterprise", "Customizações avançadas", "Integrações ilimitadas"] },
        bi: { price: "R$ 35.000", features: ["BI enterprise", "Machine Learning", "Análises prescritivas"] },
        ia: { price: "R$ 40.000", features: ["IA proprietária", "Agentes autônomos", "Otimização contínua"] },
        processos: {
          price: "R$ 50.000",
          features: ["Transformação completa", "Inovação processos", "Liderança mercado"],
        },
      },
    },
  }

  const fourPillars = [
    {
      id: "crm",
      name: "CRM Inteligente",
      description: "Sistema que a equipe ama usar com IA integrada",
      icon: Users,
    },
    {
      id: "bi",
      name: "BI Preditivo",
      description: "Inteligência de dados com machine learning",
      icon: BarChart3,
    },
    {
      id: "ia",
      name: "Agentes de IA",
      description: "Automação inteligente 24/7 para vendas",
      icon: Brain,
    },
    {
      id: "processos",
      name: "Processos Evolutivos",
      description: "Metodologia que se adapta e melhora sozinha",
      icon: Cog,
    },
  ]

  const scrollToAuditForm = () => {
    const element = document.getElementById("audit-form-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      // Add visual feedback
      setTimeout(() => {
        const card = element.querySelector(".glass-strong")
        if (card) {
          card.classList.add("animate-pulse")
          setTimeout(() => card.classList.remove("animate-pulse"), 2000)
        }
      }, 500)
    }
  }

  const scrollToAuditFormWithProduct = (productId: string) => {
    setAuditForm({ ...auditForm, productInterest: productId })
    scrollToAuditForm()
  }

  const generateRecommendation = () => {
    const scores = [auditForm.aiUsage, auditForm.biQuality, auditForm.crmAdoption, auditForm.processMaturity]
    const lowScores = scores.filter((score) => score <= 3).length
    const companyLevel =
      auditForm.companySize === "small" ? "essencial" : auditForm.companySize === "medium" ? "profissional" : "avançado"

    let recommendation = {
      product: "Diagnóstico Personalizado",
      level: companyLevel,
      investment: "A definir",
      priority: "Análise completa necessária",
    }

    if (lowScores >= 3) {
      recommendation = {
        product: "Pacote Completo RevOps com IA",
        level: companyLevel,
        investment:
          serviceLevels[
            companyLevel === "essencial" ? "essential" : companyLevel === "profissional" ? "professional" : "advanced"
          ].packagePrice,
        priority: "Transformação completa recomendada",
      }
    } else if (auditForm.aiUsage <= 2) {
      recommendation = {
        product: "Agentes de IA + Automação",
        level: companyLevel,
        investment:
          serviceLevels[
            companyLevel === "essencial" ? "essential" : companyLevel === "profissional" ? "professional" : "advanced"
          ].services.ia.price,
        priority: "IA é o maior gap identificado",
      }
    }

    return recommendation
  }

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const recommendation = generateRecommendation()

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: auditForm.name,
          email: auditForm.email,
          phone: auditForm.phone,
          cnpj: auditForm.cnpj,
          companyWebsite: auditForm.website,
          monthlyRevenue: auditForm.monthlyRevenue,
          conversionRate: auditForm.conversionRate,
          averageTicket: auditForm.averageTicket,
          companySize: auditForm.companySize,
          productInterest: auditForm.productInterest,
          aiScore: auditForm.aiUsage,
          biScore: auditForm.biQuality,
          crmScore: auditForm.crmAdoption,
          processesScore: auditForm.processMaturity,
          additionalDetails: auditForm.additionalDetails,
          recommendedService: recommendation.service,
          recommendedLevel: recommendation.level,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao enviar formulário")
      }

      const result = await response.json()
      console.log("[v0] Lead saved successfully:", result.leadId)

      setAuditRecommendation(recommendation)
      setIsFormMinimized(true)
      setSubmitSuccess(true)

      // Add success animation
      const formElement = document.getElementById("audit-form-section")
      if (formElement) {
        formElement.classList.add("animate-pulse")
        setTimeout(() => formElement.classList.remove("animate-pulse"), 1000)
      }
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      setSubmitError(error instanceof Error ? error.message : "Erro ao enviar formulário")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary animate-pulse" />
              <span className="font-medium hidden sm:inline">
                Market Timing Crítico: Gartner prevê 75% adotarão RevOps até 2025
              </span>
              <span className="font-medium sm:hidden">75% adotarão RevOps até 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Apenas 48% têm RevOps hoje - seja early adopter</span>
              <span className="sm:hidden">Seja early adopter</span>
            </div>
          </div>
        </div>
      </div>

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#E6E4E3]/20 to-background pt-16"
        id="audit-form-section"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>

        <div className="absolute top-20 left-4 lg:left-10 w-16 lg:w-20 h-16 lg:h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-4 lg:right-20 w-12 lg:w-16 h-12 lg:h-16 bg-[#995925]/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-4 lg:left-20 w-10 lg:w-12 h-10 lg:h-12 bg-[#6B4A2E]/10 rounded-full animate-float"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs sm:text-sm">
                ✅ Baseado em estudos Gartner, Forrester e Revenue Operations Alliance
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-primary bg-gradient-to-r from-primary to-[#995925] bg-clip-text text-transparent">
                  Previsibilidade não é sorte.
                </span>{" "}
                <span className="text-[#413328]">É sistema!</span>
              </h1>

              <div className="space-y-3 lg:space-y-4 text-sm sm:text-base text-[#6B4A2E]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Aumento de ROI médio de 7x em 12 meses</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>36% mais receita previsível</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Users className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>67% menos tempo em planilhas</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Target className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>85% melhoria na acurácia</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-[#995925]/5 border border-primary/20 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-primary text-sm lg:text-base">IA + RevOps: O Futuro é Agora</span>
                </div>
                <p className="text-sm lg:text-base text-[#6B4A2E]">
                  <span className="text-primary font-semibold">Soluções com IA para empresas B2B R$100k+/mês</span> -
                  Especialistas certificados em cada pilar tecnológico
                </p>
              </div>
            </div>

            <Card
              className={`glass-strong shadow-2xl border-primary/20 hover:shadow-3xl transition-all duration-500 ${
                isFormMinimized ? "scale-90 opacity-75" : "scale-100 opacity-100"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary animate-spin" />
                  <Badge variant="secondary" className="text-xs animate-pulse bg-primary/10 text-primary">
                    AUDITORIA GRATUITA COM IA
                  </Badge>
                </div>
                <CardTitle className="text-lg lg:text-xl text-center text-[#413328]">
                  {isFormMinimized ? "Auditoria Concluída ✅" : "Descubra Seu Produto Ideal"}
                </CardTitle>
                <CardDescription className="text-center text-[#6B4A2E]">
                  {isFormMinimized
                    ? "Entraremos em contato em até 24h"
                    : "Auditoria RevOps + IA personalizada em 5 minutos"}
                </CardDescription>
              </CardHeader>

              {!isFormMinimized ? (
                <CardContent className="space-y-4">
                  <form onSubmit={handleAuditSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#413328] mb-1 block">Nome *</label>
                        <input
                          type="text"
                          required
                          value={auditForm.name}
                          onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#413328] mb-1 block">Email *</label>
                        <input
                          type="email"
                          required
                          value={auditForm.email}
                          onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#413328] mb-1 block">Telefone *</label>
                        <input
                          type="tel"
                          required
                          value={auditForm.phone}
                          onChange={(e) => setAuditForm({ ...auditForm, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#413328] mb-1 block">CNPJ</label>
                        <input
                          type="text"
                          value={auditForm.cnpj}
                          onChange={(e) => setAuditForm({ ...auditForm, cnpj: e.target.value })}
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="00.000.000/0001-00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#413328] mb-1 block">Site da Empresa</label>
                      <input
                        type="url"
                        value={auditForm.website}
                        onChange={(e) => setAuditForm({ ...auditForm, website: e.target.value })}
                        className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="https://suaempresa.com"
                      />
                    </div>

                    {/* Product Interest Selection */}
                    <div className="space-y-4 pt-4 border-t border-[#995925]/30">
                      <h4 className="font-semibold text-[#413328]">Produto de Interesse:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <select
                          value={auditForm.productInterest}
                          onChange={(e) => setAuditForm({ ...auditForm, productInterest: e.target.value })}
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Selecione um produto...</option>
                          <optgroup label="Pilares Individuais - Essencial">
                            <option value="crm-essencial">CRM - Essencial</option>
                            <option value="bi-essencial">BI - Essencial</option>
                            <option value="ia-essencial">Agentes de IA - Essencial</option>
                            <option value="processos-essencial">Processos & Rituais - Essencial</option>
                          </optgroup>
                          <optgroup label="Pilares Individuais - Profissional">
                            <option value="crm-profissional">CRM - Profissional</option>
                            <option value="bi-profissional">BI - Profissional</option>
                            <option value="ia-profissional">Agentes de IA - Profissional</option>
                            <option value="processos-profissional">Processos & Rituais - Profissional</option>
                          </optgroup>
                          <optgroup label="Pilares Individuais - Avançado">
                            <option value="crm-avancado">CRM - Avançado</option>
                            <option value="bi-avancado">BI - Avançado</option>
                            <option value="ia-avancado">Agentes de IA - Avançado</option>
                            <option value="processos-avancado">Processos & Rituais - Avançado</option>
                          </optgroup>
                          <optgroup label="Pacotes Completos">
                            <option value="pacote-essencial">Pacote Completo - Essencial</option>
                            <option value="pacote-profissional">Pacote Completo - Profissional</option>
                            <option value="pacote-avancado">Pacote Completo - Avançado</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm text-center text-primary font-medium">
                        📋 Preencha mais informações e receba uma proposta personalizada
                      </p>
                    </div>

                    {/* Needs Section - Collapsible */}
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowNeedsSection(!showNeedsSection)}
                        className="flex items-center justify-between w-full text-sm font-medium text-[#413328] hover:text-primary transition-colors"
                      >
                        <span>Conte-nos mais sobre suas necessidades</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${showNeedsSection ? "rotate-180" : ""}`}
                        />
                      </button>

                      {showNeedsSection && (
                        <textarea
                          value={auditForm.additionalDetails}
                          onChange={(e) => setAuditForm({ ...auditForm, additionalDetails: e.target.value })}
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[80px] resize-none"
                          placeholder="Explique nas suas palavras o que vc sente falta na sua empresa ou o que a Axend pode te ajudar"
                        />
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#995925]/30">
                      <button
                        type="button"
                        onClick={() => setShowEvaluationSection(!showEvaluationSection)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <h4 className="font-semibold text-[#413328]">Avalie sua empresa (1-5):</h4>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${showEvaluationSection ? "rotate-180" : ""}`}
                        />
                      </button>

                      {showEvaluationSection && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-[#413328] mb-2 block">Porte da empresa</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { value: "small", label: "Pequena", level: "essencial" },
                                { value: "medium", label: "Média", level: "profissional" },
                                { value: "large", label: "Grande", level: "avançado" },
                              ].map((size) => (
                                <button
                                  key={size.value}
                                  type="button"
                                  onClick={() => setAuditForm({ ...auditForm, companySize: size.value })}
                                  className={`px-3 py-2 rounded-md border-2 text-sm font-medium transition-all ${
                                    auditForm.companySize === size.value
                                      ? "bg-primary text-white border-primary"
                                      : "border-[#995925]/30 hover:border-primary"
                                  }`}
                                >
                                  {size.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-[#413328] mb-2 block">Uso de Agentes de IA</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setAuditForm({ ...auditForm, aiUsage: num })}
                                  className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-all ${
                                    auditForm.aiUsage === num
                                      ? "bg-primary text-white border-primary"
                                      : "border-[#995925]/30 hover:border-primary"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-[#413328] mb-2 block">Qualidade do BI/Relatórios</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setAuditForm({ ...auditForm, biQuality: num })}
                                  className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-all ${
                                    auditForm.biQuality === num
                                      ? "bg-primary text-white border-primary"
                                      : "border-[#995925]/30 hover:border-primary"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-[#413328] mb-2 block">Adoção do CRM pela equipe</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setAuditForm({ ...auditForm, crmAdoption: num })}
                                  className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-all ${
                                    auditForm.crmAdoption === num
                                      ? "bg-primary text-white border-primary"
                                      : "border-[#995925]/30 hover:border-primary"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-[#413328] mb-2 block">Processos e Rituais definidos</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setAuditForm({ ...auditForm, processMaturity: num })}
                                  className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-all ${
                                    auditForm.processMaturity === num
                                      ? "bg-primary text-white border-primary"
                                      : "border-[#995925]/30 hover:border-primary"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{submitError}</p>
                      </div>
                    )}

                    {submitSuccess && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-600">✅ Dados enviados com sucesso!</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-[#995925] hover:from-[#995925] hover:to-primary text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Receber Auditoria Gratuita com IA
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              ) : (
                <CardContent className="text-center py-8">
                  {auditRecommendation && (
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-4">
                      <div className="flex items-center gap-2 mb-2 justify-center">
                        <Brain className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-primary">Recomendação IA</h4>
                      </div>
                      <p className="font-medium text-[#413328] mb-2">
                        🎯 <strong>{auditRecommendation.product}</strong>
                      </p>
                      <p className="text-sm text-primary font-medium">
                        📊 Nível: <span className="capitalize">{auditRecommendation.level}</span>
                      </p>
                      <p className="text-sm text-[#6B4A2E] mt-2">💰 Investimento: {auditRecommendation.investment}</p>
                    </div>
                  )}
                  <Button
                    onClick={() => setIsFormMinimized(false)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Expandir Formulário
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="glass text-center p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 group border-primary/10">
              <div className="mb-4">
                <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  75%
                </div>
                <p className="text-lg font-semibold mb-2">das empresas adotarão RevOps até 2025</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">G</span>
                  </div>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    Gartner Research
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="glass text-center p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 group border-primary/10">
              <div className="mb-4">
                <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  $8,71
                </div>
                <p className="text-lg font-semibold mb-2">de ROI para cada $1 investido</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">DS</span>
                  </div>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    DemandSage Study
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="glass text-center p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 group border-primary/10">
              <div className="mb-4">
                <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  36%
                </div>
                <p className="text-lg font-semibold mb-2">mais receita com RevOps estruturado</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">F</span>
                  </div>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    Forrester Research
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      {/* <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <Calculator className="h-4 w-4 mr-2" />
                Calculadora ROI
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Calcule o <span className="text-primary">impacto financeiro</span> do RevOps no seu negócio
              </h2>
              <p className="text-xl text-muted-foreground">
                Baseado em dados reais do Forrester e nossa experiência prática
              </p>
            </div>

            <Card className="glass-strong p-8 shadow-2xl border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Informe seu faturamento mensal:</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Faturamento mensal atual (R$)</label>
                      <Input
                        type="number"
                        placeholder="500000"
                        value={roiCalculatorRevenue}
                        onChange={(e) => setRoiCalculatorRevenue(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {roiCalculatorRevenue && Number(roiCalculatorRevenue) > 0 && (
                    <>
                      <div className="p-6 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-green-600">36% Mais Receita (Forrester)</h4>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          +R${(Number(roiCalculatorRevenue) * 0.36).toLocaleString("pt-BR")}/mês
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Aumento de receita com RevOps estruturado</p>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-600">2h15min Economizadas/Dia</h4>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">R$25.000/mês</div>
                        <p className="text-sm text-muted-foreground mt-1">Economia em tempo da equipe comercial</p>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold text-primary">ROI Total Comprovado</h4>
                        </div>
                        <div className="text-3xl font-bold text-primary">771% de retorno</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Retorno total: R$
                          {(Number(roiCalculatorRevenue) * 0.36 * 12 + 25000 * 12).toLocaleString("pt-BR")}/ano
                        </p>
                      </div>

                      <div className="text-center pt-4">
                        <Button
                          size="lg"
                          className="w-full text-lg font-semibold group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                          onClick={() => {}}
                        >
                          Implementar Metodologia Comprovada
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section> */}

      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-[#995925]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-4 text-white border-white/20 bg-white/10">
              <Brain className="h-4 w-4 mr-2" />
              IA + RevOps Integration
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white">
              <span className="text-white">4 Pilares Inteligentes</span> que transformam sua operação
            </h2>
            <p className="text-lg lg:text-xl text-white/90">
              Metodologia premium com IA integrada para empresas que querem liderar o mercado
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 lg:mb-16">
            {[
              {
                icon: Cog,
                title: "1. Arquitetura de Processos com IA",
                description: "Mapeamento e otimização inteligente do funil de vendas",
                benefits: [
                  "Processos padronizados que a equipe realmente segue",
                  "Redução de 40% no tempo de onboarding de novos vendedores",
                  "Eliminação de gargalos que travam o crescimento",
                ],
                timeline: "Semanas 1-3",
              },
              {
                icon: BarChart3,
                title: "2. Inteligência de Dados Preditiva",
                description: "BI executivo com métricas que realmente importam",
                benefits: [
                  "Dashboards que mostram a saúde real do negócio",
                  "Previsões baseadas em dados, não em achismo",
                  "Identificação automática de oportunidades perdidas",
                ],
                timeline: "Semanas 4-6",
              },
              {
                icon: Users,
                title: "3. Automação Inteligente com Agentes",
                description: "Tecnologia que trabalha para você, não contra",
                benefits: [
                  "CRM que a equipe ama usar (95%+ de adoção)",
                  "Follow-ups automáticos que nunca falham",
                  "Integração perfeita entre todas as ferramentas",
                ],
                timeline: "Semanas 7-9",
              },
              {
                icon: Brain,
                title: "4. Agentes de IA para Vendas",
                description: "Agentes inteligentes que qualificam e nutrem leads",
                benefits: [
                  "Qualificação 24/7 sem custo de headcount",
                  "Respostas instantâneas que aumentam conversão",
                  "Leads mais quentes chegando para o time comercial",
                ],
                timeline: "Semanas 10-12",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-white/90 bg-white/5 backdrop-blur-sm text-white"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 text-slate-50 bg-transparent ${
                        hoveredService === index ? "scale-110 bg-primary/30" : ""
                      }`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors text-white bg-transparent">
                        {service.title}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs text-white border-white/30">
                        {service.timeline}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base text-white/80">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-white" />
                        <span className="text-sm text-white/90">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">Timeline de Implementação - 90 Dias</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#EB6A00] via-[#995925]/50 to-[#6B4A2E]/20 rounded-full text-white bg-white z-0"></div>
              <div className="space-y-8">
                {[
                  { week: "Semanas 1-3", title: "Diagnóstico e Arquitetura - O Sábio Analisa", color: "bg-[#995925]" },
                  { week: "Semanas 4-6", title: "Implementação de Dados - O Criador Constrói", color: "bg-[#EB6A00]" },
                  { week: "Semanas 7-9", title: "Automação e Integração - O Herói Age", color: "bg-[#6B4A2E]" },
                  { week: "Semanas 10-12", title: "IA e Otimização Final - A Vitória Completa", color: "bg-[#413328]" },
                ].map((phase, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <div className="relative z-10 flex items-center gap-4 bg-[#E6E4E3] p-4 rounded-lg shadow-md border-2 border-[#995925]/20">
                      <div className={`w-4 h-4 rounded-full ${phase.color}`}></div>
                      <div>
                        <div className="font-semibold text-[#413328]">{phase.week}</div>
                        <div className="text-sm text-[#6B4A2E]">{phase.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Packages */}

      {/* Seção Problema */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sua operação de receita está <span className="text-destructive">sangrando dinheiro</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
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
              },
              {
                icon: Users,
                title: "CRM virou cemitério",
                desc: "Dados desatualizados e processos que ninguém segue",
                impact: "Perda: 30% dos leads qualificados",
              },
              {
                icon: LineChart,
                title: "Decisões feitas em planilhas",
                desc: "Falta de visibilidade real sobre o funil de vendas",
                impact: "Tempo perdido: 15h/semana da equipe",
              },
              {
                icon: Clock,
                title: "Leads perdidos no limbo",
                desc: "Tempo de resposta lento mata oportunidades valiosas",
                impact: "Conversão 40% menor que o potencial",
              },
            ].map((problem, index) => (
              <Card
                key={index}
                className="glass text-center p-6 hover:shadow-lg transition-all duration-300 border-destructive/10"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white">
                  <problem.icon className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{problem.desc}</p>
                <p className="text-xs font-medium text-amber-700">{problem.impact}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">RevOps: O Sistema Operacional da sua Receita</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Não vendemos templates. Cada implementação é{" "}
              <strong className="text-primary">desenhada sob medida</strong> para seu estágio, mercado e complexidade.
            </p>
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8 hover:from-primary/15 hover:to-primary/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-primary">Os 4 Pilares do RevOps que Implementamos</h3>
              <p className="text-muted-foreground">
                Nossa metodologia se baseia em 4 pilares fundamentais que trabalham em sinergia para transformar sua
                operação de receita em uma máquina previsível e escalável.
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
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="glass p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      hoveredService === index ? "bg-primary/20 scale-110" : ""
                    }`}
                  >
                    <service.icon
                      className={`h-6 w-6 text-primary transition-all duration-300 ${
                        hoveredService === index ? "scale-110" : ""
                      }`}
                    />
                  </div>
                  <CardTitle
                    className={`text-xl mb-2 transition-colors duration-300 ${
                      hoveredService === index ? "text-primary" : ""
                    }`}
                  >
                    {service.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary mb-2">O que você recebe:</h4>
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-2">
                        <CheckCircle
                          className={`h-4 w-4 text-primary mt-0.5 flex-shrink-0 transition-all duration-300 ${
                            hoveredService === index ? "scale-110" : ""
                          }`}
                        />
                        <span className="text-xs text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="glass p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-center mb-8">Timeline de Implementação</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    days: 30,
                    title: "Primeiros 30 dias",
                    description:
                      "Diagnóstico completo, configuração inicial do CRM e primeiros processos implementados - O Sábio revela os problemas",
                    color: "bg-[#995925]/10 text-[#995925]",
                  },
                  {
                    days: 60,
                    title: "60 dias",
                    description:
                      "Dashboards funcionais, automações ativas e equipe 100% adotando os novos processos - O Criador transforma",
                    color: "bg-[#EB6A00]/10 text-[#EB6A00]",
                  },
                  {
                    days: 90,
                    title: "90 dias",
                    description:
                      "Operação otimizada, IA integrada e resultados mensuráveis em todas as métricas - O Herói conquista",
                    color: "bg-[#6B4A2E]/10 text-[#6B4A2E]",
                  },
                ].map((phase, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div
                      className={`w-16 h-16 ${phase.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      <span className="text-2xl font-bold">{phase.days}</span>
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-[#EB6A00] transition-colors">{phase.title}</h4>
                    <p className="text-sm text-[#6B4A2E] group-hover:text-[#413328] transition-colors">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Resultados */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">O que esperar nos primeiros 90 dias</h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Award className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">Baseado em nossa metodologia comprovada</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                metric: "Forecast Preciso",
                desc: "Consenso total sobre os números e previsões confiáveis",
                icon: BarChart3,
              },
              { metric: "Resposta Imediata", desc: "Zero leads perdidos por falta de follow-up rápido", icon: Clock },
              { metric: "Conversão Máxima", desc: "Win rate otimizada em cada etapa do funil", icon: TrendingUp },
              { metric: "Fim das Planilhas", desc: "CRM e BI adotados por 100% da equipe", icon: LineChart },
              { metric: "Vendas Aceleradas", desc: "Ciclo mais curto com processos eficientes", icon: Zap },
              { metric: "Operação Fluida", desc: "Processos padronizados que funcionam sozinhos", icon: CheckCircle },
            ].map((result, index) => (
              <Card key={index} className="glass text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <result.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">{result.metric}</div>
                <p className="text-sm text-muted-foreground">{result.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para parar de <span className="text-destructive">queimar dinheiro</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Cada semana sem disciplina operacional aumenta o custo de oportunidade. Vamos mapear seus gargalos
              específicos e definir as 3 alavancas de maior impacto para sua operação.
            </p>

            <Card className="glass-strong max-w-lg mx-auto shadow-2xl border-primary/20 hover:shadow-3xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-4">
                  <Badge variant="destructive" className="animate-pulse bg-amber-600">
                    ⏰ Próximas vagas: Apenas 2 restantes esta semana
                  </Badge>
                </div>
                <Button
                  size="lg"
                  className="w-full text-lg font-semibold mb-4 group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                  onClick={scrollToAuditForm}
                >
                  Agendar Diagnóstico de 90 Minutos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Sem compromisso
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Análise específica
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Diagnóstico personalizado para sua realidade específica
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nova Seção: Matriz de Soluções 4 Pilares x 3 Níveis */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Soluções Integradas em 4 Pilares Fundamentais
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Escolha pilares individuais ou pacotes completos com até 23% de desconto
            </p>

            {/* Seletor de Nível */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/20 p-1 rounded-lg inline-flex backdrop-blur-sm">
                {Object.entries(serviceLevels).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key)}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                      selectedLevel === key
                        ? "bg-white text-primary shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {level.name}
                    {level.popular && (
                      <span className="ml-2 bg-white/20 text-white px-2 py-1 rounded-full text-xs">Mais Popular</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Matriz de Soluções */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-6 mb-12">
              {fourPillars.map((pillar, index) => {
                const currentLevel = serviceLevels[selectedLevel]
                const service = currentLevel.services[pillar.id]

                return (
                  <Card
                    key={pillar.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/20 bg-white text-[#413328] hover:scale-105"
                  >
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <pillar.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-center mb-2 text-[#413328]">{pillar.name}</CardTitle>
                      <p className="text-sm text-[#6B4A2E] text-center mb-4">{pillar.description}</p>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                        <p className="text-sm text-[#995925]">{currentLevel.duration}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[#413328]">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full mt-6 bg-primary hover:bg-[#995925] text-white"
                        onClick={() =>
                          scrollToAuditFormWithProduct(
                            pillar.id +
                              "-" +
                              (selectedLevel === "essential"
                                ? "essencial"
                                : selectedLevel === "professional"
                                  ? "profissional"
                                  : "avancado"),
                          )
                        }
                      >
                        Contratar Pilar
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-6 py-2 rounded-full font-bold text-sm animate-pulse bg-white text-black">
                  🔥 ECONOMIA DE {serviceLevels[selectedLevel].packageDiscount}
                </div>
              </div>

              <Card className="border-4 border-primary bg-gradient-to-br from-[#413328] via-[#413328] to-[#6B4A2E] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-16 translate-x-16"></div>
                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl mb-2 text-white">
                    Pacote Completo {serviceLevels[selectedLevel].name}
                  </CardTitle>
                  <p className="text-white/80 mb-6">{serviceLevels[selectedLevel].subtitle}</p>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-lg text-white/60 line-through">
                      {serviceLevels[selectedLevel].originalPrice}
                    </span>
                    <span className="text-4xl font-bold text-primary">{serviceLevels[selectedLevel].packagePrice}</span>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-primary mb-2">Todos os 4 Pilares Inclusos:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {fourPillars.map((pillar) => (
                        <div key={pillar.id} className="flex items-center gap-2">
                          <pillar.icon className="h-4 w-4 text-primary" />
                          <span className="text-white">{pillar.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 rounded-lg p-4">
                      <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-white">{serviceLevels[selectedLevel].duration}</p>
                      <p className="text-sm text-white/70">Implementação</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-white">Suporte Dedicado</p>
                      <p className="text-sm text-white/70">Time especializado</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-white">ROI Garantido</p>
                      <p className="text-sm text-white/70">Resultados mensuráveis</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 mb-6">
                    <h4 className="font-bold mb-4 text-white">Formas de Pagamento:</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span>Cartão (até 12x)</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Boleto (5% desc.)</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Smartphone className="h-4 w-4 text-primary" />
                        <span>PIX (8% desc.)</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-white text-black">
                      <p className="text-sm font-medium text-black">💡 Contrato anual: 15% de desconto adicional</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-[#995925] text-white text-lg py-6"
                    onClick={() =>
                      scrollToAuditFormWithProduct(
                        "pacote-" +
                          (selectedLevel === "essential"
                            ? "essencial"
                            : selectedLevel === "professional"
                              ? "profissional"
                              : "avancado"),
                      )
                    }
                  >
                    Solicitar Pacote Completo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#413328] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Grupo Axend</h3>
                <p className="text-white/80 mb-4">Consultoria especializada em Revenue Operations</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>CNPJ:</strong> 48.929.432/0001-08
                  </p>
                  <p>
                    <strong>Email:</strong> contato@grupoaxend.com
                  </p>
                  <p>
                    <strong>WhatsApp:</strong> +55 (33) 984605718
                  </p>
                </div>
              </div>

              {/* Founder Info */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">André Franciny</h4>
                    <p className="text-sm text-white/70">Founder & CEO</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Fundador do Grupo Axend, com time e parceiros especializados em cada área do RevOps
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-transparent border-white/20 hover:bg-white/10"
                  >
                    <a
                      href="https://www.linkedin.com/in/andre-franciny-br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-transparent border-white/20 hover:bg-white/10"
                  >
                    <a
                      href="https://instagram.com/andre.franciny"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 text-center">
              <p className="text-sm text-white/60">© 2024 Grupo Axend. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

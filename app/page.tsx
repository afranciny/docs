"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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
  Sparkles,
  Cog,
  Brain,
  ChevronDown,
  Bot,
  Cpu,
  Rocket,
  Activity,
  Award,
  Zap,
  LineChart,
} from "lucide-react"

export default function AxendRevOpsLanding() {
  const [isFormMinimized, setIsFormMinimized] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [selectedLevel, setSelectedLevel] = useState("professional")
  const [showEvaluationSection, setShowEvaluationSection] = useState(false)
  const [showNeedsSection, setShowNeedsSection] = useState(false)
  const [auditRecommendation, setAuditRecommendation] = useState<any>(null)
  const [roiCalculatorRevenue, setRoiCalculatorRevenue] = useState("")
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "bot"; message: string }>>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [roiAnimation, setRoiAnimation] = useState(0)
  const [interactiveDemo, setInteractiveDemo] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isPlaying3D, setIsPlaying3D] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Intersection observer for animations
      const elements = document.querySelectorAll("[data-animate]")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisibleElements((prev) => new Set([...prev, el.id || Math.random().toString()]))
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // ROI counter animation
    const interval = setInterval(() => {
      setRoiAnimation((prev) => (prev + 1) % 100)
    }, 50)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: ["#EB6A00", "#995925", "#6B4A2E"][Math.floor(Math.random() * 3)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + "20"
        ctx.fill()
      })

      if (isPlaying3D) {
        requestAnimationFrame(animate)
      }
    }

    if (isPlaying3D) {
      animate()
    }
  }, [isPlaying3D])

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    const userMessage = currentMessage
    setCurrentMessage("")
    setChatMessages((prev) => [...prev, { role: "user", message: userMessage }])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Entendo sua necessidade! Com base no que você disse, recomendo começar com nosso pilar de IA para automatizar seus processos de vendas.",
        "Excelente pergunta! Nossa metodologia RevOps pode aumentar sua previsibilidade em até 85%. Que tal agendar uma auditoria gratuita?",
        "Isso é muito comum em empresas em crescimento. Nosso CRM vivo resolve exatamente esse problema. Posso te mostrar como?",
        "Perfeito! Vou conectar você com nosso especialista. Enquanto isso, que tal preencher nossa auditoria rápida para personalizar a proposta?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages((prev) => [...prev, { role: "bot", message: randomResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceToggle = () => {
    if ("speechSynthesis" in window) {
      if (voiceEnabled) {
        window.speechSynthesis.cancel()
        setVoiceEnabled(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(
          "Olá! Sou a IA da Axend. Como posso ajudar você a transformar sua operação de receita?",
        )
        utterance.lang = "pt-BR"
        window.speechSynthesis.speak(utterance)
        setVoiceEnabled(true)
      }
    }
  }

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
      id: "processos",
      name: "Processos & Rituais",
      icon: Cog,
      description: "Estruturação completa da operação comercial",
    },
    {
      id: "crm",
      name: "CRM Vivo",
      icon: Users,
      description: "CRM de alta performance com 100% de adoção",
    },
    {
      id: "bi",
      name: "Business Intelligence",
      icon: BarChart3,
      description: "Visibilidade total com dashboards em tempo real",
    },
    {
      id: "ia",
      name: "Agentes de IA",
      icon: Brain,
      description: "IA aplicada para automação e insights preditivos",
    },
  ]

  // ... existing functions ...

  const scrollToAuditForm = () => {
    document.getElementById("audit-form-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAuditFormWithProduct = (product: string) => {
    setAuditForm((prev) => ({ ...prev, productInterest: product }))
    scrollToAuditForm()
  }

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...auditForm,
          recommendation: auditRecommendation,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário")
      }

      setSubmitSuccess(true)
      setIsFormMinimized(true)
      setShowCalendar(true)

      // Reset form after success
      setTimeout(() => {
        setAuditForm({
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
        setSubmitSuccess(false)
        setIsFormMinimized(false)
        setShowCalendar(false)
      }, 5000)
    } catch (error) {
      setSubmitError("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateRecommendation = () => {
    const scores = {
      ai: auditForm.aiUsage,
      bi: auditForm.biQuality,
      crm: auditForm.crmAdoption,
      processos: auditForm.processMaturity,
    }

    const lowScores = Object.entries(scores).filter(([_, score]) => score <= 3)
    const companyLevel =
      auditForm.companySize === "pequena"
        ? "essential"
        : auditForm.companySize === "media"
          ? "professional"
          : "advanced"

    const recommendation = {
      level: companyLevel,
      pillars: lowScores.map(([pillar]) => pillar),
      isPackage: lowScores.length >= 3,
      estimatedInvestment: "",
      description: "",
    }

    if (recommendation.isPackage) {
      recommendation.estimatedInvestment = serviceLevels[companyLevel].packagePrice
      recommendation.description = `Recomendamos o Pacote Completo ${serviceLevels[companyLevel].name} pois identificamos oportunidades de melhoria em múltiplos pilares.`
    } else if (lowScores.length > 0) {
      const pillarName = lowScores[0][0]
      recommendation.estimatedInvestment = serviceLevels[companyLevel].services[pillarName]?.price || "Consulte"
      recommendation.description = `Recomendamos focar no pilar ${pillarName.toUpperCase()} para resolver seus principais gargalos.`
    }

    setAuditRecommendation(recommendation)
  }

  useEffect(() => {
    if (
      auditForm.aiUsage > 0 &&
      auditForm.biQuality > 0 &&
      auditForm.crmAdoption > 0 &&
      auditForm.processMaturity > 0
    ) {
      generateRecommendation()
    }
  }, [auditForm.aiUsage, auditForm.biQuality, auditForm.crmAdoption, auditForm.processMaturity])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: isPlaying3D ? 0.1 : 0 }}
      />

      <div
        className="fixed w-4 h-4 bg-primary/30 rounded-full pointer-events-none z-50 transition-all duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${hoveredService !== null ? 2 : 1})`,
        }}
      />

      {showChatbot && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-primary/20 z-50 flex flex-col">
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">IA Axend</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowChatbot(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              ×
            </Button>
          </div>

          <div className="flex-1">
            <iframe
              src="https://n8n.srv909037.hstgr.cloud/webhook/0989d935-1b01-4629-b779-61bacf3c1eea/chat"
              className="w-full h-full border-0"
              title="Chatbot Axend"
            />
          </div>
        </div>
      )}

      <div className="fixed right-4 bottom-20 flex flex-col gap-3 z-40"></div>

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
        data-animate
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>

        <div
          className="absolute top-20 left-4 lg:left-10 w-16 lg:w-20 h-16 lg:h-20 bg-primary/10 rounded-full animate-float backdrop-blur-sm border border-primary/20"
          style={{ transform: `translateZ(${Math.sin(scrollY * 0.01) * 20}px)` }}
        />
        <div
          className="absolute top-40 right-4 lg:right-20 w-12 lg:w-16 h-12 lg:h-16 bg-[#995925]/10 rounded-full animate-float-delayed backdrop-blur-sm border border-[#995925]/20"
          style={{ transform: `translateZ(${Math.cos(scrollY * 0.01) * 15}px)` }}
        />
        <div
          className="absolute bottom-20 left-4 lg:left-20 w-10 lg:w-12 h-10 lg:h-12 bg-[#6B4A2E]/10 rounded-full animate-float backdrop-blur-sm border border-[#6B4A2E]/20"
          style={{ transform: `translateZ(${Math.sin(scrollY * 0.015) * 10}px)` }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors text-xs sm:text-sm animate-pulse">
                ✅ Baseado em estudos Gartner, Forrester e Revenue Operations Alliance
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-primary bg-gradient-to-r from-primary to-[#995925] bg-clip-text text-transparent animate-gradient">
                  Previsibilidade não é sorte.
                </span>{" "}
                <span className="text-[#413328]">É sistema!</span>
              </h1>

              <div className="space-y-3 lg:space-y-4 text-sm sm:text-base text-[#6B4A2E]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  <div className="flex items-center justify-center lg:justify-start gap-2 group hover:scale-105 transition-transform cursor-pointer">
                    <TrendingUp className="h-4 w-4 text-primary flex-shrink-0 group-hover:animate-bounce" />
                    <span>
                      ROI médio de <span className="font-bold text-primary">{Math.floor(700 + roiAnimation)}%</span> em
                      12 meses
                    </span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 group hover:scale-105 transition-transform cursor-pointer">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0 group-hover:animate-spin" />
                    <span>
                      <span className="font-bold text-primary">36%</span> mais receita previsível
                    </span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 group hover:scale-105 transition-transform cursor-pointer">
                    <Users className="h-4 w-4 text-primary flex-shrink-0 group-hover:animate-pulse" />
                    <span>
                      <span className="font-bold text-primary">67%</span> menos tempo em planilhas
                    </span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 group hover:scale-105 transition-transform cursor-pointer">
                    <Target className="h-4 w-4 text-primary flex-shrink-0 group-hover:animate-ping" />
                    <span>
                      <span className="font-bold text-primary">85%</span> melhoria na acurácia
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-[#995925]/5 border border-primary/20 rounded-xl p-4 lg:p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="h-5 w-5 text-primary flex-shrink-0 group-hover:animate-pulse" />
                  <span className="font-semibold text-primary text-sm lg:text-base">IA + RevOps: O Futuro é Agora</span>
                  <Sparkles className="h-4 w-4 text-primary animate-spin" />
                </div>
                <p className="text-sm lg:text-base text-[#6B4A2E]">
                  <span className="text-primary font-semibold">Soluções com IA para empresas B2B R$100k+/mês</span> -
                  Especialistas certificados em cada pilar tecnológico
                </p>

                {interactiveDemo && (
                  <div className="mt-4 p-3 bg-white/50 rounded-lg border border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm font-semibold text-primary">Demo Interativo Ativo</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-2 bg-primary/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-1000"
                            style={{ width: `${(roiAnimation + i * 25) % 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Card
              className={`glass-strong shadow-2xl border-primary/20 hover:shadow-3xl transition-all duration-500 relative overflow-hidden ${
                isFormMinimized ? "scale-90 opacity-75" : "scale-100 opacity-100"
              }`}
            >
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-[#995925]/20 animate-pulse" />
              </div>

              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary animate-spin" />
                  <Badge variant="secondary" className="text-xs animate-pulse bg-primary/10 text-primary">
                    AUDITORIA GRATUITA COM IA
                  </Badge>
                  <Cpu className="h-4 w-4 text-primary animate-pulse" />
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
                <CardContent className="space-y-4 relative z-10">
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
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
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
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
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
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
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
                          className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
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
                        className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
                        placeholder="https://suaempresa.com"
                      />
                    </div>

                    <div className="group">
                      <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                        Produto de Interesse
                      </label>
                      <select
                        value={auditForm.productInterest}
                        onChange={(e) => setAuditForm({ ...auditForm, productInterest: e.target.value })}
                        className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
                      >
                        <option value="">Selecione uma opção</option>
                        <optgroup label="Pilares Individuais - Essencial">
                          <option value="crm-essencial">CRM - Essencial</option>
                          <option value="bi-essencial">BI - Essencial</option>
                          <option value="ia-essencial">IA - Essencial</option>
                          <option value="processos-essencial">Processos - Essencial</option>
                        </optgroup>
                        <optgroup label="Pilares Individuais - Profissional">
                          <option value="crm-profissional">CRM - Profissional</option>
                          <option value="bi-profissional">BI - Profissional</option>
                          <option value="ia-profissional">IA - Profissional</option>
                          <option value="processos-profissional">Processos - Profissional</option>
                        </optgroup>
                        <optgroup label="Pilares Individuais - Avançado">
                          <option value="crm-avancado">CRM - Avançado</option>
                          <option value="bi-avancado">BI - Avançado</option>
                          <option value="ia-avancado">IA - Avançado</option>
                          <option value="processos-avancado">Processos - Avançado</option>
                        </optgroup>
                        <optgroup label="Pacotes Completos">
                          <option value="pacote-essencial">Pacote Completo - Essencial</option>
                          <option value="pacote-profissional">Pacote Completo - Profissional</option>
                          <option value="pacote-avancado">Pacote Completo - Avançado</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="group">
                      <label className="text-sm font-medium text-[#413328] mb-1 block group-hover:text-primary transition-colors">
                        Porte da Empresa *
                      </label>
                      <select
                        required
                        value={auditForm.companySize}
                        onChange={(e) => setAuditForm({ ...auditForm, companySize: e.target.value })}
                        className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50"
                      >
                        <option value="">Selecione o porte</option>
                        <option value="pequena">Pequena Empresa (até R$500k/mês)</option>
                        <option value="media">Média Empresa (R$500k - R$2M/mês)</option>
                        <option value="grande">Grande Empresa (R$2M+/mês)</option>
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
                            className="w-full px-3 py-2 border border-[#995925]/30 rounded-md bg-white text-[#413328] focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 resize-none"
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

                        {showCalendar && (
                          <div className="mt-6 p-4 bg-white rounded-lg border border-primary/20">
                            <h4 className="text-lg font-semibold text-[#413328] mb-3">
                              Agende sua Consultoria Personalizada
                            </h4>
                            <p className="text-[#6B4A2E] mb-4">
                              Vamos discutir sua auditoria e apresentar a proposta ideal para sua empresa.
                            </p>
                            <div id="google-calendar-button"></div>
                            <script
                              dangerouslySetInnerHTML={{
                                __html: `
                                  (function() {
                                    var target = document.getElementById('google-calendar-button');
                                    if (target && window.calendar) {
                                      window.calendar.schedulingButton.load({
                                        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Fk0BzTNSCZpGqUowjjdo2CMsulrtpV7kVc4r7UhX2gHC7t_Dxa7RMoNaYRd5GGPdRXQj9slOy?gv=true',
                                        color: '#EB6A00',
                                        label: 'Agendar Consultoria',
                                        target: target,
                                      });
                                    }
                                  })();
                                `,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-[#995925] hover:from-primary/90 hover:to-[#995925]/90 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processando com IA...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Rocket className="h-4 w-4" />
                          Receber Auditoria Gratuita
                          <ArrowRight className="h-4 w-4" />
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
                    Nossa IA está processando seus dados. Entraremos em contato em até 24h com sua análise
                    personalizada.
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

      <section
        className="py-20 bg-gradient-to-br from-[#E6E4E3]/30 to-background relative overflow-hidden"
        data-animate
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full animate-pulse" />
          <div
            className="absolute bottom-10 right-10 w-24 h-24 bg-[#995925]/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 animate-bounce">
              📊 Dados de Mercado Validados
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#413328]">
              Por que <span className="text-primary">agora</span> é o momento crítico?
            </h2>
            <p className="text-xl text-[#6B4A2E]">
              Pesquisas globais confirmam: empresas que adotam RevOps primeiro dominam seus mercados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                label: "aumento na previsibilidade de receita",
                source: "Forrester Research",
                icon: Target,
                color: "text-[#995925]",
                bgColor: "bg-[#995925]/10",
                delay: "0.2s",
              },
              {
                stat: "771%",
                label: "ROI médio em implementações RevOps",
                source: "DemandSage Study",
                icon: Award,
                color: "text-[#6B4A2E]",
                bgColor: "bg-[#6B4A2E]/10",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-primary/30 hover:scale-105 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: item.delay }}
                data-animate
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className={`h-8 w-8 ${item.color} group-hover:animate-pulse`} />
                  </div>
                  <div className={`text-4xl font-bold ${item.color} mb-2 group-hover:animate-pulse`}>{item.stat}</div>
                  <p className="text-[#413328] font-medium mb-3">{item.label}</p>
                  <Badge variant="outline" className="text-xs text-[#6B4A2E] border-[#995925]/30">
                    {item.source}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg px-6 py-4">
              <Clock className="h-5 w-5 text-amber-600 animate-pulse" />
              <span className="text-amber-800 font-medium">
                Apenas <span className="font-bold text-amber-900">48%</span> das empresas têm RevOps hoje -
                <span className="text-primary font-bold"> seja early adopter!</span>
              </span>
            </div>
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
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1200')] opacity-20" />
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

      <section className="py-20 bg-gradient-to-br from-background to-[#E6E4E3]/20 relative" data-animate>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 animate-pulse">
              🎯 Soluções Personalizadas por Nível
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#413328]">
              Escolha o Nível Ideal para sua <span className="text-primary">Transformação RevOps</span>
            </h2>
            <p className="text-xl text-[#6B4A2E]">
              Cada pilar disponível em 3 níveis de complexidade, ou adquira o pacote completo com desconto
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                level: "Essencial",
                subtitle: "Para pequenas empresas",
                description: "Fundação sólida para começar sua jornada RevOps",
                price: "R$ 2.500",
                period: "/pilar",
                packagePrice: "R$ 7.500",
                packageDiscount: "25% OFF",
                features: [
                  "Configuração básica do pilar",
                  "Treinamento da equipe",
                  "Documentação completa",
                  "Suporte por 30 dias",
                ],
                color: "border-[#995925]/30",
                bgColor: "bg-[#995925]/5",
                textColor: "text-[#995925]",
                buttonColor: "from-[#995925] to-[#6B4A2E]",
              },
              {
                level: "Profissional",
                subtitle: "Para médias empresas",
                description: "Implementação completa com automações avançadas",
                price: "R$ 4.500",
                period: "/pilar",
                packagePrice: "R$ 13.500",
                packageDiscount: "25% OFF",
                features: [
                  "Tudo do Essencial +",
                  "Automações inteligentes",
                  "Integrações personalizadas",
                  "Dashboards avançados",
                  "Suporte por 60 dias",
                ],
                color: "border-primary/30",
                bgColor: "bg-primary/5",
                textColor: "text-primary",
                buttonColor: "from-primary to-[#995925]",
                popular: true,
              },
              {
                level: "Avançado",
                subtitle: "Para grandes empresas",
                description: "Solução enterprise com IA e máxima personalização",
                price: "R$ 7.500",
                period: "/pilar",
                packagePrice: "R$ 22.500",
                packageDiscount: "25% OFF",
                features: [
                  "Tudo do Profissional +",
                  "IA preditiva personalizada",
                  "Consultoria estratégica",
                  "Implementação white-glove",
                  "Suporte por 90 dias",
                ],
                color: "border-[#413328]/30",
                bgColor: "bg-[#413328]/5",
                textColor: "text-[#413328]",
                buttonColor: "from-[#413328] to-[#6B4A2E]",
              },
            ].map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  tier.popular
                    ? "border-2 border-primary shadow-xl bg-white"
                    : `border-2 ${tier.color} ${tier.bgColor} hover:bg-white/50`
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-[#995925] text-white text-center py-2 text-sm font-semibold">
                    🏆 MAIS POPULAR
                  </div>
                )}

                <CardHeader className={`pb-4 ${tier.popular ? "pt-12" : "pt-6"}`}>
                  <div className="text-center">
                    <CardTitle className={`text-2xl font-bold mb-2 ${tier.textColor}`}>{tier.level}</CardTitle>
                    <CardDescription className="text-[#6B4A2E] mb-4">{tier.subtitle}</CardDescription>
                    <p className="text-sm text-[#6B4A2E] mb-6">{tier.description}</p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className={`text-3xl font-bold ${tier.textColor}`}>{tier.price}</span>
                          <span className="text-[#6B4A2E]">{tier.period}</span>
                        </div>
                        <Button
                          onClick={() => {
                            setAuditForm({ ...auditForm, productInterest: `${tier.level.toLowerCase()}-individual` })
                            scrollToAuditForm()
                          }}
                          variant="outline"
                          className={`w-full mb-3 border-2 ${tier.color} ${tier.textColor} hover:bg-white/80`}
                        >
                          Contratar Pilar Individual
                        </Button>
                      </div>

                      <div className="border-t border-[#995925]/20 pt-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className={`text-2xl font-bold ${tier.textColor}`}>{tier.packagePrice}</span>
                          <Badge className="bg-green-100 text-green-800 text-xs">{tier.packageDiscount}</Badge>
                        </div>
                        <p className="text-xs text-[#6B4A2E] mb-3">Pacote completo (4 pilares)</p>
                        <Button
                          onClick={() => {
                            setAuditForm({ ...auditForm, productInterest: `pacote-${tier.level.toLowerCase()}` })
                            scrollToAuditForm()
                          }}
                          className={`w-full bg-gradient-to-r ${tier.buttonColor} text-white hover:opacity-90 transition-all duration-300 hover:scale-105`}
                        >
                          Solicitar Pacote Completo
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.textColor}`} />
                        <span className="text-sm text-[#6B4A2E]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-[#995925]/5 border border-primary/20 rounded-xl px-8 py-4">
              <Sparkles className="h-6 w-6 text-primary animate-spin" />
              <div className="text-left">
                <p className="font-bold text-primary">Não sabe qual escolher?</p>
                <p className="text-sm text-[#6B4A2E]">
                  Nossa auditoria gratuita identifica o nível ideal para sua empresa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing sections with enhanced interactivity ... */}

      <footer className="bg-gradient-to-br from-[#413328] via-[#413328] to-[#6B4A2E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">Grupo Axend</h3>
                <p className="text-white/80 text-sm">
                  Especialistas em Revenue Operations com IA para empresas B2B que faturam R$100k+/mês.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/70">CNPJ: 48.929.432/0001-08</p>
                  <p className="text-white/70">contato@grupoaxend.com</p>
                  <p className="text-white/70">WhatsApp: +55 (33) 984605718</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Soluções</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <p>• CRM Vivo & Adoção</p>
                  <p>• Business Intelligence</p>
                  <p>• Agentes de IA</p>
                  <p>• Processos & Rituais</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Conecte-se</h4>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-110 bg-transparent"
                    onClick={() => window.open("https://linkedin.com/in/andre-franciny", "_blank")}
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-110 bg-transparent"
                    onClick={() => window.open("https://instagram.com/andre.franciny", "_blank")}
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
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

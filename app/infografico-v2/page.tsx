"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Home,
  Brain,
  Target,
  Users,
  TrendingUp,
  HeadphonesIcon,
  ArrowUp,
  DollarSign,
  BarChart3,
  Zap,
  Sparkles,
  Bot,
  Clock,
  Percent,
  Activity,
  Workflow,
  Database,
  PieChart,
  MessageSquare,
  Calendar,
  ClipboardCheck,
  Shield,
  Send as Sync,
  AlertTriangle,
  PhoneCall,
  UserCheck,
  Search,
  Building,
  Rocket,
  Settings,
  CheckCircle,
  ArrowRight,
  TrendingDown,
  Download,
  Calculator,
  ArrowDown,
} from "lucide-react"

export default function InfographicV2Page() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)
  const [hoveredHub, setHoveredHub] = useState<string | null>(null)
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)
  const [animationStep, setAnimationStep] = useState(0)

  const [leads, setLeads] = useState(1000)
  const [teamSize, setTeamSize] = useState(5)
  const [frt, setFrt] = useState(120) // minutes
  const [conversion, setConversion] = useState(5) // percentage
  const [salary, setSalary] = useState(4000)
  const [costPerLead, setCostPerLead] = useState(50)

  const calculateROI = () => {
    const currentMonthlyCost = teamSize * salary + leads * costPerLead
    const currentRevenue = leads * (conversion / 100) * 5000 // assuming R$5k average deal

    // AI improvements
    const newConversion = Math.min(conversion * 2.5, 30) // max 30%
    const newCostPerLead = costPerLead * 0.4 // 60% reduction
    const newTeamProductivity = teamSize * 4 // 300% increase

    const newMonthlyCost = teamSize * salary + leads * newCostPerLead
    const newRevenue = leads * (newConversion / 100) * 5000

    const monthlyROI = newRevenue - newMonthlyCost - (currentRevenue - currentMonthlyCost)
    const annualSavings = monthlyROI * 12
    const paybackMonths = Math.ceil(49900 / monthlyROI) // Axend cost / monthly ROI

    return {
      currentRevenue,
      newRevenue,
      monthlyROI,
      annualSavings,
      paybackMonths,
      newConversion,
      newCostPerLead,
      newTeamProductivity,
    }
  }

  const roi = calculateROI()

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 9)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const ecosystemHubs = [
    {
      id: "processos",
      name: "PROCESSOS & RITUAIS IA",
      position: "top",
      icon: Workflow,
      coreIcon: Brain,
      subtitle: "Automação de Operações",
      color: "#EB6A00",
      metric: "MAPE reduzido para <15%",
      components: [
        { name: "Forecast IA", description: "previsões automáticas", icon: TrendingUp },
        { name: "Meeting IA", description: "atas e follow-ups", icon: Calendar },
        { name: "Pipeline IA", description: "higienização inteligente", icon: ClipboardCheck },
        { name: "Ritual IA", description: "agenda e pauta automática", icon: Clock },
      ],
    },
    {
      id: "crm",
      name: "CRM INTELIGENTE",
      position: "right",
      icon: Database,
      coreIcon: Brain,
      subtitle: "Plataforma Unificada com IA",
      color: "#995925",
      metric: "95% automação de tarefas",
      components: [
        { name: "Lead Scoring IA", description: "qualificação automática", icon: Target },
        { name: "Opportunity IA", description: "próximos passos sugeridos", icon: TrendingUp },
        { name: "Data Hygiene IA", description: "limpeza automática", icon: Shield },
        { name: "Integration IA", description: "sincronização inteligente", icon: Sync },
      ],
    },
    {
      id: "bi",
      name: "BI ANALYTICS IA",
      position: "bottom",
      icon: PieChart,
      coreIcon: Brain,
      subtitle: "Inteligência de Negócios Preditiva",
      color: "#6B4A2E",
      metric: "Decisões 3x mais rápidas",
      components: [
        { name: "Dashboards IA", description: "insights automáticos", icon: BarChart3 },
        { name: "Reconciliation IA", description: "Vendas↔Financeiro", icon: DollarSign },
        { name: "Alert IA", description: "anomalias detectadas", icon: AlertTriangle },
        { name: "Forecast IA", description: "cenários preditivos", icon: Zap },
      ],
    },
    {
      id: "agentes",
      name: "AGENTES IA",
      position: "left",
      icon: Bot,
      coreIcon: MessageSquare,
      subtitle: "Força de Trabalho Digital",
      color: "#413328",
      metric: "Custo 80% menor por contato",
      components: [
        { name: "SDR IA", description: "inbound 24/7", icon: PhoneCall },
        { name: "BDR IA", description: "outbound personalizado", icon: Users },
        { name: "CS IA", description: "suporte e expansão", icon: HeadphonesIcon },
        { name: "Secretary IA", description: "agendamentos e follow-ups", icon: UserCheck },
      ],
    },
  ]

  const funnelStages = [
    {
      id: "marketing",
      name: "Marketing IA",
      icon: Target,
      color: "#EB6A00",
      description: "Segmentação inteligente e campanhas automatizadas",
    },
    { id: "sdr", name: "SDR IA", icon: Bot, color: "#995925", description: "Prospecção automatizada 24/7" },
    { id: "bdr", name: "BDR IA", icon: Users, color: "#6B4A2E", description: "Qualificação inteligente de leads" },
    { id: "vendas", name: "Vendas IA", icon: TrendingUp, color: "#EB6A00", description: "Assistente de vendas com IA" },
    { id: "cs", name: "CS IA", icon: HeadphonesIcon, color: "#995925", description: "Sucesso do cliente automatizado" },
    {
      id: "upsell",
      name: "Upsell IA",
      icon: ArrowUp,
      color: "#6B4A2E",
      description: "Identificação automática de oportunidades",
    },
    {
      id: "financeiro",
      name: "Financeiro IA",
      icon: DollarSign,
      color: "#EB6A00",
      description: "Reconciliação e análise financeira",
    },
    {
      id: "analytics",
      name: "Analytics IA",
      icon: BarChart3,
      color: "#995925",
      description: "Insights preditivos em tempo real",
    },
    {
      id: "forecast",
      name: "Forecast IA",
      icon: Zap,
      color: "#6B4A2E",
      description: "Previsões precisas com machine learning",
    },
  ]

  const stats = [
    { value: "90%", label: "Automação", icon: Bot, color: "#EB6A00" },
    { value: "5min", label: "FRT", icon: Clock, color: "#995925" },
    { value: "<15%", label: "MAPE", icon: Percent, color: "#6B4A2E" },
    { value: "24/7", label: "Operação", icon: Activity, color: "#EB6A00" },
  ]

  const roadmapPhases = [
    {
      id: "diagnostico",
      name: "DIAGNÓSTICO IA",
      period: "Dias 1-15",
      icon: Search,
      color: "#EB6A00",
      subtitle: "Audit de Potencial IA",
      deliverables: [
        "Mapa de processos automatizáveis",
        "ROI estimado por agente IA",
        "Arquitetura técnica recomendada",
        "Quick wins identificados",
      ],
      milestone: "Blueprint IA personalizado",
    },
    {
      id: "foundation",
      name: "FOUNDATION",
      period: "Dias 16-45",
      icon: Building,
      color: "#995925",
      subtitle: "Infraestrutura e Dados",
      deliverables: [
        "CRM + BI integrados",
        "Data pipelines estabelecidos",
        "Governance de dados IA",
        "Primeiro agente IA (SDR ou CS)",
      ],
      milestone: "Primeiro agente ativo",
    },
    {
      id: "scale",
      name: "SCALE",
      period: "Dias 46-75",
      icon: Rocket,
      color: "#6B4A2E",
      subtitle: "Expansão Multi-Agente",
      deliverables: [
        "3-5 agentes IA operando",
        "Workflows orquestrados",
        "Analytics IA funcionando",
        "Team enablement completo",
      ],
      milestone: "Operação IA multi-canal",
    },
    {
      id: "optimize",
      name: "OPTIMIZE",
      period: "Dias 76-90",
      icon: Settings,
      color: "#413328",
      subtitle: "Otimização e Escala",
      deliverables: [
        "Fine-tuning baseado em dados",
        "Novos casos de uso identificados",
        "ROI measurement estabelecido",
        "Roadmap próximos 90 dias",
      ],
      milestone: "ROI comprovado + evolução contínua",
    },
  ]

  const progressMetrics = [
    { label: "Automação", from: "20%", to: "95%", color: "#EB6A00" },
    { label: "FRT", from: "4h", to: "30seg", color: "#995925" },
    { label: "MAPE", from: "35%", to: "15%", color: "#6B4A2E" },
    { label: "Custo/contato", from: "100%", to: "-80%", color: "#413328" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#E6E4E3]/10 to-background">
      {/* Header */}
      <header className="border-b border-[#E6E4E3]/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-[#413328]">
                Axend
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                  Home
                </Link>
                <Link href="/solucoes" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                  Soluções
                </Link>
                <Link href="/area-cliente" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                  Área do Cliente
                </Link>
              </nav>
            </div>
            <Button className="bg-[#EB6A00] hover:bg-[#995925] text-white">Começar Agora</Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#EB6A00]/10 text-[#EB6A00] border-[#EB6A00]/20">
              <Brain className="h-4 w-4 mr-2" />
              Powered by Artificial Intelligence
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#413328]">
              Revenue Operations
              <span className="block text-[#EB6A00] bg-gradient-to-r from-[#EB6A00] to-[#995925] bg-clip-text text-transparent">
                Powered by IA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#6B4A2E] mb-6 max-w3xl mx-auto">
              Automatize todo seu funil com Inteligência Artificial integrada
            </p>
            <p className="text-lg text-[#995925] max-w-4xl mx-auto leading-relaxed">
              Conheça como transformamos operações de receita com IA aplicada em cada etapa: desde SDR automatizado até
              análise financeira inteligente.
            </p>
          </div>

          {/* Central Diagram */}
          <div className="relative max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Top Row */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {funnelStages.slice(0, 3).map((stage, index) => {
                    const Icon = stage.icon
                    const isActive = animationStep === index
                    const isHovered = hoveredStage === stage.id

                    return (
                      <Card
                        key={stage.id}
                        className={`group cursor-pointer transition-all duration-500 ${
                          isActive ? "scale-105 shadow-2xl" : "hover:scale-102"
                        } ${isHovered ? "ring-2 ring-[#EB6A00]" : ""}`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${stage.color}20, ${stage.color}10)`
                            : "rgba(255,255,255,0.8)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredStage(stage.id)}
                        onMouseLeave={() => setHoveredStage(null)}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                              isActive ? "animate-pulse" : ""
                            }`}
                            style={{ backgroundColor: `${stage.color}20` }}
                          >
                            <Icon className="h-8 w-8 transition-all duration-300" style={{ color: stage.color }} />
                          </div>
                          <h3 className="font-bold text-[#413328] mb-2">{stage.name}</h3>
                          <p className="text-sm text-[#6B4A2E] opacity-80">{stage.description}</p>
                          {isActive && (
                            <div className="mt-3">
                              <Sparkles className="h-5 w-5 text-[#EB6A00] mx-auto animate-spin" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Middle Row */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {funnelStages.slice(3, 6).map((stage, index) => {
                    const Icon = stage.icon
                    const isActive = animationStep === index + 3
                    const isHovered = hoveredStage === stage.id

                    return (
                      <Card
                        key={stage.id}
                        className={`group cursor-pointer transition-all duration-500 ${
                          isActive ? "scale-105 shadow-2xl" : "hover:scale-102"
                        } ${isHovered ? "ring-2 ring-[#EB6A00]" : ""}`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${stage.color}20, ${stage.color}10)`
                            : "rgba(255,255,255,0.8)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredStage(stage.id)}
                        onMouseLeave={() => setHoveredStage(null)}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                              isActive ? "animate-pulse" : ""
                            }`}
                            style={{ backgroundColor: `${stage.color}20` }}
                          >
                            <Icon className="h-8 w-8 transition-all duration-300" style={{ color: stage.color }} />
                          </div>
                          <h3 className="font-bold text-[#413328] mb-2">{stage.name}</h3>
                          <p className="text-sm text-[#6B4A2E] opacity-80">{stage.description}</p>
                          {isActive && (
                            <div className="mt-3">
                              <Sparkles className="h-5 w-5 text-[#EB6A00] mx-auto animate-spin" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {funnelStages.slice(6, 9).map((stage, index) => {
                    const Icon = stage.icon
                    const isActive = animationStep === index + 6
                    const isHovered = hoveredStage === stage.id

                    return (
                      <Card
                        key={stage.id}
                        className={`group cursor-pointer transition-all duration-500 ${
                          isActive ? "scale-105 shadow-2xl" : "hover:scale-102"
                        } ${isHovered ? "ring-2 ring-[#EB6A00]" : ""}`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${stage.color}20, ${stage.color}10)`
                            : "rgba(255,255,255,0.8)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredStage(stage.id)}
                        onMouseLeave={() => setHoveredStage(null)}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                              isActive ? "animate-pulse" : ""
                            }`}
                            style={{ backgroundColor: `${stage.color}20` }}
                          >
                            <Icon className="h-8 w-8 transition-all duration-300" style={{ color: stage.color }} />
                          </div>
                          <h3 className="font-bold text-[#413328] mb-2">{stage.name}</h3>
                          <p className="text-sm text-[#6B4A2E] opacity-80">{stage.description}</p>
                          {isActive && (
                            <div className="mt-3">
                              <Sparkles className="h-5 w-5 text-[#EB6A00] mx-auto animate-spin" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EB6A00" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#995925" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6B4A2E" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Flow lines */}
                <path
                  d="M 200 100 Q 400 150 600 100"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M 200 300 Q 400 350 600 300"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M 200 500 Q 400 550 600 500"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#6B4A2E] font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#EB6A00] to-[#995925] hover:from-[#995925] hover:to-[#6B4A2E] text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <Brain className="h-5 w-5 mr-2" />
              Implementar IA na Minha Operação
            </Button>
            <p className="text-sm text-[#6B4A2E] mt-4">
              Diagnóstico gratuito • Implementação em 90 dias • ROI garantido
            </p>
          </div>
        </div>
      </section>

      {/* AI Transformation Roadmap section */}
      <section className="py-20 bg-gradient-to-br from-background to-[#E6E4E3]/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-[#EB6A00]/10 text-[#EB6A00] border-[#EB6A00]/20">
              <Clock className="h-4 w-4 mr-2" />
              90 Dias de Transformação
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#413328]">
              Roadmap de Transformação IA
              <span className="block text-[#EB6A00]">90 Dias</span>
            </h2>
            <p className="text-xl text-[#6B4A2E] max-w-3xl mx-auto">
              Jornada estruturada para implementar Inteligência Artificial em toda sua operação de receita
            </p>
          </div>

          {/* Timeline Visual */}
          <div className="relative max-w-7xl mx-auto mb-16">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#EB6A00] via-[#995925] via-[#6B4A2E] to-[#413328] transform -translate-y-1/2 hidden lg:block"></div>

            {/* Phases */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {roadmapPhases.map((phase, index) => {
                const Icon = phase.icon
                const isHovered = hoveredPhase === phase.id

                return (
                  <Card
                    key={phase.id}
                    className={`group cursor-pointer transition-all duration-500 hover:scale-105 relative ${
                      isHovered ? "shadow-2xl ring-2 ring-[#EB6A00] z-10" : "hover:shadow-xl"
                    }`}
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${phase.color}20, ${phase.color}10)`
                        : "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={() => setHoveredPhase(phase.id)}
                    onMouseLeave={() => setHoveredPhase(null)}
                  >
                    {/* Phase Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        style={{ backgroundColor: phase.color }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <CardContent className="p-8 pt-12">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `${phase.color}20` }}
                        >
                          <Icon className="h-8 w-8" style={{ color: phase.color }} />
                        </div>
                        <h3 className="text-xl font-bold text-[#413328] mb-2">{phase.name}</h3>
                        <Badge
                          className="mb-3 text-xs font-semibold"
                          style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                        >
                          {phase.period}
                        </Badge>
                        <p className="text-[#6B4A2E] font-medium">{phase.subtitle}</p>
                      </div>

                      {/* Deliverables */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#413328] mb-3 text-sm">Deliverables:</h4>
                        <div className="space-y-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <div key={idx} className="flex items-start text-sm">
                              <CheckCircle
                                className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                style={{ color: phase.color }}
                              />
                              <span className="text-[#6B4A2E]">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Milestone */}
                      <div className="border-t border-[#E6E4E3] pt-4">
                        <div className="flex items-center justify-center">
                          <div
                            className="px-3 py-2 rounded-full text-xs font-bold text-white text-center"
                            style={{ backgroundColor: phase.color }}
                          >
                            🎯 {phase.milestone}
                          </div>
                        </div>
                      </div>

                      {/* Arrow for desktop */}
                      {index < roadmapPhases.length - 1 && (
                        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden lg:block z-10">
                          <ArrowRight className="h-8 w-8 text-[#EB6A00]" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Bottom Metrics Tracker */}
          <div className="bg-gradient-to-r from-[#EB6A00]/10 via-[#995925]/10 to-[#6B4A2E]/10 rounded-2xl p-8 backdrop-blur-sm border border-[#E6E4E3]/30">
            <h3 className="text-2xl font-bold text-center text-[#413328] mb-8">Evolução das Métricas</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {progressMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-[#413328] mb-2">{metric.label}</div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-2xl font-bold text-red-500">{metric.from}</div>
                      <ArrowRight className="h-6 w-6 text-[#6B4A2E]" />
                      <div className="text-2xl font-bold" style={{ color: metric.color }}>
                        {metric.to}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ backgroundColor: metric.color, width: "90%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#EB6A00] to-[#995925] hover:from-[#995925] hover:to-[#6B4A2E] text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <Rocket className="h-6 w-6 mr-3" />
              Iniciar Transformação IA em 90 Dias
            </Button>
            <p className="text-lg text-[#6B4A2E] mt-6 max-w-2xl mx-auto">
              Diagnóstico gratuito • Implementação estruturada • ROI garantido em cada fase
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#E6E4E3]/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#EB6A00]/10 text-[#EB6A00] border-[#EB6A00]/20">
              <Sparkles className="h-4 w-4 mr-2" />
              Ecossistema Integrado
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#413328]">
              Ecossistema RevOps com IA
              <span className="block text-[#EB6A00]">Grupo Axend</span>
            </h2>
            <p className="text-xl text-[#6B4A2E] max-w-3xl mx-auto">
              4 hubs interconectados que transformam sua operação de receita com Inteligência Artificial
            </p>
          </div>

          {/* Diamond Layout - 4 Interconnected Hubs */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Platform */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <Card className="bg-gradient-to-br from-[#EB6A00]/20 to-[#995925]/20 backdrop-blur-lg border-2 border-[#EB6A00]/30 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EB6A00] to-[#995925] flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#413328] mb-2">Axend IA Platform</h3>
                  <p className="text-sm text-[#6B4A2E]">Neural pathways connecting all hubs</p>
                  <div className="flex justify-center mt-4">
                    <div className="w-2 h-2 bg-[#EB6A00] rounded-full animate-pulse mx-1"></div>
                    <div className="w-2 h-2 bg-[#995925] rounded-full animate-pulse mx-1 delay-100"></div>
                    <div className="w-2 h-2 bg-[#6B4A2E] rounded-full animate-pulse mx-1 delay-200"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hub Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
              {/* Top Hub - Processos */}
              <div className="lg:col-start-2 lg:col-end-3">
                {ecosystemHubs
                  .filter((hub) => hub.position === "top")
                  .map((hub) => {
                    const Icon = hub.icon
                    const CoreIcon = hub.coreIcon
                    const isHovered = hoveredHub === hub.id

                    return (
                      <Card
                        key={hub.id}
                        className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                          isHovered ? "shadow-2xl ring-2 ring-[#EB6A00]" : "hover:shadow-xl"
                        }`}
                        style={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${hub.color}20, ${hub.color}10)`
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredHub(hub.id)}
                        onMouseLeave={() => setHoveredHub(null)}
                      >
                        <CardContent className="p-8">
                          <div className="text-center mb-6">
                            <div
                              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                              style={{ backgroundColor: `${hub.color}20` }}
                            >
                              <Icon className="h-10 w-10" style={{ color: hub.color }} />
                              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#EB6A00] to-[#995925] flex items-center justify-center">
                                <CoreIcon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#413328] mb-2">{hub.name}</h3>
                            <p className="text-[#6B4A2E] mb-4">{hub.subtitle}</p>
                            <Badge
                              className="text-xs font-semibold"
                              style={{ backgroundColor: `${hub.color}20`, color: hub.color }}
                            >
                              {hub.metric}
                            </Badge>
                          </div>

                          {/* IA Components */}
                          <div className="space-y-3">
                            {hub.components.map((component, index) => {
                              const ComponentIcon = component.icon
                              return (
                                <div
                                  key={index}
                                  className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                                >
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${hub.color}20` }}
                                  >
                                    <ComponentIcon className="h-4 w-4" style={{ color: hub.color }} />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#413328] text-sm">{component.name}</div>
                                    <div className="text-xs text-[#6B4A2E]">{component.description}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>

              {/* Left Hub - Agentes */}
              <div className="lg:col-start-1 lg:col-end-2 lg:self-center">
                {ecosystemHubs
                  .filter((hub) => hub.position === "left")
                  .map((hub) => {
                    const Icon = hub.icon
                    const CoreIcon = hub.coreIcon
                    const isHovered = hoveredHub === hub.id

                    return (
                      <Card
                        key={hub.id}
                        className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                          isHovered ? "shadow-2xl ring-2 ring-[#EB6A00]" : "hover:shadow-xl"
                        }`}
                        style={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${hub.color}20, ${hub.color}10)`
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredHub(hub.id)}
                        onMouseLeave={() => setHoveredHub(null)}
                      >
                        <CardContent className="p-8">
                          <div className="text-center mb-6">
                            <div
                              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                              style={{ backgroundColor: `${hub.color}20` }}
                            >
                              <Icon className="h-10 w-10" style={{ color: hub.color }} />
                              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#EB6A00] to-[#995925] flex items-center justify-center">
                                <CoreIcon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#413328] mb-2">{hub.name}</h3>
                            <p className="text-[#6B4A2E] mb-4">{hub.subtitle}</p>
                            <Badge
                              className="text-xs font-semibold"
                              style={{ backgroundColor: `${hub.color}20`, color: hub.color }}
                            >
                              {hub.metric}
                            </Badge>
                          </div>

                          {/* IA Components */}
                          <div className="space-y-3">
                            {hub.components.map((component, index) => {
                              const ComponentIcon = component.icon
                              return (
                                <div
                                  key={index}
                                  className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                                >
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${hub.color}20` }}
                                  >
                                    <ComponentIcon className="h-4 w-4" style={{ color: hub.color }} />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#413328] text-sm">{component.name}</div>
                                    <div className="text-xs text-[#6B4A2E]">{component.description}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>

              {/* Right Hub - CRM */}
              <div className="lg:col-start-3 lg:col-end-4 lg:self-center">
                {ecosystemHubs
                  .filter((hub) => hub.position === "right")
                  .map((hub) => {
                    const Icon = hub.icon
                    const CoreIcon = hub.coreIcon
                    const isHovered = hoveredHub === hub.id

                    return (
                      <Card
                        key={hub.id}
                        className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                          isHovered ? "shadow-2xl ring-2 ring-[#EB6A00] z-10" : "hover:shadow-xl"
                        }`}
                        style={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${hub.color}20, ${hub.color}10)`
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredHub(hub.id)}
                        onMouseLeave={() => setHoveredHub(null)}
                      >
                        <CardContent className="p-8">
                          <div className="text-center mb-6">
                            <div
                              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                              style={{ backgroundColor: `${hub.color}20` }}
                            >
                              <Icon className="h-10 w-10" style={{ color: hub.color }} />
                              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#EB6A00] to-[#995925] flex items-center justify-center">
                                <CoreIcon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#413328] mb-2">{hub.name}</h3>
                            <p className="text-[#6B4A2E] mb-4">{hub.subtitle}</p>
                            <Badge
                              className="text-xs font-semibold"
                              style={{ backgroundColor: `${hub.color}20`, color: hub.color }}
                            >
                              {hub.metric}
                            </Badge>
                          </div>

                          {/* IA Components */}
                          <div className="space-y-3">
                            {hub.components.map((component, index) => {
                              const ComponentIcon = component.icon
                              return (
                                <div
                                  key={index}
                                  className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                                >
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${hub.color}20` }}
                                  >
                                    <ComponentIcon className="h-4 w-4" style={{ color: hub.color }} />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#413328] text-sm">{component.name}</div>
                                    <div className="text-xs text-[#6B4A2E]">{component.description}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>

              {/* Bottom Hub - BI */}
              <div className="lg:col-start-2 lg:col-end-3">
                {ecosystemHubs
                  .filter((hub) => hub.position === "bottom")
                  .map((hub) => {
                    const Icon = hub.icon
                    const CoreIcon = hub.coreIcon
                    const isHovered = hoveredHub === hub.id

                    return (
                      <Card
                        key={hub.id}
                        className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                          isHovered ? "shadow-2xl ring-2 ring-[#EB6A00] z-10" : "hover:shadow-xl"
                        }`}
                        style={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${hub.color}20, ${hub.color}10)`
                            : "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={() => setHoveredHub(hub.id)}
                        onMouseLeave={() => setHoveredHub(null)}
                      >
                        <CardContent className="p-8">
                          <div className="text-center mb-6">
                            <div
                              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                              style={{ backgroundColor: `${hub.color}20` }}
                            >
                              <Icon className="h-10 w-10" style={{ color: hub.color }} />
                              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#EB6A00] to-[#995925] flex items-center justify-center">
                                <CoreIcon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#413328] mb-2">{hub.name}</h3>
                            <p className="text-[#6B4A2E] mb-4">{hub.subtitle}</p>
                            <Badge
                              className="text-xs font-semibold"
                              style={{ backgroundColor: `${hub.color}20`, color: hub.color }}
                            >
                              {hub.metric}
                            </Badge>
                          </div>

                          {/* IA Components */}
                          <div className="space-y-3">
                            {hub.components.map((component, index) => {
                              const ComponentIcon = component.icon
                              return (
                                <div
                                  key={index}
                                  className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                                >
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${hub.color}20` }}
                                  >
                                    <ComponentIcon className="h-4 w-4" style={{ color: hub.color }} />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#413328] text-sm">{component.name}</div>
                                    <div className="text-xs text-[#6B4A2E]">{component.description}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>

            {/* Neural Pathways - Connecting Lines */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 1000 800">
                <defs>
                  <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EB6A00" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#995925" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#6B4A2E" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Neural pathways connecting center to each hub */}
                <path
                  d="M 500 400 L 500 200"
                  stroke="url(#neuralGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                  strokeDasharray="10,5"
                />
                <path
                  d="M 500 400 L 800 400"
                  stroke="url(#neuralGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                  strokeDasharray="10,5"
                />
                <path
                  d="M 500 400 L 500 600"
                  stroke="url(#neuralGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                  strokeDasharray="10,5"
                />
                <path
                  d="M 500 400 L 200 400"
                  stroke="url(#neuralGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                  strokeDasharray="10,5"
                />

                {/* Neural nodes */}
                <circle cx="500" cy="300" r="4" fill="#EB6A00" className="animate-pulse" />
                <circle cx="650" cy="400" r="4" fill="#995925" className="animate-pulse" />
                <circle cx="500" cy="500" r="4" fill="#6B4A2E" className="animate-pulse" />
                <circle cx="350" cy="400" r="4" fill="#413328" className="animate-pulse" />
              </svg>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-20">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#EB6A00] to-[#995925] hover:from-[#995925] hover:to-[#6B4A2E] text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              Ativar Ecossistema IA Completo
            </Button>
            <p className="text-lg text-[#6B4A2E] mt-6 max-w-2xl mx-auto">
              Transforme sua operação de receita com os 4 pilares integrados de IA. Implementação completa em 90 dias
              com ROI garantido.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-background to-[#E6E4E3]/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#EB6A00]/10 text-[#EB6A00] border-[#EB6A00]/20">
              <Calculator className="h-4 w-4 mr-2" />
              ROI Calculator
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#413328]">
              Calculadora ROI
              <span className="block text-[#EB6A00]">Transformação IA RevOps</span>
            </h2>
            <p className="text-xl text-[#6B4A2E] max-w-3xl mx-auto">
              Descubra o impacto financeiro da implementação de IA na sua operação de receita
            </p>
          </div>

          {/* Calculator Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Input Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#E6E4E3]/50 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#EB6A00]/10 to-[#995925]/10">
                <CardTitle className="text-2xl font-bold text-[#413328] flex items-center">
                  <Settings className="h-6 w-6 mr-3 text-[#EB6A00]" />
                  Sua Situação Atual
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                    Volume mensal de leads: {leads.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={leads}
                    onChange={(e) => setLeads(Number(e.target.value))}
                    className="w-full h-2 bg-[#E6E4E3] rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                    Tamanho do time comercial: {teamSize}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-[#E6E4E3] rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                    FRT médio atual: {frt} minutos
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="1440"
                    value={frt}
                    onChange={(e) => setFrt(Number(e.target.value))}
                    className="w-full h-2 bg-[#E6E4E3] rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                    Taxa de conversão atual: {conversion}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={conversion}
                    onChange={(e) => setConversion(Number(e.target.value))}
                    className="w-full h-2 bg-[#E6E4E3] rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4A2E] mb-2">Salário médio SDR/BDR</label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E6E4E3] rounded-lg focus:ring-2 focus:ring-[#EB6A00] focus:border-transparent"
                    placeholder="R$ 4.000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B4A2E] mb-2">Custo por lead atual</label>
                  <input
                    type="number"
                    value={costPerLead}
                    onChange={(e) => setCostPerLead(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E6E4E3] rounded-lg focus:ring-2 focus:ring-[#EB6A00] focus:border-transparent"
                    placeholder="R$ 50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Impact Visualization */}
            <Card className="bg-gradient-to-br from-[#EB6A00]/10 to-[#995925]/10 backdrop-blur-sm border-2 border-[#EB6A00]/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#413328] text-center flex items-center justify-center">
                  <Brain className="h-6 w-6 mr-3 text-[#EB6A00]" />
                  Transformação IA
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Before */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-[#6B4A2E] mb-4">ANTES</h4>
                    <div className="flex justify-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <TrendingDown className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <p className="text-sm text-[#6B4A2E]">Processos manuais, FRT alto, baixa conversão</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="h-8 w-8 text-[#EB6A00] animate-bounce" />
                  </div>

                  {/* After */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-[#6B4A2E] mb-4">DEPOIS</h4>
                    <div className="flex justify-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Brain className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Zap className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm text-[#6B4A2E]">Agentes IA, automação total, alta performance</p>
                  </div>
                </div>

                {/* Improvement Metrics */}
                <div className="mt-8 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-sm font-medium text-[#6B4A2E]">FRT</span>
                    <span className="text-sm font-bold text-green-600">{frt}min → 0.5min</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-sm font-medium text-[#6B4A2E]">Conversão</span>
                    <span className="text-sm font-bold text-green-600">
                      {conversion}% → {roi.newConversion.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-sm font-medium text-[#6B4A2E]">Custo/Lead</span>
                    <span className="text-sm font-bold text-green-600">
                      R${costPerLead} → R${roi.newCostPerLead.toFixed(0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                <CardTitle className="text-2xl font-bold text-[#413328] flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                  Resultado com IA RevOps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-white/70 rounded-lg border border-green-200">
                    <div className="text-sm text-[#6B4A2E] mb-1">FRT otimizado</div>
                    <div className="text-2xl font-bold text-green-600">30 segundos</div>
                  </div>

                  <div className="p-4 bg-white/70 rounded-lg border border-green-200">
                    <div className="text-sm text-[#6B4A2E] mb-1">Conversão projetada</div>
                    <div className="text-2xl font-bold text-green-600">
                      +{(((roi.newConversion - conversion) / conversion) * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div className="p-4 bg-white/70 rounded-lg border border-green-200">
                    <div className="text-sm text-[#6B4A2E] mb-1">Custo por lead</div>
                    <div className="text-2xl font-bold text-green-600">-60%</div>
                  </div>

                  <div className="p-4 bg-white/70 rounded-lg border border-green-200">
                    <div className="text-sm text-[#6B4A2E] mb-1">Team productivity</div>
                    <div className="text-2xl font-bold text-green-600">+300%</div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-[#EB6A00]/10 to-[#995925]/10 rounded-lg border-2 border-[#EB6A00]/30">
                    <div className="text-sm text-[#6B4A2E] mb-1">ROI mensal</div>
                    <div className="text-3xl font-bold text-[#EB6A00]">R$ {roi.monthlyROI.toLocaleString()}</div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-[#EB6A00]/10 to-[#995925]/10 rounded-lg border-2 border-[#EB6A00]/30">
                    <div className="text-sm text-[#6B4A2E] mb-1">Payback</div>
                    <div className="text-3xl font-bold text-[#EB6A00]">{roi.paybackMonths} meses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#EB6A00]/20 to-[#995925]/20 rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
              <div className="text-4xl font-bold text-[#413328] mb-4">
                Economia anual projetada:
                <span className="text-[#EB6A00] block">R$ {roi.annualSavings.toLocaleString()}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#EB6A00] to-[#995925] hover:from-[#995925] hover:to-[#6B4A2E] text-white px-8 py-4 text-lg font-bold shadow-xl"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Agendar Diagnóstico IA
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#EB6A00] text-[#EB6A00] hover:bg-[#EB6A00] hover:text-white px-8 py-4 text-lg font-bold bg-transparent"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Relatório Detalhado
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #EB6A00;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(235, 106, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #EB6A00;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(235, 106, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

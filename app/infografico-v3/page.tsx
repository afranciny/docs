"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Settings,
  Bot,
  Database,
  Workflow,
  TrendingUp,
  Shield,
  Rocket,
  Brain,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function InfographicV3() {
  const [checkedProblems, setCheckedProblems] = useState<number[]>([])
  const [animatedStats, setAnimatedStats] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const problems = [
    { id: 1, text: "Previsão de vendas falha consistentemente?", impact: "Crítico", cost: "R$ 50k/mês" },
    { id: 2, text: "O CRM é um 'cemitério de dados' ou 'de fachada'?", impact: "Crítico", cost: "R$ 30k/mês" },
    { id: 3, text: "As decisões dependem de planilhas divergentes ou 'achismos'?", impact: "Alto", cost: "R$ 25k/mês" },
    { id: 4, text: "Leads sem dono e follow-ups atrasados são a norma?", impact: "Crítico", cost: "R$ 40k/mês" },
    {
      id: 5,
      text: "Marketing e Vendas falam línguas diferentes, sem alinhamento?",
      impact: "Alto",
      cost: "R$ 35k/mês",
    },
    {
      id: 6,
      text: "O custo por contato ou atendimento ao cliente é alto e a resposta lenta?",
      impact: "Alto",
      cost: "R$ 20k/mês",
    },
    { id: 7, text: "A empresa está refém de múltiplas ferramentas desconectadas?", impact: "Alto", cost: "R$ 15k/mês" },
  ]

  const implications = [
    {
      icon: DollarSign,
      title: "Perda de Receita",
      value: "30%",
      description: "da receita perdida por ineficiência",
      detail: "Média de R$ 200k/mês em oportunidades perdidas",
    },
    {
      icon: TrendingDown,
      title: "Aumento de Custos",
      value: "30%",
      description: "custos operacionais elevados",
      detail: "Desperdício de R$ 150k/mês em processos ineficientes",
    },
    {
      icon: Users,
      title: "Perda de Clientes",
      value: "48%",
      description: "dos clientes perdidos",
      detail: "Churn evitável de 15-20% ao ano",
    },
    {
      icon: Target,
      title: "Crescimento Cego",
      value: "∞",
      description: "cresce sem saber por quê, encolhe sem saber onde cortar",
      detail: "Decisões baseadas em intuição custam caro",
    },
  ]

  const solutions = [
    {
      icon: Settings,
      title: "RevOps (Processos & Rituais)",
      description: "O sistema operacional da sua receita, com ritos curtos, checkpoints claros e forecast sólido.",
      benefits: ["Reduz ruído em 70%", "Encurta ciclo de vendas em 25%", "MAPE < 15%", "Forecast com 90% precisão"],
      details:
        "Tira o achismo do funil, alinha Marketing, Pré-venda, Vendas e CS, criando previsibilidade com SLAs e ritos auditáveis.",
      color: "from-[#EB6A00] to-[#995925]",
      roi: "300%",
      timeline: "30 dias",
      features: ["Pipeline Management", "Sales Forecasting", "Team Alignment", "Performance Tracking"],
    },
    {
      icon: Bot,
      title: "Agentes Conversacionais com IA",
      description:
        "SDR, BDR, CS e preparação de reunião operados por IA, treinados no seu contexto e integrado ao CRM.",
      benefits: ["FRT ≤ 2min", "Taxa agendamento ≥ 12%", "CSAT ≥ 90%", "Custo reduzido em 60%"],
      details:
        "Respostas 24/7, qualificação de leads, agendamento de reuniões e preparação do vendedor. Automação de tarefas repetitivas e personalização em escala.",
      color: "from-[#995925] to-[#6B4A2E]",
      roi: "450%",
      timeline: "15 dias",
      features: ["AI SDR/BDR", "Smart Qualification", "Auto Scheduling", "Context Awareness"],
    },
    {
      icon: Database,
      title: "CRM (Implementação & Manutenção)",
      description:
        "Salesforce ou HubSpot transformados em sistemas vivos, com automações, integrações estáveis e relatórios confiáveis.",
      benefits: ["Adoção ≥ 95%", "Completude ≥ 95%", "Ciclo reduzido 15-30%", "Governança total"],
      details:
        "O CRM como centro do funil, com processos claros, automações úteis e governança de dados que realmente funciona.",
      color: "from-[#6B4A2E] to-[#413328]",
      roi: "250%",
      timeline: "45 dias",
      features: ["Data Governance", "Process Automation", "Integration Hub", "Advanced Analytics"],
    },
    {
      icon: BarChart3,
      title: "BI (Implementação & Manutenção)",
      description: "Um painel único e confiável que integra Marketing, Vendas, Receita e Financeiro em tempo real.",
      benefits: ["Latência ≤ 1h", "Reconciliação 99.9%", "ROI visível", "Decisão 10x mais rápida"],
      details:
        "Transforma dados espalhados em informação única, confiável e acionável para tomada de decisão em tempo real.",
      color: "from-[#413328] to-[#EB6A00]",
      roi: "400%",
      timeline: "60 dias",
      features: ["Real-time Dashboards", "Predictive Analytics", "Data Integration", "Executive Reports"],
    },
  ]

  const urgencyFactors = [
    {
      icon: BarChart3,
      title: "Previsibilidade é Sobrevivência",
      description: "Sem um sistema operacional da receita (RevOps), a previsibilidade é uma ilusão perigosa.",
      impact: "Empresas com RevOps crescem 3x mais rápido",
      stat: "3x",
    },
    {
      icon: Clock,
      title: "Velocidade Define Vencedores",
      description:
        "Trimestres acelerados exigem decisões com baixa latência; sem BI sólido, a empresa corta no lugar errado.",
      impact: "Decisões 10x mais rápidas com BI integrado",
      stat: "10x",
    },
    {
      icon: Target,
      title: "IA é o Novo Padrão",
      description: "A atenção do cliente é escassa e cara. Quem adota IA cedo lidera, quem atrasa vira seguidor.",
      impact: "Empresas com IA têm 40% mais conversão",
      stat: "40%",
    },
    {
      icon: Workflow,
      title: "Integração é Poder",
      description:
        "A união de Marketing, Vendas e CS é crucial para reduzir ruído, encurtar ciclo e melhorar forecast.",
      impact: "Alinhamento reduz ciclo de vendas em 25%",
      stat: "25%",
    },
  ]

  const handleProblemCheck = (problemId: number) => {
    setCheckedProblems((prev) =>
      prev.includes(problemId) ? prev.filter((id) => id !== problemId) : [...prev, problemId],
    )
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    setTimeout(() => setAnimatedStats(true), 1000)
  }, [])

  const problemPercentage = (checkedProblems.length / problems.length) * 100
  const totalMonthlyCost = checkedProblems.reduce((sum, id) => {
    const problem = problems.find((p) => p.id === id)
    return sum + (problem ? Number.parseInt(problem.cost.replace(/[^\d]/g, "")) : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#E6E4E3]/10 to-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-[#EB6A00]/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#EB6A00] to-[#995925] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">A</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-[#413328]">Grupo Axend</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                Home
              </Link>
              <Link href="/solucoes" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                Soluções
              </Link>
              <Button asChild className="bg-[#EB6A00] hover:bg-[#995925]">
                <Link href="/#auditoria">Diagnóstico Gratuito</Link>
              </Button>
            </nav>
            <Button size="sm" className="md:hidden bg-[#EB6A00] hover:bg-[#995925]" asChild>
              <Link href="/#auditoria">Diagnóstico</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="py-12 sm:py-16 lg:py-20 text-center relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EB6A00]/10 to-[#995925]/10 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#EB6A00]" />
                <span className="text-[#995925] font-medium text-sm sm:text-base">Diagnóstico Revolucionário</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-[#413328] leading-tight">
              Previsibilidade Não é Sorte.
              <span className="block text-[#EB6A00] bg-gradient-to-r from-[#EB6A00] to-[#995925] bg-clip-text text-transparent">
                É Sistema.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-[#6B4A2E] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Diagnóstico completo para identificar ineficiências que sabotam seu crescimento e custam milhões
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-[#995925] mb-6 sm:mb-8">
              <span className="flex items-center gap-2 bg-white/50 rounded-full px-3 sm:px-4 py-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />5 minutos
              </span>
              <span className="flex items-center gap-2 bg-white/50 rounded-full px-3 sm:px-4 py-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                100% Gratuito
              </span>
              <span className="flex items-center gap-2 bg-white/50 rounded-full px-3 sm:px-4 py-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                Resultados Imediatos
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#EB6A00]">73%</div>
                <div className="text-xs sm:text-sm text-[#995925]">Empresas B2B sem RevOps</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#EB6A00]">40%</div>
                <div className="text-xs sm:text-sm text-[#995925]">Perda por Desalinhamento</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#EB6A00]">85%</div>
                <div className="text-xs sm:text-sm text-[#995925]">Falham no Forecast</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#E6E4E3]/30 to-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#EB6A00] to-[#995925] rounded-full mb-4 sm:mb-6 shadow-lg">
                <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#413328]">
                Sua Empresa Reconhece Estes Sinais?
              </h2>
              <p className="text-base sm:text-xl text-[#995925] max-w-3xl mx-auto">
                Marque os problemas que sua empresa enfrenta e descubra o custo real da ineficiência (considerando um faturamento de R$1Mi/mês)     
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 mb-8 sm:mb-12">
              {problems.map((problem) => (
                <Card
                  key={problem.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    checkedProblems.includes(problem.id)
                      ? "ring-2 ring-[#EB6A00] bg-[#EB6A00]/5"
                      : "hover:bg-[#E6E4E3]/30"
                  }`}
                  onClick={() => handleProblemCheck(problem.id)}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {checkedProblems.includes(problem.id) ? (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#EB6A00]" />
                        ) : (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base text-[#413328] font-medium mb-2">{problem.text}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <Badge
                            variant={problem.impact === "Crítico" ? "destructive" : "secondary"}
                            className="text-xs w-fit"
                          >
                            {problem.impact}
                          </Badge>
                          <span className="text-xs sm:text-sm text-[#995925] font-semibold">{problem.cost}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {checkedProblems.length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 sm:p-8 border border-red-200">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-red-700 mb-2">Diagnóstico Inicial</h3>
                  <p className="text-sm sm:text-base text-red-600">
                    Você marcou {checkedProblems.length} de {problems.length} problemas críticos
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-2">
                      {Math.round(problemPercentage)}%
                    </div>
                    <div className="text-sm sm:text-base text-red-600">Nível de Ineficiência</div>
                    <Progress value={problemPercentage} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-2">
                      R$ {totalMonthlyCost.toLocaleString()}
                    </div>
                    <div className="text-sm sm:text-base text-red-600">Custo Mensal Estimado</div>
                    <div className="text-xs sm:text-sm text-red-500 mt-1">
                      R$ {(totalMonthlyCost * 12).toLocaleString()} por ano
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seção 2: Identificação do Inimigo - ALWAYS VISIBLE */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-16 sm:w-32 h-16 sm:h-32 border border-white/20 rounded-full animate-pulse" />
          <div
            className="absolute bottom-10 right-10 w-12 sm:w-24 h-12 sm:h-24 border border-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-20 sm:w-40 h-20 sm:h-40 border border-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4 sm:mb-6 shadow-lg">
                <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                A Ineficiência é Seu Inimigo Oculto
              </h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Estes sinais apontam para um inimigo silencioso que sabota seu crescimento e devora sua receita
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Identificação</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Estes sinais apontam para a <strong className="text-yellow-400">Ineficiência Operacional</strong>,
                    um inimigo silencioso que sabota o crescimento.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <TrendingDown className="w-8 h-8 sm:w-12 sm:h-12 text-red-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Consequência</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Ferramentas sem integração levam à perda de tempo e dinheiro, fazendo com que a equipe trabalhe
                    <strong className="text-red-400"> para a ferramenta</strong>, não o contrário.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Target className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Risco</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Confiança baixa nos dados gera dependência do Excel, com{" "}
                    <strong className="text-orange-400">alto risco </strong>
                    de erros e decisões falhas que custam milhões.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Workflow className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Gargalo</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    A desconexão entre processos, dados e equipes resulta em{" "}
                    <strong className="text-blue-400">atrito, retrabalho e prejuízo</strong> exponencial.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-xl p-4 sm:p-8 backdrop-blur-sm border border-red-500/20">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-red-200">
                Como a Ineficiência Ataca Sua Empresa
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 mx-auto mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-red-200 mb-2 text-sm sm:text-base">Ataque Silencioso</h4>
                  <p className="text-red-300 text-xs sm:text-sm">
                    A ineficiência não grita, ela sussurra. Pequenos vazamentos se tornam hemorragias financeiras.
                  </p>
                </div>
                <div className="text-center">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 mx-auto mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-red-200 mb-2 text-sm sm:text-base">Efeito Cascata</h4>
                  <p className="text-red-300 text-xs sm:text-sm">
                    Um processo ineficiente contamina toda a operação, multiplicando erros e custos exponencialmente.
                  </p>
                </div>
                <div className="text-center">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 mx-auto mb-2 sm:mb-3" />
                  <h4 className="font-semibold text-red-200 mb-2 text-sm sm:text-base">Paralisia Decisória</h4>
                  <p className="text-red-300 text-xs sm:text-sm">
                    Dados conflitantes geram paralisia. Enquanto você hesita, a concorrência avança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Implicações Diretas - ALWAYS VISIBLE */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full mb-4 sm:mb-6 shadow-lg">
                <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-red-200" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Implicações Diretas no Seu Negócio
              </h2>
              <p className="text-base sm:text-xl text-red-100">
                O custo real da ineficiência operacional em números brutais
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {implications.map((implication, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="relative">
                      <implication.icon className="w-8 h-8 sm:w-12 sm:h-12 text-red-200 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                    <div className="text-2xl sm:text-4xl font-bold text-white mb-2">{implication.value}</div>
                    <h3 className="text-base sm:text-lg font-semibold text-red-100 mb-2">{implication.title}</h3>
                    <p className="text-red-200 text-xs sm:text-sm mb-3">{implication.description}</p>
                    <div className="text-xs rounded-lg p-2 text-white bg-muted-foreground">{implication.detail}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-white/20">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-200" />
                  Impactos Operacionais
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 text-sm sm:text-base">
                      Dependência de "heróis" impede escala e torna negócio imprevisível
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 text-sm sm:text-base">
                      Tempo perdido em retrabalho e correção de erros evitáveis
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 text-sm sm:text-base">
                      Decisões baseadas em dados incorretos ou desatualizados
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-white/20">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-red-200" />
                  Riscos Estratégicos
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 text-sm sm:text-base">
                      Perder relevância para concorrentes que já adotam automação e IA
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 text-sm sm:text-base">
                      Crescimento limitado por gargalos operacionais não identificados
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Workflow className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 mt-0.5 flex-shrink-0" />
                    <span className="text-red-100 text-sm sm:text-base">
                      Negócio vira "orquestra sem maestro" - sem sintonia nem direção
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Urgência da Transformação - ALWAYS VISIBLE */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mb-4 sm:mb-6 shadow-lg animate-pulse">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                A Urgência da Transformação: Por Que Agir Agora?
              </h2>
              <p className="text-base sm:text-xl text-orange-100 max-w-3xl mx-auto">
                O mercado não espera. Cada dia de atraso é receita perdida e vantagem competitiva desperdiçada.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {urgencyFactors.map((factor, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <CardContent className="p-4 sm:p-8">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <factor.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{factor.title}</h3>
                        <p className="text-orange-100 mb-3 sm:mb-4 text-sm sm:text-base">{factor.description}</p>
                        <div className="bg-orange-800/30 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-orange-200 text-xs sm:text-sm">{factor.impact}</span>
                            <span className="text-xl sm:text-2xl font-bold text-yellow-300">{factor.stat}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-800/30 to-orange-800/30 rounded-xl p-4 sm:p-8 backdrop-blur-sm border border-orange-500/20">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-orange-100">
                A Realidade do Mercado
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-2">2025</div>
                  <div className="text-orange-200 text-sm">Ano da IA Aplicada</div>
                  <div className="text-xs text-orange-300 mt-2">Quem não adotar agora, fica para trás</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-2">70%</div>
                  <div className="text-orange-200 text-sm">Das empresas já investem em automação</div>
                  <div className="text-xs text-orange-300 mt-2">Você está na maioria ou na minoria?</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-2">6 meses</div>
                  <div className="text-orange-200 text-sm">Tempo médio para implementar RevOps</div>
                  <div className="text-xs text-orange-300 mt-2">Cada mês de atraso custa caro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Solução Axend - ALWAYS VISIBLE */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-[#E6E4E3]/30 to-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#EB6A00] to-[#995925] rounded-full mb-4 sm:mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#413328]">
                A Solução Axend: Previsibilidade Não é Sorte. É Sistema.
              </h2>
              <p className="text-base sm:text-lg text-[#995925] max-w-3xl mx-auto">
                Transforme sua operação com os 4 pilares do RevOps powered by AI. Resultados mensuráveis em 90 dias ou
                menos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {solutions.map((solution, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm"
                >
                  <div className={`h-2 sm:h-3 bg-gradient-to-r ${solution.color}`} />
                  <CardContent className="p-4 sm:p-8">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <solution.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-[#413328] mb-2">{solution.title}</h3>
                        <p className="text-[#6B4A2E] mb-2 sm:mb-3 text-sm sm:text-base">{solution.description}</p>
                        <p className="text-[#995925] text-xs sm:text-sm">{solution.details}</p>
                      </div>
                    </div>

                    <div className="border-t pt-3 sm:pt-4">
                      <h5 className="text-xs sm:text-sm font-semibold text-[#995925] mb-2">Principais Recursos:</h5>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {solution.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-[#E6E4E3] text-[#6B4A2E]">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#EB6A00] to-[#995925] rounded-2xl p-4 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Pronto para Transformar sua Operação?</h3>
                  <p className="text-base sm:text-lg mb-2 text-orange-100">
                    Comece com um diagnóstico gratuito e descubra exatamente onde sua empresa está perdendo receita
                  </p>
                  <div className="text-sm text-orange-200 mb-4 sm:mb-6">
                    ⏰ Diagnóstico personalizado baseado na sua realidade operacional
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold">67%</div>
                    <div className="text-orange-200 text-xs sm:text-sm">Empresas Investem em RevOps</div>
                    <div className="text-xs text-orange-300">Fonte: Salesforce State of Sales</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold">3.2x</div>
                    <div className="text-orange-200 text-xs sm:text-sm">Crescimento com RevOps</div>
                    <div className="text-xs text-orange-300">Fonte: Boston Consulting Group</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold">19%</div>
                    <div className="text-orange-200 text-xs sm:text-sm">Crescimento Médio Anual</div>
                    <div className="text-xs text-orange-300">Fonte: HubSpot RevOps Report</div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-white text-[#EB6A00] hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg mb-3 sm:mb-4 w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/#auditoria">
                      Solicitar Diagnóstico Gratuito Agora
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Link>
                  </Button>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-orange-200">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Sem Compromisso
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Resultados em 48h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 text-[#413328] bg-sidebar-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#EB6A00] to-[#995925] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">A</span>
                </div>
                <span className="font-bold text-lg sm:text-xl text-white">Grupo Axend</span>
              </div>
              <p className="text-gray-300 text-sm">Transformando operações de receita com IA e RevOps</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Soluções</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/solucoes" className="hover:text-[#EB6A00] transition-colors">
                    RevOps
                  </Link>
                </li>
                <li>
                  <Link href="/solucoes" className="hover:text-[#EB6A00] transition-colors">
                    CRM
                  </Link>
                </li>
                <li>
                  <Link href="/solucoes" className="hover:text-[#EB6A00] transition-colors">
                    BI Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/solucoes" className="hover:text-[#EB6A00] transition-colors">
                    Agentes IA
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 bg-transparent text-white">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/" className="hover:text-[#EB6A00] transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/#auditoria" className="hover:text-[#EB6A00] transition-colors">
                    Diagnóstico
                  </Link>
                </li>
                <li>
                  <Link href="/area-cliente" className="hover:text-[#EB6A00] transition-colors">
                    Área do Cliente
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>contato@grupoaxend.tech</li>
                <li>+55 (11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Grupo Axend. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Workflow,
  Database,
  BarChart3,
  Bot,
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Award,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

const frameworkSteps = [
  {
    id: "situacao",
    title: "Situação Atual",
    subtitle: "Mapeamento do cenário",
    description: "Como está sua operação de vendas hoje? Vamos mapear processos, ferramentas e métricas atuais",
    icon: Target,
    color: "bg-blue-600",
    borderColor: "border-blue-600",
    textColor: "text-blue-400",
  },
  {
    id: "problema",
    title: "Problemas Críticos",
    subtitle: "Identificação de gaps",
    description: "Quais são os vazamentos de receita e pontos de falha que estão custando dinheiro?",
    icon: AlertTriangle,
    color: "bg-orange-600",
    borderColor: "border-orange-600",
    textColor: "text-orange-400",
  },
  {
    id: "implicacao",
    title: "Impacto nos Resultados",
    subtitle: "Custos e riscos",
    description: "Quanto esses problemas estão custando em receita perdida e oportunidades?",
    icon: TrendingDown,
    color: "bg-red-600",
    borderColor: "border-red-600",
    textColor: "text-red-400",
  },
  {
    id: "necessidade",
    title: "Solução Necessária",
    subtitle: "ROI e benefícios",
    description: "O que precisa ser implementado para resolver esses problemas e gerar resultados?",
    icon: CheckCircle,
    color: "bg-green-600",
    borderColor: "border-green-600",
    textColor: "text-green-400",
  },
]

const axendProducts = [
  {
    id: "processos",
    icon: Workflow,
    title: "Processos & Rituais",
    description: "SLAs, ritos e forecast auditável. Tire o achismo do funil.",
    metrics: ["MAPE <20%", "Win rate ↑", "Ciclo -15%"],
    tiers: ["Essencial", "Profissional", "Avançado"],
    prices: ["R$ 2.500", "R$ 4.500", "R$ 7.000"],
    cta: "Avaliar Processos",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM Implementação",
    description: "Salesforce/HubSpot como centro do funil com automações.",
    metrics: ["Adoção >85%", "FRT <5min", "Dados limpos"],
    tiers: ["Essencial", "Profissional", "Avançado"],
    prices: ["R$ 1.500", "R$ 3.000", "R$ 5.500"],
    cta: "Diagnóstico CRM",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "bi",
    icon: BarChart3,
    title: "BI & Analytics",
    description: "Painéis executivos com reconciliação Vendas↔Financeiro.",
    metrics: ["Latência <24h", "Reconciliação 99%", "Decisões data-driven"],
    tiers: ["Essencial", "Profissional", "Avançado"],
    prices: ["R$ 3.000", "R$ 5.500", "R$ 8.500"],
    cta: "Avaliar BI",
    color: "from-green-600 to-green-800",
  },
  {
    id: "ia",
    icon: Bot,
    title: "Agentes IA",
    description: "SDR/BDR/CS automatizados 24/7 com compliance LGPD.",
    metrics: ["FRT <5min", "Booking +50%", "CSAT >85%"],
    tiers: ["Essencial", "Profissional", "Avançado"],
    prices: ["R$ 8.000", "R$ 7.000", "R$ 12.000"],
    cta: "Piloto IA",
    color: "from-orange-600 to-orange-800",
  },
]

const pillarChecklists = {
  situacao: {
    processos: [
      "Tem rituais de forecast definidos?",
      "SLAs de resposta estabelecidos?",
      "Processo de qualificação documentado?",
      "Pipeline stages padronizados?",
      "Métricas de conversão mapeadas?",
    ],
    crm: [
      "CRM implementado e funcionando?",
      "Dados de leads organizados?",
      "Integrações com outras ferramentas?",
      "Relatórios automáticos configurados?",
      "Equipe usando consistentemente?",
    ],
    bi: [
      "Dashboards de vendas existem?",
      "Reconciliação vendas-financeiro?",
      "Métricas de performance definidas?",
      "Relatórios executivos automatizados?",
      "Dados confiáveis e atualizados?",
    ],
    ia: [
      "Automação de follow-up implementada?",
      "Chatbots ou assistentes virtuais?",
      "Qualificação automática de leads?",
      "Agendamento automatizado?",
      "Análise preditiva de oportunidades?",
    ],
  },
  problema: {
    processos: [
      "MAPE do forecast acima de 30%?",
      "SLAs de resposta quebrados?",
      "Processo de qualificação inconsistente?",
      "Pipeline desorganizado?",
      "Métricas de conversão baixas?",
    ],
    crm: [
      "Dados duplicados ou inconsistentes?",
      "Leads perdidos por falta de follow-up?",
      "Relatórios manuais e demorados?",
      "Equipe não adota o CRM?",
      "Oportunidades órfãs no sistema?",
    ],
    bi: [
      "Falta de visibilidade do pipeline?",
      "Dados conflitantes entre áreas?",
      "Relatórios desatualizados?",
      "Decisões baseadas em achismo?",
      "Métricas não confiáveis?",
    ],
    ia: [
      "Demora na resposta aos leads?",
      "Qualificação manual demorada?",
      "Agendamentos perdidos?",
      "Falta de follow-up consistente?",
      "Análise de oportunidades superficial?",
    ],
  },
  implicacao: {
    processos: [
      "Meta anual em risco por imprecisão?",
      "Board questionando os números?",
      "Perda de competitividade?",
      "Equipe desmotivada com processos?",
      "Decisões erradas por dados ruins?",
    ],
    crm: [
      "Oportunidades perdidas para concorrência?",
      "Custos operacionais crescendo?",
      "Clientes insatisfeitos com demora?",
      "Produtividade da equipe baixa?",
      "Relatórios consomem muito tempo?",
    ],
    bi: [
      "Investidores perdendo confiança?",
      "Risco de não atingir valuation?",
      "Decisões estratégicas erradas?",
      "Conflitos entre vendas e financeiro?",
      "Falta de previsibilidade?",
    ],
    ia: [
      "Leads quentes esfriando?",
      "Concorrência respondendo mais rápido?",
      "Custo de aquisição aumentando?",
      "Taxa de conversão baixa?",
      "Oportunidades de upsell perdidas?",
    ],
  },
  necessidade: {
    processos: [
      "Forecast preciso salvaria sua meta?",
      "Processos claros aumentariam eficiência?",
      "SLAs cumpridos melhorariam satisfação?",
      "Pipeline organizado aceleraria vendas?",
      "Métricas confiáveis guiariam decisões?",
    ],
    crm: [
      "CRM adotado aumentaria produtividade?",
      "Dados limpos melhorariam conversão?",
      "Automação liberaria tempo da equipe?",
      "Relatórios automáticos economizariam horas?",
      "Integração eliminaria retrabalho?",
    ],
    bi: [
      "Dashboards em tempo real acelerariam decisões?",
      "Reconciliação automática eliminaria conflitos?",
      "Métricas precisas aumentariam confiança?",
      "Análises preditivas antecipariam problemas?",
      "Visibilidade total do funil otimizaria resultados?",
    ],
    ia: [
      "IA respondendo 24/7 geraria mais leads?",
      "Qualificação automática aceleraria vendas?",
      "Agendamento inteligente aumentaria conversão?",
      "Follow-up automatizado recuperaria oportunidades?",
      "Análise preditiva priorizaria esforços?",
    ],
  },
}

export default function InfographicPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [checklistProgress, setChecklistProgress] = useState<Record<string, Record<string, number>>>({
    situacao: { processos: 0, crm: 0, bi: 0, ia: 0 },
    problema: { processos: 0, crm: 0, bi: 0, ia: 0 },
    implicacao: { processos: 0, crm: 0, bi: 0, ia: 0 },
    necessidade: { processos: 0, crm: 0, bi: 0, ia: 0 },
  })
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalProgress =
        Object.values(checklistProgress).reduce((acc, step) => {
          const stepProgress = Object.values(step).reduce((a, b) => a + b, 0) / 4
          return acc + stepProgress
        }, 0) / 4
      setShowFloatingCTA(totalProgress > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [checklistProgress])

  const handleChecklistChange = (step: string, pillar: string, index: number, checked: boolean) => {
    const key = `${step}-${pillar}-${index}`
    setCheckedItems((prev) => ({ ...prev, [key]: checked }))

    const pillarItems =
      pillarChecklists[step as keyof typeof pillarChecklists][pillar as keyof typeof pillarChecklists.situacao]
    const checkedCount = pillarItems.filter((_, i) => {
      const itemKey = `${step}-${pillar}-${i}`
      return i === index ? checked : checkedItems[itemKey]
    }).length

    const progress = (checkedCount / pillarItems.length) * 100
    setChecklistProgress((prev) => ({
      ...prev,
      [step]: { ...prev[step], [pillar]: progress },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#413328] via-[#6B4A2E] to-[#995925] text-white">
      {/* Header */}
      <header className="fixed top-4 left-4 right-4 z-40 bg-black/20 backdrop-blur-md rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#EB6A00]">
            Grupo Axend
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-[#EB6A00] text-[#EB6A00]">
              Revenue Operations
            </Badge>
            <Link href="/solucoes">
              <Button variant="ghost" className="text-white hover:text-[#EB6A00]">
                Produtos
              </Button>
            </Link>
            <Link href="/#lead-form">
              <Button className="bg-[#EB6A00] hover:bg-[#995925]">Contato</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>

        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#EB6A00] text-white mb-6 text-lg px-4 py-2">Diagnóstico Completo RevOps</Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-[#EB6A00]">Mapeie sua Operação</span>
            <span className="block text-white">e Descubra Oportunidades</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-[#E6E4E3] max-w-4xl mx-auto">
            Avalie sua situação atual, identifique problemas críticos e descubra o potencial de crescimento da sua
            operação de vendas
          </p>

          <Link href="#diagnostic">
            <Button size="lg" className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-4 text-lg">
              Iniciar Diagnóstico Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Framework Steps Overview */}
      <section id="diagnostic" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Diagnóstico <span className="text-[#EB6A00]">Completo</span> em 4 Etapas
            </h2>
            <p className="text-xl text-[#E6E4E3] max-w-3xl mx-auto">
              Metodologia estruturada para mapear sua operação e identificar oportunidades de crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {frameworkSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card
                  className={`${step.color}/20 ${step.borderColor}/30 hover:${step.color}/30 transition-all duration-300 cursor-pointer group`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${step.textColor}`}>{step.title}</h3>
                    <p className="text-sm text-white/80 mb-4">{step.subtitle}</p>
                  </CardContent>
                </Card>
                {index < frameworkSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-8 w-8 text-[#EB6A00] z-10" />
                )}
              </div>
            ))}
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-4 ${frameworkSteps[activeStep].textColor}`}>
                  {frameworkSteps[activeStep].title}
                </h3>
                <p className="text-lg text-[#E6E4E3]">{frameworkSteps[activeStep].description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Diagnostic Checklists */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Avalie seus <span className="text-[#EB6A00]">4 Pilares</span> RevOps
            </h2>
            <p className="text-xl text-[#E6E4E3]">Checklist interativo para mapear sua operação em cada etapa</p>
          </div>

          <Tabs defaultValue="situacao" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/30 mb-8">
              <TabsTrigger value="situacao" className="data-[state=active]:bg-blue-600">
                Situação Atual
              </TabsTrigger>
              <TabsTrigger value="problema" className="data-[state=active]:bg-orange-600">
                Problemas
              </TabsTrigger>
              <TabsTrigger value="implicacao" className="data-[state=active]:bg-red-600">
                Impactos
              </TabsTrigger>
              <TabsTrigger value="necessidade" className="data-[state=active]:bg-green-600">
                Soluções
              </TabsTrigger>
            </TabsList>

            {Object.entries(pillarChecklists).map(([stepKey, pillars]) => (
              <TabsContent key={stepKey} value={stepKey} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {axendProducts.map((product) => (
                    <Card key={product.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-full flex items-center justify-center`}
                          >
                            <product.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{product.title}</h3>
                            <div className="text-sm text-[#E6E4E3]">
                              {Math.round(checklistProgress[stepKey][product.id] || 0)}% completo
                            </div>
                          </div>
                        </div>

                        <Progress value={checklistProgress[stepKey][product.id] || 0} className="mb-4" />

                        <div className="space-y-3">
                          {pillars[product.id as keyof typeof pillars].map((item: string, index: number) => (
                            <div key={index} className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id={`${stepKey}-${product.id}-${index}`}
                                className="mt-1 h-4 w-4 text-[#EB6A00] rounded"
                                onChange={(e) => handleChecklistChange(stepKey, product.id, index, e.target.checked)}
                              />
                              <label
                                htmlFor={`${stepKey}-${product.id}-${index}`}
                                className="text-sm text-[#E6E4E3] cursor-pointer leading-tight"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Soluções <span className="text-[#EB6A00]">Axend</span> para cada Pilar
            </h2>
            <p className="text-xl text-[#E6E4E3]">Implementação completa dos 4 pilares RevOps</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {axendProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <product.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                      <p className="text-[#E6E4E3]">{product.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {product.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="outline" className="border-[#EB6A00]/50 text-[#EB6A00] text-center">
                        {metric}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    {product.tiers.map((tier, idx) => (
                      <div key={tier} className="text-center">
                        <div className="text-sm font-semibold text-white">{tier}</div>
                        <div className="text-lg font-bold text-[#EB6A00]">{product.prices[idx]}</div>
                      </div>
                    ))}
                  </div>

                  <Link href="/#lead-form">
                    <Button className="bg-[#EB6A00] hover:bg-[#995925] w-full">{product.cta}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Pronto para <span className="text-[#EB6A00]">Transformar</span> sua Operação?
          </h2>
          <p className="text-xl mb-8 text-[#E6E4E3]">
            Agende um diagnóstico gratuito e descubra seu potencial de crescimento
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-[#EB6A00] mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">100+</div>
              <div className="text-[#E6E4E3]">empresas atendidas</div>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-[#EB6A00] mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">15+</div>
              <div className="text-[#E6E4E3]">anos RevOps</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-[#EB6A00] mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">&lt;18%</div>
              <div className="text-[#E6E4E3]">MAPE médio</div>
            </div>
          </div>

          <Link href="/#lead-form">
            <Button size="lg" className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-4 text-lg">
              Agendar Diagnóstico Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Floating CTA */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link href="/#lead-form">
            <Button className="bg-[#EB6A00] hover:bg-[#995925] shadow-lg animate-pulse">
              Diagnóstico Gratuito
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#EB6A00] mb-4">Grupo Axend</h3>
              <p className="text-[#E6E4E3] text-sm">Revenue Operations Specialists</p>
              <p className="text-[#E6E4E3] text-sm mt-2">CNPJ: 48.929.432/0001-08</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produtos</h4>
              <div className="space-y-2 text-sm text-[#E6E4E3]">
                <div>Processos & Rituais</div>
                <div>CRM Implementação</div>
                <div>BI & Analytics</div>
                <div>Agentes IA</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Serviços</h4>
              <div className="space-y-2 text-sm text-[#E6E4E3]">
                <Link href="/solucoes">Soluções</Link>
                <div>Diagnóstico</div>
                <div>Implementação</div>
                <div>Suporte</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contato</h4>
              <div className="space-y-2 text-sm text-[#E6E4E3]">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@grupoaxend.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+55 (33) 984605718</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-[#E6E4E3]/60">
            <p>© 2025 Grupo Axend. Revenue Operations Specialists.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  Check,
  Building2,
  Calendar,
  DollarSign,
  AlertTriangle,
  TrendingDown,
  Users,
  Target,
  Settings,
  Bot,
  Database,
  BarChart3,
  CheckCircle,
  XCircle,
  Zap,
  Clock,
} from "lucide-react"
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
      color: "from-[#EB6A00] to-[#995925]",
      roi: "300%",
      timeline: "30 dias",
      kpis: [
        "Melhoria significativa na precisão do forecast baseada no seu baseline atual",
        "Redução substancial do ciclo de vendas conforme métricas históricas",
        "Aumento da taxa de conversão proporcional ao desempenho atual",
        "Otimização dos processos com base na situação específica da empresa",
      ],
    },
    {
      icon: Bot,
      title: "Agentes Conversacionais com IA",
      description:
        "SDR, BDR, CS e preparação de reunião operados por IA, treinados no seu contexto e integrado ao CRM.",
      benefits: ["FRT ≤ 2min", "Taxa agendamento ≥ 12%", "CSAT ≥ 90%", "Custo reduzido em 60%"],
      color: "from-[#995925] to-[#6B4A2E]",
      roi: "450%",
      timeline: "15 dias",
      kpis: [
        "Redução significativa do tempo de primeira resposta baseada no baseline atual",
        "Melhoria da taxa de agendamento proporcional ao desempenho histórico",
        "Aumento da satisfação do cliente conforme métricas atuais de CSAT",
        "Otimização de custos operacionais baseada na estrutura atual da empresa",
      ],
    },
    {
      icon: Database,
      title: "CRM (Implementação & Manutenção)",
      description:
        "Salesforce ou HubSpot transformados em sistemas vivos, com automações, integrações estáveis e relatórios confiáveis.",
      benefits: ["Adoção ≥ 95%", "Completude ≥ 95%", "Ciclo reduzido 15-30%", "Governança total"],
      color: "from-[#6B4A2E] to-[#413328]",
      roi: "250%",
      timeline: "45 dias",
      kpis: [
        "Aumento da taxa de adoção do CRM baseado no uso atual da equipe",
        "Melhoria da qualidade e completude dos dados conforme situação atual",
        "Otimização do ciclo de vendas proporcional aos processos existentes",
        "Implementação de governança de dados adequada ao contexto da empresa",
      ],
    },
    {
      icon: BarChart3,
      title: "BI (Implementação & Manutenção)",
      description: "Um painel único e confiável que integra Marketing, Vendas, Receita e Financeiro em tempo real.",
      benefits: ["Latência ≤ 1h", "Reconciliação 99.9%", "ROI visível", "Decisão 10x mais rápida"],
      color: "from-[#413328] to-[#EB6A00]",
      roi: "400%",
      timeline: "60 dias",
      kpis: [
        "Redução da latência de dados baseada na infraestrutura atual",
        "Melhoria da reconciliação de dados conforme processos existentes",
        "Aumento da visibilidade do ROI proporcional às métricas atuais",
        "Aceleração da velocidade de decisão baseada no contexto organizacional",
      ],
    },
  ]

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
      <style jsx global>{`
        @media print {
          .page-break-before {
            page-break-before: always;
          }
          .page-break-after {
            page-break-after: always;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          .no-print {
            display: none !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            background: white !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
          }
          .p-4, .sm\\:p-6, .lg\\:p-8 {
            padding: 1rem !important;
          }
          /* Force white background for all elements in print */
          * {
            background: white !important;
            background-color: white !important;
            background-image: none !important;
          }
          /* Preserve only essential background colors for cards and badges */
          .bg-red-50, .bg-green-50, .bg-blue-50, .bg-yellow-50, .bg-orange-50 {
            background: #fafafa !important;
            background-color: #fafafa !important;
          }
          .bg-red-100, .bg-green-100, .bg-blue-100, .bg-yellow-100, .bg-orange-100 {
            background: #f5f5f5 !important;
            background-color: #f5f5f5 !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center page-break-inside-avoid">
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
          <Card className="page-break-inside-avoid">
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

          {/* Diagnóstico: Sinais de Ineficiência Operacional */}
          <Card className="page-break-before page-break-inside-avoid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#EB6A00]" />
                Diagnóstico: Sinais de Ineficiência Operacional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#413328] mb-4">
                Empresas que enfrentam estes problemas perdem em média <strong>30% da receita</strong> por ineficiência
                operacional:
              </p>
              <div className="grid gap-3">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-[#413328] font-medium">{problem.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={problem.impact === "Crítico" ? "destructive" : "secondary"} className="text-xs">
                          {problem.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implicações Diretas no Seu Negócio */}
          <Card className="page-break-inside-avoid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                Implicações Diretas no Seu Negócio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {implications.map((implication, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3 mb-2">
                      <implication.icon className="w-6 h-6 text-red-600" />
                      <h4 className="font-semibold text-[#413328]">{implication.title}</h4>
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">{implication.value}</div>
                    <p className="text-sm text-[#995925] mb-2">{implication.description}</p>
                    <p className="text-xs text-red-700 bg-red-100 p-2 rounded">{implication.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nossa Solução: Os 4 Pilares do RevOps */}
          <Card className="page-break-before page-break-inside-avoid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Nossa Solução: Os 4 Pilares do RevOps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#413328] mb-6">
                Transforme sua operação com resultados mensuráveis em 90 dias através dos nossos 4 pilares integrados:
              </p>
              <div className="grid gap-6">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50 page-break-inside-avoid"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[#413328] mb-2">{solution.title}</h4>
                        <p className="text-[#6B4A2E] mb-3 text-sm">{solution.description}</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-semibold text-[#995925] mb-2">Benefícios Principais:</h5>
                            <ul className="text-xs text-[#6B4A2E] space-y-1">
                              {solution.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#EB6A00]" />
                              <span className="text-sm font-semibold">Implementação: {solution.timeline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold">ROI Esperado: {solution.roi}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-[#995925] mb-2">KPIs e Resultados Esperados:</h5>
                          <ul className="text-xs text-[#6B4A2E] space-y-1">
                            {solution.kpis.map((kpi, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Target className="w-3 h-3 text-[#EB6A00] mt-0.5 flex-shrink-0" />
                                {kpi}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Por Que Agir Agora? */}
          <Card className="page-break-inside-avoid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Por Que Agir Agora?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <div className="grid sm:grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#EB6A00]">73%</div>
                    <div className="text-sm text-[#995925]">Empresas B2B sem RevOps</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#EB6A00]">3.2x</div>
                    <div className="text-sm text-[#995925]">Crescimento com RevOps</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#EB6A00]">2025</div>
                    <div className="text-sm text-[#995925]">Ano da IA Aplicada</div>
                  </div>
                </div>
                <p className="text-center text-[#413328] font-medium">
                  Cada mês de atraso representa oportunidades perdidas e vantagem competitiva desperdiçada.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Produtos e Serviços Inclusos */}
          <Card className="page-break-before">
            <CardHeader>
              <CardTitle>Produtos e Serviços Inclusos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {proposal.selected_products.map((product, index) => {
                  const baseDetails = {
                    "RevOps (Processos & Rituais)": {
                      scope:
                        "Implementação completa de processos de Revenue Operations com rituais estruturados e governança de dados adaptados ao contexto específico da empresa",
                      deliverables: [
                        "Mapeamento e otimização do funil de vendas atual",
                        "Definição de SLAs personalizados entre Marketing e Vendas",
                        "Implementação de rituais de forecast baseados no baseline da empresa",
                        "Dashboard de acompanhamento customizado para suas métricas",
                        "Documentação de processos e playbooks específicos do negócio",
                      ],
                    },
                    "Agentes Conversacionais com IA": {
                      scope:
                        "Desenvolvimento e implementação de agentes de IA personalizados para automação de SDR, BDR e Customer Success baseados no contexto e necessidades específicas da empresa",
                      deliverables: [
                        "Agente SDR IA treinado com dados e contexto da empresa",
                        "Agente BDR IA personalizado para o perfil de cliente ideal",
                        "Agente CS IA adaptado aos produtos e serviços específicos",
                        "Integração completa com CRM e ferramentas existentes",
                        "Treinamento e calibração baseados no histórico da empresa",
                      ],
                    },
                    "CRM (Implementação & Manutenção)": {
                      scope:
                        "Configuração, customização e otimização completa do CRM adaptada aos processos e necessidades específicas da empresa",
                      deliverables: [
                        "Configuração personalizada baseada nos processos atuais",
                        "Automações de workflow específicas para o negócio",
                        "Integrações com ferramentas e sistemas existentes",
                        "Relatórios e dashboards customizados para KPIs relevantes",
                        "Treinamento da equipe baseado nos processos implementados",
                      ],
                    },
                    "BI (Implementação & Manutenção)": {
                      scope:
                        "Implementação de Business Intelligence integrado e personalizado com todas as fontes de dados relevantes da empresa",
                      deliverables: [
                        "Dashboard executivo personalizado para métricas específicas",
                        "Relatórios automatizados baseados nas necessidades do negócio",
                        "Integração de dados em tempo real das fontes existentes",
                        "Análises preditivas calibradas com histórico da empresa",
                        "Alertas e notificações customizados para KPIs críticos",
                      ],
                    },
                  }

                  const levelDetails = {
                    essencial: {
                      features: ["Configuração básica", "Suporte por email", "Documentação padrão"],
                      support: "Suporte por email (48h)",
                    },
                    profissional: {
                      features: [
                        "Configuração avançada",
                        "Customizações específicas",
                        "Suporte prioritário",
                        "Treinamento da equipe",
                      ],
                      support: "Suporte prioritário (24h) + consultoria mensal",
                    },
                    avancado: {
                      features: [
                        "Configuração enterprise",
                        "Customizações ilimitadas",
                        "Suporte 24/7",
                        "Consultoria dedicada",
                        "Análises avançadas",
                      ],
                      support: "Suporte 24/7 + consultoria semanal + account manager dedicado",
                    },
                  }

                  const details = {
                    ...baseDetails[product.name as keyof typeof baseDetails],
                    ...levelDetails[product.level as keyof typeof levelDetails],
                  }

                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-6 bg-gradient-to-r from-blue-50/50 to-green-50/50 page-break-inside-avoid"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-[#413328] text-lg">{product.name}</h3>
                          <Badge variant="outline" className="capitalize mt-1">
                            Nível {product.level}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#EB6A00] text-lg">
                            R$ {product.price.toLocaleString("pt-BR")}
                          </div>
                          {product.maintenance > 0 && (
                            <div className="text-sm text-[#995925]">
                              + R$ {product.maintenance.toLocaleString("pt-BR")}/mês
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Scope */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#995925] mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Escopo do Trabalho
                        </h4>
                        <p className="text-[#413328] text-sm leading-relaxed">{details.scope}</p>
                      </div>

                      {/* Deliverables */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#995925] mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Entregáveis
                        </h4>
                        <ul className="space-y-1">
                          {details.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#413328]">
                              <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Level Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#995925] mb-2 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Recursos do Nível {product.level}
                        </h4>
                        <ul className="space-y-1">
                          {details.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#413328]">
                              <Zap className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Timeline and Support */}
                      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <h5 className="font-semibold text-[#995925] mb-1 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Cronograma
                          </h5>
                          <p className="text-sm text-[#413328]">{details.timeline}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#995925] mb-1 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Suporte Incluído
                          </h5>
                          <p className="text-sm text-[#413328]">{details.support}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Observações Específicas */}
          {proposal.custom_notes && (
            <Card className="page-break-before page-break-inside-avoid">
              <CardHeader>
                <CardTitle>Observações Específicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#413328] whitespace-pre-wrap">{proposal.custom_notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Resumo Financeiro */}
          <Card className="page-break-before page-break-inside-avoid">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
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

          {/* Contato Direto */}
          <Card className="mt-8 bg-gradient-to-r from-[#EB6A00]/10 to-[#995925]/10 border-[#EB6A00]/20 page-break-inside-avoid">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-[#413328] text-lg">Contato Direto</h3>
                <div className="space-y-1 text-[#995925]">
                  <p className="font-medium">André Franciny | Founder</p>
                  <p>+55 (33) 98460-5718</p>
                  <p>andre@franciny.tech</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

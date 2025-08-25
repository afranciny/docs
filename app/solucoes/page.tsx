"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  BarChart3,
  Settings,
  Bot,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  Target,
  Users,
  Shield,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

const serviceLevels = {
  essencial: {
    name: "Essencial",
    description: "Disciplina mínima em 30 dias e parar as perdas óbvias",
    color: "bg-[#995925]",
    timeline: "2-4 semanas",
    services: {
      processos: {
        price: 1800,
        objective: "Colocar disciplina mínima em 30 dias e parar as perdas óbvias",
        scope: [
          "Mapear o funil ponta-a-ponta (entrada, qualificação, oportunidade, fechamento, onboarding)",
          "Definir SLAs de entrada/saída por etapa e donos (DRIs)",
          "Criar calendário de ritos: daily (15 min), weekly (45 min), QBR (trimestral)",
          "Dicionário inicial de métricas (LQL, MQL, SQL, SQO, FRT, ciclo, win)",
          "Forecast simples por estágio e probabilidade",
          "Checklist de higiene de pipeline (campos críticos, próxima ação, datas)",
        ],
        deliverables: [
          "Blueprint 30/60/90",
          "Playbooks por etapa",
          "Painel mínimo (pipeline, conversões, FRT)",
          "Planilha de capacidade de vendas",
          "Agenda dos ritos",
          "Matriz RACI resumida",
        ],
        kpis: [
          "Adoção de ritos >90%",
          "FRT <5 min (inbound)",
          "% de deals com próxima ação >85%",
          "Forecast semanal publicado",
          "% pipeline higienizado/semana >80%",
        ],
      },
      crm: {
        price: 1500,
        objective: "Tirar o 'CRM de fachada' e colocar uso disciplinado em poucas semanas",
        scope: [
          "Processo e objetos padrão: Contas, Contatos, Leads e Oportunidades",
          "Automações básicas: Atribuição de lead, lembretes de tarefas",
          "Integrações leves: Formulários do site, e-mail e calendário",
          "Dados mínimos: Dedupe simples, limpeza inicial",
          "Treinamento: Sessões curtas por papel",
          "Relatórios essenciais: Pipeline por estágio, conversões",
        ],
        deliverables: [
          "Org configurada",
          "Playbook de uso diário",
          "Runbook de admin",
          "Matriz de campos críticos",
          "Relatórios e dashboards essenciais",
          "Go-live assistido",
        ],
        kpis: [
          "Usuários ativos semanais ≥80%",
          "Completude de campos críticos ≥90%",
          "Lead atribuído ≤1h",
          "≥85% dos deals com próxima ação em até 7 dias",
        ],
      },
      bi: {
        price: 2000,
        objective: "Entregar visibilidade rápida para decisões imediatas",
        scope: [
          "Conectar 4-8 fontes (Salesforce/HubSpot, RD/GA4, Google Ads/Meta, ERP)",
          "Montar 3-5 painéis 'quick win'",
          "Definir 10-20 métricas com nomes e fórmulas padronizadas",
          "Configurar acessos e pastas",
          "Treinar gestores para leitura e decisão",
        ],
        deliverables: [
          "Dashboards funcionais com filtros",
          "Dicionário inicial de métricas",
          "Guia de uso + handover",
          "Relatório de 'Top 10 insights do mês 1'",
          "Plano 30/60/90 de evolução",
        ],
        kpis: [
          "Latência <24-48h",
          "WAU ≥70% dos gestores",
          "3+ decisões registradas usando dashboards",
          "Satisfação inicial ≥7/10",
        ],
      },
      ia: {
        price: 2200,
        objective: "Lançar 1 caso de uso com ROI direto e risco controlado",
        scope: [
          "1 agente ativo (SDR inbound, CS suporte ou Meeting Prep)",
          "Roteiros aprovados + tom de voz validado",
          "Integrações mínimas (CRM/helpdesk/calendário)",
          "Guardrails de privacidade (LGPD)",
          "Relatórios básicos por canal",
        ],
        deliverables: [
          "Intents/fluxos e scriptbook aprovados",
          "Integrações funcionando",
          "Testes ponta a ponta e SLAs definidos",
          "Logs de consentimento/opt-out",
          "Relatórios básicos de desempenho",
        ],
        kpis: [
          "FRT ≤5 min",
          "Booking ≥8% no canal piloto",
          "Containment ≥60% em suporte",
          "TTR CS ≤24h",
          "Show rate ≥60% para agendas",
        ],
      },
    },
    originalPrice: 7500,
    packagePrice: 6000,
  },
  profissional: {
    name: "Profissional",
    description: "Transformar em máquina previsível e auditável",
    color: "bg-[#EB6A00]",
    timeline: "6-12 semanas",
    services: {
      processos: {
        price: 3500,
        objective: "Transformar o funil em máquina previsível e auditável",
        scope: [
          "Processos E2E Mkt-Vendas-CS com SLAs por etapa",
          "Governança de dados (nomenclatura, campos obrigatórios, dedupe)",
          "Dashboard executivo: conversões, atividade, MAPE do forecast",
          "Forecast por coortes, produtos e territórios",
          "Enablement por papel (SDR, BDR, AE, CS) e runbooks",
          "Integração leve com BI e rotina de UAT",
        ],
        deliverables: [
          "Playbooks completos",
          "Dashboards (conversões/forecast/atividade)",
          "Runbooks por papel",
          "Backlog 90d priorizado",
          "Matriz RACI",
          "Plano de capacidade/território",
        ],
        kpis: ["MAPE <20%", "Ciclo -15%", "Win rate ↑", "Adoção CRM >80-85%", "% SLAs cumpridos >90%"],
      },
      crm: {
        price: 3000,
        objective: "Transformar o CRM em plataforma integrada e auditável",
        scope: [
          "Modelagem avançada: Objetos custom, múltiplos pipelines",
          "Integrações robustas: API/iPaaS, marketing automation, telefonia",
          "Migração segura: Perfilhamento de dados, dedupe e normalização",
          "Governança de dados: Dicionário de métricas, nomenclaturas",
          "Segurança e acesso: RBAC, perfis e permission sets",
          "Relatórios executivos: Forecast por coorte, produto e região",
        ],
        deliverables: [
          "Documento de solução",
          "Mapa de dados e integrações",
          "Suíte de testes",
          "Migração validada",
          "Guia administrativo",
          "Hypercare",
        ],
        kpis: [
          "Adoção >85%",
          "Erro de dados <2%",
          "Integrações com falhas = 0",
          "MAPE do forecast <20%",
          "Tempo de proposta -30%",
        ],
      },
      bi: {
        price: 4000,
        objective: "Modelos por domínio com reconciliação e forecast confiável",
        scope: [
          "Domínios: Vendas, Marketing, Receita e Financeiro",
          "Modelagem: ERD por domínio, camadas de negócio",
          "Pipelines: ETL/ELT robusto com versionamento",
          "Segurança: RBAC e mascaramento de dados sensíveis",
          "Reconciliação: Vendas↔Financeiro (>99%)",
          "Forecast: por coorte/produto/território com MAPE medido",
        ],
        deliverables: [
          "ERD por domínio",
          "Pipelines documentados",
          "Dashboards executivos",
          "Glossary consolidado",
          "Catálogo de dados online",
          "Guia de reconciliação assinado",
        ],
        kpis: [
          "MAPE do forecast <20%",
          "Reconciliação Vendas↔Financeiro >99%",
          "Latência ≤24h",
          "Fechamento de report mensal -30%",
          "100% das métricas críticas com owner",
        ],
      },
      ia: {
        price: 4500,
        objective: "Operar inbound e outbound com personalização por ICP",
        scope: [
          "2-3 agentes (SDR, BDR, CS)",
          "Cadências multicanal",
          "Anti-spam e reputação",
          "Personalização por ICP",
          "Filtros de compliance",
          "Handoff humano",
        ],
        deliverables: [
          "Playbooks",
          "Infraestrutura de envio/voz",
          "Alertas e guardrails",
          "Dashboards",
          "Datasets de treino",
          "Rubrica de QA",
        ],
        kpis: [
          "Reply ≥12%",
          "Meetings/mês ≥X",
          "SQL/mês ≥Y",
          "Custo por contato ≤R$ Z",
          "Handoff humano ≤2 min",
          "Entregabilidade ≥95%",
        ],
      },
    },
    originalPrice: 15000,
    packagePrice: 12000,
  },
  avancado: {
    name: "Avançado",
    description: "Orquestração multi-equipes com compliance e melhoria contínua",
    color: "bg-[#6B4A2E]",
    timeline: "3-12 meses",
    services: {
      processos: {
        price: 6000,
        objective: "Orquestração multi-equipes com compliance e confiabilidade operacional",
        scope: [
          "Change management com comunicação e adoção medidos",
          "Integrações testadas end-to-end",
          "Auditoria mensal de dados e forecast",
          "OKRs trimestrais; metas e bônus atrelados",
          "Programa de experimentos (A/B de cadências)",
          "PMO leve para priorização, riscos e dependências",
        ],
        deliverables: [
          "Catálogo de indicadores",
          "Relatórios mensais",
          "Pacote QBR",
          "Roadmap semestral",
          "Trilhas de competências",
          "Plano de continuidade (BCP)",
        ],
        kpis: [
          "Metas batidas por 2+ trimestres",
          "Erro de forecast dentro da meta",
          "Adoção sustentada",
          "% de experimentos com ganho significativo",
          "SLOs do funil cumpridos",
        ],
      },
      crm: {
        price: 5000,
        objective: "Garantir evolução contínua e alta confiabilidade",
        scope: [
          "Admin & Enhancements: Roadmap mensal",
          "Qualidade & Auditoria: Higiene e reconciliação",
          "Lançamentos: Gestão de releases",
          "Confiabilidade: Monitoramento e SRE leve",
          "Adoção & Enablement: Trilha de capacitação",
          "Compliance: LGPD; retenção e descarte",
        ],
        deliverables: [
          "Calendário de releases",
          "SLAs operacionais consolidados",
          "Plano de saída",
          "Relatórios de uso e estabilidade",
          "QBR com diretoria",
          "Catálogo de automações",
        ],
        kpis: [
          "Adoção sustentada >85-90%",
          "Tempo médio de atendimento <5 dias",
          "Uptime de integrações >99%",
          "NPS interno ≥ meta",
          "Taxa de incidentes críticos = 0",
        ],
      },
      bi: {
        price: 7000,
        objective: "BI como produto interno com SLA e operação 24×5",
        scope: [
          "BIaaS: operação, manutenção e evolução contínua",
          "SLA/SLO: latência, uptime, MTTR",
          "FinOps de BI: custo por consulta, por área",
          "Camada semântica: taxonomia de métricas",
          "Self-service guiado",
          "Roadmap trimestral",
        ],
        deliverables: [
          "SLAs formais",
          "Relatórios mensais de confiabilidade",
          "Roadmap trimestral",
          "Catálogo e métricas certificadas",
          "Auditoria semestral",
          "Trilhas de treinamento contínuo",
        ],
        kpis: [
          "Uptime >99%",
          "MTTR <4h",
          "Taxa de uso self-service >70%",
          "Incidentes críticos = 0",
          "Retrabalho manual -50%",
        ],
      },
      ia: {
        price: 7000,
        objective: "Orquestração multi-agente com metas por etapa",
        scope: [
          "SDR/BDR/CS/Prep coordenados",
          "Roteamento inteligente",
          "Testes contínuos",
          "Voice bots",
          "Compliance/auditoria",
          "Aprendizado supervisionado",
        ],
        deliverables: [
          "Roadmap trimestral",
          "Suíte de testes",
          "Relatórios executivos",
          "Base de conhecimento viva",
          "SLAs operacionais consolidados",
          "Plano de saída",
        ],
        kpis: ["SQL/mês", "Show rate", "NRR", "NPS/CSAT", "Alucinação ≤0,5%", "Conversas com erro grave ≤1%"],
      },
    },
    originalPrice: 25000,
    packagePrice: 20000,
  },
}

const pillars = [
  {
    id: "processos",
    name: "Processos & Rituais",
    icon: Settings,
    description: "Revenue Operations",
    fullDescription:
      "Tirar o achismo do funil, alinhar Marketing, Pré-venda, Vendas e CS, e criar previsibilidade com SLAs, ritos e forecast auditável.",
    symptoms: [
      "Pipeline sujo",
      "Reuniões longas sem decisão",
      "Previsão que falha",
      "Dados conflitantes Mkt↔Vendas↔Financeiro",
      "Lead sem dono",
      "Follow-ups perdidos",
    ],
    valueDrivers: [
      "Menor ciclo e retrabalho",
      "Melhor win rate",
      "Forecast com erro em queda (MAPE)",
      "Times coordenados por metas",
      "Rituais curtos",
    ],
    prerequisites: [
      "Sponsor executivo",
      "Owners por etapa do funil",
      "Acesso a CRM/BI",
      "Concordância sobre definições de métricas",
    ],
    timeline: "2-12 semanas",
  },
  {
    id: "crm",
    name: "CRM",
    icon: Database,
    description: "Customer Relationship Management",
    fullDescription:
      "Implantar, migrar e operar o CRM como centro do funil: processos claros, integrações estáveis, automações úteis, governança de dados e treinamento contínuo.",
    symptoms: [
      "Leads sem dono",
      "Follow-ups atrasados",
      "Campos críticos vazios",
      "Números diferentes em Vendas e Financeiro",
      "Forecast 'no feeling'",
      "Dependência de planilhas",
    ],
    valueDrivers: [
      "Adoção ≥85%",
      "Completude de campos críticos ≥90%",
      "FRT menor",
      "Ciclo de vendas -10–25%",
      "MAPE do forecast <20%",
      "Win rate maior",
    ],
    prerequisites: [
      "Owners por etapa",
      "Listas e campos mínimos definidos",
      "Domínio de e-mail válido",
      "Amostra de dados de 90 dias",
    ],
    timeline: "4-14 semanas",
  },
  {
    id: "bi",
    name: "Business Intelligence",
    icon: BarChart3,
    description: "Inteligência de Negócios",
    fullDescription:
      "Programa completo para transformar dados espalhados em informação única, confiável e acionável. Resolve divergências entre áreas, reduz horas de planilha e cria um 'painel de controle' da empresa.",
    symptoms: [
      "Decisão no escuro",
      "Números diferentes por área",
      "Consolidação manual lenta",
      "Briga por 'qual é o número certo'",
      "Previsões frágeis",
      "Incapacidade de mostrar ROI por canal",
    ],
    valueDrivers: [
      "Tempo de decisão menor",
      "Visão única de Vendas/Marketing/Receita/Financeiro",
      "Reconciliação com Financeiro",
      "Baseline para automação e IA",
      "Cultura de donos de métrica",
    ],
    prerequisites: [
      "Acesso de leitura (APIs) a CRM/ERP/Ads/Analytics",
      "Dono interno por painel",
      "Sponsor para desbloqueios",
      "2h/semana para rituais e validações",
    ],
    timeline: "2-12 semanas",
  },
  {
    id: "ia",
    name: "Agentes de IA",
    icon: Bot,
    description: "Inteligência Artificial Conversacional",
    fullDescription:
      "Agentes conversacionais de IA para SDR (inbound), BDR (outbound), CS (suporte/expansão) e Meeting Prep. Operam em WhatsApp, site, e-mail e voz; conversam por texto/áudio; registram tudo no CRM.",
    symptoms: [
      "Resposta lenta",
      "Follow-ups perdidos",
      "Vendedores sem preparo pré-reunião",
      "Alto custo por contato",
      "Agendamentos perdidos",
    ],
    valueDrivers: [
      "FRT ≤5 min",
      "Reply% maior",
      "Agendamentos/mês ↑",
      "Containment de suporte ↑",
      "TTR ≤24h",
      "Custo por contato ↓",
    ],
    prerequisites: [
      "Políticas de contato",
      "Domínios/números",
      "Scripts base",
      "Base legal LGPD",
      "Política de privacidade publicada",
    ],
    timeline: "2-12 semanas",
  },
]

export default function SolucoesPage() {
  const [selectedLevel, setSelectedLevel] = useState<keyof typeof serviceLevels>("profissional")
  const [activeTab, setActiveTab] = useState<string>("overview")

  const currentLevel = serviceLevels[selectedLevel]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[#E6E4E3]/20">
      {/* Header */}
      <header className="border-b border-[#E6E4E3]/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#413328]">
              Grupo Axend
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-[#413328] hover:text-[#EB6A00] transition-colors">
                Início
              </Link>
              <Link href="/solucoes" className="text-[#EB6A00] font-semibold">
                Soluções
              </Link>
              <Button asChild className="bg-[#EB6A00] hover:bg-[#995925]">
                <Link href="/#auditoria">Auditoria Gratuita</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#413328] to-[#6B4A2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#EB6A00]/20 text-[#EB6A00] border-[#EB6A00]/30">Soluções RevOps Premium</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Os 4 Pilares do
              <span className="text-[#EB6A00] block">RevOps Inteligente</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Transforme sua operação de receita com metodologias comprovadas e tecnologia de ponta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-4 text-lg">
                <Link href="/#auditoria" className="flex items-center gap-2">
                  Auditoria Gratuita <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Service Levels Selector */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#413328]">
              Escolha o Nível Ideal para sua Empresa
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(serviceLevels).map(([key, level]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedLevel === key ? "ring-2 ring-[#EB6A00] shadow-lg" : ""
                  }`}
                  onClick={() => setSelectedLevel(key as keyof typeof serviceLevels)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[#413328]">{level.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-[#6B4A2E]/80 mb-4">{level.description}</p>
                    <div className="text-center mb-4">
                      <div className="flex items-center gap-1 text-sm text-[#6B4A2E]/60 justify-center">
                        <Clock className="h-4 w-4" />
                        {level.timeline}
                      </div>
                    </div>
                    <div className="text-center">
                      
                      
                      
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Detail */}
      <section className="py-16 bg-gradient-to-br from-[#E6E4E3]/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#413328]">
              Detalhes do Nível {currentLevel.name}
            </h2>

            <div className="grid gap-8">
              {pillars.map((pillar) => {
                const service = currentLevel.services[pillar.id as keyof typeof currentLevel.services]
                const Icon = pillar.icon

                return (
                  <Card
                    key={pillar.id}
                    className="group hover:shadow-xl transition-all duration-300 ring-2 ring-[#EB6A00]"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#EB6A00]/10 rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-[#EB6A00]" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-[#413328] text-xl">{pillar.name}</CardTitle>
                          <p className="text-[#6B4A2E]/80">{pillar.description}</p>
                          <p className="text-sm text-[#6B4A2E]/60 mt-2">{pillar.fullDescription}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#EB6A00]">R$ {service.price.toLocaleString()}</div>
                          <div className="flex items-center gap-1 text-sm text-[#6B4A2E]/60">
                            <Clock className="h-4 w-4" />
                            {pillar.timeline}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="border-t border-[#E6E4E3]/50 pt-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-5 bg-[#E6E4E3]/30">
                            <TabsTrigger
                              value="overview"
                              className="data-[state=active]:bg-[#EB6A00] data-[state=active]:text-white"
                            >
                              Visão Geral
                            </TabsTrigger>
                            <TabsTrigger
                              value="scope"
                              className="data-[state=active]:bg-[#EB6A00] data-[state=active]:text-white"
                            >
                              Escopo
                            </TabsTrigger>
                            <TabsTrigger
                              value="deliverables"
                              className="data-[state=active]:bg-[#EB6A00] data-[state=active]:text-white"
                            >
                              Entregáveis
                            </TabsTrigger>
                            <TabsTrigger
                              value="kpis"
                              className="data-[state=active]:bg-[#EB6A00] data-[state=active]:text-white"
                            >
                              KPIs
                            </TabsTrigger>
                            <TabsTrigger
                              value="requirements"
                              className="data-[state=active]:bg-[#EB6A00] data-[state=active]:text-white"
                            >
                              Requisitos
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="mt-6 animate-in fade-in-50 duration-200">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-[#413328] mb-3 flex items-center gap-2">
                                  <Target className="h-5 w-5 text-[#EB6A00]" />
                                  Objetivo
                                </h4>
                                <p className="text-[#6B4A2E] mb-4">{service.objective}</p>

                                {pillar.symptoms && (
                                  <>
                                    <h4 className="font-semibold text-[#413328] mb-3 flex items-center gap-2">
                                      <AlertTriangle className="h-5 w-5 text-red-500" />
                                      Sintomas Típicos
                                    </h4>
                                    <ul className="space-y-1 mb-4">
                                      {pillar.symptoms.map((symptom, index) => (
                                        <li key={index} className="text-sm text-[#6B4A2E] flex items-center gap-2">
                                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                          {symptom}
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </div>

                              <div>
                                {pillar.valueDrivers && (
                                  <>
                                    <h4 className="font-semibold text-[#413328] mb-3 flex items-center gap-2">
                                      <TrendingUp className="h-5 w-5 text-green-600" />
                                      Drivers de Valor
                                    </h4>
                                    <ul className="space-y-1 mb-4">
                                      {pillar.valueDrivers.map((driver, index) => (
                                        <li key={index} className="text-sm text-[#6B4A2E] flex items-center gap-2">
                                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                          {driver}
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}

                                {pillar.prerequisites && (
                                  <>
                                    <h4 className="font-semibold text-[#413328] mb-3 flex items-center gap-2">
                                      <Shield className="h-5 w-5 text-blue-600" />
                                      Pré-requisitos
                                    </h4>
                                    <ul className="space-y-1">
                                      {pillar.prerequisites.map((req, index) => (
                                        <li key={index} className="text-sm text-[#6B4A2E] flex items-center gap-2">
                                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                          {req}
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="scope" className="mt-6 animate-in fade-in-50 duration-200">
                            <h4 className="font-semibold text-[#413328] mb-3">Escopo do Trabalho</h4>
                            <ul className="space-y-2">
                              {service.scope.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-[#6B4A2E]">
                                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </TabsContent>

                          <TabsContent value="deliverables" className="mt-6 animate-in fade-in-50 duration-200">
                            <h4 className="font-semibold text-[#413328] mb-3">Entregáveis</h4>
                            <ul className="space-y-2">
                              {service.deliverables.map((deliverable, index) => (
                                <li key={index} className="flex items-start gap-2 text-[#6B4A2E]">
                                  <div className="w-2 h-2 bg-[#EB6A00] rounded-full mt-2 flex-shrink-0"></div>
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </TabsContent>

                          <TabsContent value="kpis" className="mt-6 animate-in fade-in-50 duration-200">
                            <h4 className="font-semibold text-[#413328] mb-3">KPIs de Sucesso</h4>
                            <ul className="space-y-2">
                              {service.kpis.map((kpi, index) => (
                                <li key={index} className="flex items-start gap-2 text-[#6B4A2E]">
                                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  {kpi}
                                </li>
                              ))}
                            </ul>
                          </TabsContent>

                          <TabsContent value="requirements" className="mt-6 animate-in fade-in-50 duration-200">
                            {pillar.prerequisites && (
                              <>
                                <h4 className="font-semibold text-[#413328] mb-3">Requisitos do Cliente</h4>
                                <ul className="space-y-2">
                                  {pillar.prerequisites.map((req, index) => (
                                    <li key={index} className="flex items-start gap-2 text-[#6B4A2E]">
                                      <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </TabsContent>
                        </Tabs>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Package Summary */}
            <Card className="mt-12 bg-gradient-to-r from-[#413328] to-[#6B4A2E] text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Pacote Completo - Nível {currentLevel.name}</h3>
                  <p className="text-white/80 mb-6">Todos os 4 pilares integrados com desconto especial</p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
                    <div>
                      <div className="text-sm text-white/60">Preço Individual</div>
                      <div className="text-2xl line-through text-white/60">
                        R$ {currentLevel.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-[#EB6A00] rotate-90 sm:rotate-0" />
                    <div>
                      <div className="text-sm text-[#EB6A00]">Pacote Completo</div>
                      <div className="text-4xl font-bold text-white">
                        R$ {currentLevel.packagePrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Badge className="mb-6 bg-green-600 text-white text-lg px-4 py-2">
                    Economia de R$ {(currentLevel.originalPrice - currentLevel.packagePrice).toLocaleString()}
                  </Badge>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-[#EB6A00] hover:bg-[#995925] px-8 py-4">
                      <Link href="/#auditoria" className="flex items-center gap-2">
                        Solicitar Pacote Completo <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 bg-transparent"
                    >
                      Falar com Especialista
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#EB6A00] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar sua Operação de Receita?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Agende uma auditoria gratuita e descubra como nossos 4 pilares podem revolucionar seus resultados
          </p>
          <Button size="lg" className="bg-white text-[#EB6A00] hover:bg-white/90 px-8 py-4 text-lg font-semibold">
            <Link href="/#auditoria" className="flex items-center gap-2">
              Começar Agora <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
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
                  <Link href="/#auditoria" className="hover:text-[#EB6A00] transition-colors">
                    Auditoria Gratuita
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-[#EB6A00] transition-colors">
                    Página Inicial
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2025 Grupo Axend. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  AlertTriangle,
  Clock,
  Zap,
  CheckCircle,
  XCircle,
  ArrowRight,
  Eye,
  Brain,
  Lightbulb,
  Target,
  BarChart3,
  Bot,
  Settings,
  DollarSign,
  Skull,
} from "lucide-react"
import Link from "next/link"

const transformationSteps = [
  {
    icon: Eye,
    step: 1,
    title: "Análise Inicial",
    description: "Identificação dos pontos fracos na operação atual",
    duration: "10 dias",
  },
  {
    icon: Brain,
    step: 2,
    title: "Planejamento Estratégico",
    description: "Desenvolvimento de um plano de ação personalizado",
    duration: "15 dias",
  },
  {
    icon: Lightbulb,
    step: 3,
    title: "Implementação",
    description: "Integração e configuração dos novos sistemas",
    duration: "30 dias",
  },
  {
    icon: Zap,
    step: 4,
    title: "Otimização Contínua",
    description: "Ajustes e melhorias baseados em dados em tempo real",
    duration: "20 dias",
  },
]

export default function InfographicPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setScrollProgress(scrolled)

      const sections = document.querySelectorAll("[data-section]")
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const challengingStats = [
    {
      icon: Skull,
      stat: "87%",
      description: "das empresas brasileiras operam com processos de vendas quebrados",
      impact: "R$ 4.7M perdidos anualmente em uma empresa de R$ 15M",
      color: "text-red-500",
      shock: "Sua empresa provavelmente está nesta estatística",
    },
    {
      icon: TrendingDown,
      stat: "92%",
      description: "dos leads qualificados nunca viram receita por falta de follow-up",
      impact: "Você está literalmente jogando dinheiro no lixo",
      color: "text-red-600",
      shock: "Cada lead perdido = R$ 15.000 em média",
    },
    {
      icon: AlertTriangle,
      stat: "73%",
      description: "dos gestores não sabem qual canal traz mais receita",
      impact: "Investindo cego enquanto concorrentes dominam",
      color: "text-orange-500",
      shock: "Você está apostando no escuro",
    },
  ]

  const axendServices = [
    {
      icon: Settings,
      title: "Processos & Rituais RevOps",
      problem: "Sua operação é um caos organizado",
      solution: "Transformamos bagunça em máquina de receita",
      details: [
        "Mapeamento completo dos vazamentos de receita",
        "Implementação de rituais que garantem 0% de leads perdidos",
        "Criação de playbooks que seus vendedores realmente seguem",
        "KPIs que mostram exatamente onde está o problema",
      ],
      impact: "Empresas aumentam 47% na conversão em 90 dias",
      price: "A partir de R$ 2.500/mês",
      urgency: "Cada dia sem isso = R$ 8.000 perdidos",
    },
    {
      icon: Target,
      title: "CRM que Realmente Funciona",
      problem: "Seu CRM atual é um cemitério de dados",
      solution: "CRM que vende sozinho enquanto você dorme",
      details: [
        "Migração sem perder um único lead histórico",
        "Automações que fazem follow-up melhor que humanos",
        "Pipeline que mostra exatamente quando vai fechar",
        "Integração com WhatsApp, email e telefone",
      ],
      impact: "Redução de 68% no tempo de vendas",
      price: "A partir de R$ 1.500/mês",
      urgency: "Concorrentes já usam CRM inteligente",
    },
    {
      icon: BarChart3,
      title: "BI que Prevê o Futuro",
      problem: "Você toma decisões baseado em achismo",
      solution: "Dashboards que mostram o futuro da sua receita",
      details: [
        "Previsão de receita com 94% de precisão",
        "Alertas automáticos quando algo vai dar errado",
        "ROI real de cada canal e campanha",
        "Relatórios que seus investidores vão amar",
      ],
      impact: "Aumento de 156% na precisão do forecast",
      price: "A partir de R$ 3.000/mês",
      urgency: "Decisões erradas custam milhões",
    },
    {
      icon: Bot,
      title: "Agentes de IA que Vendem 24/7",
      problem: "Seus vendedores dormem, a concorrência não",
      solution: "IA que qualifica, nutre e fecha vendas sozinha",
      details: [
        "Chatbot que converte 3x mais que formulários",
        "IA que identifica leads prontos para comprar",
        "Automação de follow-up que nunca falha",
        "Agente que agenda reuniões automaticamente",
      ],
      impact: "Aumento de 234% em leads qualificados",
      price: "A partir de R$ 4.000/mês",
      urgency: "IA já está roubando seus clientes",
    },
  ]

  const oldVsNew = [
    {
      category: "Gestão de Pipeline",
      old: "Planilhas que mentem e dados que desaparecem",
      new: "CRM com IA que prevê fechamentos com 94% de precisão",
      oldIcon: XCircle,
      newIcon: CheckCircle,
      shock: "Empresas com CRM inteligente vendem 67% mais",
    },
    {
      category: "Qualificação de Leads",
      old: "Vendedor desperdiça tempo com tire-kicker",
      new: "IA identifica quem vai comprar antes mesmo dele saber",
      oldIcon: XCircle,
      newIcon: CheckCircle,
      shock: "IA qualifica 10x mais rápido que humanos",
    },
    {
      category: "Follow-up de Vendas",
      old: "80% dos leads morrem por falta de follow-up",
      new: "Automação que persegue lead até ele comprar ou morrer",
      oldIcon: XCircle,
      newIcon: CheckCircle,
      shock: "Follow-up automatizado converte 340% mais",
    },
    {
      category: "Análise de Performance",
      old: "Relatórios mensais que chegam quando já é tarde",
      new: "Alertas em tempo real quando algo vai dar errado",
      oldIcon: XCircle,
      newIcon: CheckCircle,
      shock: "Empresas com BI reativo crescem 89% mais rápido",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#413328] via-[#6B4A2E] to-[#995925] text-white overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#EB6A00] to-[#995925] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-4 left-4 right-4 z-40 bg-black/20 backdrop-blur-md rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#EB6A00]">
            Grupo Axend
          </Link>
          <Badge variant="outline" className="border-[#EB6A00] text-[#EB6A00]">
            Metodologia Challenger
          </Badge>
        </div>
      </header>

      {/* Hero Section - More Aggressive */}
      <section data-section="0" className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10"></div>

        <div
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="mb-8">
            <Badge className="bg-red-600 text-white mb-4 text-lg px-4 py-2 animate-pulse">⚠️ ALERTA CRÍTICO</Badge>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Sua Empresa Está
            <span className="block text-red-400 animate-pulse">MORRENDO</span>
            <span className="block text-[#EB6A00] bg-gradient-to-r from-[#EB6A00] to-[#995925] bg-clip-text text-transparent">
              E Você Nem Sabe
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-[#E6E4E3] max-w-3xl mx-auto leading-relaxed">
            Enquanto você lê isso, <strong className="text-red-400">R$ 13.000 em oportunidades</strong> estão escorrendo
            pelos dedos. Seus concorrentes descobriram como parar essa sangria.
            <strong className="text-[#EB6A00]"> Você ainda não.</strong>
          </p>

          <div className="bg-red-600/20 border border-red-600/50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <Skull className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-200 font-semibold">
              87% das empresas brasileiras operam com processos quebrados.
              <span className="text-red-100"> A sua provavelmente também.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-4 text-lg"
              onClick={() => document.getElementById("diagnosis")?.scrollIntoView({ behavior: "smooth" })}
            >
              Descobrir Onde Estou Perdendo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* More Shocking Statistics */}
      <section id="diagnosis" data-section="1" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              A Verdade Que Ninguém
              <span className="text-red-400"> Quer Te Contar</span>
            </h2>
            <p className="text-xl text-[#E6E4E3] max-w-3xl mx-auto">
              Dados brutais de empresas que descobriram tarde demais onde estava o problema
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {challengingStats.map((stat, index) => (
              <Card
                key={index}
                className="bg-black/50 backdrop-blur-sm border-red-600/30 hover:bg-red-600/10 transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <stat.icon
                      className={`h-16 w-16 mx-auto ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <div className={`text-5xl font-bold mb-4 ${stat.color}`}>{stat.stat}</div>
                  <p className="text-lg mb-4 text-white">{stat.description}</p>
                  <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 mb-4">
                    <p className="text-red-300 font-semibold">{stat.impact}</p>
                  </div>
                  <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
                    <p className="text-yellow-200 text-sm font-bold">{stat.shock}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-xl p-8 max-w-4xl mx-auto">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-red-300">
                ALERTA: Enquanto você hesita, seus concorrentes agem
              </h3>
              <p className="text-lg text-red-200">
                Empresas que implementaram RevOps nos últimos 12 meses tiveram crescimento médio de
                <strong className="text-red-100"> 34% na receita</strong>. Suas estão estagnadas ou perdendo mercado?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section data-section="2" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Os 4 Pilares Que Vão
              <span className="text-[#EB6A00]"> Salvar Sua Empresa</span>
            </h2>
            <p className="text-xl text-[#E6E4E3] max-w-3xl mx-auto">
              Enquanto você hesita, empresas inteligentes já implementaram estes sistemas
            </p>
          </div>

          <div className="space-y-12">
            {axendServices.map((service, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-[#EB6A00]/20 rounded-full flex items-center justify-center">
                          <service.icon className="h-8 w-8 text-[#EB6A00]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                          <Badge className="bg-red-600 text-white mt-2">{service.price}</Badge>
                        </div>
                      </div>

                      <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-red-300 mb-2">SEU PROBLEMA:</h4>
                        <p className="text-red-200">{service.problem}</p>
                      </div>

                      <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-green-300 mb-2">NOSSA SOLUÇÃO:</h4>
                        <p className="text-green-200">{service.solution}</p>
                      </div>

                      <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 inline mr-2" />
                        <span className="text-yellow-200 font-semibold">{service.urgency}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#EB6A00] mb-4 text-lg">O QUE VOCÊ RECEBE:</h4>
                      <ul className="space-y-3 mb-6">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-[#E6E4E3]">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="bg-[#EB6A00]/20 border border-[#EB6A00]/30 rounded-lg p-4">
                        <DollarSign className="h-5 w-5 text-[#EB6A00] inline mr-2" />
                        <span className="text-[#EB6A00] font-bold">{service.impact}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#EB6A00]/20 to-[#995925]/20 border border-[#EB6A00]/30 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-[#EB6A00]">PACOTE COMPLETO: Todos os 4 Pilares</h3>
              <p className="text-lg mb-4 text-white">
                De <span className="line-through text-red-400">R$ 11.000/mês</span> por apenas
                <span className="text-[#EB6A00] font-bold text-2xl"> R$ 8.500/mês</span>
              </p>
              <p className="text-[#E6E4E3] mb-6">
                Economia de R$ 30.000 no primeiro ano + ROI médio de 340% em 12 meses
              </p>
              <Badge className="bg-red-600 text-white animate-pulse">
                ⚠️ Apenas 3 vagas por mês - Lista de espera ativa
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Old vs New */}
      <section data-section="3" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pare de Operar Como
              <span className="text-red-400"> Empresa de 1990</span>
            </h2>
            <p className="text-xl text-[#E6E4E3] max-w-3xl mx-auto">
              Enquanto você usa métodos da idade da pedra, empresas inteligentes dominam com tecnologia
            </p>
          </div>

          <div className="space-y-8">
            {oldVsNew.map((comparison, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-6 items-center">
                <Card className="bg-red-600/20 border-red-600/30 hover:bg-red-600/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <comparison.oldIcon className="h-8 w-8 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-red-300">{comparison.category}</h3>
                        <p className="text-red-200 text-sm">{comparison.old}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <ArrowRight className="h-8 w-8 text-[#EB6A00] mx-auto" />
                  <p className="text-[#EB6A00] font-bold text-sm mt-2">{comparison.shock}</p>
                </div>

                <Card className="bg-green-600/20 border-green-600/30 hover:bg-green-600/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <comparison.newIcon className="h-8 w-8 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-green-300">Método Axend</h3>
                        <p className="text-green-200 text-sm">{comparison.new}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Process */}
      <section data-section="4" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Como Transformamos Sua Operação em
              <span className="text-[#EB6A00]"> 90 Dias</span>
            </h2>
            <p className="text-xl text-[#E6E4E3] max-w-3xl mx-auto">
              Metodologia comprovada que já salvou milhões em receita perdida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationSteps.map((step, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EB6A00] to-[#995925]" />
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#EB6A00]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-[#EB6A00]" />
                    </div>
                    <Badge variant="outline" className="border-[#EB6A00] text-[#EB6A00]">
                      Etapa {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-[#E6E4E3] mb-4">{step.description}</p>
                  <div className="bg-[#EB6A00]/20 rounded-lg px-3 py-1">
                    <span className="text-[#EB6A00] font-semibold text-sm">{step.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - More Aggressive */}
      <section data-section="5" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-red-600 text-white mb-4 text-lg px-4 py-2 animate-pulse">🚨 DECISÃO CRÍTICA</Badge>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Última Chance de Não Ser
            <span className="text-red-400"> Engolido pela Concorrência</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-red-600/20 border-red-600/30 p-8">
              <Skull className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-red-300">Continue Morrendo Devagar</h3>
              <ul className="text-left space-y-2 text-red-200">
                <li>• Perder R$ 4.7M por ano em oportunidades</li>
                <li>• Ver concorrentes roubarem seus clientes</li>
                <li>• Operar com processos de 1990</li>
                <li>• Ser irrelevante em 2 anos</li>
              </ul>
              <div className="mt-4 p-3 bg-red-700/30 rounded-lg">
                <p className="text-red-100 font-bold text-sm">Resultado: Falência ou venda forçada</p>
              </div>
            </Card>

            <Card className="bg-green-600/20 border-green-600/30 p-8">
              <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-green-300">Dominar Seu Mercado</h3>
              <ul className="text-left space-y-2 text-green-200">
                <li>• Aumentar receita em 340% nos próximos 12 meses</li>
                <li>• Roubar clientes da concorrência</li>
                <li>• Operar com IA e automação</li>
                <li>• Ser líder de mercado em 2 anos</li>
              </ul>
              <div className="mt-4 p-3 bg-green-700/30 rounded-lg">
                <p className="text-green-100 font-bold text-sm">Resultado: IPO ou venda milionária</p>
              </div>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-[#EB6A00]/20 to-[#995925]/20 border border-[#EB6A00]/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-[#EB6A00]">
              Diagnóstico Gratuito - Apenas Para CEOs Corajosos
            </h3>
            <p className="text-lg mb-6 text-[#E6E4E3]">
              Vamos mostrar exatamente onde sua empresa está sangrando dinheiro e como recuperar
              <strong className="text-[#EB6A00]"> até R$ 4.7 milhões</strong> nos próximos 12 meses.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-red-600/20 p-3 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-400 mx-auto mb-1" />
                <p className="text-red-200">Limitado a 3 empresas/mês</p>
              </div>
              <div className="bg-yellow-600/20 p-3 rounded-lg">
                <DollarSign className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
                <p className="text-yellow-200">Faturamento mín. R$ 500k/mês</p>
              </div>
              <div className="bg-green-600/20 p-3 rounded-lg">
                <Clock className="h-4 w-4 text-green-400 mx-auto mb-1" />
                <p className="text-green-200">Resultados em 48h</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#audit-form">
              <Button
                size="lg"
                className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-4 text-lg w-full sm:w-auto"
              >
                Quero Meu Diagnóstico Gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg w-full sm:w-auto bg-transparent"
              >
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#E6E4E3]/60">© 2024 Grupo Axend. Metodologia Challenger Sales aplicada ao RevOps.</p>
        </div>
      </footer>
    </div>
  )
}

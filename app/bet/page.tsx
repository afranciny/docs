"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  Target,
  Brain,
  BarChart3,
  Users,
  AlertTriangle,
  Dice1,
  Calculator,
  Building2,
  Crown,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function BetLandingPage() {
  const [currentSlot, setCurrentSlot] = useState(0)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "Parar de apostar e começar a construir sistemas",
  })

  const slotSymbols = ["🐅", "💰", "📉", "❌", "🎰"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlot((prev) => (prev + 1) % slotSymbols.length)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        window.location.href = "/obrigado"
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a0a] via-background to-[#0a1a0a] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-[#EB6A00] rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-ping opacity-25"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-[#EB6A00]/30 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Building2 className="h-8 w-8 text-[#EB6A00] drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EB6A00] rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-[#413328] tracking-tight">Grupo Axend</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-[#413328] hover:text-[#EB6A00] transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EB6A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/solucoes"
              className="text-[#413328] hover:text-[#EB6A00] transition-all duration-300 font-medium relative group"
            >
              Soluções
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EB6A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/auth/login"
              className="text-[#413328] hover:text-[#EB6A00] transition-all duration-300 font-medium relative group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EB6A00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-green-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EB6A00]/5 to-transparent"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500/30 to-red-700/30 p-8 rounded-full border-4 border-red-500 animate-pulse shadow-2xl backdrop-blur-sm">
                <div className="bg-gradient-to-br from-red-400/20 to-red-600/20 p-4 rounded-full border-2 border-red-400">
                  <div className="text-7xl filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    {slotSymbols[currentSlot]}
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white leading-tight tracking-tight">
            Pare de Apostar no{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-pulse">
              Tigrinho
            </span>
            <br />
            Comece a Construir{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
              Sistemas
            </span>
          </h1>

          <p className="text-xl md:text-3xl mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
            Empresário, você gasta <span className="text-red-400 font-bold">R$ 50 no tigrinho</span> esperando
            multiplicar por <span className="text-red-400 font-bold">1000x</span>, mas não investe{" "}
            <span className="text-green-400 font-bold">R$ 4.000</span> em um sistema que pode multiplicar sua receita
            por <span className="text-green-400 font-bold">10x</span>?
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="bg-gradient-to-br from-red-900/60 to-red-800/40 border-2 border-red-500/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 shadow-2xl group">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-red-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Dice1 className="h-10 w-10 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Apostando na Sorte</h3>
                  <p className="text-red-200 text-lg">R$ 50 no tigrinho = 99% chance de perder tudo</p>
                  <div className="mt-4 text-red-300 text-sm">Resultado: Prejuízo garantido</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/60 to-green-800/40 border-2 border-green-500/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 shadow-2xl group">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-green-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Calculator className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Construindo Sistema</h3>
                  <p className="text-green-200 text-lg">R$ 4.000 em RevOps = 90% chance de 10x ROI</p>
                  <div className="mt-4 text-green-300 text-sm">Resultado: Crescimento previsível</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative inline-block">
            <Button
              onClick={() => setShowLeadForm(true)}
              className="bg-gradient-to-r from-[#EB6A00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#EB6A00] text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-[#EB6A00]/50"
            >
              <Zap className="mr-3 h-6 w-6" />
              Parar de Apostar, Começar a Construir
            </Button>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#EB6A00]/30 to-[#FF7A00]/30 rounded-full blur-lg opacity-75 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gradient-to-r from-background/95 to-[#E6E4E3]/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#413328] tracking-tight">
            A Matemática Não Mente
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-10 rounded-2xl border-2 border-red-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 filter drop-shadow-lg">🐅</div>
                <h3 className="text-3xl font-bold text-red-700 mb-2">Apostando no Tigrinho</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600 font-medium">Investimento mensal:</span>
                  <span className="font-bold text-red-700 text-lg">R$ 1.500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600 font-medium">Chance de ganhar:</span>
                  <span className="font-bold text-red-700 text-lg">1%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600 font-medium">Retorno esperado:</span>
                  <span className="font-bold text-red-700 text-lg">-R$ 18.000/ano</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600 font-medium">Previsibilidade:</span>
                  <span className="font-bold text-red-700 text-lg">Zero</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600 font-medium">Controle:</span>
                  <span className="font-bold text-red-700 text-lg">Nenhum</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-xl border border-red-300">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-700 mr-2" />
                  <span className="font-bold text-red-800">Resultado:</span>
                </div>
                <p className="text-red-800 font-medium">Você perde dinheiro e tempo, sem construir nada duradouro.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-10 rounded-2xl border-2 border-green-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 filter drop-shadow-lg">📈</div>
                <h3 className="text-3xl font-bold text-green-700 mb-2">Investindo em RevOps</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-green-600 font-medium">Investimento inicial:</span>
                  <span className="font-bold text-green-700 text-lg">R$ 4.000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-green-600 font-medium">Chance de sucesso:</span>
                  <span className="font-bold text-green-700 text-lg">90%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-green-600 font-medium">ROI médio:</span>
                  <span className="font-bold text-green-700 text-lg">1000%/ano</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-green-600 font-medium">Previsibilidade:</span>
                  <span className="font-bold text-green-700 text-lg">Alta</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-green-600 font-medium">Controle:</span>
                  <span className="font-bold text-green-700 text-lg">Total</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-xl border border-green-300">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-700 mr-2" />
                  <span className="font-bold text-green-800">Resultado:</span>
                </div>
                <p className="text-green-800 font-medium">
                  Você constrói um sistema que gera receita previsível por anos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-br from-red-900/10 via-orange-900/10 to-yellow-900/10 relative">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#413328] tracking-tight">
            Por Que Você Aposta na Sorte Nos Negócios?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 group border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#413328]">Vendas Imprevisíveis</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Todo mês você "torce" para bater a meta, sem saber de onde virão os clientes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 group border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <TrendingDown className="h-10 w-10 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#413328]">Decisões no "Achismo"</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Você investe em marketing sem saber o que funciona, como no tigrinho.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 group border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Dice1 className="h-10 w-10 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#413328]">Crescimento Aleatório</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Seu faturamento sobe e desce sem padrão, dependendo da "sorte".
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-gray-200">
              <p className="text-2xl text-[#413328] font-bold leading-relaxed">
                <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full">73% das empresas B2B</span> ainda
                operam no "achismo" porque não têm sistemas de Revenue Operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-background to-[#E6E4E3]/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#413328] tracking-tight">
            Os 4 Pilares do Sistema Previsível
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
            <Card className="bg-gradient-to-br from-[#EB6A00]/10 via-white/90 to-[#995925]/10 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-4 border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB6A00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-[#EB6A00]/20 to-[#EB6A00]/30 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Users className="h-10 w-10 text-[#EB6A00]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#413328]">Processos & Rituais</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Transforme o caos em sistema com processos documentados e rituais de alta performance.
                  </p>
                  <Badge className="bg-gradient-to-r from-[#EB6A00] to-[#FF7A00] text-white px-4 py-2 text-sm font-semibold shadow-lg">
                    A partir de R$ 4.000
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#995925]/10 via-white/90 to-[#6B4A2E]/10 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-4 border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#995925]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-[#995925]/20 to-[#995925]/30 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Target className="h-10 w-10 text-[#995925]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#413328]">CRM Inteligente</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Pare de perder leads e oportunidades. Tenha controle total do seu funil de vendas.
                  </p>
                  <Badge className="bg-gradient-to-r from-[#995925] to-[#B8662A] text-white px-4 py-2 text-sm font-semibold shadow-lg">
                    A partir de R$ 4.000
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#6B4A2E]/10 via-white/90 to-[#413328]/10 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-4 border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6B4A2E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-[#6B4A2E]/20 to-[#6B4A2E]/30 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <BarChart3 className="h-10 w-10 text-[#6B4A2E]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#413328]">BI & Analytics</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Decisões baseadas em dados reais, não em "achismo" ou intuição.
                  </p>
                  <Badge className="bg-gradient-to-r from-[#6B4A2E] to-[#8B5A3E] text-white px-4 py-2 text-sm font-semibold shadow-lg">
                    A partir de R$ 4.000
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#413328]/10 via-white/90 to-[#EB6A00]/10 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-4 border-0 shadow-xl">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#413328]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-[#413328]/20 to-[#413328]/30 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Brain className="h-10 w-10 text-[#413328]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#413328]">Agentes de IA</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Automatize vendas, atendimento e operações com inteligência artificial.
                  </p>
                  <Badge className="bg-gradient-to-r from-[#413328] to-[#5A4438] text-white px-4 py-2 text-sm font-semibold shadow-lg">
                    A partir de R$ 4.000
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#413328] tracking-tight">
            Enquanto Você Aposta, Seus Concorrentes Constroem
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-red-200">
              <div className="text-5xl font-black text-red-600 mb-4">67%</div>
              <p className="text-gray-700 font-medium text-lg leading-relaxed">
                das empresas que não implementam RevOps ficam estagnadas
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-200">
              <div className="text-5xl font-black text-green-600 mb-4">3.2x</div>
              <p className="text-gray-700 font-medium text-lg leading-relaxed">
                mais crescimento para empresas com RevOps implementado
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-[#EB6A00]/30">
              <div className="text-5xl font-black text-[#EB6A00] mb-4">90</div>
              <p className="text-gray-700 font-medium text-lg leading-relaxed">
                dias para ver os primeiros resultados do sistema
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EB6A00] to-[#FF7A00] mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl max-w-5xl mx-auto mb-12 border border-gray-200">
            <p className="text-2xl mb-8 text-[#413328] max-w-4xl mx-auto leading-relaxed">
              Cada dia que você adia a construção do seu sistema é um dia que seus concorrentes ganham vantagem
              competitiva. <strong className="text-[#EB6A00]">O tempo de apostar já passou.</strong>
            </p>
          </div>

          <div className="relative inline-block">
            <Button
              onClick={() => setShowLeadForm(true)}
              className="bg-gradient-to-r from-[#EB6A00] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#EB6A00] text-white px-16 py-8 text-2xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-[#EB6A00]/50"
            >
              <Shield className="mr-4 h-8 w-8" />
              Quero Parar de Apostar e Começar a Construir
            </Button>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#EB6A00]/30 to-[#FF7A00]/30 rounded-full blur-2xl opacity-75 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-[#413328]">Pare de Apostar, Comece a Construir</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Seu telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Nome da empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />

              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-[#EB6A00] hover:bg-[#EB6A00]/90 text-white">
                  Construir Meu Sistema
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowLeadForm(false)}>
                  Fechar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#413328] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-6 w-6 text-[#EB6A00]" />
                <span className="text-xl font-bold">Grupo Axend</span>
              </div>
              <p className="text-gray-300">Transformando empresas em máquinas de crescimento previsível.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#EB6A00]">Soluções</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Processos & Rituais</li>
                <li>CRM Inteligente</li>
                <li>BI & Analytics</li>
                <li>Agentes de IA</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#EB6A00]">Empresa</h4>
              <ul className="space-y-2 text-gray-300">
                <li>CNPJ: 54.404.955/0001-20</li>
                <li>contato@grupoaxend.tech</li>
                <li>(11) 99999-9999</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#EB6A00]">Pare de Apostar</h4>
              <p className="text-gray-300 mb-4">Comece a construir sistemas previsíveis hoje mesmo.</p>
              <Button onClick={() => setShowLeadForm(true)} className="bg-[#EB6A00] hover:bg-[#EB6A00]/90">
                Construir Sistema
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Grupo Axend. Todos os direitos reservados.</p>
            <p className="mt-2">Pare de apostar na sorte. Construa sistemas previsíveis.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

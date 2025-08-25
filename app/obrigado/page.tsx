"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Star,
  Trophy,
  Rocket,
  Sparkles,
  Award,
  Crown,
} from "lucide-react"
import Link from "next/link"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
}

export default function ThankYouPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    setShowConfetti(true)

    const initialParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: ["#EB6A00", "#995925", "#E6E4E3", "#6B4A2E"][Math.floor(Math.random() * 4)],
        size: Math.random() * 6 + 2,
        life: 1,
      })
    }
    setParticles(initialParticles)

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1,
            life: particle.life - 0.01,
          }))
          .filter((particle) => particle.life > 0 && particle.y < window.innerHeight + 50),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    if (showConfetti) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [showConfetti])

  const handleInteraction = (type: string) => {
    setClickCount((prev) => prev + 1)

    const newAchievements = [...achievements]

    if (clickCount === 5 && !achievements.includes("explorer")) {
      newAchievements.push("explorer")
    }
    if (clickCount === 10 && !achievements.includes("enthusiast")) {
      newAchievements.push("enthusiast")
    }

    setAchievements(newAchievements)

    const newParticles: Particle[] = []
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: mousePosition.x,
        y: mousePosition.y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: "#EB6A00",
        size: Math.random() * 4 + 2,
        life: 1,
      })
    }
    setParticles((prev) => [...prev, ...newParticles])
  }

  const journeySteps = [
    { icon: Target, title: "Diagnóstico Completo", desc: "Identificamos oportunidades ocultas", color: "#EB6A00" },
    { icon: Zap, title: "Estratégia Personalizada", desc: "Criamos seu plano de transformação", color: "#995925" },
    { icon: TrendingUp, title: "Implementação Guiada", desc: "Executamos com você, passo a passo", color: "#6B4A2E" },
    { icon: Trophy, title: "Resultados Exponenciais", desc: "Sua empresa alcança novo patamar", color: "#EB6A00" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#413328] via-[#6B4A2E] to-[#995925] relative overflow-hidden cursor-none">
      <div
        className="fixed w-6 h-6 bg-[#EB6A00] rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${1 + Math.sin(Date.now() * 0.01) * 0.2})`,
        }}
      />

      <div className="fixed inset-0 pointer-events-none z-40">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.life,
              transform: `rotate(${particle.x * 0.1}deg)`,
            }}
          />
        ))}
      </div>

      {achievements.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {achievements.includes("explorer") && (
            <div className="bg-[#EB6A00] text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce">
              🎯 Explorador Descoberto!
            </div>
          )}
          {achievements.includes("enthusiast") && (
            <div className="bg-[#995925] text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce">
              🚀 Entusiasta Desbloqueado!
            </div>
          )}
        </div>
      )}

      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-[#EB6A00]/20 rounded-full blur-3xl animate-pulse transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-[#E6E4E3]/10 rounded-full blur-3xl animate-pulse delay-1000 transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)` }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EB6A00]/5 rounded-full blur-3xl"></div>
      </div>

      <div
        className="absolute top-32 right-20 animate-bounce delay-500 transition-transform duration-300 hover:scale-150 cursor-pointer"
        onClick={() => handleInteraction("star")}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
        }}
      >
        <Star className="w-8 h-8 text-[#EB6A00] opacity-60 drop-shadow-lg" />
      </div>
      <div
        className="absolute bottom-40 left-20 animate-bounce delay-1000 transition-transform duration-300 hover:scale-150 cursor-pointer"
        onClick={() => handleInteraction("rocket")}
        style={{
          transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.02}deg) rotateY(${-mousePosition.x * 0.02}deg)`,
        }}
      >
        <Rocket className="w-10 h-10 text-[#E6E4E3] opacity-40 drop-shadow-lg" />
      </div>

      <div
        className="absolute top-1/4 left-1/4 animate-pulse cursor-pointer hover:animate-spin transition-all duration-300"
        onClick={() => handleInteraction("sparkle")}
      >
        <Sparkles className="w-6 h-6 text-[#EB6A00] opacity-50" />
      </div>
      <div
        className="absolute bottom-1/3 right-1/3 animate-pulse delay-700 cursor-pointer hover:animate-spin transition-all duration-300"
        onClick={() => handleInteraction("award")}
      >
        <Award className="w-8 h-8 text-[#995925] opacity-60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div
            className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-8 animate-pulse cursor-pointer hover:scale-110 transition-transform duration-300 shadow-2xl"
            onClick={() => handleInteraction("success")}
            style={{ boxShadow: `0 0 30px rgba(34, 197, 94, 0.5)` }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span
              className="bg-gradient-to-r from-[#EB6A00] to-[#E6E4E3] bg-clip-text text-transparent hover:from-[#E6E4E3] hover:to-[#EB6A00] transition-all duration-500 cursor-pointer"
              onClick={() => handleInteraction("title")}
            >
              Parabéns!
            </span>
            <br />
            Você Acabou de Dar o
            <br />
            <span
              className="text-[#EB6A00] hover:text-[#995925] transition-colors duration-300 cursor-pointer"
              onClick={() => handleInteraction("step")}
            >
              Primeiro Passo
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#E6E4E3] max-w-4xl mx-auto leading-relaxed">
            Sua decisão de solicitar uma auditoria é o marco inicial de uma
            <span className="text-[#EB6A00] font-semibold"> transformação extraordinária</span> nos resultados da sua
            empresa.
          </p>
        </div>

        <Card
          className={`max-w-4xl mx-auto mb-16 bg-white/10 backdrop-blur-lg border-[#EB6A00]/30 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <CardContent className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EB6A00]/20 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-[#EB6A00]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Este é Apenas o Início da Sua Jornada Rumo à
              <span className="text-[#EB6A00]"> Lucratividade Exponencial</span>
            </h2>

            <p className="text-lg text-[#E6E4E3] mb-8 leading-relaxed">
              Empresas que implementam RevOps estruturado experimentam crescimento médio de
              <span className="text-[#EB6A00] font-bold">36% na receita</span> e
              <span className="text-[#EB6A00] font-bold">28% na eficiência operacional</span>. Você está prestes a se
              juntar a esse grupo seleto de líderes visionários.
            </p>

            <div className="bg-gradient-to-r from-[#EB6A00]/20 to-[#995925]/20 rounded-lg p-6 border border-[#EB6A00]/30">
              <p className="text-[#E6E4E3] text-lg italic">
                "A diferença entre empresas que crescem 10% e as que crescem 100% não está no produto, mas na{" "}
                <span className="text-[#EB6A00] font-semibold">operação inteligente</span>."
              </p>
              <p className="text-[#EB6A00] font-semibold mt-2">- Metodologia Axend</p>
            </div>
          </CardContent>
        </Card>

        <div
          className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Sua Jornada de <span className="text-[#EB6A00]">Transformação</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === index

              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-500 cursor-pointer hover:scale-105 ${
                    isActive
                      ? "bg-[#EB6A00]/20 border-[#EB6A00] scale-105 shadow-2xl"
                      : "bg-white/5 border-[#E6E4E3]/20 hover:bg-white/10"
                  }`}
                  onClick={() => handleInteraction(`step-${index}`)}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg) ${isActive ? "scale(1.05)" : ""}`,
                    boxShadow: isActive ? `0 20px 40px ${step.color}40` : undefined,
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                        isActive ? "bg-[#EB6A00] scale-110 animate-pulse" : "bg-[#E6E4E3]/20 hover:scale-110"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${isActive ? "text-white" : "text-[#EB6A00]"} transition-all duration-300`}
                      />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-[#E6E4E3] text-sm">{step.desc}</p>

                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#EB6A00]/10 to-transparent animate-pulse"></div>
                    )}

                    <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-4 h-4 text-[#EB6A00] animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div
          className={`text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-[#EB6A00]/20 to-[#995925]/20 border-[#EB6A00]/50 hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-[#EB6A00] animate-bounce" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">Próximos Passos</h3>
                <Crown className="w-8 h-8 text-[#EB6A00] animate-bounce delay-200" />
              </div>

              <div className="space-y-4 mb-8">
                <div
                  className="flex items-center justify-center gap-3 text-[#E6E4E3] hover:text-[#EB6A00] transition-colors duration-300 cursor-pointer"
                  onClick={() => handleInteraction("step1")}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
                  <span>Nossa equipe analisará suas informações em até 24h</span>
                </div>
                <div
                  className="flex items-center justify-center gap-3 text-[#E6E4E3] hover:text-[#EB6A00] transition-colors duration-300 cursor-pointer"
                  onClick={() => handleInteraction("step2")}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 animate-pulse delay-200" />
                  <span>Você receberá um diagnóstico preliminar por email</span>
                </div>
                <div
                  className="flex items-center justify-center gap-3 text-[#E6E4E3] hover:text-[#EB6A00] transition-colors duration-300 cursor-pointer"
                  onClick={() => handleInteraction("step3")}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 animate-pulse delay-400" />
                  <span>Agendaremos sua consultoria estratégica gratuita</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button
                    className="bg-[#EB6A00] hover:bg-[#995925] text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                    onClick={() => handleInteraction("home-button")}
                  >
                    Voltar ao Início
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link href="/solucoes">
                  <Button
                    variant="outline"
                    className="border-[#EB6A00] text-[#EB6A00] hover:bg-[#EB6A00] hover:text-white px-8 py-3 text-lg bg-transparent hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                    onClick={() => handleInteraction("solutions-button")}
                  >
                    Conhecer Soluções
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-[#E6E4E3] text-lg">
            Bem-vindo à elite das empresas que escolheram a
            <span className="text-[#EB6A00] font-semibold"> excelência operacional</span>.
          </p>
          <p
            className="text-[#EB6A00] font-bold text-xl mt-2 hover:text-[#E6E4E3] transition-colors duration-300 cursor-pointer"
            onClick={() => handleInteraction("final")}
          >
            Sua transformação começa agora! 🚀
          </p>

          {clickCount > 0 && (
            <div className="mt-4 text-[#995925] text-sm animate-pulse">
              Interações: {clickCount} | Continue explorando para desbloquear conquistas! ✨
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

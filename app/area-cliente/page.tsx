import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, BookOpen, CreditCard, LogOut, Settings, Sparkles } from "lucide-react"

export default async function ClientAreaPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  const isSubscribed = userData?.subscription_status === "active"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[#E6E4E3]/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EB6A00] rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#413328]">Área do Cliente</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Olá, {userData?.name || user.email}</span>
            <form action="/auth/logout" method="post">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Axend.AI Card */}
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-8 w-8 text-[#EB6A00]" />
                  <div>
                    <CardTitle className="text-2xl">Axend.AI</CardTitle>
                    <CardDescription>Seu assistente especialista em RevOps</CardDescription>
                  </div>
                </div>
                {isSubscribed ? (
                  <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                ) : (
                  <Badge variant="secondary">Inativo</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isSubscribed ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Converse com nosso agente de IA especializado em CRM, BI, Processos e IA para otimizar sua operação.
                  </p>
                  <Button className="bg-[#EB6A00] hover:bg-[#995925]">
                    <Bot className="h-4 w-4 mr-2" />
                    Conversar com Axend.AI
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Assine por apenas R$ 49,90/mês e tenha acesso ao nosso agente de IA especialista em RevOps.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-[#EB6A00]">
                      R$ 49,90<span className="text-sm font-normal">/mês</span>
                    </div>
                    <Button className="bg-[#EB6A00] hover:bg-[#995925]">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Assinar Agora
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Assinatura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={isSubscribed ? "default" : "secondary"}>{isSubscribed ? "Ativa" : "Inativa"}</Badge>
                </div>
                {isSubscribed && userData?.subscription_end_date && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Próxima cobrança:</span>
                    <span className="text-sm">
                      {new Date(userData.subscription_end_date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Gerenciar Assinatura
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Training Section */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Treinamentos e Cursos
              </CardTitle>
              <CardDescription>Aprenda as melhores práticas de RevOps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#E6E4E3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-[#995925]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Em Construção</h3>
                <p className="text-muted-foreground mb-4">
                  Estamos preparando conteúdos exclusivos sobre RevOps, CRM, BI e IA para você.
                </p>
                <Badge variant="outline">Em breve</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

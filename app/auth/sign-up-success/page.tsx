import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-[#E6E4E3]/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#413328]">Conta Criada!</CardTitle>
          <CardDescription>Verifique seu email para confirmar</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Enviamos um link de confirmação para seu email. Clique no link para ativar sua conta e acessar o Axend.AI.
          </p>
          <Button asChild className="bg-[#EB6A00] hover:bg-[#995925]">
            <Link href="/auth/login">Voltar ao Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

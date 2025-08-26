"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default function AcessoProposta({ params }: Props) {
  const [accessToken, setAccessToken] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const proposalId = React.use(params).id

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate access credentials
      const response = await fetch(`/api/proposals/${proposalId}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, password }),
      })

      if (response.ok) {
        router.push(`/proposta/${proposalId}?token=${accessToken}`)
      } else {
        setError("Token de acesso ou senha inválidos")
      }
    } catch (error) {
      setError("Erro ao validar acesso. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[#E6E4E3]/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[#EB6A00]/10 rounded-full">
              <Lock className="w-8 h-8 text-[#EB6A00]" />
            </div>
          </div>
          <CardTitle className="text-2xl text-[#413328]">Acesso à Proposta</CardTitle>
          <p className="text-[#995925]">Digite suas credenciais para visualizar a proposta</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAccess} className="space-y-4">
            <div>
              <Label htmlFor="accessToken">Token de Acesso</Label>
              <Input
                id="accessToken"
                type="text"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Digite o token de acesso"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            {searchParams.get("error") === "invalid" && (
              <div className="text-red-500 text-sm text-center">Credenciais inválidas. Tente novamente.</div>
            )}

            <Button type="submit" className="w-full bg-[#EB6A00] hover:bg-[#995925]" disabled={isLoading}>
              {isLoading ? "Validando..." : "Acessar Proposta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

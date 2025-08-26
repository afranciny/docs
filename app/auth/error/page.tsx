import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-[#E6E4E3]/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#413328]">Ops, algo deu errado</CardTitle>
        </CardHeader>
        <CardContent>
          {params?.error ? (
            <p className="text-sm text-muted-foreground text-center">Código do erro: {params.error}</p>
          ) : (
            <p className="text-sm text-muted-foreground text-center">Ocorreu um erro não especificado.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

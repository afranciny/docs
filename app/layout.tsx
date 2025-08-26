import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Grupo Axend - RevOps Premium | Transforme sua Receita em uma Máquina Previsível",
  description:
    "Soluções RevOps sob medida para empresas B2B com faturamento R$500k+/mês. Agende seu diagnóstico personalizado de 90 minutos.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} antialiased`}>
      <head>
        <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
        <script src="https://calendar.google.com/calendar/scheduling-button-script.js" async />
      </head>
      <body>{children}</body>
    </html>
  )
}

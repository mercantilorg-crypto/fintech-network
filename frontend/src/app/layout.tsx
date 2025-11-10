export const metadata = {
  title: 'Fintech Network',
  description: 'Plataforma de tarjetas estilo Visa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

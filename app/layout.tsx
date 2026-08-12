export const metadata = {
  title: 'Mood News Grid',
  description: 'A news grid application built with Next.js and TypeScript.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <head />
      <body>{children}</body>
    </html>
  )
}
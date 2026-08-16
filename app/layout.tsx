export const metadata = {
  title: 'Mood News Grid',
  description: 'A news grid application built with Next.js and TypeScript.',
}

import React from "react"
import RootProviders from './_components/RootProviders'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <head />
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
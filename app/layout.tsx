import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShowTracker - Track Your Shows & Movies',
  description: 'Track watched and upcoming TV shows and movies',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

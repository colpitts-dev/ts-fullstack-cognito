import { FC, ReactNode } from 'react'
import { NavBar } from '../NavBar'

export interface PublicLayoutProps {
  children: ReactNode
}
export const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <article className="min-h-screen bg-slate-100">
      <header>
        <NavBar />
      </header>
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </article>
  )
}

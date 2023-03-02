import { FC, ReactNode } from 'react'
import { PrimaryNav } from '../PrimaryNav'

export interface PublicLayoutProps {
  children: ReactNode
}
export const DashboardLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <article className="min-h-screen bg-slate-100">
      <header>
        <PrimaryNav />
      </header>
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </article>
  )
}

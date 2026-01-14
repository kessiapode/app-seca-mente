
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MeditacoesClient from './meditacoes-client'

export default async function MeditacoesPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // 1. Verifica se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()

  // 2. SE NÃO ESTIVER LOGADO: Manda para a tela de login (Acaba com a tela rosa!)
  if (!user) {
    redirect('/auth')
  }

  // 3. SE ESTIVER LOGADO: Mostra o conteúdo das meditações
  return <MeditacoesClient />
}

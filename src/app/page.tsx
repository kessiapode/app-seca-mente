

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  // 1. Verifica o usuário
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Se estiver logado, manda para a pasta que vimos no seu print
  // SE ESTIVER LOGADO: Manda para a página interna de meditações
if (user) {
  redirect('/meditacoes')
}

// SE NÃO ESTIVER LOGADO: Mostra a tela de bloqueio
return (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6 text-center">
    <h1 className="text-4xl font-bold text-purple-600 mb-4">Seca Mente ✨</h1>
    <p className="text-gray-600 mb-8 max-w-sm text-lg">
      Sua nova realidade começa aqui. Faça login para acessar seu portal exclusivo.
    </p>
    <a href="/auth" className="bg-purple-600 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:bg-purple-700 transition-all">
      ENTRAR NO APP
    </a>
  </div>
)

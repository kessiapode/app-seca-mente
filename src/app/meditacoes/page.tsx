
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

  // Verifica se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()

  // SE NÃO ESTIVER LOGADO: Mostra apenas a tela de entrada (Bloqueio Total)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-6 text-center">
        <img src="/logo.png" alt="Seca Mente" className="w-32 mb-8" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bem-vinda, Criadora! ✨</h1>
        <p className="text-gray-600 mb-8 max-w-sm">
          Sua jornada de transformação mental e física começa aqui. Faça login para acessar seu conteúdo exclusivo.
        </p>
        <a href="/auth" className="bg-pink-500 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:bg-pink-600 transition-all">
          ENTRAR NO APP
        </a>
      </div>
    )
  }

  // SE ESTIVER LOGADO: Redireciona para o Perfil ou área logada
  // (Troque '/perfil' pelo nome da sua página principal interna)
  redirect('/perfil') 
}

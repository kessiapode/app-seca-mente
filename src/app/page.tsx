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

  // 1. Verifica se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()

  // 2. SE NÃO ESTIVER LOGADO: Mostra a tela de bloqueio com botão de entrar
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Seca Mente ✨</h1>
        <p className="text-gray-600 mb-8 max-w-sm text-lg">
          Sua nova realidade começa aqui. Faça login para acessar seu portal exclusivo de transformação.
        </p>
        <a href="/auth" className="bg-purple-600 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:bg-purple-700 transition-all transform hover:scale-105">
          ENTRAR NO APP
        </a>
        <p className="mt-8 text-sm text-gray-400 italic">"O corpo que você deseja já é seu."</p>
      </div>
    )
  }

  // 3. SE ESTIVER LOGADO: Redireciona para a página interna (Perfil)
  // Certifique-se de que a página /perfil existe, ou mude para a rota correta
  redirect('/perfil')
}

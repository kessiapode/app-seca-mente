import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function MeditacoesPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Se não estiver logado, manda para o login (Acaba com a tela rosa!)
  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-purple-800">Minhas Afirmações ✨</h1>
          <a href="/" className="text-sm text-purple-600 font-medium">← Voltar</a>
        </header>

        <div className="space-y-4">
          {/* Card de Áudio 1 */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-100">
            <h3 className="font-bold text-purple-900 mb-2">Afirmação: Eu sou Criadora</h3>
            <audio controls className="w-full">
              <source src="SUA_URL_DO_AUDIO_AQUI" type="audio/mpeg" />
              Seu navegador não suporta áudio.
            </audio>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Mais áudios serão liberados em breve!
          </p>
        </div>
      </div>
    </div>
  )
}

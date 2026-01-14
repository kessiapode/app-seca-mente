import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import VipLockScreen from '../../components/VipLockScreen'

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
  if (!user) {
    redirect('/auth')
  }

  // 2. Busca o status VIP na tabela profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_vip')
    .eq('id', user.id)
    .single()

  // 3. Se NÃO for VIP, mostra a tela de bloqueio
  if (!profile?.is_vip) {
    return <VipLockScreen />
  }

  // 4. Se FOR VIP, mostra o conteúdo
  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">Suas Meditações VIP 🧘‍♀️</h1>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
          <h3 className="font-bold text-gray-800">Afirmação: Eu sou magra e saudável</h3>
          <audio controls className="w-full mt-2">
            <source src="https://vstfbtmlyvshvshvshvs.supabase.co/storage/v1/object/public/audios/afirmacao1.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  )
}

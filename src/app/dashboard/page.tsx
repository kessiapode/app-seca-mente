
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('Criadora');

  useEffect(() => {
    const checkVip = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/auth'); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_vip, full_name')
        .eq('id', session.user.id)
        .single();

      if (!profile?.is_vip) {
        router.replace('/checkout');
      } else {
        if (profile.full_name) setNome(profile.full_name);
        setLoading(false);
      }
    };
    checkVip();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Menu Superior com Seta de Voltar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between p-4">
          <button 
            onClick={() => router.back()} 
            className="text-purple-600 text-2xl font-bold p-2"
          >
            ←
          </button>
          
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
            <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center text-purple-600 min-w-[50px]">
              <span className="text-2xl">🏠</span>
              <span className="text-xs font-black uppercase tracking-tighter">Início</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-gray-400 min-w-[50px]">
              <span className="text-2xl">🧠</span>
              <span className="text-xs font-bold uppercase tracking-tighter">Mente</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-gray-400 min-w-[50px]">
              <span className="text-2xl">🎧</span>
              <span className="text-xs font-bold uppercase tracking-tighter">Áudios</span>
            </button>
          </div>

          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push('/'); }}
            className="text-[10px] bg-red-50 text-red-400 px-2 py-1 rounded-lg font-bold"
          >
            SAIR
          </button>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-8">
        {/* Boas-vindas com Letras Maiores */}
        <div className="text-center space-y-6 py-4">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">
            Bem-vinda à sua nova realidade, <span className="text-green-500">{nome}</span>! 💚
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Aqui, o corpo que você deseja já é seu. Estamos apenas alinhando sua mente.
          </p>
          
          <button className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-green-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
            ✨ Descobrir Meu Perfil
          </button>
        </div>

        {/* Card Informativo */}
        <div className="bg-purple-50 p-8 rounded-[40px] border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💜</span>
            <h3 className="font-black text-xl text-purple-900">Por que o SecaMente é diferente?</h3>
          </div>
          <ul className="text-base text-purple-800 space-y-4 font-medium">
            <li className="flex items-start gap-2"><span>•</span> Não é mais uma dieta, é uma mudança de identidade.</li>
            <li className="flex items-start gap-2"><span>•</span> Você assume hoje o estado da mulher magra.</li>
            <li className="flex items-start gap-2"><span>•</span> Atividades rápidas, leves e divertidas.</li>
          </ul>
        </div>

        {/* Barra VIP Dourada */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6 rounded-3xl text-center shadow-xl border-b-4 border-yellow-700">
          <p className="text-white font-black text-xl flex items-center justify-center gap-2">
            👑 VOCÊ É VIP! 👑
          </p>
          <p className="text-white text-sm font-bold opacity-90">Aproveite todo o conteúdo exclusivo!</p>
        </div>
      </main>

      {/* Lembrete Flutuante Estilo Duolingo */}
      <div className="fixed bottom-8 right-6 max-w-[220px] z-50">
        <div className="bg-white p-4 rounded-3xl shadow-2xl border-2 border-purple-500 relative animate-bounce">
          <p className="text-sm font-bold text-purple-900 leading-tight">
            "Eiii! Já registrou suas emoções hoje? Seu eu futuro vai agradecer! 💜"
          </p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-purple-500 rotate-45"></div>
        </div>
        <div className="flex justify-end mt-2 mr-2">
           <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-3xl shadow-2xl border-4 border-white">🧘‍♀️</div>
        </div>
      </div>
    </div>
  );
}

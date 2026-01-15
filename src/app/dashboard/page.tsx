
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
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* HEADER ESTILO LASY (Seta + Menu) */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center p-4 gap-4">
          {/* Seta de Voltar Real */}
          <button 
            onClick={() => router.back()} 
            className="text-purple-600 text-3xl font-bold hover:opacity-70 transition-all"
          >
            ←
          </button>
          
          {/* Menu de Abas (Letras Maiores e Negrito) */}
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-1 flex-1">
            <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center text-purple-600 min-w-[60px]">
              <span className="text-2xl">🏠</span>
              <span className="text-[11px] font-black uppercase">Início</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-gray-400 min-w-[60px]">
              <span className="text-2xl">🧠</span>
              <span className="text-[11px] font-bold uppercase">Mente</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-gray-400 min-w-[60px]">
              <span className="text-2xl">🎧</span>
              <span className="text-[11px] font-bold uppercase">Áudios</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-10">
        {/* Boas-vindas (Letras Grandes e Impactantes) */}
        <div className="text-center space-y-4 pt-4">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">
            Bem-vinda à sua nova realidade, <span className="text-green-500">{nome}</span>! 💚
          </h2>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            O corpo que você deseja já é seu. Sinta a transformação agora.
          </p>
          
          <button className="w-full bg-green-500 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-green-100 active:scale-95 transition-all">
            ✨ Descobrir Meu Perfil
          </button>
        </div>

        {/* Card de Conteúdo (Estilo Lasy) */}
        <div className="bg-purple-50 p-8 rounded-[40px] border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">💜</span>
            <h3 className="font-black text-2xl text-purple-900">Por que o SecaMente é diferente?</h3>
          </div>
          <ul className="text-lg text-purple-800 space-y-5 font-semibold">
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span> 
              <span>Não é dieta, é mudança de identidade.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span> 
              <span>Você assume o estado da mulher magra.</span>
            </li>
          </ul>
        </div>

        {/* Barra VIP Dourada */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6 rounded-[30px] text-center shadow-2xl border-b-4 border-yellow-700">
          <p className="text-white font-black text-2xl flex items-center justify-center gap-2">
            👑 VOCÊ É VIP! 👑
          </p>
          <p className="text-white text-sm font-bold opacity-90">Acesso total liberado!</p>
        </div>
      </main>

      {/* Lembrete Flutuante (Estilo Duolingo que não some) */}
      <div className="fixed bottom-10 right-6 max-w-[240px] z-50">
        <div className="bg-white p-5 rounded-[30px] shadow-2xl border-2 border-purple-500 relative animate-bounce">
          <p className="text-sm font-black text-purple-900 leading-tight">
            "Eiii! Já registrou suas emoções hoje? Seu eu futuro vai agradecer! 💜"
          </p>
          <div className="absolute -bottom-2 right-8 w-5 h-5 bg-white border-r-2 border-b-2 border-purple-500 rotate-45"></div>
        </div>
        <div className="flex justify-end mt-3 mr-2">
           <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-4xl shadow-2xl border-4 border-white">🧘‍♀️</div>
        </div>
      </div>
    </div>
  );
}

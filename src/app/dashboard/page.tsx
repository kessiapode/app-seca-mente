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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Menu Superior Estilo Lasy */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 overflow-x-auto">
        <div className="flex justify-around p-4 min-w-[500px]">
          <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center text-purple-600">
            <span className="text-xl">🏠</span><span className="text-[10px] font-bold">Início</span>
          </button>
          <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🧠</span><span className="text-[10px]">Mente</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🍎</span><span className="text-[10px]">Alimentação</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🎧</span><span className="text-[10px]">Meditações</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span className="text-xl">📖</span><span className="text-[10px]">Diário</span>
          </button>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-6">
        {/* Logo e Boas-vindas */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
             <span className="text-5xl">🧘‍♀️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Bem-vinda à sua nova realidade, {nome}! 💚</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Aqui, o corpo que você deseja já é seu. Estamos apenas alinhando sua mente para que a realidade física se manifeste.
          </p>
        </div>

        {/* Card: Por que o SecaMente é diferente? */}
        <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-purple-600 text-white p-1 rounded-lg text-xs">💜</span>
            <h3 className="font-bold text-purple-900">Por que o SecaMente é diferente?</h3>
          </div>
          <ul className="text-xs text-purple-800 space-y-2 list-disc pl-4">
            <li>Não é mais uma dieta, é uma mudança de identidade.</li>
            <li>Você assume hoje o estado da mulher magra.</li>
            <li>Lembretes gentis que te tiram do piloto automático.</li>
          </ul>
        </div>

        {/* Atividades de Reprogramação */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">✨ Atividades de Reprogramação</h3>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-green-100 p-2 rounded-xl">🌅</span>
              <div>
                <p className="font-bold text-sm text-gray-800">Afirmação da Manhã</p>
                <p className="text-[10px] text-gray-400">Eu já sou a mulher magra e confiante...</p>
              </div>
            </div>
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg">2 min</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-orange-100 p-2 rounded-xl">✨</span>
              <div>
                <p className="font-bold text-sm text-gray-800">Pausa Consciente</p>
                <p className="text-[10px] text-gray-400">Estou com fome ou com emoção?</p>
              </div>
            </div>
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg">5 min</span>
          </div>
        </div>

        {/* Barra VIP Dourada */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-2xl text-center shadow-lg">
          <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
            👑 Você é VIP! 👑
          </p>
          <p className="text-white text-[10px] opacity-90">Aproveite todo o conteúdo exclusivo!</p>
        </div>
      </main>

      {/* Lembrete Flutuante Estilo Duolingo */}
      <div className="fixed bottom-24 right-6 max-w-[200px] animate-bounce">
        <div className="bg-white p-3 rounded-2xl shadow-2xl border-2 border-purple-500 relative">
          <p className="text-[10px] font-medium text-purple-900">
            "Criadora, você está comendo por fome ou por emoção? Só checando! 💚"
          </p>
          <button className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-4 h-4 text-[8px]">X</button>
        </div>
        <div className="flex justify-end mt-1 mr-4">
           <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl shadow-lg">🧘‍♀️</div>
        </div>
      </div>

      {/* Aviso de Spam (Rodapé) */}
      <div className="p-6 text-center">
        <p className="text-[10px] text-gray-400 italic">
          ⚠️ Não esqueça de olhar sua caixa de SPAM e marcar nossos e-mails como "Não é Spam" para receber seus lembretes!
        </p>
      </div>
    </div>
  );
}

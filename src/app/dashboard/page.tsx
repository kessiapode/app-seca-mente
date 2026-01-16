'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('Criadora');
  const [fraseDoDia, setFraseDoDia] = useState('');
  const [feedbackCheckin, setFeedbackCheckin] = useState('');

  const frases = [
    "Eiii! Já registrou suas emoções hoje? Seu eu futuro vai agradecer! 💜",
    "Como sua versão magra escolheria o almoço de hoje? 🥗",
    "Bebeu água, Criadora? Seu corpo agradece! 💧",
    "Lembre-se: você não está de dieta, você mudou de identidade. 👑",
    "Já ouviu sua meditação de hoje? A mente cria, o corpo obedece. 🎧",
    "Sinta agora a leveza de ser quem você nasceu para ser. ✨",
    "Cada escolha consciente é um 'sim' para a sua nova realidade. 💎",
    "Não foque no peso, foque na mulher maravilhosa que você já é! 🧘‍♀️",
    "O que você precisa sentir agora para estar em paz com a comida? 💝",
    "Você é a arquiteta da sua realidade. Construa com amor! 🏗️💜"
  ];

  const handleCheckin = (sentimento: string) => {
    const respostas: Record<string, string> = {
      'Leve': 'Perfeito! Esse é o estado que manifesta resultados rápidos. ✨',
      'Neutra': 'Tudo bem. Apenas observe e continue assumindo sua nova versão. 🌱',
      'Desconectada': 'Respire fundo. Ouça uma meditação agora para voltar ao centro. 🧘‍♀️',
      'Confiante': 'Incrível! Você já é a mulher que deseja ser. Sinta isso! 🔥'
    };
    setFeedbackCheckin(respostas[sentimento]);
    // Aqui no futuro podemos salvar isso no banco de dados
  };

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
        setFraseDoDia(frases[Math.floor(Math.random() * frases.length)]);
        setLoading(false);
      }
    };
    checkVip();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-32 font-sans">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-purple-600 text-3xl font-bold">←</button>
          <Navigation />
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-8">
        {/* Boas-vindas */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-gray-900">Olá, <span className="text-purple-600">{nome}</span>! 💜</h2>
          <p className="text-gray-500 text-sm">Sua nova identidade começa agora.</p>
        </div>

        {/* NOVO: Check-in de Identidade */}
        <div className="bg-white p-6 rounded-[35px] shadow-xl border border-purple-50 space-y-4">
          <h3 className="font-bold text-gray-800 text-center">Como você se sente HOJE?</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Leve', 'Neutra', 'Desconectada', 'Confiante'].map((s) => (
              <button 
                key={s}
                onClick={() => handleCheckin(s)}
                className="py-3 px-2 rounded-2xl border-2 border-purple-50 text-sm font-bold text-purple-700 hover:bg-purple-500 hover:text-white transition-all active:scale-95"
              >
                {s === 'Leve' && '🌱 '}
                {s === 'Neutra' && '😐 '}
                {s === 'Desconectada' && '😔 '}
                {s === 'Confiante' && '🔥 '}
                {s}
              </button>
            ))}
          </div>
          {feedbackCheckin && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 text-xs font-bold rounded-xl text-center animate-bounce">
              {feedbackCheckin}
            </div>
          )}
        </div>

        {/* Botões de Ação Rápida */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => router.push('/meditacoes')} className="bg-purple-600 text-white p-6 rounded-[30px] font-bold shadow-lg flex flex-col items-center gap-2">
            <span className="text-2xl">🎧</span> Meditar
          </button>
          <button onClick={() => router.push('/diario')} className="bg-pink-500 text-white p-6 rounded-[30px] font-bold shadow-lg flex flex-col items-center gap-2">
            <span className="text-2xl">✍️</span> Diário
          </button>
        </div>

        {/* Card: Carta do Futuro */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-[35px] border border-yellow-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="font-bold text-yellow-900">Carta da Criadora do Futuro</h3>
          </div>
          <p className="text-sm text-yellow-800 italic">"Obrigada por não desistir de mim hoje. Eu já sou real e estou te esperando..."</p>
          <button onClick={() => router.push('/carta')} className="text-xs font-black text-yellow-700 underline">LER CARTA COMPLETA</button>
        </div>
      </main>

      {/* Balãozinho Flutuante */}
      <div className="fixed bottom-10 right-6 max-w-[200px] z-50">
        <div className="bg-white p-4 rounded-[25px] shadow-2xl border-2 border-purple-500 relative">
          <p className="text-[11px] font-black text-purple-900 leading-tight italic">"{fraseDoDia}"</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-purple-500 rotate-45"></div>
        </div>
        <div className="flex justify-end mt-2 mr-1">
           <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl shadow-xl border-2 border-white">🧘‍♀️</div>
        </div>
      </div>
    </div>
  );
}

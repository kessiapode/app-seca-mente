'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('Criadora');

  useEffect(() => {
    const checkVip = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
        return;
      }

      // Verifica se é VIP
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_vip, full_name')
        .eq('id', session.user.id)
        .single();

      if (!profile?.is_vip) {
        router.replace('/'); // Se não for VIP, volta para a página de vendas
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

  const menuItems = [
    { nome: 'Mente', icon: '🧠', rota: '/meditacoes' },
    { nome: 'Alimentação', icon: '🍎', rota: '/dieta' },
    { nome: 'Sono', icon: '😴', rota: '/sono' },
    { nome: 'Meditações', icon: '🎧', rota: '/meditacoes' },
    { nome: 'Emoções', icon: '💜', rota: '/emocoes' },
    { nome: 'Diário', icon: '📖', rota: '/diario' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-purple-900">Olá, {nome}! ✨</h1>
        <p className="text-purple-600 text-sm">O que vamos manifestar hoje?</p>
      </header>

      {/* Lembrete Divertido (Estilo Lasy) */}
      <div className="bg-purple-600 text-white p-6 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
        <p className="relative z-10 font-medium">
          "Criadora, você está comendo por fome ou por emoção? Só checando! 😉"
        </p>
        <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">✨</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.nome}
            onClick={() => router.push(item.rota)}
            className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 flex flex-col items-center hover:scale-105 transition-all"
          >
            <span className="text-3xl mb-2">{item.icon}</span>
            <span className="text-sm font-bold text-purple-900">{item.nome}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={async () => {
          await supabase.auth.signOut();
          router.push('/');
        }}
        className="mt-10 w-full text-gray-400 text-xs underline"
      >
        Sair da conta
      </button>
    </div>
  );
}

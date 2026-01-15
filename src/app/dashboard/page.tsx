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
      
      if (!session) {
        router.replace('/auth');
        return;
      }

      // Busca os dados do perfil para ver se é VIP
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_vip, full_name')
        .eq('id', session.user.id)
        .single();

      if (!profile?.is_vip) {
        // Se não for VIP, manda para o checkout de pagamento
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

  const menuItems = [
    { nome: 'Mente', icon: '🧠', rota: '/meditacoes' },
    { nome: 'Alimentação', icon: '🍎', rota: '/dashboard' },
    { nome: 'Sono', icon: '😴', rota: '/dashboard' },
    { nome: 'Meditações', icon: '🎧', rota: '/meditacoes' },
    { nome: 'Emoções', icon: '💜', rota: '/dashboard' },
    { nome: 'Diário', icon: '📖', rota: '/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 pb-10">
      <div className="max-w-md mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">Olá, {nome}! ✨</h1>
            <p className="text-purple-600 text-sm italic">Sua nova realidade é agora.</p>
          </div>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}
            className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium"
          >
            Sair
          </button>
        </header>

        {/* Lembrete Divertido da Lasy */}
        <div className="bg-white p-6 rounded-3xl shadow-md border-l-8 border-purple-500 mb-8 relative overflow-hidden">
          <p className="text-purple-900 font-medium leading-relaxed">
            "Criadora, você está comendo por fome ou por emoção? Só checando! 😉"
          </p>
          <div className="absolute -right-2 -bottom-2 text-4xl opacity-10">✨</div>
        </div>

        {/* Grid de Menu */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.nome}
              onClick={() => router.push(item.rota)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 flex flex-col items-center hover:bg-purple-50 transition-all active:scale-95"
            >
              <span className="text-4xl mb-3">{item.icon}</span>
              <span className="text-sm font-bold text-purple-900">{item.nome}</span>
            </button>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest">Seca Mente - Versão VIP 1.0</p>
        </footer>
      </div>
    </div>
  );
}

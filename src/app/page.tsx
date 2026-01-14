
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Se já está logada, vai direto para o conteúdo VIP
        router.replace('/meditacoes');
      } else {
        // Se não está, mostra a tela de entrada
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Seca Mente ✨</h1>
      <p className="text-gray-600 mb-8 max-w-sm text-lg">
        Sua nova realidade começa aqui. Faça login para acessar seu portal exclusivo.
      </p>
      <button 
        onClick={() => router.push('/auth')}
        className="bg-purple-600 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:bg-purple-700 transition-all"
      >
        ENTRAR NO APP
      </button>
    </div>
  );
}

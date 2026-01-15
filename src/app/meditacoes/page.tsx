
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function MeditacoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const afirmacoes = [
    { id: 1, titulo: "Eu sou Criadora", duracao: "5:00", url: "SUA_URL_AQUI" },
    { id: 2, titulo: "Corpo em Harmonia", duracao: "7:00", url: "SUA_URL_AQUI" },
    { id: 3, titulo: "Mente Próspera", duracao: "6:00", url: "SUA_URL_AQUI" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">Minhas Afirmações ✨</h1>
            <p className="text-purple-600 text-sm">Sua jornada diária</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="bg-white p-2 rounded-full shadow-sm text-purple-600"
          >
            🏠
          </button>
        </header>

        <div className="space-y-4">
          {afirmacoes.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-purple-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-purple-900 text-lg">{item.titulo}</h3>
                <span className="text-xs font-medium bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                  {item.duracao}
                </span>
              </div>
              
              <audio controls className="w-full h-10 custom-audio">
                <source src={item.url} type="audio/mpeg" />
                Seu navegador não suporta áudio.
              </audio>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-gray-400 text-xs">Seca Mente - Versão 1.0</p>
        </footer>
      </div>

      <style jsx>{`
        .custom-audio::-webkit-media-controls-panel {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function MeditacoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [aba, setAba] = useState<'audios' | 'textos'>('audios');

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

  const meditacoesAudio = [
    {
      id: 1,
      titulo: 'Assumindo seu novo estado',
      duracao: 'Áudio',
      url: 'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/meditations/Assumindo%20seu%20novo%20estado.m4a',
    },
    {
      id: 2,
      titulo: 'Paz com a comida',
      duracao: 'Áudio',
      url: 'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/meditations/Paz%20com%20a%20comida.m4a',
    },
    {
      id: 3,
      titulo: 'Reprogramação Matinal',
      duracao: 'Áudio',
      url: 'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/meditations/reprogramacao-matinal.m4a',
    },
  ];

  const afirmacoesTexto = [
    'Eu já sou a pessoa que possui o corpo dos meus sonhos.',
    'Minha mente está em perfeita harmonia com a minha nova realidade.',
    'Eu agradeço porque o meu desejo já é um fato consumado.',
    'Cada célula do meu corpo responde à minha nova consciência de saúde.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 pb-20">
      <div className="max-w-md mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">Seca Mente ✨</h1>
          <p className="text-purple-600 text-sm italic">"A suposição cria a realidade"</p>
        </header>

        <div className="flex bg-purple-100 p-1 rounded-2xl mb-8">
          <button
            onClick={() => setAba('audios')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              aba === 'audios' ? 'bg-white text-purple-600 shadow-sm' : 'text-purple-400'
            }`}
          >
            🎧 Meditações
          </button>

          <button
            onClick={() => setAba('textos')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              aba === 'textos' ? 'bg-white text-purple-600 shadow-sm' : 'text-purple-400'
            }`}
          >
            📜 Afirmações
          </button>
        </div>

        {aba === 'audios' && (
          <div className="space-y-4">
            {meditacoesAudio.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-3xl shadow-sm border border-purple-100"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-purple-900">{item.titulo}</h3>
                  <span className="text-xs font-medium bg-purple-100 text-purple-600 px-3 py-1 rounded-full whitespace-nowrap">
                    {item.duracao}
                  </span>
                </div>

                <audio controls className="w-full">
                  <source src={item.url} type="audio/mp4" />
                  Seu navegador não suporta áudio.
                </audio>

                <p className="text-xs text-gray-400 mt-2 break-all">
                  {item.url}
                </p>
              </div>
            ))}
          </div>
        )}

        {aba === 'textos' && (
          <div className="space-y-4">
            {afirmacoesTexto.map((texto, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-purple-400 italic text-purple-800"
              >
                "{texto}"
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => router.push('/')}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg font-bold"
        >
          🏠 Início
        </button>
      </div>
    </div>
  );
}

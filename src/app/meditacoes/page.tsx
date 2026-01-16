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
    {
      titulo: "Afirmação da Manhã",
      descricao: "Eu já sou a mulher magra e confiante que desejo ser.",
      duracao: "2 min",
      audio: "https://exemplo.com/afirmacao-manha.mp3"
    },
    {
      titulo: "Pausa Consciente",
      descricao: "Antes de comer: estou com fome ou com emoção?",
      duracao: "5 min",
      audio: "https://exemplo.com/pausa-consciente.mp3"
    },
    {
      titulo: "Momento de Gratidão",
      descricao: "Agradeça ao seu corpo por algo que ele faz por você hoje.",
      duracao: "3 min",
      audio: "https://exemplo.com/gratidao.mp3"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* HEADER COM NAVEGAÇÃO */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center p-4 gap-4">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="text-purple-600 text-3xl font-bold"
          >
            ←
          </button>
          
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-1 flex-1">
            <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center text-gray-400 min-w-[60px]">
              <span className="text-2xl">🏠</span>
              <span className="text-[11px] font-bold uppercase">Início</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-purple-600 min-w-[60px]">
              <span className="text-2xl">🎧</span>
              <span className="text-[11px] font-black uppercase">Áudios</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-black text-purple-900">
          Áudios de Afirmação 🎧
        </h2>
        
        <p className="text-lg text-gray-600 font-medium">
          Ouça diariamente para reprogramar sua mente e assumir sua nova identidade.
        </p>

        {/* LISTA DE ÁUDIOS */}
        <div className="space-y-4">
          {afirmacoes.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-purple-900">{item.titulo}</h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                  {item.duracao}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.descricao}</p>
              
              {/* Player de Áudio */}
              <audio controls className="w-full">
                <source src={item.audio} type="audio/mpeg" />
                Seu navegador não suporta áudio.
              </audio>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

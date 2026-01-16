
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import { Headphones } from 'lucide-react';

export default function MeditacoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // LISTA FIXA DE MEDITAÇÕES (USANDO SEUS ÁUDIOS DO SUPABASE STORAGE)
  const meditacoes = [
    {
      id: '1',
      titulo: 'Assumindo seu Novo Estado',
      duracao: '10 min',
      descricao: 'Entre no estado da mulher magra e confiante que você já é.',
      audio_url:
        'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/meditations/Assumindo%20seu%20novo%20estado.m4a',
    },
    {
      id: '2',
      titulo: 'Paz com a Comida',
      duracao: '8 min',
      descricao: 'Solte a culpa e crie uma relação leve e amorosa com a comida.',
      audio_url:
        'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/meditations/Paz%20com%20a%20comida.m4a',
    },
    {
      id: '3',
      titulo: 'Reprogramação Matinal',
      duracao: '12 min',
      descricao: 'Comece o dia reprogramando suas crenças e emoções.',
      audio_url:
        'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/meditations/reprogramacao-matinal.m4a',
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      {/* Header com menu igual ao dashboard */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-purple-600 text-3xl font-bold"
            >
              ←
            </button>
            <Navigation />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <BackToHomeButton />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Headphones className="w-10 h-10 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Meditações Guiadas</h1>
          </div>
          <p className="text-gray-600">
            Ouça diariamente para reprogramar sua mente e assumir sua nova identidade.
          </p>
        </div>

        {/* Cards de Meditação */}
        <div className="grid gap-6 md:grid-cols-3">
          {meditacoes.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-3xl shadow-lg p-6 border border-purple-100 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {med.duracao}
                </span>
                <h3 className="text-xl font-bold text-purple-900">{med.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{med.descricao}</p>
              </div>

              <div className="pt-2">
                <audio controls className="w-full">
                  <source src={med.audio_url} type="audio/mp4" />
                  Seu navegador não suporta áudio.
                </audio>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

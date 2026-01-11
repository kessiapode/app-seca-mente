'use client';

import { Volume2, Heart, Clock } from 'lucide-react';
import BackToHomeButton from '@/components/custom/back-to-home-button';

interface Meditation {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
}

const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Assumindo Seu Novo Estado',
    description: 'Afirmações poderosas para você assumir agora a sua versão magra e confiante.',
    audioUrl: 'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/audios/Assumindo%20seu%20novo%20estado%202.m4a',
  },
  {
    id: '2',
    title: 'Paz com a Comida',
    description: 'Reprograme sua relação com a alimentação, eliminando a culpa e trazendo consciência.',
    audioUrl: 'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/audios/Paz%20com%20a%20comida%20(1).m4a',
  },
  {
    id: '3',
    title: 'Reprogramação Matinal',
    description: 'Comece o seu dia alinhando sua mente com o corpo e a vida que você deseja manifestar.',
    audioUrl: 'https://wbvbozxqslnecojdykuf.supabase.co/storage/v1/object/public/audios/reprogramacao-matinal.m4a',
  },
];

export default function MeditacoesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <BackToHomeButton />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 shadow-lg">
            <Volume2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Meditações Guiadas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reprograme sua mente com meditações guiadas por voz. Escolha a que mais ressoa com você agora.
          </p>
        </div>

        {/* Lista de meditações */}
        <div className="grid gap-4 md:gap-6">
          {meditations.map((meditation) => {
            return (
              <div
                key={meditation.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Ícone */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400 shadow-md">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {meditation.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {meditation.description}
                      </p>

                      {/* Player de áudio */}
                      <audio 
                        controls 
                        className="w-full"
                        preload="metadata"
                      >
                        <source src={meditation.audioUrl} type="audio/mp4" />
                        Seu navegador não suporta o elemento de áudio.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensagem motivacional */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                💚 Dica da Criadora
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Use fones de ouvido e encontre um lugar tranquilo. Permita-se sentir cada palavra. 
                Seu inconsciente está ouvindo e já está criando a transformação que você deseja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

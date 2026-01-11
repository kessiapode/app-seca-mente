'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import MoodSelector from '@/components/custom/mood-selector';
import { Heart, Send, Sparkles } from 'lucide-react';
import { REPROGRAMMING_RESPONSES } from '@/lib/constants';
import type { Mood } from '@/lib/types';

export default function EmocoesPage() {
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>();
  const [thoughts, setThoughts] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setShowResponse(false);
  };

  const handleSubmit = () => {
    if (selectedMood && thoughts.trim()) {
      const moodResponse = REPROGRAMMING_RESPONSES[selectedMood];
      setResponse(moodResponse);
      setShowResponse(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Botão Voltar */}
        <BackToHomeButton />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 text-pink-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Emoções</h1>
          </div>
          <p className="text-gray-600">Suas emoções são válidas. Vamos acolhê-las juntas.</p>
        </div>

        {/* Mensagem Acolhedora */}
        <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl shadow-xl p-6 text-white">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>💝</span>
              Espaço Seguro
            </h3>
            <p className="text-white/90 leading-relaxed">
              Este é um espaço sem julgamentos. Aqui você pode sentir o que precisa sentir. 
              Reconhecer suas emoções é o primeiro passo para transformá-las com amor.
            </p>
          </div>
        </div>

        {/* Seletor de Humor */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
          <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
        </div>

        {/* Campo de Pensamentos */}
        {selectedMood && (
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100 space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-gray-800">O que você está pensando agora?</h3>
            <p className="text-sm text-gray-600">
              Escreva seus pensamentos automáticos sobre comida, corpo ou qualquer coisa que esteja sentindo:
            </p>
            
            <textarea
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="Ex: 'Eu nunca consigo emagrecer', 'Já estraguei tudo hoje', 'Estou com vontade de comer por ansiedade'..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-gray-700"
            />
            
            <button
              onClick={handleSubmit}
              disabled={!thoughts.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Receber Acolhimento
            </button>
          </div>
        )}

        {/* Resposta de Reprogramação */}
        {showResponse && response && (
          <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-3xl shadow-xl p-6 text-white animate-in fade-in duration-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Mensagem para Você, Criadora</h3>
                <p className="text-white/90 leading-relaxed">{response}</p>
              </div>
            </div>
          </div>
        )}

        {/* Perguntas de Autoexploração */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Perguntas para Consciência
          </h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-400">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Antes de comer:</span> Estou com fome física ou estou buscando aliviar uma emoção?
              </p>
            </div>
            
            <div className="p-4 bg-pink-50 rounded-xl border-l-4 border-pink-400">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Quando sentir vontade de comer:</span> O que estou realmente sentindo agora? Ansiedade? Tédio? Tristeza?
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Ao perceber um padrão:</span> Como minha versão magra e confiante lidaria com essa emoção?
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Momento de escolha:</span> Que estado interno eu quero assumir agora?
              </p>
            </div>
          </div>
        </div>

        {/* Dica de Consciência */}
        <div className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl shadow-xl p-6 text-white">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>🧘‍♀️</span>
              Prática de Consciência
            </h3>
            <p className="text-white/90 leading-relaxed">
              Quando sentir vontade de comer por emoção, pause por 5 minutos. Respire fundo. 
              Pergunte-se: "O que eu realmente preciso agora?" Às vezes, precisamos de um abraço, 
              não de comida. E tudo bem.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

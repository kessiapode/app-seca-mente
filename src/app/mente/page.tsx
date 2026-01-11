'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import { Brain, Play, Sparkles } from 'lucide-react';
import { VISUALIZATIONS, AFFIRMATIONS } from '@/lib/constants';

export default function MentePage() {
  const [selectedVisualization, setSelectedVisualization] = useState<number | null>(null);
  const [showAffirmations, setShowAffirmations] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Botão Voltar */}
        <BackToHomeButton />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Mente</h1>
          </div>
          <p className="text-gray-600">Reprograme sua mente com leveza e amor</p>
        </div>

        {/* Visualizações Guiadas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Visualizações Guiadas
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {VISUALIZATIONS.map((viz, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-gray-800">{viz.title}</h3>
                    <p className="text-sm text-gray-600">{viz.description}</p>
                  </div>
                  <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                    {viz.duration}
                  </span>
                </div>
                
                <button
                  onClick={() => setSelectedVisualization(selectedVisualization === index ? null : index)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  {selectedVisualization === index ? 'Ocultar' : 'Iniciar'}
                </button>
                
                {selectedVisualization === index && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200 animate-in fade-in duration-300">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {viz.script}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Afirmações */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            Afirmações Poderosas
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 space-y-4">
            <p className="text-sm text-gray-600">
              Repita estas afirmações com sentimento, assumindo que já são verdade:
            </p>
            
            <button
              onClick={() => setShowAffirmations(!showAffirmations)}
              className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {showAffirmations ? 'Ocultar Afirmações' : 'Ver Afirmações'}
            </button>
            
            {showAffirmations && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {AFFIRMATIONS.map((affirmation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      <span className="text-green-600 font-semibold mr-2">✨</span>
                      {affirmation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dica do Dia */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>💡</span>
              Dica da Criadora
            </h3>
            <p className="text-white/90 leading-relaxed">
              A lei da suposição funciona quando você ASSUME o estado desejado como se já fosse real. 
              Não force, não lute. Apenas seja. Sua mente inconsciente fará o resto.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

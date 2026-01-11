'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import { BookOpen, Sparkles, Lightbulb } from 'lucide-react';
import { DIARY_PROMPTS } from '@/lib/constants';

export default function DiarioPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(DIARY_PROMPTS[0]);
  const [diaryEntry, setDiaryEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState<Array<{ prompt: string; content: string; date: string }>>([]);

  const handleSave = () => {
    if (diaryEntry.trim()) {
      const newEntry = {
        prompt: selectedPrompt,
        content: diaryEntry,
        date: new Date().toLocaleDateString('pt-BR'),
      };
      setSavedEntries([newEntry, ...savedEntries]);
      setDiaryEntry('');
    }
  };

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * DIARY_PROMPTS.length);
    setSelectedPrompt(DIARY_PROMPTS[randomIndex]);
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
            <BookOpen className="w-10 h-10 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Diário da Nova Identidade</h1>
          </div>
          <p className="text-gray-600">Escreva como se você já fosse a mulher que deseja ser</p>
        </div>

        {/* Mensagem Inspiradora */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">O Poder da Escrita</h3>
              <p className="text-white/90 leading-relaxed">
                Quando você escreve a partir do estado assumido (como se já fosse a versão magra e confiante), 
                sua mente inconsciente começa a aceitar isso como realidade. Escreva com sentimento, 
                como se já estivesse vivendo essa vida.
              </p>
            </div>
          </div>
        </div>

        {/* Prompt do Dia */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Prompt de Hoje
            </h3>
            <button
              onClick={getRandomPrompt}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Outro prompt
            </button>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
            <p className="text-gray-700 leading-relaxed">{selectedPrompt}</p>
          </div>
        </div>

        {/* Área de Escrita */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100 space-y-4">
          <h3 className="font-semibold text-gray-800">Escreva sua história</h3>
          <p className="text-sm text-gray-600">
            Comece com: "Hoje, como a minha versão magra e confiante, eu..."
          </p>
          
          <textarea
            value={diaryEntry}
            onChange={(e) => setDiaryEntry(e.target.value)}
            placeholder="Hoje, como a minha versão magra e confiante, eu acordei me sentindo leve e cheia de energia. Escolhi um café da manhã nutritivo porque amo cuidar do meu corpo..."
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-gray-700 leading-relaxed"
          />
          
          <button
            onClick={handleSave}
            disabled={!diaryEntry.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Salvar no Diário
          </button>
        </div>

        {/* Entradas Salvas */}
        {savedEntries.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Suas Entradas
            </h3>
            
            <div className="space-y-3">
              {savedEntries.map((entry, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <p className="text-xs text-purple-600 font-medium">{entry.date}</p>
                      <p className="text-sm text-gray-600 italic">"{entry.prompt}"</p>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{entry.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dicas de Escrita */}
        <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-3xl shadow-xl p-6 text-white">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>✍️</span>
              Dicas para Escrever
            </h3>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>Escreva no presente, como se já estivesse vivendo essa realidade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>Use detalhes sensoriais: como você se sente, o que vê, o que pensa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>Escreva com emoção e convicção, não apenas com palavras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>Não force - deixe fluir naturalmente do estado assumido</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

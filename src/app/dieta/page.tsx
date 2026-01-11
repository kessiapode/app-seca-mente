'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import { Beef, Apple, Droplets, Sunrise, Sun, Moon, Sparkles, Heart, Leaf } from 'lucide-react';

export default function DietaPage() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Botão Voltar */}
        <BackToHomeButton />

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Olá, Criadora! 🌿
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
            Bem-vinda à <strong>Dieta da Selva</strong> — a alimentação que honra sua natureza ancestral e nutre seu corpo com sabedoria.
          </p>
        </div>

        {/* SEÇÃO 1: OS PILARES DA SELVA */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-green-600" />
            Os Pilares da Selva
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* PROTEÍNAS */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-red-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Beef className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">PROTEÍNAS</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Carnes vermelhas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Frango</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Peixes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Ovos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Vísceras</span>
                </li>
              </ul>
            </div>

            {/* FRUTAS */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-yellow-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">FRUTAS</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Banana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Maçã</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Mamão</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Manga</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Abacate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Frutas vermelhas</span>
                </li>
              </ul>
            </div>

            {/* GORDURAS */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">GORDURAS</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Manteiga</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Ghee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Azeite de oliva</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Óleo de coco</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: EXEMPLOS DE REFEIÇÕES DA SELVA */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sun className="w-6 h-6 text-green-600" />
            Exemplos de Refeições da Selva
          </h2>
          
          <div className="space-y-6">
            {/* Café da Manhã */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sunrise className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Café da Manhã</h3>
                <p className="text-gray-700">Ovos mexidos na manteiga com uma porção de frutas.</p>
              </div>
            </div>

            {/* Almoço */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Almoço</h3>
                <p className="text-gray-700">Carne grelhada suculenta com abacate ou frutas cítricas.</p>
              </div>
            </div>

            {/* Jantar */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Jantar</h3>
                <p className="text-gray-700">Peixe ou frango com gorduras naturais e uma fruta de sobremesa.</p>
              </div>
            </div>

            {/* Lanche */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Lanche (se necessário)</h3>
                <p className="text-gray-700">Uma fruta ou um ovo cozido.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 3: BOTÃO DE AJUDA RÁPIDA */}
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-3xl shadow-2xl p-8 border-2 border-purple-300">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="w-full flex items-center justify-between gap-4 mb-4 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 text-left">
                Estou com fome, o que escolher?
              </h3>
            </div>
            <span className="text-3xl text-purple-600 group-hover:scale-125 transition-transform duration-300">
              {showHelp ? '−' : '+'}
            </span>
          </button>
          
          {showHelp && (
            <div className="mt-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-gray-800 leading-relaxed text-lg">
                "Respire fundo, Criadora. Pergunte ao seu corpo: <strong>'O que vai me nutrir agora?'</strong>. 
                Escolha uma proteína e uma gordura para saciedade, ou uma fruta para energia. 
                Coma com presença e pare quando sentir satisfação."
              </p>
            </div>
          )}
        </div>

        {/* SEÇÃO 4: PRINCÍPIOS DA CRIADORA */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Princípios da Criadora</h2>
          </div>
          
          <div className="space-y-4 text-white/95">
            <p className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-2xl flex-shrink-0">✨</span>
              <span>Coma até a satisfação, nunca até o estufamento.</span>
            </p>
            <p className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-2xl flex-shrink-0">✨</span>
              <span>Esqueça as calorias, foque na densidade nutricional.</span>
            </p>
            <p className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-2xl flex-shrink-0">✨</span>
              <span>Alimentos da terra e do pasto são seus aliados.</span>
            </p>
            <p className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-2xl flex-shrink-0">✨</span>
              <span>Você é livre, intuitiva e soberana sobre suas escolhas.</span>
            </p>
          </div>
        </div>

        {/* Mensagem Final Inspiradora */}
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl shadow-xl p-6 border-2 border-amber-300 text-center">
          <p className="text-gray-800 text-lg leading-relaxed">
            🌿 <strong>Você já é a mulher que faz escolhas perfeitas.</strong> 
            A Dieta da Selva não é uma restrição — é uma celebração da sua natureza ancestral e poderosa. 
            Confie no seu corpo, honre sua fome e nutra-se com sabedoria.
          </p>
        </div>
      </main>
    </div>
  );
}

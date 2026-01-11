'use client';

import { useState } from 'react';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import { Sparkles, Droplet, Moon, Heart } from 'lucide-react';

export default function CorpoPage() {
  const [habits, setHabits] = useState([
    { id: '1', title: 'Beber Água', icon: Droplet, completed: false, goal: '8 copos', current: 0 },
    { id: '2', title: 'Movimento Leve', icon: Sparkles, completed: false, goal: '20 min', current: 0 },
    { id: '3', title: 'Sono Reparador', icon: Moon, completed: false, goal: '7-8h', current: 0 },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
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
            <Sparkles className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Corpo</h1>
          </div>
          <p className="text-gray-600">Cuide do seu corpo com amor e leveza</p>
        </div>

        {/* Mensagem Inspiradora */}
        <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Lembre-se, Criadora</h3>
              <p className="text-white/90 leading-relaxed">
                Seu corpo não é seu inimigo. Ele é seu templo, seu lar. Cuide dele com gentileza, 
                não com punição. Cada gesto de amor que você oferece a ele é uma afirmação de que 
                você já é a mulher saudável que deseja ser.
              </p>
            </div>
          </div>
        </div>

        {/* Hábitos Simples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Hábitos Simples de Hoje</h2>
          
          <div className="space-y-3">
            {habits.map((habit) => {
              const Icon = habit.icon;
              return (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 cursor-pointer ${
                    habit.completed
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      habit.completed
                        ? 'bg-green-500'
                        : 'bg-gradient-to-br from-green-400 to-teal-400'
                    }`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{habit.title}</h3>
                      <p className="text-sm text-gray-600">Meta: {habit.goal}</p>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      habit.completed
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {habit.completed && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dicas de Movimento Leve */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Movimento com Leveza
          </h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-purple-600">Caminhada consciente:</span> 
                {' '}15-20 minutos ao ar livre, sentindo seu corpo se mover com naturalidade.
              </p>
            </div>
            
            <div className="p-4 bg-pink-50 rounded-xl">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-pink-600">Alongamento suave:</span> 
                {' '}10 minutos pela manhã ou à noite, conectando-se com seu corpo.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-green-600">Dança livre:</span> 
                {' '}Coloque uma música que você ama e dance sem julgamentos.
              </p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 italic text-center pt-2">
            Lembre-se: o movimento é uma celebração do seu corpo, não uma punição.
          </p>
        </div>

        {/* Hidratação */}
        <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl shadow-xl p-6 text-white">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              Hidratação é Amor Próprio
            </h3>
            <p className="text-white/90 leading-relaxed">
              Cada copo de água é um ato de cuidado. Sua versão magra e saudável se hidrata 
              naturalmente porque ela ama seu corpo. Assuma esse estado agora.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

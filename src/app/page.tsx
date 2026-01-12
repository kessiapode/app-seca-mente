'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import MoodSelector from '@/components/custom/mood-selector';
import ActivityCard from '@/components/custom/activity-card';
import MascotReminder from '@/components/custom/mascot-reminder';
import Logo from '@/components/custom/logo';
import { Sparkles, TrendingUp, Award, Heart } from 'lucide-react';
import { DAILY_STATES, AFFIRMATIONS, CONSCIOUSNESS_CHALLENGES } from '@/lib/constants';
import type { Mood } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>();
  const [dailyState, setDailyState] = useState('');
  const [showMascot, setShowMascot] = useState(false);
  const [activities, setActivities] = useState([
    { id: '1', title: 'Afirmação da Manhã', description: AFFIRMATIONS[0], duration: '2 min', completed: false, type: 'afirmacao' as const },
    { id: '2', title: CONSCIOUSNESS_CHALLENGES[0].title, description: CONSCIOUSNESS_CHALLENGES[0].description, duration: '5 min', completed: false, type: 'desafio' as const },
    { id: '3', title: 'Momento de Gratidão', description: 'Agradeça ao seu corpo por algo que ele faz por você hoje.', duration: '3 min', completed: false, type: 'desafio' as const },
  ]);
  const [progress, setProgress] = useState({ completed: 0, total: 3 });

  useEffect(() => {
    // Seleciona um estado diário baseado no dia do ano para rotação consistente
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const stateIndex = dayOfYear % DAILY_STATES.length;
    setDailyState(DAILY_STATES[stateIndex]);

    // Mostra o mascote após 5 segundos
    const mascotTimer = setTimeout(() => {
      setShowMascot(true);
    }, 5000);

    return () => clearTimeout(mascotTimer);
  }, []);

  const toggleActivity = (id: string) => {
    setActivities(prev => {
      const updated = prev.map(activity =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity
      );
      const completed = updated.filter(a => a.completed).length;
      setProgress({ completed, total: updated.length });
      return updated;
    });
  };

  const progressPercentage = (progress.completed / progress.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header com Logo e Saudação */}
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80">
              <Logo />
            </div>
          </div>
          
          {/* Mensagem de Boas-Vindas Atualizada */}
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Bem-vinda à sua nova realidade, Criadora! 💚
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Aqui, o corpo que você deseja já é seu. Estamos apenas alinhando a sua mente para que a sua realidade física se manifeste. Respire fundo, escolha sua prática de hoje e sinta a transformação acontecer de dentro para fora.
            </p>
          </div>

          {/* Botão Descobrir Meu Perfil */}
          <div className="pt-4">
            <button
              onClick={() => router.push('/quiz')}
              className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Descobrir Meu Perfil
            </button>
          </div>

          {/* Botão CTA - Começar Jornada */}
          <div className="pt-2">
            <button
              onClick={() => router.push('/auth')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Começar minha jornada no SecaMente
            </button>
          </div>
        </div>

        {/* Card "Por que o SecaMente é diferente?" */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-purple-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Por que o SecaMente é diferente?
            </h3>
          </div>
          
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p className="flex items-start gap-3">
              <span className="text-purple-600 font-bold flex-shrink-0">•</span>
              <span>Não é mais uma dieta, é uma mudança de identidade.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-purple-600 font-bold flex-shrink-0">•</span>
              <span>Você assume hoje o estado da mulher magra e em paz com a comida.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-purple-600 font-bold flex-shrink-0">•</span>
              <span>Atividades rápidas, leves e divertidas que falam com o seu inconsciente.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-purple-600 font-bold flex-shrink-0">•</span>
              <span>Lembretes gentis que te tiram do piloto automático e te trazem de volta para a consciência.</span>
            </p>
          </div>
        </div>

        {/* Seletor de Humor */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
          <p className="text-gray-600 text-lg mb-4 text-center">Como você está se sentindo hoje?</p>
          <MoodSelector onMoodSelect={setSelectedMood} selectedMood={selectedMood} />
        </div>

        {/* Estado Assumido do Dia */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Estado Assumido do Dia</h3>
              <p className="text-white/90 leading-relaxed">{dailyState}</p>
            </div>
          </div>
        </div>

        {/* Progresso do Dia */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Progresso de Hoje</h3>
                <p className="text-sm text-gray-600">{progress.completed} de {progress.total} atividades</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-purple-600">{progress.completed * 10}</span>
              <span className="text-sm text-gray-600">pts</span>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Atividades do Dia */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>✨</span>
            Atividades de Reprogramação
          </h3>
          <div className="space-y-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                duration={activity.duration}
                completed={activity.completed}
                onToggle={() => toggleActivity(activity.id)}
                type={activity.type}
              />
            ))}
          </div>
        </div>

        {/* Mensagem de Encorajamento */}
        {progress.completed === progress.total && (
          <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-3xl shadow-xl p-6 text-white text-center space-y-3 animate-in fade-in duration-500">
            <div className="text-5xl">🎉</div>
            <h3 className="text-xl font-semibold">Parabéns, Criadora!</h3>
            <p className="text-white/90">Você completou todas as atividades de hoje. Continue assumindo o estado da mulher que você já é!</p>
          </div>
        )}
      </main>

      {/* Mascote de Lembrete - estilo Duolingo */}
      {showMascot && <MascotReminder onClose={() => setShowMascot(false)} />}
    </div>
  );
}

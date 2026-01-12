'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Qual o seu maior "sabotador" hoje?',
    options: [
      { value: 'emocional', label: 'Fome emocional (como quando estou triste ou estressada)' },
      { value: 'beliscar', label: 'Beliscar o dia todo sem perceber' },
      { value: 'desistir', label: 'Desistir na primeira falha' },
    ],
  },
  {
    id: 2,
    question: 'Como é o seu diálogo interno sobre o seu corpo?',
    options: [
      { value: 'critica', label: 'Sou muito crítica e me sinto culpada' },
      { value: 'nunca', label: 'Sinto que nunca vou conseguir mudar' },
      { value: 'gentil', label: 'Estou tentando ser mais gentil, mas é difícil' },
    ],
  },
  {
    id: 3,
    question: 'Em qual período do dia sua mente fica mais "agitada" em relação à comida?',
    options: [
      { value: 'manha', label: 'Logo ao acordar (ansiedade pelo dia)' },
      { value: 'tarde', label: 'No meio da tarde (tédio ou cansaço)' },
      { value: 'noite', label: 'À noite, antes de dormir (recompensa pelo dia difícil)' },
    ],
  },
  {
    id: 4,
    question: 'Qual o seu nível de familiaridade com a Lei da Assunção?',
    options: [
      { value: 'pratico', label: 'Já pratico e acredito totalmente' },
      { value: 'conheco', label: 'Conheço um pouco, mas tenho dificuldade em aplicar' },
      { value: 'nova', label: 'Sou nova nisso e quero aprender' },
    ],
  },
  {
    id: 5,
    question: 'O que você mais deseja sentir ao se olhar no espelho daqui a 30 dias?',
    options: [
      { value: 'orgulho', label: 'Orgulho e leveza' },
      { value: 'paz', label: 'Paz e aceitação' },
      { value: 'controle', label: 'Controle total sobre minhas escolhas' },
    ],
  },
  {
    id: 6,
    question: 'Você está pronta para assumir agora a versão de você que já é magra e saudável?',
    options: [
      { value: 'sim', label: 'Sim, estou pronta!' },
      { value: 'medo', label: 'Tenho medo, mas quero tentar' },
      { value: 'ajuda', label: 'Preciso de ajuda para acreditar' },
    ],
  },
];

const PROFILE_RESULTS = {
  emocional: {
    title: 'Emagrecimento Emocional',
    message: 'Criadora, seu perfil é de Emagrecimento Emocional. Recomendamos que você comece pelos áudios de Paz Interior e Reprogramação Anti-Compulsão.',
    gradient: 'from-purple-500 to-pink-500',
  },
  beliscar: {
    title: 'Emagrecimento Consciente',
    message: 'Criadora, seu perfil é de Emagrecimento Consciente. Recomendamos que você comece pelos áudios de Foco e Presença no Momento.',
    gradient: 'from-green-400 to-teal-400',
  },
  desistir: {
    title: 'Emagrecimento Resiliente',
    message: 'Criadora, seu perfil é de Emagrecimento Resiliente. Recomendamos que você comece pelos áudios de Persistência Inabalável e Autoconfiança.',
    gradient: 'from-blue-500 to-indigo-500',
  },
};

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion + 1]: value });
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const currentAnswer = answers[currentQuestion + 1];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const profileType = answers[1] as keyof typeof PROFILE_RESULTS;
  const result = PROFILE_RESULTS[profileType];

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
        <Navigation />
        
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
            {/* Ícone de Celebração */}
            <div className="text-center space-y-4">
              <div className="text-7xl animate-bounce">✨</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Seu Perfil foi Descoberto!
              </h1>
            </div>

            {/* Resultado */}
            <div className={`bg-gradient-to-br ${result.gradient} rounded-2xl p-8 text-white space-y-4`}>
              <div className="flex items-center gap-3 justify-center">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-2xl md:text-3xl font-bold">{result.title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-center">
                {result.message}
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Começar Minha Jornada
              </button>
              <button
                onClick={handleRestart}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Refazer o Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Descubra seu Perfil de Criadora
              </h1>
            </div>
            <p className="text-gray-600">
              Pergunta {currentQuestion + 1} de {QUIZ_QUESTIONS.length}
            </p>
          </div>

          {/* Barra de Progresso */}
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Pergunta */}
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
              {question.question}
            </h2>

            {/* Opções */}
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    currentAnswer === option.value
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        currentAnswer === option.value
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {currentAnswer === option.value && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700 leading-relaxed">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Botões de Navegação */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                !currentAnswer
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado' : 'Próxima'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

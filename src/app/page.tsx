'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const modulos = [
    { nome: 'Meditações', icon: '🎧' },
    { nome: 'Dieta Mental', icon: '🥗' },
    { nome: 'Diário', icon: '✍️' },
    { nome: 'Afirmações', icon: '📜' },
    { nome: 'Mente', icon: '🧠' },
    { nome: 'Alimentação', icon: '🍎' },
    { nome: 'Sono', icon: '😴' },
    { nome: 'Emoções', icon: '💜' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="text-center mt-10 mb-8">
        <h1 className="text-4xl font-bold text-purple-900 mb-3">Olá, Criadora! ✨</h1>
        <p className="text-purple-600 text-lg max-w-md mx-auto leading-relaxed">
          Sua jornada de transformação mental e física começa aqui. 
          Faça login para acessar seu conteúdo exclusivo.
        </p>
      </header>

      {/* Painel Bloqueado (Vitrine) */}
      <section className="bg-white p-6 rounded-3xl shadow-xl border border-purple-100 w-full max-w-md mb-10">
        <h2 className="text-center font-bold text-gray-400 mb-6 uppercase tracking-widest text-xs">
          Painel VIP (Bloqueado)
        </h2>
        <div className="grid grid-cols-2 gap-4 opacity-40">
          {modulos.map((m) => (
            <div 
              key={m.nome} 
              className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center border border-dashed border-gray-300 relative"
            >
              <span className="text-3xl mb-2">{m.icon}</span>
              <span className="text-xs font-bold text-gray-500 text-center">{m.nome}</span>
              <span className="absolute top-2 right-2 text-lg">🔒</span>
            </div>
          ))}
        </div>
      </section>

      {/* Botões de Ação */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button 
          onClick={() => router.push('/auth')}
          className="bg-purple-600 text-white font-bold py-5 px-8 rounded-2xl shadow-lg text-xl hover:bg-purple-700 transition-all animate-pulse"
        >
          QUERO SER VIP 💎
        </button>
        
        <button 
          onClick={() => router.push('/auth')}
          className="text-purple-500 font-medium text-sm hover:text-purple-700 transition-all"
        >
          Já sou VIP? Fazer Login →
        </button>
      </div>

      {/* Rodapé */}
      <footer className="mt-auto py-8 text-gray-400 text-xs text-center">
        Seca Mente - O método Neville Goddard para o seu corpo
      </footer>
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';

export default function MentePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const afirmacoes = [
    'Eu já sou a mulher magra e confiante que desejo ser.',
    'Meu corpo responde com facilidade aos comandos da minha mente.',
    'Cada escolha que faço hoje está alinhada com a minha versão magra.',
    'Eu mereço me sentir leve, bonita e em paz com meu corpo.',
    'Comida não manda em mim. Eu escolho com consciência e amor.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <BackToHomeButton />

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Afirmações para a Mente 💚
          </h1>
          <p className="text-gray-600">
            Leia em voz alta, sentindo como se isso já fosse verdade agora.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {afirmacoes.map((texto, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-5 border border-purple-100"
            >
              <p className="text-sm text-gray-700 leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

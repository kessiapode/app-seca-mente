'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import BackToHomeButton from '@/components/custom/back-to-home-button';
import { Headphones } from 'lucide-react';

interface Meditacao {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  audio_url: string;
}

export default function MeditacoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [meditacoes, setMeditacoes] = useState<Meditacao[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
        return;
      }

      // Buscar meditações do Supabase
      const { data, error } = await supabase
        .from('meditacoes')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMeditacoes(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 pb-24 md:pb-8 md:pt-20">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <BackToHomeButton />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Headphones className="w-10 h-10 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Meditações Guiadas</h1>
          </div>
          <p className="text-gray-600">
            Ouça diariamente para reprogramar sua mente e assumir sua nova identidade.
          </p>
        </div>

        {/* Lista de Meditações */}
        <div className="grid gap-6 md:grid-cols-3">
          {meditacoes.length === 0 ? (
            <div className="col-span-3 bg-white rounded-3xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Nenhuma meditação encontrada ainda.</p>
            </div>
          ) : (
            meditacoes.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-3xl shadow-lg p-6 border border-purple-100 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {med.duracao}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">{med.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{med.descricao}</p>
                </div>

                {/* Player de Áudio /}
                <audio controls className="w-full">
                  <source src={med.audio_url} type="audio/mpeg" />
                  Seu navegador não suporta áudio.
                </audio>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

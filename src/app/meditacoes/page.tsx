'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function MeditacoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Se não estiver logado, manda para o login
        router.replace('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-purple-800">Minhas Afirmações ✨</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-sm text-purple-600 font-medium hover:text-purple-800"
          >
            ← Voltar
          </button>
        </header>

        <div className="space-y-4">
          {/* Card de Áudio 1 */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-100">
            <h3 className="font-bold text-purple-900 mb-2">Afirmação: Eu sou Criadora</h3>
            <audio controls className="w-full">
              <source src="SUA_URL_DO_AUDIO_AQUI" type="audio/mpeg" />
              Seu navegador não suporta áudio.
            </audio>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Mais áudios serão liberados em breve!
          </p>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function MeditacoesPage() {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* HEADER COM NAVEGAÇÃO CORRIGIDA */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center p-4 gap-4">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="text-purple-600 text-3xl font-bold"
          >
            ←
          </button>
          
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-1 flex-1">
            <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center text-gray-400 min-w-[60px]">
              <span className="text-2xl">🏠</span>
              <span className="text-[11px] font-bold uppercase">Início</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-purple-600 min-w-[60px]">
              <span className="text-2xl">🧠</span>
              <span className="text-[11px] font-black uppercase">Mente</span>
            </button>
            <button onClick={() => router.push('/meditacoes')} className="flex flex-col items-center text-purple-600 min-w-[60px]">
              <span className="text-2xl">🎧</span>
              <span className="text-[11px] font-black uppercase">Áudios</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-8">
        <h2 className="text-3xl font-black text-purple-900 leading-tight">
          Meditações & Afirmações 🎧
        </h2>
        
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-purple-100 text-center">
          <p className="text-lg text-gray-600 font-medium">
            Seus áudios de reprogramação mental estão sendo preparados. 
            Em breve, você poderá ouvir suas afirmações aqui!
          </p>
        </div>
      </main>
    </div>
  );
}

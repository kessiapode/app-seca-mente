
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { BookOpen, CheckCircle2, Save } from 'lucide-react';

export default function DiarioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [texto, setTexto] = useState('');
  const [vitorias, setVitorias] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const opcoesVitorias = [
    "Comi com consciência e presença",
    "Respeitei minha saciedade",
    "Escolhi nutrir meu corpo com amor",
    "Bebi água suficiente",
    "Fiz minha meditação do dia",
    "Me olhei com carinho no espelho"
  ];

  const toggleVitoria = (vitoria: string) => {
    setVitorias(prev => 
      prev.includes(vitoria) ? prev.filter(v => v !== vitoria) : [...prev, vitoria]
    );
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/auth'); return; }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const salvarDiario = async () => {
    setSaving(true);
    // Aqui no futuro podemos salvar no Supabase, por enquanto vamos dar o feedback visual
    setTimeout(() => {
      setMessage('Diário de vitórias selado! 🌟');
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;

  return (
    <div className="min-h-screen bg-pink-50 pb-24">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-purple-600 text-3xl font-bold">←</button>
          <Navigation />
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <BookOpen className="w-10 h-10 text-pink-500 mx-auto" />
          <h1 className="text-2xl font-black text-gray-800">Diário da Criadora</h1>
          <p className="text-sm text-gray-600 italic">Celebre suas vitórias de hoje, por menores que pareçam.</p>
        </div>

        {/* Seção de Check-in de Vitórias */}
        <div className="bg-white p-6 rounded-[35px] shadow-lg border border-pink-100 space-y-4">
          <h3 className="font-bold text-pink-900 text-sm uppercase tracking-wider">Vitórias da Nova Identidade:</h3>
          <div className="space-y-3">
            {opcoesVitorias.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleVitoria(opt)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left text-sm font-semibold ${
                  vitorias.includes(opt) 
                  ? 'border-pink-500 bg-pink-50 text-pink-700' 
                  : 'border-gray-100 bg-gray-50 text-gray-500'
                }`}
              >
                <CheckCircle2 className={vitorias.includes(opt) ? 'text-pink-500' : 'text-gray-300'} />
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Campo de Texto Livre */}
        <div className="space-y-2">
          <h3 className="font-bold text-pink-900 text-sm uppercase tracking-wider ml-2">Notas do Coração:</h3>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Como você se sentiu hoje sendo sua nova versão?"
            className="w-full h-40 p-6 rounded-[30px] border-2 border-pink-100 focus:border-pink-400 focus:outline-none text-gray-700 text-sm leading-relaxed shadow-inner"
          />
        </div>

        <button
          onClick={salvarDiario}
          disabled={saving}
          className="w-full bg-pink-500 text-white py-4 rounded-3xl font-bold shadow-lg shadow-pink-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Salvando...' : 'Salvar no meu Diário'}
        </button>

        {message && <p className="text-center text-pink-600 font-bold text-sm animate-bounce">{message}</p>}
      </main>
    </div>
  );
}

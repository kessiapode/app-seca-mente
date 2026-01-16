'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { Sparkles, Save, Heart } from 'lucide-react';

export default function CartaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [carta, setCarta] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCarta = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('carta_futuro')
        .eq('id', session.user.id)
        .single();

      if (profile?.carta_futuro) {
        setCarta(profile.carta_futuro);
      }
      setLoading(false);
    };
    loadCarta();
  }, [router]);

  const salvarCarta = async () => {
    setSaving(true);
    setMessage('');
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase
      .from('profiles')
      .update({ carta_futuro: carta })
      .eq('id', session?.user.id);

    if (error) {
      setMessage('Erro ao salvar. Tente novamente.');
    } else {
      setMessage('Sua visão foi selada com sucesso! ✨');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>;

  return (
    <div className="min-h-screen bg-[#FFFBF2] pb-24">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-purple-600 text-3xl font-bold">←</button>
          <Navigation />
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2 text-orange-400">
            <Sparkles /> <Heart /> <Sparkles />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800">Carta para o Futuro</h1>
          <p className="text-sm text-gray-600 italic">Escreva para a mulher que você já é no futuro. Agradeça a ela por ter chegado lá.</p>
        </div>

        <div className="relative">
          <textarea
            value={carta}
            onChange={(e) => setCarta(e.target.value)}
            placeholder="Querida eu do futuro, obrigada por não desistir de nós..."
            className="w-full h-[400px] p-8 bg-white rounded-[40px] border-2 border-orange-100 shadow-inner text-gray-700 font-serif leading-relaxed focus:ring-2 focus:ring-orange-200 focus:outline-none resize-none"
          />
          <div className="absolute bottom-6 right-8 opacity-20">
            <Heart size={40} className="text-orange-500" />
          </div>
        </div>

        <button
          onClick={salvarCarta}
          disabled={saving}
          className="w-full bg-orange-400 text-white py-4 rounded-3xl font-bold shadow-lg shadow-orange-100 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Selando...' : 'Selar minha Visão'}
        </button>

        {message && <p className="text-center text-orange-600 font-bold text-sm animate-pulse">{message}</p>}

        <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
          <p className="text-xs text-orange-800 leading-relaxed">
            <strong>Dica da Criadora:</strong> Não escreva o que você "quer" ter. Escreva como se você <strong>já tivesse</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}

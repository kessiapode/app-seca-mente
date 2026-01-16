'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { BookOpen, Sparkles, Lightbulb, Save, Calendar } from 'lucide-react';

type DiarioEntry = {
  id: string;
  created_at: string;
  texto: string | null;
  vitorias: string | null;
};

export default function DiarioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [texto, setTexto] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<DiarioEntry[]>([]);
  const [vitorias, setVitorias] = useState<string[]>([]);

  // Prompts divertidos
  const prompts = [
    'Descreva como é um dia comum da sua versão que já chegou no peso desejado.',
    'Como você se sente ao se olhar no espelho hoje, sabendo que já é vitoriosa?',
    'Qual escolha consciente você fez hoje que te deixou orgulhosa?',
    'Descreva a sensação de leveza que você sente ao caminhar agora.',
  ];
  const [promptAtivo, setPromptAtivo] = useState(prompts[0]);

  const opcoesVitorias = [
    'Comi com consciência e presença',
    'Respeitei minha saciedade',
    'Escolhi nutrir meu corpo com amor',
    'Bebi água suficiente',
    'Fiz minha meditação do dia',
    'Me olhei com carinho no espelho',
  ];

  const toggleVitoria = (vitoria: string) => {
    setVitorias((prev) =>
      prev.includes(vitoria)
        ? prev.filter((v) => v !== vitoria)
        : [...prev, vitoria]
    );
  };

  const trocarPrompt = () => {
    const novo = prompts[Math.floor(Math.random() * prompts.length)];
    setPromptAtivo(novo);
  };

  useEffect(() => {
    const carregar = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
        return;
      }

      // Carregar entradas antigas deste usuário
      const { data } = await supabase
        .from('diario_entries')
        .select('id, created_at, texto, vitorias')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setEntries(data as DiarioEntry[]);
      }

      setLoading(false);
    };

    carregar();
  }, [router]);

  const salvarDiario = async () => {
    setSaving(true);
    setMessage('');

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.replace('/auth');
      return;
    }

    const vitoriasTexto = vitorias.join(' • ');

    const { data, error } = await supabase
      .from('diario_entries')
      .insert({
        user_id: session.user.id,
        texto,
        vitorias: vitoriasTexto,
      })
      .select('id, created_at, texto, vitorias')
      .single();

    if (error) {
      setMessage('Erro ao salvar. Tente novamente.');
    } else if (data) {
      // Coloca a nova entrada no topo da lista
      setEntries((prev) => [data as DiarioEntry, ...prev]);
      setMessage('Sua história de hoje foi selada! ✨');
      // Limpa campos para o próximo dia
      setTexto('');
      setVitorias([]);
    }

    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 text-3xl font-bold"
          >
            ←
          </button>
          <Navigation />
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2 text-purple-600">
            <BookOpen size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-800">
            Diário da Nova Identidade
          </h1>
          <p className="text-sm text-gray-500">
            Escreva como se você já fosse a mulher que deseja ser.
          </p>
        </div>

        {/* Card roxo do poder da escrita */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-[30px] text-white shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 opacity-80" />
            <h3 className="font-bold text-lg">O Poder da Escrita</h3>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            Quando você escreve a partir do estado assumido, sua mente
            inconsciente começa a aceitar isso como realidade. Escreva
            sentindo, como se já estivesse vivendo isso.
          </p>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <BookOpen size={100} />
          </div>
        </div>

        {/* Prompt do dia */}
        <div className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-yellow-600">
              <Lightbulb size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Prompt de Hoje
              </span>
            </div>
            <button
              onClick={trocarPrompt}
              className="text-[10px] font-bold text-purple-600 underline"
            >
              Outro prompt
            </button>
          </div>
          <p className="text-sm text-gray-700 font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
            "{promptAtivo}"
          </p>
        </div>

        {/* Vitórias do dia */}
        <div className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Vitórias de hoje
          </h3>
          <div className="space-y-2">
            {opcoesVitorias.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleVitoria(opt)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left text-xs font-semibold transition-all ${
                  vitorias.includes(opt)
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-100 bg-gray-50 text-gray-500'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    vitorias.includes(opt)
                      ? 'border-pink-500 bg-pink-500'
                      : 'border-gray-300 bg-white'
                  }`}
                />
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Área de escrita */}
        <div className="bg-white p-6 rounded-[30px] shadow-md border border-gray-100 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Escreva sua história
          </h3>
          <p className="text-[11px] text-gray-400 italic">
            Comece com: "Hoje, como a minha versão magra e confiante, eu..."
          </p>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Hoje, como a minha versão magra e confiante, eu acordei me sentindo leve..."
            className="w-full h-40 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-200 text-sm text-gray-700 leading-relaxed resize-none"
          />
        </div>

        <button
          onClick={salvarDiario}
          disabled={saving}
          className="w-full bg-purple-600 text-white py-4 rounded-3xl font-bold shadow-lg shadow-purple-100 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Salvando...' : 'Salvar no meu Diário'}
        </button>

        {message && (
          <p className="text-center text-green-600 font-bold text-sm animate-bounce">
            {message}
          </p>
        )}

        {/* Lista de entradas anteriores */}
        {entries.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Entradas anteriores
            </h3>
            {entries.map((entry) => {
              const data = new Date(entry.created_at);
              const dataFormatada = data.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              });
              return (
                <div
                  key={entry.id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar size={14} />
                    <span>{dataFormatada}</span>
                  </div>
                  {entry.vitorias && (
                    <p className="text-[11px] text-pink-600 font-semibold">
                      {entry.vitorias}
                    </p>
                  )}
                  {entry.texto && (
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {entry.texto}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

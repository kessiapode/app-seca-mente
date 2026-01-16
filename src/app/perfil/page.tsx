
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/auth');
        return;
      }

      setEmail(session.user.email ?? '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (profile?.full_name) setNome(profile.full_name);
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header com Seta Forçada para o Dashboard */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center gap-4 p-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 text-3xl font-bold"
          >
            ←
          </button>
          <h1 className="text-xl font-black text-purple-900">Meu Perfil</h1>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-[40px] shadow-sm border border-purple-100 space-y-4">
          <h2 className="text-2xl font-black text-purple-900">Informações da Criadora</h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              Nome: <span className="font-bold text-gray-900">{nome || 'Criadora'}</span>
            </p>
            <p className="text-lg text-gray-600 break-all">
              E-mail: <span className="font-bold text-gray-900">{email}</span>
            </p>
          </div>
        </section>

        <section className="bg-purple-50 p-8 rounded-[40px] border border-purple-100 space-y-6">
          <h3 className="text-2xl font-black text-purple-900">Seu Estado Atual</h3>
          <p className="text-lg text-purple-700 font-medium leading-relaxed">
            Qual identidade você está escolhendo assumir hoje?
          </p>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-purple-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl active:scale-95 transition-all"
          >
            Voltar para o Início
          </button>
        </section>
      </main>
    </div>
  );
}

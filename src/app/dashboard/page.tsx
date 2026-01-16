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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header com seta de voltar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center p-4 gap-3">
          <button
            onClick={() => router.back()}
            className="text-purple-600 text-3xl font-bold hover:opacity-70 transition-all"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-purple-900">Meu Perfil</h1>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-6">
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 space-y-3">
          <h2 className="text-xl font-bold text-purple-900">Informações da Criadora</h2>
          <p className="text-sm text-gray-600">
            Nome: <span className="font-semibold">{nome || 'Não informado'}</span>
          </p>
          <p className="text-sm text-gray-600 break-all">
            E-mail: <span className="font-semibold">{email}</span>
          </p>
        </section>

        <section className="bg-purple-50 p-6 rounded-3xl border border-purple-100 space-y-3">
          <h3 className="text-lg font-bold text-purple-900">Seu Estado Atual</h3>
          <p className="text-sm text-purple-700">
            Aqui você pode refletir: qual identidade você está assumindo hoje?
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-purple-600 text-white py-3 rounded-2xl font-bold mt-2"
          >
            Voltar para o Início
          </button>
        </section>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const KIWIFY_CHECKOUT_URL = 'https://pay.kiwify.com.br/Ouj0j7q';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      // Se não estiver logada, precisa logar antes de pagar (pra gente saber quem liberar)
      if (!session) {
        router.replace('/auth');
        return;
      }

      setEmail(session.user.email ?? '');
      setLoading(false);
    };

    init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <header className="text-center mt-10 mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">Quase lá, Criadora! 💎</h1>
          <p className="text-purple-600 text-sm leading-relaxed">
            Para desbloquear todo o conteúdo VIP do <b>Seca Mente</b>, conclua o pagamento.
          </p>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-purple-100 mb-6">
          <p className="text-sm text-gray-700 mb-3">
            Você está logada como:
          </p>
          <p className="font-bold text-purple-900 break-all">{email}</p>

          <div className="mt-5 text-xs text-gray-500 leading-relaxed">
            Após o pagamento, seu acesso VIP será liberado para este e-mail.
          </div>
        </div>

        <a
          href={KIWIFY_CHECKOUT_URL}
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center bg-purple-600 text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-purple-700 transition-all"
        >
          IR PARA O PAGAMENTO NA KIWIFY →
        </a>

        <button
          onClick={() => router.push('/')}
          className="w-full mt-6 text-gray-400 text-xs underline hover:text-gray-600 transition-all"
        >
          ← Voltar
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
          }}
          className="w-full mt-3 text-gray-400 text-xs underline hover:text-gray-600 transition-all"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}

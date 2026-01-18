'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingLink, setProcessingLink] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Ao entrar na página, checar query params para tentar validar/ativar sessão
    async function handleUrlParams() {
      try {
        const params = new URLSearchParams(window.location.search);
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        const type = params.get('type');
        const token = params.get('token');

        // Caso 1: link com access_token / refresh_token (padrão de alguns flows)
        if (access_token) {
          setMessage('Validando sessão...');
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token ?? undefined,
          } as any); // cast para compatibilidade com diferentes versões
          if (error) {
            setMessage('Não foi possível validar a sessão: ' + error.message);
          } else {
            setMessage('Sessão validada. Você pode agora definir uma nova senha.');
          }
          setProcessingLink(false);
          return;
        }

        // Caso 2: link de recuperação que usa token e type=recovery
        if (type === 'recovery' && token) {
          setMessage('Verificando link de recuperação...');
          // verifyOtp pode trocar token por sessão em algumas versões do client
          // Usamos a API genérica verifyOtp quando disponível
          if ((supabase.auth as any).verifyOtp) {
            const resp = await (supabase.auth as any).verifyOtp({
              type: 'recovery',
              token,
            });
            if (resp?.error) {
              setMessage('Token inválido ou expirado: ' + resp.error.message);
              setProcessingLink(false);
              return;
            }
            // resp pode retornar session automaticamente dependendo da versão
            setMessage('Link verificado. Você pode agora definir uma nova senha.');
            setProcessingLink(false);
            return;
          } else {
            // fallback: informar usuário
            setMessage('Este link de recuperação não pôde ser automaticamente processado. Tente solicitar um novo link.');
            setProcessingLink(false);
            return;
          }
        }

        // Nenhum token presente
        setMessage('Abra este link a partir do e-mail de recuperação. Se chegou aqui sem token, solicite um novo link de recuperação.');
      } catch (err: any) {
        setMessage('Erro ao processar o link: ' + (err?.message ?? err));
      } finally {
        setProcessingLink(false);
      }
    }

    handleUrlParams();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!password || password.length < 6) {
      setMessage('A senha deve ter ao menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      } as any);

      if (error) throw error;

      setMessage('Senha atualizada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        router.push('/auth');
      }, 1800);
    } catch (err: any) {
      setMessage('Erro ao atualizar senha: ' + (err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-purple-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-purple-900 mb-2">Redefinir Senha 🔐</h1>
          <p className="text-gray-600 text-sm">
            Use o formulário abaixo para cadastrar uma nova senha para sua conta.
          </p>
        </div>

        {processingLink ? (
          <div className="text-center p-6">
            <p className="text-sm text-gray-600">Processando link... aguarde.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nova Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                  placeholder="Digite a nova senha (mín. 6 caracteres)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Atualizando...' : 'Salvar Nova Senha'}
              </button>
            </form>

            {message && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl text-sm text-purple-800 text-center">
                {message}
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/auth')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Voltar para login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

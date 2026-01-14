'use client';

import { Sparkles, Crown } from 'lucide-react';

export default function VipLockScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ✨ Conteúdo Exclusivo para Criadoras VIP
            </h1>
          </div>

          <div className="p-8 md:p-12 space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              <span className="font-semibold text-purple-600">Olá, Criadora!</span> Este conteúdo faz parte do método completo <strong>Seca Mente</strong>. 
              Para liberar os <strong>áudios de reprogramação</strong>, o <strong>guia de nutrição ancestral</strong> e o <strong>checklist de sono</strong>, clique no botão abaixo.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                O que você vai desbloquear:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold text-xl">•</span>
                  <span><strong>Afirmações de Poder:</strong> Áudios guiados para reprogramação mental profunda</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold text-xl">•</span>
                  <span><strong>Dieta da Selva:</strong> Guia completo de nutrição ancestral e intuitiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold text-xl">•</span>
                  <span><strong>Sono Reparador:</strong> Checklist e visualizações para transformação noturna</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="https://pay.kiwify.com.br/Ouj0j7q"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-700 hover:via-pink-700 hover:to-amber-700 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                <span className="flex items-center justify-center gap-3">
                  <Crown className="w-6 h-6" />
                  QUERO MEU ACESSO VIP AGORA
                  <Crown className="w-6 h-6" />
                </span>
              </a>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <p className="text-green-800 text-center font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                ✨ Assim que seu pagamento for aprovado, seu acesso será liberado automaticamente em instantes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

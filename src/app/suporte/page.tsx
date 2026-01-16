'use client';

import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { MessageCircle, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function SuportePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Simples */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-gray-800">Central de Ajuda</h1>
        </div>
      </nav>

      <main className="max-w-md mx-auto p-6 space-y-8">
        <div className="text-center space-y-3 pt-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-800 leading-tight">Estamos aqui por você!</h1>
          <p className="text-gray-600 text-sm">Qualquer dúvida ou dificuldade, nossa equipe está pronta para te acolher.</p>
        </div>

        <div className="space-y-4">
          {/* BOTÃO WHATSAPP - TROQUE O NÚMERO ABAIXO */}
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white p-6 rounded-[30px] shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="bg-green-500 p-4 rounded-2xl text-white shadow-lg shadow-green-100">
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Suporte via WhatsApp</h3>
              <p className="text-xs text-gray-500">Atendimento rápido e humano.</p>
            </div>
          </a>

          {/* BOTÃO E-MAIL - TROQUE O E-MAIL ABAIXO */}
          <a 
            href="mailto:suporte@secamente.com" 
            className="flex items-center gap-4 bg-white p-6 rounded-[30px] shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="bg-purple-500 p-4 rounded-2xl text-white shadow-lg shadow-purple-100">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Suporte via E-mail</h3>
              <p className="text-xs text-gray-500">Para dúvidas mais detalhadas.</p>
            </div>
          </a>
        </div>

        <div className="bg-purple-50 p-6 rounded-[30px] text-center border border-purple-100">
          <p className="text-[11px] text-purple-800 font-bold uppercase tracking-widest mb-1">
            Horário de Atendimento
          </p>
          <p className="text-sm text-purple-900">
            Segunda a Sexta, das 09h às 18h.
          </p>
        </div>

        <p className="text-center text-[10px] text-gray-400 px-8">
          Ao entrar em contato, informe o e-mail utilizado no cadastro para agilizar seu atendimento.
        </p>
      </main>
    </div>
  );
}

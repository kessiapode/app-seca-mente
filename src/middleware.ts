import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Middleware simplificado sem @supabase/ssr
  // Permite acesso livre a todas as rotas
  // Para proteção de rotas, implemente verificação no lado do cliente
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

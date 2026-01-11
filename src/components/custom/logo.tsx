'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/291d973e-ccaf-4a5f-9829-9a4619dd6b2b.png" 
        alt="SecaMente - Emagrecimento que começa na mente" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}

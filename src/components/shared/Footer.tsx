'use client';

import React from 'react';
import Image from 'next/image';
import { LangKey } from '@/types';
import { TRANSLATIONS } from '@/constants/translations';

interface FooterProps {
  lang: LangKey;
  onOpenArchModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenArchModal }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2.5">
          <Image
            src="/sri-lanka-emblem.svg"
            alt="Government of Sri Lanka"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>
            <strong>{t.deptName}</strong> • Sir Chittampalam A. Gardiner Mawatha, Colombo 02
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Inland Revenue Help Desk: 1944</span>
          <span>•</span>
          <button
            onClick={onOpenArchModal}
            className="text-slate-700 hover:text-emerald-700 font-semibold underline underline-offset-4 cursor-pointer"
          >
            System Architecture Map
          </button>
        </div>
      </div>
    </footer>
  );
};


'use client';

import React from 'react';
import Image from 'next/image';
import { LangKey } from '@/types';
import { TRANSLATIONS } from '@/constants/translations';

// Clean inline GitHub SVG icon
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

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
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span>Inland Revenue Help Desk: 1944</span>
          <span className="hidden sm:inline">•</span>
          <a
            href="https://github.com/ShenSandaru"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center p-[1.5px] rounded-xl overflow-hidden group cursor-pointer transition transform hover:scale-[1.03] shadow-xs"
            title="Shen Sandaru GitHub Profile"
          >
            {/* Moving Glow Border Line */}
            <span className="absolute inset-[-1000%] animate-spin-border bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#34d399_25%,#059669_50%,#34d399_75%,#10b981_100%)] opacity-85 group-hover:opacity-100 blur-[0.5px]" />

            {/* Inner Content Badge */}
            <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] bg-slate-900 text-white font-semibold text-xs transition duration-200 group-hover:bg-slate-950">
              <span className="bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-clip-text text-transparent">
                Proposed by Shen
              </span>
              <GithubIcon className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300 transition" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};


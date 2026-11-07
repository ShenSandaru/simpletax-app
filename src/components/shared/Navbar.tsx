'use client';

import React from 'react';
import Image from 'next/image';
import { LangKey, AppRoute } from '@/types';
import { TRANSLATIONS } from '@/constants/translations';

interface NavbarProps {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  onOpenCaseStudy?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  currentRoute,
  setCurrentRoute,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      {/* Official Government Utility Top Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-medium text-slate-200 truncate">{t.govBanner}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded border border-slate-700">
              {[
                { code: 'en' as LangKey, label: 'EN' },
                { code: 'si' as LangKey, label: 'සිං' },
                { code: 'ta' as LangKey, label: 'தமி' }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                    lang === item.code
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Emblem & Portal Title */}
        <button
          onClick={() => setCurrentRoute('/')}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
        >
          <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
            <Image
              src="/sri-lanka-emblem.svg"
              alt="Official Government Emblem of Sri Lanka"
              width={44}
              height={44}
              className="object-contain drop-shadow-xs"
              priority
            />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg text-slate-900 leading-tight block group-hover:text-emerald-900 transition">
              {t.deptName}
            </span>
            <span className="text-xs text-slate-500 font-medium">{t.deptSub}</span>
          </div>
        </button>

        {/* Direct Action Navigation */}
        <nav className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentRoute('/')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentRoute === '/'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navHome}
          </button>

          <button
            onClick={() => setCurrentRoute('/get-tin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              currentRoute === '/get-tin'
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {t.navGetTin}
          </button>

          <button
            onClick={() => setCurrentRoute('/verify')}
            className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentRoute === '/verify'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navVerify}
          </button>

          <button
            onClick={() => setCurrentRoute('/quick-pay')}
            className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentRoute === '/quick-pay'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navQuickPay}
          </button>

          <button
            onClick={() => setCurrentRoute('/login')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition cursor-pointer ${
              currentRoute === '/login'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.navSignIn}
          </button>
        </nav>
      </div>
    </header>
  );
};


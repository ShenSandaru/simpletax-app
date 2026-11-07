'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, UserCheck, BadgeCheck, CreditCard, Lock, Home } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Emblem & Portal Title */}
        <button
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none cursor-pointer group shrink min-w-0"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 relative flex items-center justify-center shrink-0">
            <Image
              src="/sri-lanka-emblem.svg"
              alt="Official Government Emblem of Sri Lanka"
              width={40}
              height={40}
              className="object-contain drop-shadow-xs w-8 h-8 sm:w-10 sm:h-10"
              priority
            />
          </div>
          <div className="truncate">
            <span className="font-bold text-sm sm:text-base text-slate-900 leading-tight block group-hover:text-emerald-900 transition truncate">
              {t.deptName}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium block truncate">
              {t.deptSub}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (>= md) */}
        <nav className="hidden md:flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => handleNavigate('/')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentRoute === '/'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navHome}
          </button>

          <button
            onClick={() => handleNavigate('/get-tin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shadow-xs ${
              currentRoute === '/get-tin'
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {t.navGetTin}
          </button>

          <button
            onClick={() => handleNavigate('/verify')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentRoute === '/verify'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navVerify}
          </button>

          <button
            onClick={() => handleNavigate('/quick-pay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentRoute === '/quick-pay'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navQuickPay}
          </button>

          <button
            onClick={() => handleNavigate('/login')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition cursor-pointer ${
              currentRoute === '/login'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.navSignIn}
          </button>
        </nav>

        {/* Mobile Header Right Actions (< md) */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={() => handleNavigate('/get-tin')}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-700 text-white shadow-xs"
          >
            TIN
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition text-left cursor-pointer ${
              currentRoute === '/'
                ? 'bg-emerald-50 text-emerald-900 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-700" />
            <span>{t.navHome}</span>
          </button>

          <button
            onClick={() => handleNavigate('/get-tin')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition text-left cursor-pointer ${
              currentRoute === '/get-tin'
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <UserCheck className="w-4 h-4" />
              <span>{t.navGetTin}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Instant
            </span>
          </button>

          <button
            onClick={() => handleNavigate('/verify')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition text-left cursor-pointer ${
              currentRoute === '/verify'
                ? 'bg-emerald-50 text-emerald-900 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BadgeCheck className="w-4 h-4 text-emerald-700" />
            <span>{t.navVerify}</span>
          </button>

          <button
            onClick={() => handleNavigate('/quick-pay')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition text-left cursor-pointer ${
              currentRoute === '/quick-pay'
                ? 'bg-emerald-50 text-emerald-900 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <span>{t.navQuickPay}</span>
          </button>

          <button
            onClick={() => handleNavigate('/login')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition text-left cursor-pointer ${
              currentRoute === '/login'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>{t.navSignIn}</span>
          </button>
        </div>
      )}
    </header>
  );
};


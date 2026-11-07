'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  UserCheck,
  BadgeCheck,
  CreditCard,
  Lock,
  ChevronLeft,
  QrCode,
  Download,
  Printer,
  X,
  Search,
  CheckCircle2,
  FileCheck,
  Bot
} from 'lucide-react';
import { LangKey, AppRoute, VerifiedTaxpayer, DocumentModalData } from '@/types';
import { TRANSLATIONS } from '@/constants/translations';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { TinWizard } from '@/components/tin/TinWizard';
import { AiFaqAssistant } from '@/components/shared/AiFaqAssistant';

export default function SimpleTaxApp() {
  const [lang, setLang] = useState<LangKey>('en');
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [toast, setToast] = useState<string | null>(null);
  const [showArchModal, setShowArchModal] = useState(false);
  const [showAiFaqModal, setShowAiFaqModal] = useState(false);
  const [previewDocModal, setPreviewDocModal] = useState<DocumentModalData | null>(null);

  // Search on Hero
  const [heroSearch, setHeroSearch] = useState('');

  // Verify State
  const [verifyInput, setVerifyInput] = useState('199624501234');
  const [verifiedRecord, setVerifiedRecord] = useState<VerifiedTaxpayer>({
    name: 'Shenal Jayawardena',
    nic: '199624501234',
    tin: '109624501-7000',
    category: 'Individual Taxpayer (Resident)',
    status: 'ACTIVE & COMPLIANT',
    issuedDate: '14 Jan 2025',
    office: 'Colombo Central Regional Office',
    verificationCode: 'IRD-VER-2026-99481'
  });

  // Quick Pay State
  const [payIdentifier, setPayIdentifier] = useState('109624501-7000');
  const [payAmount, setPayAmount] = useState('15,000');
  const [payMethod, setPayMethod] = useState<'lankaqr' | 'card' | 'slip'>('lankaqr');

  // Login State
  const [loginNic, setLoginNic] = useState('199624501234');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('842910');

  const t = TRANSLATIONS[lang];

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const handleVerify = () => {
    if (!verifyInput.trim()) return;
    if (verifyInput.includes('11489')) {
      setVerifiedRecord({
        name: 'Apex Lanka Technologies (Pvt) Ltd',
        nic: 'PV 00849210 (ROC)',
        tin: '114892011-7000',
        category: 'Corporate Taxpayer (CIT & VAT Registered)',
        status: 'ACTIVE & COMPLIANT',
        issuedDate: '03 Mar 2021',
        office: 'Medium Corporate Taxpayers Unit',
        verificationCode: 'IRD-VER-2026-88210'
      });
    } else {
      setVerifiedRecord({
        name: 'Shenal Jayawardena',
        nic: verifyInput,
        tin: '109624501-7000',
        category: 'Individual Taxpayer (Resident)',
        status: 'ACTIVE & COMPLIANT',
        issuedDate: '14 Jan 2025',
        office: 'Colombo Central Regional Office',
        verificationCode: 'IRD-VER-2026-99481'
      });
    }
    notify('Taxpayer record verified.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Reusable Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <main className="flex-1">
        {/* ===================================================================
            VIEW 1: CLEAN HOME / LANDING PAGE (/)
           =================================================================== */}
        {currentRoute === '/' && (
          <div>
            {/* Decent, High-Trust Hero Section */}
            <section className="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>e-Services Citizen Portal • Sri Lanka</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {t.heroTitle}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {t.heroSub}
                  </p>

                  {/* Direct Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setCurrentRoute('/get-tin')}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.55)] hover:shadow-[0_0_28px_rgba(52,211,153,0.8)] border border-emerald-400/40 flex items-center gap-2 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-100" />
                      <span>{t.svc1Action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setCurrentRoute('/verify')}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition cursor-pointer"
                    >
                      <BadgeCheck className="w-4 h-4 text-emerald-400" />
                      <span>{t.svc2Action}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Direct Services Grid (Essential Tasks Only) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-bold text-slate-900 mb-5">{t.svcSectionTitle}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1: Register TIN */}
                <div
                  onClick={() => setCurrentRoute('/get-tin')}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-700 hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{t.svc1Title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.svc1Desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>{t.svc1Action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2: Verify Status */}
                <div
                  onClick={() => setCurrentRoute('/verify')}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-700 hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{t.svc2Title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.svc2Desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{t.svc2Action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3: Quick Pay */}
                <div
                  onClick={() => setCurrentRoute('/quick-pay')}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-700 hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{t.svc3Title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.svc3Desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{t.svc3Action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 4: Citizen Sign In */}
                <div
                  onClick={() => setCurrentRoute('/login')}
                  className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 hover:border-emerald-600 hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center mb-3">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1.5">{t.svc4Title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{t.svc4Desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>{t.svc4Action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Citizen Information Card */}
              <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                    Sri Lanka Tax Relief Guide
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    Does getting a TIN mean you have to pay taxes?
                  </h4>
                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                    No. Resident individuals receive an automatic annual tax-free relief of <strong>Rs. 1,800,000</strong>. If your total income is below Rs. 1.8 Million, your tax liability is <strong>Rs. 0</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentRoute('/get-tin')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Register TIN Now
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: DIRECT TIN REGISTRATION (/get-tin)
           =================================================================== */}
        {currentRoute === '/get-tin' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
            <button
              onClick={() => setCurrentRoute('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>
            <TinWizard lang={lang} notify={notify} />
          </div>
        )}

        {/* ===================================================================
            VIEW 3: VERIFY TIN / CERTIFICATE (/verify)
           =================================================================== */}
        {currentRoute === '/verify' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
            <button
              onClick={() => setCurrentRoute('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.verifyHeader}</h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{t.verifySub}</p>
              </div>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="Enter NIC (e.g. 199624501234) or TIN..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none font-mono text-sm"
                />
                <button
                  onClick={handleVerify}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

              {/* Verified Result Card */}
              {verifiedRecord && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Registered Taxpayer</span>
                      <span className="text-base font-bold text-slate-900">{verifiedRecord.name}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {verifiedRecord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">TIN</span>
                      <span className="font-mono font-bold text-slate-900">{verifiedRecord.tin}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">NIC</span>
                      <span className="font-mono font-semibold text-slate-800">{verifiedRecord.nic}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Issue Date</span>
                      <span className="text-slate-800">{verifiedRecord.issuedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Regional Office</span>
                      <span className="text-slate-800 truncate block">{verifiedRecord.office}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() =>
                        setPreviewDocModal({
                          title: 'Public Taxpayer Verification Certificate',
                          subtitle: `${verifiedRecord.name} • TIN ${verifiedRecord.tin}`,
                          code: verifiedRecord.verificationCode
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View Official Verification Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 4: QUICK PAY (/quick-pay)
           =================================================================== */}
        {currentRoute === '/quick-pay' && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-4">
            <button
              onClick={() => setCurrentRoute('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.payHeader}</h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{t.paySub}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    TIN or NIC Number *
                  </label>
                  <input
                    type="text"
                    value={payIdentifier}
                    onChange={(e) => setPayIdentifier(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:border-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Payment Amount (LKR) *
                  </label>
                  <input
                    type="text"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:border-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'lankaqr' as const, label: 'LankaQR' },
                      { id: 'card' as const, label: 'Card / Online' },
                      { id: 'slip' as const, label: 'Bank Slip' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPayMethod(m.id)}
                        className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                          payMethod === m.id
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-950'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LankaQR Preview */}
                {payMethod === 'lankaqr' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <QrCode className="w-24 h-24 mx-auto text-slate-900" />
                    <span className="text-xs font-bold text-slate-800 block">
                      Scan with any Sri Lankan Banking App (BOC, Commercial, Sampath, FriMi)
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      Voucher Reference: DIN-2026-904112
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => notify(`Payment for Rs. ${payAmount} initiated.`)}
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm transition cursor-pointer"
                >
                  Confirm & Settle Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 5: CITIZEN SIGN IN (/login)
           =================================================================== */}
        {currentRoute === '/login' && (
          <div className="max-w-md mx-auto px-4 py-12 space-y-4">
            <button
              onClick={() => setCurrentRoute('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Sign in to IRD Portal</h1>
                <p className="text-xs text-slate-500">Sign in securely using your NIC + Mobile SMS OTP.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Sri Lankan NIC or TIN
                  </label>
                  <input
                    type="text"
                    value={loginNic}
                    onChange={(e) => setLoginNic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:border-emerald-700 outline-none"
                  />
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(true);
                      notify('6-digit OTP sent to registered mobile');
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Send SMS OTP Code
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        6-Digit SMS Code
                      </label>
                      <input
                        type="text"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-700 font-mono text-center tracking-widest text-base font-bold bg-emerald-50/50"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        notify('Signed in successfully');
                        setCurrentRoute('/verify');
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Verify & Access Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Official Reusable Footer */}
      <Footer lang={lang} onOpenArchModal={() => setShowArchModal(true)} />

      {/* Floating Rounded AI Agent Action Button on the Bottom-Right */}
      <button
        onClick={() => setShowAiFaqModal(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/80 group"
        aria-label="Open AI Tax Assistant"
        title="Open IRD AI Tax Assistant"
      >
        <Bot className="w-7 h-7 text-emerald-300 group-hover:text-white transition" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
      </button>

      {/* AI Assistant Modal for Citizen Tax FAQs */}
      <AiFaqAssistant
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        isOpen={showAiFaqModal}
        onClose={() => setShowAiFaqModal(false)}
        onNavigateToTin={() => setCurrentRoute('/get-tin')}
      />

      {/* =====================================================================
          DOCUMENT PREVIEW MODAL
         ===================================================================== */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 block">Official Verification</span>
                <h3 className="text-base font-bold text-slate-900">{previewDocModal.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDocModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block">Entity:</span>
                <span className="font-bold text-slate-900 block">{previewDocModal.subtitle}</span>
                <span className="font-mono text-slate-600 block">Ref: {previewDocModal.code}</span>
              </div>
              <QrCode className="w-16 h-16 text-slate-900 shrink-0" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Print
              </button>
              <button
                onClick={() => {
                  notify('PDF Certificate downloaded');
                  setPreviewDocModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SYSTEM ARCHITECTURE MODAL
         ===================================================================== */}
      {showArchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Legacy RAMIS vs. New Simplified Architecture
              </h3>
              <button
                onClick={() => setShowArchModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900">Instant TIN Registration: /get-tin</strong>
                <span className="text-slate-500">Replaces legacy RAMIS 35-field request header with a 3-step smart wizard.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900">Public Status Verification: /verify</strong>
                <span className="text-slate-500">Instant printable verification certificate by NIC or corporate TIN for banks and the RMV.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900">Quick Pay: /quick-pay</strong>
                <span className="text-slate-500">Auto-generates DIN vouchers with LankaQR checkout.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

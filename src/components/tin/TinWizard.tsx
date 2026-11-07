'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Upload,
  ArrowRight,
  Download,
  Printer,
  Landmark,
  QrCode,
  RotateCcw
} from 'lucide-react';
import { LangKey } from '@/types';
import { TRANSLATIONS } from '@/constants/translations';
import { decodeSriLankanNIC } from '@/lib/nicDecoder';

interface TinWizardProps {
  lang: LangKey;
  onFinish?: () => void;
  notify: (msg: string) => void;
}

export const TinWizard: React.FC<TinWizardProps> = ({ lang, notify }) => {
  const t = TRANSLATIONS[lang];
  const [tinStep, setTinStep] = useState(1);
  const [tinNic, setTinNic] = useState('199821402381');
  const [tinFullName, setTinFullName] = useState('Kasun Chamara Perera');
  const [tinMobile, setTinMobile] = useState('077 458 9210');
  const [tinAddress, setTinAddress] = useState('No. 42, Flower Road, Colombo 07');
  const [tinPurpose, setTinPurpose] = useState('bank');
  const [tinDocAttached, setTinDocAttached] = useState(true);

  const decodedNicInfo = useMemo(() => decodeSriLankanNIC(tinNic), [tinNic]);

  const handleReset = () => {
    setTinStep(1);
    setTinNic('');
    setTinFullName('');
    setTinMobile('');
    setTinAddress('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Wizard Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-7 border-b border-slate-800">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Self-Service Registration • Step {tinStep} of 3
          </span>
          {tinStep > 1 && (
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Start Over
            </button>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">{t.tinHeader}</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">{t.tinSub}</p>

        {/* 3 Step Indicator */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-5">
          {[
            { num: 1, title: t.step1Title },
            { num: 2, title: t.step2Title },
            { num: 3, title: t.step3Title }
          ].map((s) => (
            <div
              key={s.num}
              className={`p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition ${
                tinStep === s.num
                  ? 'bg-emerald-950/60 border-emerald-600 text-white'
                  : tinStep > s.num
                  ? 'bg-slate-800/80 border-slate-700 text-emerald-400'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400'
              }`}
            >
              <span
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold shrink-0 ${
                  tinStep >= s.num ? 'bg-emerald-700 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {tinStep > s.num ? '✓' : s.num}
              </span>
              <span className="truncate">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-7">
        {/* STEP 1 */}
        {tinStep === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Sri Lankan NIC Number *
                </label>
                <input
                  type="text"
                  value={tinNic}
                  onChange={(e) => setTinNic(e.target.value)}
                  placeholder="e.g. 199821402381 or 896451230V"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none font-mono text-sm"
                />
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <span>Test with:</span>
                  <button
                    type="button"
                    onClick={() => setTinNic('199821402381')}
                    className="underline text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    199821402381
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setTinNic('896451230V')}
                    className="underline text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    896451230V
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Full Name (As per NIC) *
                </label>
                <input
                  type="text"
                  value={tinFullName}
                  onChange={(e) => setTinFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none text-sm"
                />
              </div>
            </div>

            {/* NIC Auto-Decoder Helper */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">NIC Auto-Verification</span>
                  {decodedNicInfo ? (
                    <span className="text-slate-600">
                      DOB: <strong>{decodedNicInfo.birthDate}</strong> • Age: <strong>{decodedNicInfo.age}</strong> • Gender: <strong>{decodedNicInfo.gender}</strong>
                    </span>
                  ) : (
                    <span className="text-amber-700">Enter a valid 10 or 12-digit Sri Lankan NIC.</span>
                  )}
                </div>
              </div>
              {decodedNicInfo && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] shrink-0">
                  Verified
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Mobile Number (SMS Verification) *
                </label>
                <input
                  type="text"
                  value={tinMobile}
                  onChange={(e) => setTinMobile(e.target.value)}
                  placeholder="07X XXX XXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Permanent Residential Address *
                </label>
                <input
                  type="text"
                  value={tinAddress}
                  onChange={(e) => setTinAddress(e.target.value)}
                  placeholder="Postal Address"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none text-sm"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setTinStep(2)}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <span>Continue to Step 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {tinStep === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Primary Reason for TIN Registration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'bank', title: 'Bank Account & Fixed Deposit', desc: 'Commercial bank KYC & interest tax' },
                  { id: 'vehicle', title: 'Vehicle Registration (RMV)', desc: 'Department of Motor Traffic transfers' },
                  { id: 'land', title: 'Land & Property Deed', desc: 'Land Registry & Provincial transfers' },
                  { id: 'employment', title: 'Employment / Business', desc: 'Income tax & company appointments' }
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setTinPurpose(p.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      tinPurpose === p.id
                        ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm text-slate-900">{p.title}</span>
                      {tinPurpose === p.id && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </div>
                    <p className="text-xs text-slate-500">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* NIC Upload Box */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                NIC Copy Upload (Optional for Instant Issuance)
              </label>
              <div
                onClick={() => {
                  setTinDocAttached(true);
                  notify('NIC file attached');
                }}
                className="p-5 rounded-xl border border-dashed border-slate-300 hover:border-emerald-700 bg-slate-50 text-center cursor-pointer transition"
              >
                <Upload className="w-5 h-5 text-emerald-700 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-800">
                  {tinDocAttached ? '✓ NIC_Verification_Document.pdf (Attached)' : 'Click to select NIC image or PDF'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tax office is automatically assigned based on your residential address.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setTinStep(1)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setTinStep(3);
                  notify('Official Digital TIN Certificate Issued!');
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <span>Generate Official TIN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 - OFFICIAL TIN CARD */}
        {tinStep === 3 && (
          <div className="space-y-5">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-800">
                <strong className="block text-sm text-emerald-950 font-bold mb-0.5">
                  TIN Registration Complete
                </strong>
                Your official Taxpayer Identification Number is active and linked to NIC <strong>{tinNic}</strong> and mobile <strong>{tinMobile}</strong>.
              </div>
            </div>

            {/* Official TIN Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-900/60 border border-emerald-700 flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      Department of Inland Revenue • Sri Lanka
                    </span>
                    <span className="text-sm font-bold">Taxpayer Identification Certificate</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-[11px] font-bold self-start sm:self-center">
                  ACTIVE & VALID
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-5 items-center">
                <div className="sm:col-span-2 space-y-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase">Taxpayer Name</span>
                    <span className="text-base font-bold">{tinFullName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase">Official TIN</span>
                      <span className="text-lg font-mono font-bold text-emerald-400">109821402-7000</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase">NIC Number</span>
                      <span className="text-sm font-mono font-semibold">{tinNic}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Issued: 07 Nov 2026 • Colombo Regional Tax Office
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-center">
                  <QrCode className="w-16 h-16 text-slate-900" />
                  <span className="text-[10px] font-bold uppercase tracking-wide mt-1 text-slate-600">
                    Scan to Verify
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => notify('Official TIN Certificate PDF downloaded')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
              >
                Register Another TIN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, HelpCircle, PhoneCall, Globe } from 'lucide-react';
import { LangKey } from '@/types';

interface AiFaqModalProps {
  lang: LangKey;
  onLanguageChange?: (lang: LangKey) => void;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTin: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

const FAQ_KNOWLEDGE: Record<LangKey, { prompt: string; answer: string }[]> = {
  en: [
    {
      prompt: 'Do I have to pay tax if I register for a TIN?',
      answer: 'No. Registering for a TIN does not mean you have to pay taxes. Resident individuals receive an automatic annual tax-free relief of Rs. 1,800,000 (Rs. 150,000/month). If your total income is below this amount, your tax liability is Rs. 0.'
    },
    {
      prompt: 'Why do I need a TIN in Sri Lanka?',
      answer: 'Under current regulations, a TIN is mandatory to open or maintain commercial bank accounts, register motor vehicles with the RMV, transfer land deeds, or obtain building plan approvals.'
    },
    {
      prompt: 'How long does online TIN registration take?',
      answer: 'Online registration takes about 2 minutes. Enter your Sri Lankan NIC number (9-digit old or 12-digit new), full name, and mobile number. Your official Digital TIN Certificate is generated immediately.'
    },
    {
      prompt: 'What documents are required to apply for a TIN?',
      answer: 'Only your Sri Lankan National Identity Card (NIC) is required. You can also optionally upload a photo or scan of your NIC for instant verification.'
    }
  ],
  si: [
    {
      prompt: 'TIN අංකයක් ගත් පමණින් මම බදු ගෙවිය යුතුද?',
      answer: 'නැත! TIN අංකයක් ලබාගැනීමෙන් ඔබ බදු ගෙවීමට බැඳී නැත. ශ්‍රී ලංකා නීතිය අනුව වාර්ෂිකව රු. 1,800,000 (මසකට රු. 150,000) දක්වා ආදායම් බදුවලින් සම්පූර්ණයෙන්ම නිදහස් කර ඇත. ඔබගේ ආදායම ඊට අඩු නම් ඔබ ගෙවිය යුතු බද්ද රු. 0 කි.'
    },
    {
      prompt: 'TIN අංකයක් අවශ්‍ය වන්නේ ඇයි?',
      answer: 'වාණිජ බැංකු ගිණුම් ආරම්භ කිරීමට, මෝටර් රථ ප්‍රවාහන දෙපාර්තමේන්තුවේ (RMV) වාහන ලියාපදිංචියට, ඉඩම් ඔප්පු ලිවීමට සහ ගොඩනැගිලි සැලසුම් අනුමත කරගැනීමට TIN අංකය අනිවාර්ය කර ඇත.'
    },
    {
      prompt: 'TIN අංකය ලබාගැනීමට කොපමණ වේලාවක් ගතවේද?',
      answer: 'විනාඩි 2ක් පමණි. ඔබගේ ජාතික හැඳුනුම්පත් අංකය, නම සහ දුරකථන අංකය ඇතුළත් කළ වහාම නිල ඩිජිටල් TIN සහතිකය එසැණින් ලැබෙනු ඇත.'
    },
    {
      prompt: 'අවශ්‍ය වන ලියකියවිලි මොනවාද?',
      answer: 'ඔබගේ ජාතික හැඳුනුම්පත (NIC) පමණක් ප්‍රමාණවත්ය.'
    }
  ],
  ta: [
    {
      prompt: 'TIN பெற்றவுடன் நான் வரி செலுத்த வேண்டுமா?',
      answer: 'இல்லை! TIN பதிவு செய்ததால் வரி செலுத்த வேண்டியதில்லை. ஆண்டுக்கு ரூ. 1,800,000 (மாதம் ரூ. 150,000) வரை வருமானத்திற்கு வரி விலக்கு உண்டு. உங்கள் வருமானம் இதைவிடக் குறைவாயின் வரி ரூ. 0 ஆகும்.'
    },
    {
      prompt: 'இலங்கையில் TIN ஏன் அவசியம்?',
      answer: 'வங்கி கணக்கு தொடங்குதல், வாகன பதிவு (RMV), காணி உறுதி பதிவுகள் மற்றும் கட்டிட அனுமதி பெற TIN கட்டாயமாகும்.'
    },
    {
      prompt: 'TIN பதிவு செய்ய எவ்வளவு நேரம் எடுக்கும்?',
      answer: '2 நிமிடங்கள் மட்டுமே. உங்கள் தேசிய அடையாள அட்டை எண் (NIC), பெயர் மற்றும் கைபேசி எண்ணை உள்ளிட்டவுடன் சான்றிதழ் உடனடியாக வழங்கப்படும்.'
    },
    {
      prompt: 'தேவையான ஆவணங்கள் எவை?',
      answer: 'தேசிய அடையாள அட்டை (NIC) மட்டுமே போதுமானது.'
    }
  ]
};

export const AiFaqAssistant: React.FC<AiFaqModalProps> = ({
  lang,
  onLanguageChange,
  isOpen,
  onClose,
  onNavigateToTin
}) => {
  // Local language state allowing instant switching inside chat while keeping parent in sync
  const [chatLang, setChatLang] = useState<LangKey>(lang);

  // Sync if parent lang changes externally
  useEffect(() => {
    setChatLang(lang);
  }, [lang]);

  const getGreeting = (selectedLang: LangKey) => {
    switch (selectedLang) {
      case 'si':
        return 'ආයුබෝවන්! මම දේශීය ආදායම් දෙපාර්තමේන්තුවේ AI සහායකයා. TIN අංකය හෝ බදු සේවා පිළිබඳ ඕනෑම ගැටලුවක් පහතින් තෝරන්න හෝ විමසන්න.';
      case 'ta':
        return 'வணக்கம்! நான் IRD இன் AI உதவியாளர். TIN பதிவு அல்லது வரி சேவைகள் பற்றிய உங்கள் கேள்விகளை கீழே கேட்கலாம்.';
      default:
        return 'Hello! I am your IRD AI Assistant. How can I help you with your TIN registration or tax questions today?';
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: getGreeting(lang)
    }
  ]);

  // When user selects a new language in the chatbot
  const handleSelectLang = (newLang: LangKey) => {
    setChatLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    // Add welcome / switch message in that language
    setMessages((prev) => [
      ...prev,
      {
        sender: 'ai',
        text: getGreeting(newLang)
      }
    ]);
  };

  const [inputVal, setInputVal] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const currentFaqs = FAQ_KNOWLEDGE[chatLang] || FAQ_KNOWLEDGE.en;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Simulated Smart Response matching
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = '';

      if (lower.includes('pay') || lower.includes('tax') || lower.includes('බදු') || lower.includes('வரி')) {
        reply = currentFaqs[0].answer;
      } else if (lower.includes('why') || lower.includes('reason') || lower.includes('ඇයි') || lower.includes('ஏன்')) {
        reply = currentFaqs[1].answer;
      } else if (lower.includes('how long') || lower.includes('time') || lower.includes('වේලාව') || lower.includes('நேரம்')) {
        reply = currentFaqs[2].answer;
      } else if (lower.includes('document') || lower.includes('nic') || lower.includes('ලේඛන') || lower.includes('ஆவணம்')) {
        reply = currentFaqs[3].answer;
      } else {
        reply =
          chatLang === 'si'
            ? 'ඔබගේ TIN අංකය ක්ෂණිකව ලබාගැනීමට ඉහත "TIN ලබාගන්න" බොත්තම ඔබන්න. වැඩිදුර සහාය සඳහා IRD ඇමතුම් මධ්‍යස්ථානය 1944 අමතන්න.'
            : chatLang === 'ta'
            ? 'உங்கள் TIN எண்ணை உடனடியாகப் பெற "TIN பதிவு செய்க" என்பதை அழுத்தவும். மேலதிக தகவலுக்கு 1944 ஐ அழைக்கவும்.'
            : 'You can register for your TIN in 2 minutes directly on this portal. For detailed personal inquiries, you may also call the IRD hotline at 1944.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Assistant Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-700 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base">IRD Tax AI Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400">Official Instant Help & FAQ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1st: Language Selection Bar (Sinhala, Tamil, English) */}
        <div className="px-4 py-2.5 bg-emerald-950/20 border-b border-emerald-900/10 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>භාෂාව / மொழி / Language:</span>
          </div>
          <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
            <button
              onClick={() => handleSelectLang('si')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                chatLang === 'si'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              සිංහල
            </button>
            <button
              onClick={() => handleSelectLang('ta')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                chatLang === 'ta'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => handleSelectLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                chatLang === 'en'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Quick FAQ Suggestion Pills */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0 flex items-center gap-2 text-xs scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide shrink-0">
            Common questions:
          </span>
          {currentFaqs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(faq.prompt)}
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-700 text-slate-700 hover:text-emerald-900 text-xs font-medium whitespace-nowrap transition cursor-pointer shrink-0"
            >
              {faq.prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-xs'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-xs rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Action Callout if need TIN */}
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between text-xs shrink-0">
          <span className="text-emerald-900 font-semibold">Ready to apply for your TIN?</span>
          <button
            onClick={() => {
              onClose();
              onNavigateToTin();
            }}
            className="px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold transition cursor-pointer"
          >
            Start TIN Registration →
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              chatLang === 'si'
                ? 'ඔබට අවශ්‍ය ප්‍රශ්නය මෙහි ලියන්න...'
                : chatLang === 'ta'
                ? 'உங்கள் கேள்வியை உள்ளிடவும்...'
                : 'Type your question here...'
            }
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-xs sm:text-sm outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


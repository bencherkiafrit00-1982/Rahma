import React, { useState } from 'react';
import { Flag, Volume2, Coins, IdCard, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { KASSAMAN_POEM } from '../data/curriculumData';

interface CivicHeritageSectionProps {
  studentName: string;
  onEarnStar: () => void;
}

export const CivicHeritageSection: React.FC<CivicHeritageSectionProps> = ({
  studentName,
  onEarnStar,
}) => {
  const [activeTab, setActiveTab] = useState<'anthem' | 'flag' | 'currency' | 'card'>('anthem');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [schoolName, setSchoolName] = useState<string>('مَدْرَسَةُ الشَّهِيدِ عَبْدِ الحَمِيدِ بْنِ بَادِيس');

  const handlePlayAnthem = () => {
    soundManager.playClick();
    setIsPlayingAnthem(true);
    const fullText = KASSAMAN_POEM.stanzas.map((s) => `${s.verse} ... ${s.response}`).join(' ... ');
    soundManager.speakArabic(fullText, () => {
      setIsPlayingAnthem(false);
    });
  };

  const handleCompleteSymbolQuiz = () => {
    if (quizCompleted) return;
    setQuizCompleted(true);
    soundManager.playSuccess();
    confetti({ particleCount: 60, spread: 70 });
    onEarnStar();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl sm:text-4xl">🇩🇿</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            وَطَنِي الجَزَائِرُ
          </h2>
        </div>

        {/* Big Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => {
              setActiveTab('anthem');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'anthem' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            نَشِيدُ «قَسَماً»
          </button>
          <button
            onClick={() => {
              setActiveTab('flag');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'flag' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            عَلَمُ بِلَادِي
          </button>
          <button
            onClick={() => {
              setActiveTab('currency');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'currency' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            الدِّينَارُ الجَزَائِرِيُّ
          </button>
          <button
            onClick={() => {
              setActiveTab('card');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'card' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            بِطَاقَتِي المَدْرَسِيَّةُ
          </button>
        </div>
      </div>

      {/* TAB 1: KASSAMAN ANTHEM */}
      {activeTab === 'anthem' && (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-rose-50 border-4 border-slate-200 rounded-3xl p-6 sm:p-12 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">{KASSAMAN_POEM.title}</h3>
            <button
              onClick={handlePlayAnthem}
              disabled={isPlayingAnthem}
              className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Volume2 className="w-6 h-6" />
              <span>{isPlayingAnthem ? 'جَارِي الإِنْشَادُ...' : 'اسْتَمِعْ إِلَى النَّشِيدِ'}</span>
            </button>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto my-6 text-center">
            {KASSAMAN_POEM.stanzas.map((stanza, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
                <p className="text-2xl sm:text-3xl font-black text-emerald-800">{stanza.verse}</p>
                <p className="text-2xl sm:text-3xl font-black text-rose-700 mt-2">{stanza.response}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ALGERIAN FLAG */}
      {activeTab === 'flag' && (
        <div className="bg-white border-4 border-slate-200 rounded-3xl p-6 sm:p-12 shadow-md text-center space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
            عَلَمُ بِلَادِي الحَبِيبَةِ الجَزَائِرِ 🇩🇿
          </h3>

          {/* Giant Algerian Flag */}
          <div className="relative w-80 h-52 sm:w-96 sm:h-64 mx-auto rounded-3xl overflow-hidden border-4 border-slate-300 shadow-xl flex items-center justify-center my-6">
            <div className="w-1/2 h-full bg-[#006233]" />
            <div className="w-1/2 h-full bg-white" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-28 h-28 sm:w-36 sm:h-36 text-[#D21034]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 20 A30 30 0 1 0 50 80 A24 24 0 1 1 50 20 Z" />
                <polygon points="56,38 59,48 69,48 61,54 64,64 56,58 48,64 51,54 43,48 53,48" />
              </svg>
            </div>
          </div>

          {/* Big Color Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto my-6 text-right">
            <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl">
              <span className="font-black text-xl text-emerald-900 block mb-1">الَّلَوْنُ الأَخْضَرُ</span>
              <span className="text-base text-slate-700 font-bold">يَرْمُزُ لِلْخَيْرِ وَالطَّبِيعَةِ الخَلَّابَةِ.</span>
            </div>
            <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl">
              <span className="font-black text-xl text-slate-900 block mb-1">الَّلَوْنُ الأَبْيَضُ</span>
              <span className="text-base text-slate-700 font-bold">يَرْمُزُ لِلْسَّلَامِ وَالنَّقَاءِ.</span>
            </div>
            <div className="p-6 bg-rose-50 border-2 border-rose-300 rounded-2xl">
              <span className="font-black text-xl text-rose-900 block mb-1">النَّجْمَةُ وَالهِلَالُ</span>
              <span className="text-base text-slate-700 font-bold">بِالأَحْمَرِ، رَمْزُ الشُّهَدَاءِ الأَبْرَارِ.</span>
            </div>
          </div>

          <div className="pt-2">
            {!quizCompleted ? (
              <button
                onClick={handleCompleteSymbolQuiz}
                className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
              >
                تَعَلَّمْتُ رُمُوزَ عَلَمِ بِلَادِي (اكْتَسِبْ نُجُوماً ⭐)
              </button>
            ) : (
              <div className="inline-flex items-center gap-3 text-lg font-black text-emerald-800 bg-emerald-100 px-8 py-3.5 rounded-2xl">
                <CheckCircle className="w-6 h-6" />
                <span>أَحْسَنْتَ يَا بَطَلَ الجَزَائِرِ! 🇩🇿</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CURRENCY (ALGERIAN DINAR) */}
      {activeTab === 'currency' && (
        <div className="bg-amber-50/70 border-4 border-amber-300 rounded-3xl p-6 sm:p-12 text-center space-y-6 shadow-md">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
            العُمْلَةُ الوَطَنِيَّةُ: الدِّينَارُ الجَزَائِرِيُّ (د.ج)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto my-8">
            {[
              { val: '5 دج', title: 'خَمْسَةُ دَنَانِيرَ', color: 'bg-amber-100 text-amber-950 border-amber-400' },
              { val: '10 دج', title: 'عَشَرَةُ دَنَانِيرَ', color: 'bg-amber-200 text-amber-950 border-amber-500' },
              { val: '20 دج', title: 'عِشْرُونَ دِينَاراً', color: 'bg-amber-100 text-amber-950 border-amber-400' },
              { val: '50 دج', title: 'خَمْسُونَ دِينَاراً', color: 'bg-yellow-200 text-yellow-950 border-yellow-500' },
            ].map((coin) => (
              <div
                key={coin.val}
                onClick={() => {
                  soundManager.playClick();
                  soundManager.speakArabic(coin.title);
                }}
                className={`p-6 sm:p-8 rounded-3xl border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-md ${coin.color}`}
              >
                <Coins className="w-12 h-12 mb-3" />
                <span className="text-3xl sm:text-4xl font-black font-mono">{coin.val}</span>
                <span className="text-sm sm:text-base font-black mt-2">{coin.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SCHOOL ID CARD */}
      {activeTab === 'card' && (
        <div className="bg-indigo-50/60 border-4 border-indigo-200 rounded-3xl p-6 sm:p-12 shadow-md">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-6">
            بِطَاقَتِي المَدْرَسِيَّةُ
          </h3>

          <div className="bg-white border-4 border-indigo-400 rounded-3xl p-8 max-w-lg mx-auto shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
              <span className="text-3xl">🇩🇿</span>
              <span className="text-base font-black text-indigo-950">الجُمْهُورِيَّةُ الجَزَائِرِيَّةُ</span>
              <IdCard className="w-8 h-8 text-indigo-600" />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-24 h-28 bg-indigo-100 rounded-2xl border-2 border-indigo-200 flex flex-col items-center justify-center text-indigo-800 shrink-0">
                <span className="text-5xl">👦</span>
                <span className="text-xs font-black mt-1">التِّلْمِيذُ</span>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-slate-800 flex-1">
                <div>
                  <span className="font-bold text-slate-500">الِاسْمُ: </span>
                  <span className="font-black text-indigo-950 text-xl">{studentName || 'أَحْمَدُ'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500">المُسْتَوَى: </span>
                  <span className="font-black text-emerald-800">السَّنَةُ الأُولَى ابْتِدَائِي</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500">المَدْرَسَةُ: </span>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full text-sm font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-1.5 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

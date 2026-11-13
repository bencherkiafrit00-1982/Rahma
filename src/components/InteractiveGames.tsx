import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';

interface InteractiveGamesProps {
  onEarnStar: () => void;
}

type GameMode = 'counting' | 'classification' | 'clock' | 'sun_moon';

export const InteractiveGames: React.FC<InteractiveGamesProps> = ({ onEarnStar }) => {
  const [activeGame, setActiveGame] = useState<GameMode>('counting');

  // Counting Game State
  const [countingTarget, setCountingTarget] = useState<number>(5);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [countingResult, setCountingResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Classification Game State (صلب vs سائل)
  const classificationItems = [
    { name: 'كُوبُ مَاءٍ', type: 'liquid', emoji: '💧' },
    { name: 'قَلَمُ رَصَاصٍ', type: 'solid', emoji: '✏️' },
    { name: 'زَيْتُ الزَّيْتُونِ', type: 'liquid', emoji: '🫒' },
    { name: 'حَجَرٌ صَغِيرٌ', type: 'solid', emoji: '🪨' },
    { name: 'حَلِيبٌ طَازَجٌ', type: 'liquid', emoji: '🥛' },
    { name: 'كُرَاسٌ مَدْرَسِيٌّ', type: 'solid', emoji: '📒' },
  ];
  const [currentClassIndex, setCurrentClassIndex] = useState(0);

  // Clock Game State
  const clockQuestions = [
    { hour: 8, minute: 0, text: 'الدُّخُولُ إِلَى المَدْرَسَةِ صَبَاحاً', options: ['08:00', '12:00', '18:00'], correct: '08:00' },
    { hour: 12, minute: 0, text: 'مُنْتَصَفُ النَّهَارِ وَتَنَاوُلُ الغَدَاءِ', options: ['12:00', '09:00', '06:00'], correct: '12:00' },
    { hour: 16, minute: 30, text: 'الخُرُوجُ مِنَ المَدْرَسَةِ بَعْدَ الظُّهْرِ', options: ['16:30', '10:00', '20:00'], correct: '16:30' },
  ];
  const [clockIndex, setClockIndex] = useState(0);
  const [clockAnswered, setClockAnswered] = useState<boolean>(false);

  // Sun and Moon Game State (الـ الشمسية والـ القمرية)
  const sunMoonItems = [
    { word: 'القَمَرُ', type: 'moon', meaning: 'ينير الليل' },
    { word: 'الشَّمْسُ', type: 'sun', meaning: 'تشرق صباحاً' },
    { word: 'المَدْرَسَةُ', type: 'moon', meaning: 'مكان العلم' },
    { word: 'الطَّائِرَةُ', type: 'sun', meaning: 'تطير في السماء' },
    { word: 'الكِتَابُ', type: 'moon', meaning: 'أقرأ فيه' },
    { word: 'السَّيَّارَةُ', type: 'sun', meaning: 'وسيلة نقل' },
  ];
  const [sunMoonIndex, setSunMoonIndex] = useState(0);

  // Counting handlers
  const handleCountAnswer = (val: number) => {
    soundManager.playClick();
    setSelectedCount(val);
    if (val === countingTarget) {
      setCountingResult('correct');
      soundManager.playSuccess();
      confetti({ particleCount: 50, spread: 60 });
      onEarnStar();
    } else {
      setCountingResult('wrong');
      soundManager.playTryAgain();
    }
  };

  const nextCountingRound = () => {
    const next = Math.floor(Math.random() * 8) + 2; // 2 to 9
    setCountingTarget(next);
    setSelectedCount(null);
    setCountingResult('idle');
  };

  // Classification handlers
  const handleClassify = (chosenType: 'solid' | 'liquid') => {
    soundManager.playClick();
    const current = classificationItems[currentClassIndex];
    if (chosenType === current.type) {
      soundManager.playSuccess();
      confetti({ particleCount: 50, spread: 60 });
      onEarnStar();
    } else {
      soundManager.playTryAgain();
    }
    if (currentClassIndex + 1 < classificationItems.length) {
      setCurrentClassIndex((i) => i + 1);
    }
  };

  // Sun & Moon handlers
  const handleSunMoonChoice = (choice: 'sun' | 'moon') => {
    soundManager.playClick();
    const current = sunMoonItems[sunMoonIndex];
    if (choice === current.type) {
      soundManager.playSuccess();
      confetti({ particleCount: 50, spread: 60 });
      onEarnStar();
    } else {
      soundManager.playTryAgain();
    }
    if (sunMoonIndex + 1 < sunMoonItems.length) {
      setSunMoonIndex((i) => i + 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Game Mode Navigation Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl sm:text-4xl">🎮</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            الأَلْعَابُ التَّفَاعُلِيَّةُ
          </h2>
        </div>

        {/* Big Game Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => {
              setActiveGame('counting');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeGame === 'counting' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            عَدُّ الأَشْيَاءِ
          </button>
          <button
            onClick={() => {
              setActiveGame('classification');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeGame === 'classification' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            صَلْبٌ أَمْ سَائِلٌ؟
          </button>
          <button
            onClick={() => {
              setActiveGame('clock');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeGame === 'clock' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            تَحَدِّي السَّاعَةِ
          </button>
          <button
            onClick={() => {
              setActiveGame('sun_moon');
              soundManager.playClick();
            }}
            className={`px-5 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeGame === 'sun_moon' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            الشَّمْسُ وَالقَمَرُ
          </button>
        </div>
      </div>

      {/* GAME 1: COUNTING OBJECTS */}
      {activeGame === 'counting' && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-md p-6 sm:p-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              كَمْ عَدَدُ القُرَيْصَاتِ المُلَوَّنَةِ؟
            </h3>
            <button
              onClick={() => soundManager.speakArabic('كم عدد القريصات الملونة؟')}
              className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-2xl transition-colors cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Giant Visual Counters */}
          <div className="bg-amber-50/70 border-4 border-dashed border-amber-300 rounded-3xl p-8 sm:p-12 min-h-[200px] flex flex-wrap items-center justify-center gap-6 max-w-2xl mx-auto shadow-inner">
            {Array.from({ length: countingTarget }).map((_, idx) => (
              <div
                key={idx}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 shadow-lg transform hover:scale-110 transition-transform flex items-center justify-center text-white font-black text-2xl border-4 border-white"
              >
                ●
              </div>
            ))}
          </div>

          {/* Huge Number Options */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => handleCountAnswer(num)}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-3xl font-black text-3xl sm:text-4xl font-mono transition-all cursor-pointer ${
                  selectedCount === num
                    ? num === countingTarget
                      ? 'bg-emerald-600 text-white scale-110 shadow-xl'
                      : 'bg-rose-500 text-white scale-95 shadow'
                    : 'bg-slate-100 text-slate-800 hover:bg-amber-100 hover:scale-105 border-2 border-slate-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {countingResult === 'correct' && (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto animate-bounce">
              <div className="flex items-center gap-3 text-xl font-black">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <span>أَحْسَنْتَ يَا بَطَلْ! الإِجَابَةُ هِيَ: {countingTarget} ⭐</span>
              </div>
              <button
                onClick={nextCountingRound}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-black rounded-2xl shadow cursor-pointer whitespace-nowrap"
              >
                سُؤَالٌ آخَرُ ↻
              </button>
            </div>
          )}

          {countingResult === 'wrong' && (
            <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-800 text-lg font-bold max-w-md mx-auto">
              حَاوِلْ مَرَّةً أُخْرَى، عُدَّ القُرَيْصَاتِ مَعِي!
            </div>
          )}
        </div>
      )}

      {/* GAME 2: CLASSIFICATION (SOLID VS LIQUID) */}
      {activeGame === 'classification' && (
        <div className="bg-white rounded-3xl border-2 border-teal-200 shadow-md p-6 sm:p-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              هَلْ هَذِهِ المَادَّةُ «صَلْبَةٌ» أَمْ «سَائِلَةٌ»؟
            </h3>
            <button
              onClick={() => soundManager.speakArabic(classificationItems[currentClassIndex].name)}
              className="p-3 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-2xl transition-colors cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Giant Object Card */}
          <div className="bg-teal-50/70 border-4 border-teal-200 rounded-3xl p-10 max-w-md mx-auto shadow-md">
            <div className="text-8xl sm:text-9xl mb-4">{classificationItems[currentClassIndex].emoji}</div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">
              {classificationItems[currentClassIndex].name}
            </div>
          </div>

          {/* Big Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-2">
            <button
              onClick={() => handleClassify('solid')}
              className="p-8 bg-amber-50 hover:bg-amber-100 border-4 border-amber-300 rounded-3xl flex flex-col items-center gap-3 font-black text-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <span className="text-5xl">🧱</span>
              <span className="text-2xl sm:text-3xl">جِسْمٌ صَلْبٌ</span>
            </button>

            <button
              onClick={() => handleClassify('liquid')}
              className="p-8 bg-sky-50 hover:bg-sky-100 border-4 border-sky-300 rounded-3xl flex flex-col items-center gap-3 font-black text-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <span className="text-5xl">🌊</span>
              <span className="text-2xl sm:text-3xl">جِسْمٌ سَائِلٌ</span>
            </button>
          </div>

          {currentClassIndex + 1 === classificationItems.length && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setCurrentClassIndex(0)}
                className="flex items-center gap-2 text-base font-black text-teal-800 bg-teal-100 hover:bg-teal-200 px-6 py-3 rounded-2xl cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>إِعَادَةُ اللُّعْبَةِ</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: CLOCK CHALLENGE */}
      {activeGame === 'clock' && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-md p-6 sm:p-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {clockQuestions[clockIndex].text}
            </h3>
            <button
              onClick={() => soundManager.speakArabic(clockQuestions[clockIndex].text)}
              className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-2xl transition-colors cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Big Analog Clock */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-8 border-indigo-600 bg-white shadow-xl mx-auto my-6 flex items-center justify-center">
            <span className="absolute top-4 font-black text-slate-800 text-2xl font-mono">12</span>
            <span className="absolute bottom-4 font-black text-slate-800 text-2xl font-mono">6</span>
            <span className="absolute right-4 font-black text-slate-800 text-2xl font-mono">3</span>
            <span className="absolute left-4 font-black text-slate-800 text-2xl font-mono">9</span>

            {/* Minute hand pointing to 12 */}
            <div className="absolute w-2.5 h-28 bg-slate-800 rounded-full origin-bottom bottom-1/2 transform -translate-x-1/2" />
            {/* Hour hand */}
            <div
              className="absolute w-3.5 h-20 bg-rose-600 rounded-full origin-bottom bottom-1/2 transform -translate-x-1/2"
              style={{
                transform: `rotate(${clockQuestions[clockIndex].hour * 30}deg)`,
              }}
            />
            {/* Center dot */}
            <div className="absolute w-6 h-6 rounded-full bg-slate-900 border-4 border-white" />
          </div>

          {/* Huge Time Options */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {clockQuestions[clockIndex].options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  soundManager.playClick();
                  if (opt === clockQuestions[clockIndex].correct) {
                    soundManager.playSuccess();
                    setClockAnswered(true);
                    confetti({ particleCount: 50, spread: 60 });
                    onEarnStar();
                  } else {
                    soundManager.playTryAgain();
                  }
                }}
                className={`px-8 py-4 rounded-3xl font-mono text-3xl font-black transition-all cursor-pointer ${
                  clockAnswered && opt === clockQuestions[clockIndex].correct
                    ? 'bg-emerald-600 text-white scale-110 shadow-xl'
                    : 'bg-indigo-50 text-indigo-950 hover:bg-indigo-100 border-2 border-indigo-300 hover:scale-105'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {clockAnswered && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  setClockAnswered(false);
                  setClockIndex((i) => (i + 1) % clockQuestions.length);
                }}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer"
              >
                السَّاعَةُ التَّالِيَةُ ⏰
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 4: SUN & MOON (الـ الشمسية والـ القمرية) */}
      {activeGame === 'sun_moon' && (
        <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-md p-6 sm:p-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              «لَامٌ شَمْسِيَّةٌ» ☀️ أَمْ «لَامٌ قَمَرِيَّةٌ» 🌙؟
            </h3>
            <button
              onClick={() => soundManager.speakArabic(sunMoonItems[sunMoonIndex].word)}
              className="p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-2xl transition-colors cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Giant Word Card */}
          <div className="bg-emerald-50/70 border-4 border-emerald-300 rounded-3xl p-10 max-w-lg mx-auto shadow-md">
            <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-wide">
              {sunMoonItems[sunMoonIndex].word}
            </div>
          </div>

          {/* Big Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-2">
            <button
              onClick={() => handleSunMoonChoice('sun')}
              className="p-8 bg-amber-50 hover:bg-amber-100 border-4 border-amber-300 rounded-3xl flex flex-col items-center gap-3 font-black text-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <span className="text-6xl">☀️</span>
              <span className="text-2xl sm:text-3xl">لَامٌ شَمْسِيَّةٌ</span>
            </button>

            <button
              onClick={() => handleSunMoonChoice('moon')}
              className="p-8 bg-sky-50 hover:bg-sky-100 border-4 border-sky-300 rounded-3xl flex flex-col items-center gap-3 font-black text-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <span className="text-6xl">🌙</span>
              <span className="text-2xl sm:text-3xl">لَامٌ قَمَرِيَّةٌ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

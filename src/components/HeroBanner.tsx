import React from 'react';
import { Sparkles, Play, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface HeroBannerProps {
  studentName: string;
  stars: number;
  completedLessonsCount: number;
  onStartLearning: () => void;
  onOpenTracing: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  studentName,
  stars,
  completedLessonsCount,
  onStartLearning,
  onOpenTracing,
}) => {
  const heroImagePath = '/src/assets/images/algeria_primary_hero_1792160608265.jpg';

  const welcomeMessage = `مَرْحَباً بِكَ يَا ${studentName || 'صَدِيقِي'}! أَنَا أَحْمَدُ وَهَذِهِ أُخْتِي خَدِيجَةُ، تَعَالَ لِنَتَعَلَّمَ مَعاً الحُرُوفَ وَالأَعْدَادَ وَنَكْتَسِبَ النُّجُومَ!`;

  const handleSpeakWelcome = () => {
    soundManager.playClick();
    soundManager.speakArabic(welcomeMessage);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-xl mb-8">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 relative z-10">
        {/* Left Column: Greeting and Actions */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-sm text-emerald-200 font-black">
            <span>مِنْهَاجُ السَّنَةِ الأُولَى ابْتِدَائِي</span>
            <span aria-hidden="true">·</span>
            <span>الجزائر 🇩🇿</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white font-cairo">
            مَرْحَباً بِكَ يَا <span className="text-amber-300 underline decoration-amber-400 decoration-wavy underline-offset-8">{studentName || 'بَطَلَ الجَزَائِرِ'}</span>!
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 leading-relaxed max-w-xl font-bold">
            أَنَا أَحْمَدُ وَهَذِهِ خَدِيجَةُ! هَيَّا بِنَا لِنَقْرَأَ، نَكْتُبَ، نَحْسُبَ، وَنَكْتَسِبَ نُجُومَ التَّفَوُّقِ! ⭐
          </p>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-sm sm:text-base text-emerald-100/90 pt-1 font-black">
            <span className="flex items-center gap-1.5">
              <span className="text-lg">⭐</span> {stars} نَجْمَةً
            </span>
            <span aria-hidden="true" className="text-emerald-400">·</span>
            <span>{completedLessonsCount} دُرُوسٍ مُكْتَمِلَةٍ</span>
          </div>

          {/* Large Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                soundManager.playClick();
                onStartLearning();
              }}
              className="flex items-center gap-3 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-base sm:text-lg rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>ابْدَأِ التَّعَلُّمَ الآنَ</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTracing();
              }}
              className="flex items-center gap-3 px-7 py-4 bg-white/20 hover:bg-white/30 text-white font-black text-base sm:text-lg rounded-2xl border-2 border-white/30 transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>لَوْحَةُ الحُرُوفِ</span>
            </button>

            <button
              onClick={handleSpeakWelcome}
              className="p-4 bg-emerald-600/60 hover:bg-emerald-600 text-emerald-100 rounded-2xl border border-emerald-400/40 transition-colors cursor-pointer hover:scale-105"
              title="استمع إلى الترحيب"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-emerald-900/40">
            <img
              src={heroImagePath}
              alt="تلاميذ المدرسة الابتدائية في الجزائر أحمد وخديجة"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Volume2, VolumeX, CheckCircle, Moon, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { QURAN_SURAHS, QuranSurah } from '../data/curriculumData';

interface QuranIslamicPlayerProps {
  onEarnStar: () => void;
}

export const QuranIslamicPlayer: React.FC<QuranIslamicPlayerProps> = ({ onEarnStar }) => {
  const [selectedSurah, setSelectedSurah] = useState<QuranSurah>(QURAN_SURAHS[0]);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [memorizedSurahs, setMemorizedSurahs] = useState<Record<number, boolean>>({});

  const playVerse = (index: number) => {
    soundManager.playClick();
    setActiveVerseIndex(index);
    setIsPlaying(true);
    const verseText = selectedSurah.verses[index];
    soundManager.speakArabic(verseText, () => {
      setIsPlaying(false);
      setActiveVerseIndex(null);
    });
  };

  const playEntireSurah = () => {
    soundManager.playClick();
    setIsPlaying(true);
    let idx = 0;

    const playNext = () => {
      if (idx < selectedSurah.verses.length) {
        setActiveVerseIndex(idx);
        soundManager.speakArabic(selectedSurah.verses[idx], () => {
          idx++;
          playNext();
        });
      } else {
        setIsPlaying(false);
        setActiveVerseIndex(null);
      }
    };

    playNext();
  };

  const stopAudio = () => {
    soundManager.stopSpeech();
    setIsPlaying(false);
    setActiveVerseIndex(null);
  };

  const handleMarkMemorized = () => {
    if (memorizedSurahs[selectedSurah.number]) return;
    setMemorizedSurahs((prev) => ({ ...prev, [selectedSurah.number]: true }));
    soundManager.playSuccess();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
    });
    onEarnStar();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl sm:text-4xl">🌙</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            سُوَرُ القُرْآنِ الكَرِيمِ
          </h2>
        </div>

        {/* Big Audio Play / Stop Buttons */}
        <div>
          {isPlaying ? (
            <button
              onClick={stopAudio}
              className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-700 hover:bg-rose-100 text-sm sm:text-base font-black rounded-2xl transition-colors cursor-pointer"
            >
              <VolumeX className="w-5 h-5" />
              <span>إِيقَافُ التِّلَاوَةِ</span>
            </button>
          ) : (
            <button
              onClick={playEntireSurah}
              className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base font-black rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Volume2 className="w-5 h-5" />
              <span>تِلَاوَةُ السُّورَةِ كَامِلَةً</span>
            </button>
          )}
        </div>
      </div>

      {/* Surahs Choice Bar - Big Buttons */}
      <div className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-3 min-w-max py-1">
          {QURAN_SURAHS.map((surah) => {
            const isSelected = selectedSurah.number === surah.number;
            const isMemorized = memorizedSurahs[surah.number];
            return (
              <button
                key={surah.number}
                onClick={() => {
                  stopAudio();
                  setSelectedSurah(surah);
                  soundManager.playClick();
                }}
                className={`px-6 py-3.5 rounded-2xl text-base sm:text-lg font-black flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-lg scale-105'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{surah.name}</span>
                {isMemorized && <span className="text-amber-300 text-lg">⭐</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Surah Verses Canvas */}
      <div className="bg-[#FBFDFB] border-4 border-emerald-300 rounded-3xl p-6 sm:p-12 shadow-md space-y-6">
        <div className="text-center pb-4 border-b border-emerald-200">
          <h3 className="text-3xl sm:text-5xl font-black text-emerald-950 font-quran mb-2">
            {selectedSurah.name}
          </h3>
        </div>

        {/* Big Verses */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {selectedSurah.verses.map((verse, idx) => {
            const isHighlighted = activeVerseIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => playVerse(idx)}
                className={`p-5 sm:p-6 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-6 border-2 ${
                  isHighlighted
                    ? 'bg-sky-100 border-sky-400 shadow-md scale-102'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm shrink-0 font-mono">
                    {idx + 1}
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-loose font-quran">
                    {verse}
                  </p>
                </div>
                <Volume2 className="w-6 h-6 text-slate-400 shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Meaning for Child */}
        <div className="p-6 bg-sky-50 rounded-2xl border-2 border-sky-200 text-sky-950 max-w-4xl mx-auto">
          <p className="text-lg sm:text-xl font-black leading-relaxed">
            {selectedSurah.theme}
          </p>
        </div>

        {/* Memorization Star Action */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleMarkMemorized}
            disabled={memorizedSurahs[selectedSurah.number]}
            className={`flex items-center gap-3 px-10 py-4 rounded-3xl font-black text-lg sm:text-xl transition-all shadow-md ${
              memorizedSurahs[selectedSurah.number]
                ? 'bg-emerald-100 text-emerald-900 cursor-default'
                : 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer hover:scale-105 active:scale-95'
            }`}
          >
            <CheckCircle className="w-6 h-6" />
            <span>
              {memorizedSurahs[selectedSurah.number] ? 'حَفِظْتُ السُّورَةَ بِنَجَاحٍ ⭐' : 'حَفِظْتُ السُّورَةَ! (اكْتَسِبْ نُجُوماً ⭐)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

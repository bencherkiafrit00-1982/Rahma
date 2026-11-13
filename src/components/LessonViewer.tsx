import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, ExerciseItem } from '../types/curriculum';
import { soundManager } from '../utils/soundEffects';

interface LessonViewerProps {
  lesson: Lesson;
  onFinishLesson: (lessonId: string, starsEarned: number) => void;
  onBack: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onFinishLesson,
  onBack,
}) => {
  const [currentStage, setCurrentStage] = useState<'discover' | 'exercise' | 'summary'>('discover');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [evaluatedItems, setEvaluatedItems] = useState<Record<string, boolean>>({});
  const [starsInLesson, setStarsInLesson] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSpeak = (text: string) => {
    soundManager.playClick();
    soundManager.speakArabic(text);
  };

  const handleSelectOption = (item: ExerciseItem, chosenOption: string) => {
    soundManager.playClick();
    setUserAnswers((prev) => ({ ...prev, [item.id]: chosenOption }));

    const isCorrect = chosenOption === item.correctAnswer;
    setEvaluatedItems((prev) => ({ ...prev, [item.id]: isCorrect }));

    if (isCorrect) {
      soundManager.playSuccess();
      setStarsInLesson((s) => s + 1);
      confetti({ particleCount: 40, spread: 50 });
    } else {
      soundManager.playTryAgain();
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    soundManager.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    });
    onFinishLesson(lesson.id, Math.max(1, starsInLesson));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm sm:text-base font-black text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-2xl transition-colors cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
          <span>عَوْدَةٌ لِلْدُّرُوسِ</span>
        </button>

        {/* Big Pedagogical Stage Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => {
              setCurrentStage('discover');
              soundManager.playClick();
            }}
            className={`px-5 py-2.5 text-sm sm:text-base font-black rounded-xl transition-all cursor-pointer ${
              currentStage === 'discover' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. أَكْتَشِفُ
          </button>
          <button
            onClick={() => {
              setCurrentStage('exercise');
              soundManager.playClick();
            }}
            className={`px-5 py-2.5 text-sm sm:text-base font-black rounded-xl transition-all cursor-pointer ${
              currentStage === 'exercise' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. أُنْجِزُ
          </button>
          <button
            onClick={() => {
              setCurrentStage('summary');
              soundManager.playClick();
            }}
            className={`px-5 py-2.5 text-sm sm:text-base font-black rounded-xl transition-all cursor-pointer ${
              currentStage === 'summary' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. تَعَلَّمْتُ
          </button>
        </div>
      </div>

      {/* Lesson Heading in Big Text */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">{lesson.title}</h2>
          {lesson.subtitle && (
            <p className="text-base sm:text-lg text-emerald-800 font-bold mt-2">{lesson.subtitle}</p>
          )}
        </div>
        <button
          onClick={() => handleSpeak(lesson.title)}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-sm font-black transition-all cursor-pointer shrink-0"
        >
          <Volume2 className="w-5 h-5" />
          <span>اسْتَمِعْ</span>
        </button>
      </div>

      {/* STAGE 1: أَكْتَشِفُ (Discover) - Big clean text, no clutter */}
      {currentStage === 'discover' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => handleSpeak(lesson.discover.storyText)}
                className="flex items-center gap-2 text-sm sm:text-base font-black text-emerald-800 bg-white px-5 py-2.5 rounded-2xl shadow-sm hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>اقْرَأْ لِي النَّصَّ كَامِلاً</span>
              </button>
            </div>

            <p className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-loose font-bold text-justify">
              {lesson.discover.storyText}
            </p>
          </div>

          {/* Big Words to Read */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h4 className="text-lg font-black text-slate-700 mb-4">اقْرَأْ هَذِهِ الكَلِمَاتِ بِصَوْتٍ وَاضِحٍ:</h4>
            <div className="flex flex-wrap items-center gap-4">
              {lesson.discover.keywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClick();
                    soundManager.speakArabic(kw);
                  }}
                  className="px-6 py-4 bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-400 rounded-2xl text-2xl sm:text-3xl font-black text-slate-900 hover:text-emerald-800 transition-all cursor-pointer flex items-center gap-3 shadow-sm hover:scale-105"
                >
                  <span>{kw}</span>
                  <Volume2 className="w-6 h-6 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Big Action to move to Exercise */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setCurrentStage('exercise');
                soundManager.playClick();
              }}
              className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <span>الانْتِقَالُ إِلَى التَّمَارِينِ (أُنْجِزُ)</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: أُنْجِزُ (Practice) */}
      {currentStage === 'exercise' && (
        <div className="space-y-6">
          {lesson.exercise.items.map((item, qIdx) => {
            const selected = userAnswers[item.id];
            const isEvaluated = evaluatedItems[item.id] !== undefined;
            const isCorrect = evaluatedItems[item.id] === true;

            return (
              <div
                key={item.id}
                className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                      {item.question}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleSpeak(item.question)}
                    className="p-3 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Giant Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.options?.map((opt, optIdx) => {
                    const isOptionSelected = selected === opt;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(item, opt)}
                        className={`p-6 rounded-2xl font-black text-xl sm:text-2xl text-right transition-all flex items-center justify-between border-4 cursor-pointer ${
                          isOptionSelected
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md scale-102'
                              : 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800'
                        }`}
                      >
                        <span>{opt}</span>
                        {isOptionSelected && isCorrect && (
                          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                        )}
                        {isOptionSelected && !isCorrect && (
                          <AlertCircle className="w-8 h-8 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {isEvaluated && (
                  <div
                    className={`p-4 rounded-2xl text-base sm:text-lg font-bold flex items-center gap-3 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : 'bg-rose-100 text-rose-950 border border-rose-300'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        <span>{item.explanation || 'إِجَابَةٌ صَحِيحَةٌ! أَنْتَ بَطَلٌ! ⭐'}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                        <span>{item.hint || 'حَاوِلْ مَرَّةً أُخْرَى!'}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => {
                setCurrentStage('discover');
                soundManager.playClick();
              }}
              className="px-6 py-3 text-sm font-black text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl cursor-pointer"
            >
              السَّابِقُ
            </button>
            <button
              onClick={() => {
                setCurrentStage('summary');
                soundManager.playClick();
              }}
              className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <span>الانْتِقَالُ إِلَى الحَوْصَلَةِ (تَعَلَّمْتُ)</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: تَعَلَّمْتُ (Summary) */}
      {currentStage === 'summary' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white border-4 border-indigo-200 rounded-3xl p-8 sm:p-12 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-indigo-900 bg-indigo-100 px-5 py-2 rounded-2xl">
                خُلَاصَةُ الدَّرْسِ (تَعَلَّمْتُ)
              </span>
              <button
                onClick={() => handleSpeak(lesson.summary.taalamtuText)}
                className="flex items-center gap-2 text-sm sm:text-base font-black text-indigo-800 bg-white px-5 py-2.5 rounded-2xl shadow-sm hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>اقْرَأْ لِي الخُلَاصَةَ</span>
              </button>
            </div>

            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-950 leading-loose text-justify">
              {lesson.summary.taalamtuText}
            </p>

            {lesson.summary.memorizeVerseOrRule && (
              <div className="mt-6 p-6 bg-white/90 rounded-2xl border-2 border-indigo-200 font-quran text-2xl sm:text-3xl text-emerald-950 leading-loose text-center">
                {lesson.summary.memorizeVerseOrRule}
              </div>
            )}
          </div>

          {/* Giant Completion Celebration Card */}
          <div className="bg-white border-4 border-emerald-300 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
            <div className="text-6xl sm:text-7xl">🎉</div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
              مُبَارَكٌ يَا بَطَلَ السَّنَةِ الأُولَى!
            </h3>
            <button
              onClick={handleFinish}
              disabled={isCompleted}
              className={`px-12 py-5 rounded-3xl font-black text-xl sm:text-2xl transition-all shadow-lg cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 active:scale-95 animate-pulse'
              }`}
            >
              {isCompleted ? 'تَمَّ الحِفْظُ بِنَجَاحٍ ⭐' : 'تَسْجِيلُ إِتْمَامِ الدَّرْسِ (+ نُجُومٌ ⭐)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

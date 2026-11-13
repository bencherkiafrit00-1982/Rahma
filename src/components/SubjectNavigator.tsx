import React, { useState } from 'react';
import { BookOpen, Calculator, Compass, Moon, Flag, Sparkles, CheckCircle2, ArrowLeft, Volume2 } from 'lucide-react';
import { SubjectId, Lesson } from '../types/curriculum';
import { SUBJECTS, LESSONS } from '../data/curriculumData';
import { soundManager } from '../utils/soundEffects';

interface SubjectNavigatorProps {
  completedLessonIds: string[];
  onSelectLesson: (lesson: Lesson) => void;
  onOpenTracing: () => void;
  onOpenGames: () => void;
}

export const SubjectNavigator: React.FC<SubjectNavigatorProps> = ({
  completedLessonIds,
  onSelectLesson,
  onOpenTracing,
  onOpenGames,
}) => {
  const [activeFilter, setActiveFilter] = useState<SubjectId | 'all'>('all');

  const filteredLessons = activeFilter === 'all'
    ? LESSONS
    : LESSONS.filter((l) => l.subjectId === activeFilter);

  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'arabic':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'math':
        return <Calculator className="w-5 h-5 text-amber-600" />;
      case 'science':
        return <Compass className="w-5 h-5 text-teal-600" />;
      case 'islamic':
        return <Moon className="w-5 h-5 text-sky-600" />;
      case 'civic':
        return <Flag className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Subject Filter Tabs Bar (Interactive filter controls allowed) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            مَوَادُّ المِنْهَاجِ التَّعْلِيمِيِّ الرَّسْمِيِّ
          </h2>
          <p className="text-xs text-slate-500">
            السَّنَةُ الأُولَى ابْتِدَائِي · اللُّغَةُ العَرَبِيَّةُ، الرِّيَاضِيَّاتُ، التَّرْبِيَةُ العِلْمِيَّةُ وَالتِّكْنُولُوجِيَّةُ، التَّرْبِيَةُ الإِسْلَامِيَّةُ، وَالتَّرْبِيَةُ المَدَنِيَّةُ
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => {
              setActiveFilter('all');
              soundManager.playClick();
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جَمِيعُ المَوَادِّ
          </button>
          {SUBJECTS.map((sub) => {
            const isActive = activeFilter === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveFilter(sub.id);
                  soundManager.playClick();
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={sub.name}
              >
                {getSubjectIcon(sub.id)}
                <span>{sub.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Pedagogical Activities Spotlight (Bento Strip) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Arabic Spotlight */}
        <div
          onClick={() => {
            soundManager.playClick();
            onOpenTracing();
          }}
          className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-5 cursor-pointer hover:shadow-md transition-all hover:scale-101"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xl">
              ✍️
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                لَوْحَةُ خَطِّ الحُرُوفِ
              </h3>
              <span className="text-[11px] text-slate-500">تَتَبَّعِ الحُرُوفَ بِأَلْوَانٍ جَمِيلَةٍ</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden h-28 border border-emerald-100">
            <img
              src="/src/assets/images/arabic_reading_mascot_1792160609647.jpg"
              alt="تلميذ يقرأ الحروف"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Math Spotlight */}
        <div
          onClick={() => {
            soundManager.playClick();
            onOpenGames();
          }}
          className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-5 cursor-pointer hover:shadow-md transition-all hover:scale-101"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl">
              🧮
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                أَلْعَابُ الحِسَابِ وَالأَعْدَادِ
              </h3>
              <span className="text-[11px] text-slate-500">عَدُّ القُرَيْصَاتِ وَقِرَاءَةُ السَّاعَةِ</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden h-28 border border-amber-100">
            <img
              src="/src/assets/images/math_discovery_scene_1792160609352.jpg"
              alt="تلميذة تحسب القريصات"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Science Spotlight */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveFilter('science');
          }}
          className="group relative overflow-hidden rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/80 to-white p-5 cursor-pointer hover:shadow-md transition-all hover:scale-101"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 font-bold text-xl">
              🌱
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                اسْتِكْشَافُ الطَّبِيعَةِ وَالجِسْمِ
              </h3>
              <span className="text-[11px] text-slate-500">الحَوَاسُّ، الأَغْذِيَةُ، وَحِمَايَةُ الصِّحَّةِ</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden h-28 border border-teal-100">
            <img
              src="/src/assets/images/science_nature_scene_1792160610328.jpg"
              alt="استكشاف الطبيعة والعلوم"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Lessons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLessons.map((lesson) => {
          const isDone = completedLessonIds.includes(lesson.id);
          const subject = SUBJECTS.find((s) => s.id === lesson.subjectId);

          return (
            <div
              key={lesson.id}
              className={`rounded-2xl border p-6 transition-all hover:shadow-md flex flex-col justify-between bg-white ${
                isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header: Subject & Status */}
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-2 font-black text-slate-700">
                    {getSubjectIcon(lesson.subjectId)}
                    <span>{subject?.name}</span>
                  </div>
                  {isDone ? (
                    <span className="flex items-center gap-1.5 text-emerald-700 font-black text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>مُنْجَزٌ ⭐</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 font-bold text-xs">مُتَاحٌ لِلتَّعَلُّمِ</span>
                  )}
                </div>

                {/* Lesson Title (Extra Large for Kid Clarity) */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-snug">
                  {lesson.title}
                </h3>

                {/* Short Snippet from Story */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 font-medium">
                  {lesson.discover.storyText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    soundManager.speakArabic(lesson.title);
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 p-2.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  title="استمع إلى عنوان الدرس"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>اسْتَمِعْ</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onSelectLesson(lesson);
                  }}
                  className={`flex items-center gap-2 px-7 py-3 rounded-2xl text-sm sm:text-base font-black transition-all cursor-pointer ${
                    isDone
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:scale-105 active:scale-95'
                  }`}
                >
                  <span>{isDone ? 'مُرَاجَعَةُ الدَّرْسِ' : 'ابْدَأِ الدَّرْسَ'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

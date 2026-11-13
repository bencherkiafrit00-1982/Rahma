import React from 'react';
import {
  Users,
  Award,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Printer,
  Sparkles,
  BarChart3,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { StudentProgress, SubjectId } from '../types/curriculum';
import { SUBJECTS, BADGES, LESSONS } from '../data/curriculumData';
import { soundManager } from '../utils/soundEffects';

interface ParentTeacherDashboardProps {
  progress: StudentProgress;
  onOpenCertificate: () => void;
  onResetProgress: () => void;
}

export const ParentTeacherDashboard: React.FC<ParentTeacherDashboardProps> = ({
  progress,
  onOpenCertificate,
  onResetProgress,
}) => {
  // Calculate completion percentage per subject
  const getSubjectStats = (subId: SubjectId) => {
    const totalInSub = LESSONS.filter((l) => l.subjectId === subId).length;
    const completedInSub = LESSONS.filter(
      (l) => l.subjectId === subId && progress.completedLessons.includes(l.id)
    ).length;
    const pct = totalInSub > 0 ? Math.round((completedInSub / totalInSub) * 100) : 0;
    return { total: totalInSub, completed: completedInSub, pct };
  };

  const totalLessons = LESSONS.length;
  const totalCompleted = progress.completedLessons.length;
  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">فَضَاءُ الوَلِيِّ وَالمُعَلِّمِ (لوحة المتابعة)</h2>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                المنهاج الجزائري - الجيل الثاني
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              مُتَابَعَةُ تَقَدُّمِ التِّلْمِيذِ: <strong className="text-slate-800">{progress.name}</strong> فِي مَوَادِّ السَّنَةِ الأُولَى ابْتِدَائِي
            </p>
          </div>
        </div>

        {/* Certificate Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenCertificate();
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>طِبَاعَةُ شَهَادَةِ التَّفَوُّقِ 📜</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">الدُّرُوسُ المُكْتَمِلَةُ</span>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {totalCompleted} <span className="text-sm font-normal text-slate-500">/ {totalLessons}</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${overallPct}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">مَجْمُوعُ النُّجُومِ</span>
          <div className="text-2xl font-black text-amber-500 font-mono flex items-center gap-1.5">
            <span>⭐</span>
            <span>{progress.stars}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">رصيد التحفيز الإيجابي</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">الشَّارَاتُ المُكْتَسَبَةُ</span>
          <div className="text-2xl font-black text-indigo-700 font-mono">
            {progress.unlockedBadges.length} <span className="text-sm font-normal text-slate-500">/ {BADGES.length}</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">أوسمة الاستحقاق</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block mb-1">نِسْبَةُ التَّقَدُّمِ العَامَّةِ</span>
          <div className="text-2xl font-black text-emerald-700 font-mono">{overallPct}%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">إجمالي المقرّر الرسمي</span>
        </div>
      </div>

      {/* Subject by Subject Detailed Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span>مُسْتَوَى التَّحْصِيلِ حَسَبَ المَوَادِّ الدِّرَاسِيَّةِ:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((sub) => {
            const stats = getSubjectStats(sub.id);
            return (
              <div key={sub.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full ${sub.accentColor}`} />
                    <span className="font-bold text-sm text-slate-900">{sub.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">{stats.pct}%</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${sub.accentColor}`}
                    style={{ width: `${stats.pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>{sub.officialBookTitle}</span>
                  <span className="font-mono">
                    {stats.completed} مِنْ {stats.total} دُرُوسٍ
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Diagnosis & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedagogical Guidelines */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>نَصَائِحُ تَرْبَوِيَّةٌ لِمُرَافَقَةِ طِفْلِكَ فِي المَنْزِلِ:</span>
          </h4>
          <ul className="space-y-2 text-xs text-emerald-950 leading-relaxed list-disc list-inside">
            <li>
              <strong>التشجيع الدائم:</strong> امدح مجهود الطفل في المحاولة والخطأ؛ فالتجربة جزء من منهاج الجيل الثاني.
            </li>
            <li>
              <strong>جلسات قصيرة (15-20 دقيقة):</strong> انتباه طفل الست سنوات محدود؛ الأنشطة القصيرة تحقق نتائج أفضل.
            </li>
            <li>
              <strong>ربط الرياضيات بالحياة اليومية:</strong> اطلب منه عدّ حبات الفاكهة في المطبخ، أو قراءة الساعة عند الإفطار.
            </li>
            <li>
              <strong>النطق بصوت واضح:</strong> ساعده على التمييز بين الحركات القصيرة (ـَ ، ـُ ، ـِ) والمدود الطويلة (ـَا ، ـُو ، ـِي).
            </li>
          </ul>
        </div>

        {/* Weak Points & Focus Areas */}
        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
          <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>مَجَالَاتُ التَّثْبِيتِ وَالتَّرْكِيزِ المُوصَى بِهَا:</span>
          </h4>
          <ul className="space-y-2 text-xs text-amber-950 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>
                <strong>الكتابة والرسم:</strong> تكرار تتبع الحروف على سبورة الحروف لتقوية عضلات الأصابع ودقة المسار.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>
                <strong>مكملات العشرة والجمع:</strong> التدرب اليومي على تكوين العدد 10 (مثال: 6 + 4 = 10، 7 + 3 = 10).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>
                <strong>اللام الشمسية واللام القمرية:</strong> الاستماع الدائم لنطق الكلمات المشكولة في قسم التواصل.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Curriculum Architecture Explanation */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-700" />
          <span>مَنْهَجِيَّةُ الكُتُبِ المَدْرَسِيَّةِ الرَّسْمِيَّةِ لِلسَّنَةِ الأُولَى:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-emerald-700 block mb-1">1. وَضْعِيَّةُ الانْطِلَاقِ (أَكْتَشِفُ):</strong>
            <span>نص تمهيدي ومشهد حياتي مشوق مع شخصيات أحمد وخديجة لاستدراج الطفل لاكتشاف المفهوم الجديد.</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-amber-700 block mb-1">2. أُنْجِزُ (التَّمْرِينُ وَالتَّطْبِيقُ):</strong>
            <span>تمارين تطبيقية تدعم المكتسبات وتوظفها فوراً مع تغذية راجعة لطيفة ونجوم تحفيزية.</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-indigo-700 block mb-1">3. تَعَلَّمْتُ (الحَوْصَلَةُ):</strong>
            <span>خلاصة مبسطة جامعة للقاعدة العلمية أو الأخلاقية يقرؤها التلميذ ويرسخها في ذاكرته.</span>
          </div>
        </div>
      </div>

      {/* Privacy and Reset Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>حِمَايَةُ خُصُوصِيَّةِ الطِّفْلِ: تُحْفَظُ بَيَانَاتُ التَّقَدُّمِ مَحَلِّيّاً دَاخِلَ جِهَازِكُمْ دُونَ أَيِّ إِعْلَانَاتٍ أَوْ تَتَبُّعٍ.</span>
        </div>
        <button
          onClick={() => {
            if (window.confirm('هل تريد حقاً إعادة ضبط تقدم التلميذ وبدء رحلة جديدة؟')) {
              onResetProgress();
            }
          }}
          className="text-slate-400 hover:text-rose-600 transition-colors whitespace-nowrap text-xs"
        >
          إِعَادَةُ ضَبْطِ تَقَدُّمِ التِّلْمِيذِ
        </button>
      </div>
    </div>
  );
};

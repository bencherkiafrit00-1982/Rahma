import React from 'react';
import { X, Printer, Award, Sparkles } from 'lucide-react';
import { StudentProgress } from '../types/curriculum';
import { soundManager } from '../utils/soundEffects';

interface CertificateModalProps {
  progress: StudentProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ progress, onClose }) => {
  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border-4 border-amber-300 overflow-hidden relative print:shadow-none print:border-none print:m-0">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Award className="w-5 h-5 text-amber-500" />
            <span>شَهَادَةُ التَّفَوُّقِ وَالتَّشْجِيعِ المَدْرَسِيِّ</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طِبَاعَةٌ</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Surface */}
        <div className="p-8 sm:p-12 text-center bg-[#FFFCF5] relative border-8 border-double border-amber-400 m-4 rounded-2xl">
          {/* Subtle Watermark Algerian Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <span className="text-[250px] font-black">🇩🇿</span>
          </div>

          {/* Official Algerian Republic Header */}
          <div className="space-y-1 mb-8">
            <h4 className="text-sm font-bold text-slate-700">الجُمْهُورِيَّةُ الجَزَائِرِيَّةُ الدِّيمُقْرَاطِيَّةُ الشَّعْبِيَّةُ</h4>
            <h5 className="text-xs font-medium text-slate-500">وِزَارَةُ التَّرْبِيَةِ الوَطَنِيَّةِ · التَّعْلِيمُ الاِبْتِدَائِيُّ</h5>
          </div>

          {/* Certificate Main Title */}
          <div className="my-6">
            <div className="inline-block p-2 rounded-full bg-amber-100 text-amber-600 mb-3">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-900 tracking-tight font-cairo">
              شَهَادَةُ تَقْدِيرٍ وَامْتِيَازٍ
            </h2>
            <p className="text-xs text-amber-700 font-bold mt-1">تِلْمِيذُ السَّنَةِ الأُولَى ابْتِدَائِي النَّجِيب</p>
          </div>

          {/* Certificate Body Text */}
          <div className="max-w-xl mx-auto space-y-4 text-slate-800 my-8">
            <p className="text-sm sm:text-base leading-relaxed">
              تَشْهَدُ إِدَارَةُ المَدْرَسَةِ بِأَنَّ التِّلْمِيذَ(ةَ) البَطَلَ(ةَ):
            </p>
            <div className="py-2 px-8 bg-amber-100/60 border-b-2 border-amber-500 inline-block rounded-xl">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-cairo">
                {progress.name || 'أَحْمَدُ الصَّغِيرُ'}
              </span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700">
              قَدْ أَبْدَعَ(تْ) وَتَفَوَّقَ(تْ) فِي إِتْمَامِ أَنْشِطَةِ وَدُرُوسِ{' '}
              <strong className="text-emerald-800">السَّنَةِ الأُولَى مِنَ التَّعْلِيمِ الاِبْتِدَائِيِّ</strong>{' '}
              بِالْمَنْهَاجِ الرَّسْمِيِّ الجَزَائِرِيِّ فِي مَوَادِّ:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-700">
              <span className="px-3 py-1 bg-white rounded-lg border border-amber-300">اللُّغَةُ العَرَبِيَّةُ</span>
              <span className="px-3 py-1 bg-white rounded-lg border border-amber-300">الرِّيَاضِيَّاتُ</span>
              <span className="px-3 py-1 bg-white rounded-lg border border-amber-300">التَّرْبِيَةُ العِلْمِيَّةُ وَالتِّكْنُولُوجِيَّةُ</span>
              <span className="px-3 py-1 bg-white rounded-lg border border-amber-300">التَّرْبِيَةُ الإِسْلَامِيَّةُ</span>
              <span className="px-3 py-1 bg-white rounded-lg border border-amber-300">التَّرْبِيَةُ المَدَنِيَّةُ</span>
            </div>
          </div>

          {/* Bottom Badges and Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-amber-200 mt-8 text-xs">
            {/* Stars Count */}
            <div className="text-center">
              <span className="text-slate-500 block mb-1">رَصِيدُ النُّجُومِ:</span>
              <span className="text-lg font-black text-amber-600 font-mono">⭐ {progress.stars} نَجْمَةً</span>
            </div>

            {/* Date */}
            <div className="text-center">
              <span className="text-slate-500 block mb-1">تَارِيخُ التَّسْلِيمِ:</span>
              <span className="font-bold text-slate-800">{currentDate}</span>
            </div>

            {/* Teacher Signature / Stamp */}
            <div className="text-center">
              <span className="text-slate-500 block mb-1">خَتْمُ المُعَلِّمَةِ:</span>
              <span className="font-bold text-emerald-800 block">المُعَلِّمَةُ بُشْرَى ✍️</span>
              <span className="text-[10px] text-slate-400">مُعَلِّمَةُ السَّنَةِ الأُولَى</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

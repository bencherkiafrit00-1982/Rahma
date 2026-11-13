import React, { useState } from 'react';
import { X, User, Check, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface StudentProfileModalProps {
  currentName: string;
  currentAvatar: 'ahmad' | 'khadija' | 'amine' | 'celine';
  onSave: (name: string, avatar: 'ahmad' | 'khadija' | 'amine' | 'celine') => void;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  currentName,
  currentAvatar,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState<string>(currentName);
  const [avatar, setAvatar] = useState<'ahmad' | 'khadija' | 'amine' | 'celine'>(currentAvatar);

  const avatarsList = [
    { id: 'ahmad' as const, name: 'أَحْمَدُ', emoji: '👦', desc: 'تلميذ نشيط ومحب للاستكشاف' },
    { id: 'khadija' as const, name: 'خَدِيجَةُ', emoji: '👧', desc: 'تلميذة مجتهدة تحب القراءة' },
    { id: 'amine' as const, name: 'أَمِينٌ', emoji: '🧒', desc: 'بطل الحساب والألعاب الذكية' },
    { id: 'celine' as const, name: 'سِيلِينُ', emoji: '👧', desc: 'صديقة الطبيعة والفنون الجميلة' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    onSave(name.trim() || 'تِلْمِيذُ النَّجَاحِ', avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-800">مَلَفُّ التِّلْمِيذِ الصَّغِيرِ</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Name input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              مَا هُوَ اسْمُكَ يَا بَطَلْ؟
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسمك هنا (مثال: أيمن، مريم...)"
              maxLength={25}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl text-base font-bold text-slate-800 focus:outline-hidden"
              autoFocus
            />
          </div>

          {/* Avatar choice */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              اخْتَرِ الشَّخْصِيَّةَ الَّتِي تُمَثِّلُكَ:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {avatarsList.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    setAvatar(av.id);
                    soundManager.playClick();
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer ${
                    avatar === av.id
                      ? 'bg-indigo-50 border-indigo-600 scale-102 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-4xl mb-1">{av.emoji}</span>
                  <span className="font-bold text-xs text-slate-900">{av.name}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{av.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>حِفْظُ الاسْمِ وَالشَّخْصِيَّةِ</span>
          </button>
        </form>
      </div>
    </div>
  );
};

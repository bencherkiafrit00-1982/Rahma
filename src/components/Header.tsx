import React from 'react';
import { Users, Sparkles, User } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  studentName: string;
  studentAvatar: string;
  stars: number;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  studentName,
  stars,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('home');
          }}
          className="text-lg sm:text-xl font-black text-emerald-800 tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>مَدْرَسَتِي الأُولَى</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold hidden sm:inline">
            1AP الجزائر
          </span>
        </button>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('home');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'home' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1' : ''
            }`}
          >
            المَوَادُّ الدِّرَاسِيَّةُ
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('tracing');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'tracing' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1' : ''
            }`}
          >
            لَوْحَةُ الحُرُوفِ
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('games');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'games' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1' : ''
            }`}
          >
            الأَلْعَابُ التَّفَاعُلِيَّةُ
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('quran');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'quran' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1' : ''
            }`}
          >
            القُرْآنُ وَالآدَابُ
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('civic');
            }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'civic' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1' : ''
            }`}
          >
            وَطَنِي الجَزَائِرُ
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Star Counter */}
          <div
            onClick={() => {
              soundManager.playStarPop();
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-black cursor-pointer hover:scale-105 transition-transform"
            title="رصيد النجوم المكتسبة"
          >
            <span className="text-sm">⭐</span>
            <span className="font-mono text-sm">{stars}</span>
          </div>

          {/* Student Profile Quick Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            title="تغيير اسم التلميذ أو الصورة"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline max-w-[100px] truncate">{studentName}</span>
          </button>

          {/* Parent/Teacher Dashboard Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('dashboard');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">فَضَاءُ الوَلِيِّ وَالمُعَلِّمِ</span>
            <span className="sm:hidden">المُتَابَعَةُ</span>
          </button>
        </div>
      </div>
    </header>
  );
};

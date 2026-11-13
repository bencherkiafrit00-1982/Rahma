import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SubjectNavigator } from './components/SubjectNavigator';
import { LessonViewer } from './components/LessonViewer';
import { LetterTracingCanvas } from './components/LetterTracingCanvas';
import { InteractiveGames } from './components/InteractiveGames';
import { QuranIslamicPlayer } from './components/QuranIslamicPlayer';
import { CivicHeritageSection } from './components/CivicHeritageSection';
import { ParentTeacherDashboard } from './components/ParentTeacherDashboard';
import { StudentProfileModal } from './components/StudentProfileModal';
import { CertificateModal } from './components/CertificateModal';
import { Lesson, StudentProgress } from './types/curriculum';
import { BADGES, LESSONS } from './data/curriculumData';
import { soundManager } from './utils/soundEffects';

const STORAGE_KEY = 'algeria_primary_grade1_progress';

const DEFAULT_PROGRESS: StudentProgress = {
  name: 'أَحْمَدُ الصَّغِيرُ',
  avatar: 'ahmad',
  stars: 12,
  completedLessons: ['arabic_1_family', 'math_1_numbers_0_5'],
  exerciseScores: {},
  unlockedBadges: ['algeria_star'],
  lastActiveDate: new Date().toISOString(),
  subjectMastery: {
    arabic: 50,
    math: 35,
    science: 30,
    islamic: 50,
    civic: 40,
  },
  weakPoints: ['مكملات العدد 10', 'اللام الشمسية والقمرية', 'تتبع الحروف'],
};

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return DEFAULT_PROGRESS;
  });

  const [currentView, setCurrentView] = useState<string>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const addStars = (count: number = 1) => {
    soundManager.playStarPop();
    setProgress((prev) => {
      const newStars = prev.stars + count;
      // Check for newly unlocked badges
      const unlocked = [...prev.unlockedBadges];
      BADGES.forEach((b) => {
        if (newStars >= b.requiredStars && !unlocked.includes(b.id)) {
          unlocked.push(b.id);
        }
      });
      return {
        ...prev,
        stars: newStars,
        unlockedBadges: unlocked,
      };
    });
  };

  const handleFinishLesson = (lessonId: string, starsEarned: number) => {
    setProgress((prev) => {
      const completed = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];
      const newStars = prev.stars + starsEarned;
      const unlocked = [...prev.unlockedBadges];
      BADGES.forEach((b) => {
        if (newStars >= b.requiredStars && !unlocked.includes(b.id)) {
          unlocked.push(b.id);
        }
      });
      return {
        ...prev,
        stars: newStars,
        completedLessons: completed,
        unlockedBadges: unlocked,
      };
    });
  };

  const handleSaveProfile = (name: string, avatar: 'ahmad' | 'khadija' | 'amine' | 'celine') => {
    setProgress((prev) => ({
      ...prev,
      name,
      avatar,
    }));
  };

  const handleResetProgress = () => {
    setProgress({
      ...DEFAULT_PROGRESS,
      stars: 0,
      completedLessons: [],
      unlockedBadges: [],
    });
    soundManager.playClick();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-cairo" dir="rtl">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setActiveLesson(null);
          setCurrentView(view);
        }}
        studentName={progress.name}
        studentAvatar={progress.avatar}
        stars={progress.stars}
        onOpenProfile={() => setShowProfileModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && !activeLesson && (
          <div className="space-y-8">
            <HeroBanner
              studentName={progress.name}
              stars={progress.stars}
              completedLessonsCount={progress.completedLessons.length}
              onStartLearning={() => {
                const firstUndone = LESSONS.find((l) => !progress.completedLessons.includes(l.id)) || LESSONS[0];
                setActiveLesson(firstUndone);
              }}
              onOpenTracing={() => setCurrentView('tracing')}
            />

            <SubjectNavigator
              completedLessonIds={progress.completedLessons}
              onSelectLesson={(lesson) => setActiveLesson(lesson)}
              onOpenTracing={() => setCurrentView('tracing')}
              onOpenGames={() => setCurrentView('games')}
            />
          </div>
        )}

        {/* VIEW 2: ACTIVE LESSON VIEWER */}
        {activeLesson && (
          <LessonViewer
            lesson={activeLesson}
            onFinishLesson={handleFinishLesson}
            onBack={() => setActiveLesson(null)}
          />
        )}

        {/* VIEW 3: TRACING CANVAS */}
        {currentView === 'tracing' && (
          <LetterTracingCanvas onEarnStar={() => addStars(2)} />
        )}

        {/* VIEW 4: INTERACTIVE MINI-GAMES */}
        {currentView === 'games' && (
          <InteractiveGames onEarnStar={() => addStars(2)} />
        )}

        {/* VIEW 5: QURAN & ISLAMIC VALUES */}
        {currentView === 'quran' && (
          <QuranIslamicPlayer onEarnStar={() => addStars(3)} />
        )}

        {/* VIEW 6: CIVIC HERITAGE & PATRIOTISM */}
        {currentView === 'civic' && (
          <CivicHeritageSection
            studentName={progress.name}
            onEarnStar={() => addStars(2)}
          />
        )}

        {/* VIEW 7: PARENT & TEACHER DASHBOARD */}
        {currentView === 'dashboard' && (
          <ParentTeacherDashboard
            progress={progress}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Clean Educational Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">مَدْرَسَتِي الأُولَى</span>
            <span>·</span>
            <span>مُطَابِقٌ لِمِنْهَاجِ الجِيلِ الثَّانِي لِلتَّعْلِيمِ الاِبْتِدَائِيِّ فِي الجَزَائِرِ 🇩🇿</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>الجمهورية الجزائرية الديمقراطية الشعبية</span>
            <span>·</span>
            <span>وزارة التربية الوطنية</span>
          </div>
        </div>
      </footer>

      {/* Profile Customization Modal */}
      {showProfileModal && (
        <StudentProfileModal
          currentName={progress.name}
          currentAvatar={progress.avatar}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Printable Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          progress={progress}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
}

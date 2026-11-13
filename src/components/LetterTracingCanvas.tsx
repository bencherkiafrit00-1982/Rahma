import React, { useRef, useState, useEffect } from 'react';
import { Volume2, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { ALGERIAN_LETTERS } from '../data/curriculumData';

interface LetterTracingCanvasProps {
  onEarnStar: () => void;
}

const NUMBERS_FOR_TRACING = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const LetterTracingCanvas: React.FC<LetterTracingCanvasProps> = ({ onEarnStar }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedChar, setSelectedChar] = useState<string>('م');
  const [strokeColor, setStrokeColor] = useState<string>('#16a34a'); // Emerald green
  const [brushSize, setBrushSize] = useState<number>(18);
  const [mode, setMode] = useState<'letters' | 'numbers'>('letters');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    clearCanvas();
  }, [selectedChar]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw notebook lines (كراس القسم)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    for (let y = 60; y < rect.height; y += 70) {
      ctx.beginPath();
      ctx.moveTo(10, y);
      ctx.lineTo(rect.width - 10, y);
      ctx.stroke();
    }

    // Main writing line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, rect.height / 2 + 60);
    ctx.lineTo(rect.width - 10, rect.height / 2 + 60);
    ctx.stroke();

    // Giant dashed template character for kid focus
    ctx.save();
    const fontSize = Math.min(rect.height * 0.62, 260);
    ctx.font = `900 ${fontSize}px "Cairo", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 12]);
    ctx.strokeText(selectedChar, rect.width / 2, rect.height / 2 + 10);
    ctx.fillText(selectedChar, rect.width / 2, rect.height / 2 + 10);
    ctx.restore();

    setHasDrawn(false);
    setCelebrated(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    soundManager.playClick();
    setIsDrawing(true);
    setHasDrawn(true);

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = brushSize;
    ctx.setLineDash([]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const handlePronounce = () => {
    soundManager.playClick();
    const textToSpeak = mode === 'letters' ? `حَرْفُ ${selectedChar}` : `الْعَدَدُ ${selectedChar}`;
    soundManager.speakArabic(textToSpeak);
  };

  const handleCompleteTracing = () => {
    if (!hasDrawn || celebrated) return;
    setCelebrated(true);
    soundManager.playSuccess();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
    });
    onEarnStar();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Top Simple Bar: Letters or Numbers Mode */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl sm:text-4xl">✍️</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            لَوْحَةُ الحُرُوفِ وَالأَرْقَامِ
          </h2>
        </div>

        {/* Large Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => {
              setMode('letters');
              setSelectedChar('م');
              soundManager.playClick();
            }}
            className={`px-6 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              mode === 'letters' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            الحُرُوفُ
          </button>
          <button
            onClick={() => {
              setMode('numbers');
              setSelectedChar('1');
              soundManager.playClick();
            }}
            className={`px-6 py-3 text-sm sm:text-base font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              mode === 'numbers' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            الأَرْقَامُ
          </button>
        </div>
      </div>

      {/* Big Touch-Friendly Character Picker */}
      <div className="bg-white rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-3 min-w-max py-1">
          {mode === 'letters'
            ? ALGERIAN_LETTERS.map((item) => (
                <button
                  key={item.char}
                  onClick={() => {
                    setSelectedChar(item.char);
                    soundManager.playClick();
                    soundManager.speakArabic(item.name);
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl font-black text-3xl sm:text-4xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    selectedChar === item.char
                      ? 'bg-emerald-600 text-white shadow-lg scale-110'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {item.char}
                </button>
              ))
            : NUMBERS_FOR_TRACING.map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setSelectedChar(num);
                    soundManager.playClick();
                    soundManager.speakArabic(`العدد ${num}`);
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl font-black text-3xl sm:text-4xl font-mono flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    selectedChar === num
                      ? 'bg-amber-500 text-white shadow-lg scale-110'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
        </div>
      </div>

      {/* Main Full-Size Interactive Tracing Board */}
      <div className="relative bg-[#FAFAFA] rounded-3xl border-4 border-slate-300 overflow-hidden shadow-md">
        {/* Quick Audio & Eraser Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
          <button
            onClick={handlePronounce}
            className="flex items-center gap-2 px-5 py-3 text-sm font-black text-emerald-800 bg-white/95 hover:bg-white rounded-2xl border-2 border-emerald-300 shadow-sm transition-all cursor-pointer hover:scale-105"
            title="نطق الحرف"
          >
            <Volume2 className="w-5 h-5 text-emerald-600" />
            <span>نُطْقُ {mode === 'letters' ? 'الحَرْفِ' : 'العَدَدِ'}</span>
          </button>
          <button
            onClick={clearCanvas}
            className="flex items-center gap-2 px-5 py-3 text-sm font-black text-slate-700 bg-white/95 hover:bg-white rounded-2xl border-2 border-slate-300 shadow-sm transition-all cursor-pointer hover:scale-105"
            title="امسح اللوحة"
          >
            <RotateCcw className="w-5 h-5 text-slate-500" />
            <span>مَسْحٌ</span>
          </button>
        </div>

        {/* Large Drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[420px] sm:h-[480px] lg:h-[540px] cursor-crosshair touch-none select-none bg-white"
        />

        {/* Bottom Palette and Colors */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
          {/* Colors */}
          <div className="flex items-center gap-3">
            {[
              { color: '#16a34a', label: 'أخضر' },
              { color: '#dc2626', label: 'أحمر' },
              { color: '#2563eb', label: 'أزرق' },
              { color: '#f59e0b', label: 'أصفر' },
              { color: '#9333ea', label: 'بنفسجي' },
            ].map((c) => (
              <button
                key={c.color}
                onClick={() => {
                  setStrokeColor(c.color);
                  soundManager.playClick();
                }}
                className={`w-10 h-10 rounded-full border-4 transition-transform cursor-pointer ${
                  strokeColor === c.color ? 'scale-125 border-slate-900 shadow-md' : 'border-white hover:scale-110'
                }`}
                style={{ backgroundColor: c.color }}
                title={c.label}
              />
            ))}
          </div>

          {/* Stroke Size */}
          <div className="flex items-center gap-2">
            {[
              { size: 12, label: 'قَلَمٌ عَادِيٌّ' },
              { size: 22, label: 'قَلَمٌ عَرِيضٌ' },
              { size: 32, label: 'طَبَاشِيرٌ ضَخْمٌ' },
            ].map((s) => (
              <button
                key={s.size}
                onClick={() => {
                  setBrushSize(s.size);
                  soundManager.playClick();
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  brushSize === s.size
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleCompleteTracing}
          disabled={!hasDrawn || celebrated}
          className={`flex items-center justify-center gap-3 px-10 py-4 rounded-3xl font-black text-lg sm:text-xl transition-all shadow-md ${
            hasDrawn && !celebrated
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 cursor-pointer animate-pulse'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-6 h-6" />
          <span>{celebrated ? 'أَحْسَنْتَ يَا بَطَلْ! ⭐' : 'أَتْقَنْتُ الكِتَابَةَ! (+ نَجْمَتَانِ)'}</span>
        </button>
      </div>
    </div>
  );
};

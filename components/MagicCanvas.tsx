
import React, { useEffect, useRef, useState } from 'react';
import { RenderState } from '../types';
import { renderToCanvas } from '../services/renderer';

interface MagicCanvasProps {
  renderState: RenderState;
  theme: 'dark' | 'light';
}

const MagicCanvas: React.FC<MagicCanvasProps> = ({ renderState, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'mp4'>('png');
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const requestRef = useRef<number>(0);

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        renderToCanvas(ctx, renderState, canvas.width, canvas.height, time / 16);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [renderState]);

  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    chunksRef.current = [];
    setRecordProgress(0);
    
    // Support for major browsers
    const stream = canvas.captureStream(30); 
    const recorder = new MediaRecorder(stream, { 
      mimeType: 'video/webm;codecs=vp9' 
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wizard-ritual-${Date.now()}.mp4`;
      link.click();
      URL.revokeObjectURL(url);
      setIsRecording(false);
      setRecordProgress(0);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);

    const startTime = Date.now();
    const duration = 5000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setRecordProgress(percent);
      if (percent >= 100) {
        clearInterval(progressInterval);
        if (recorder.state === 'recording') recorder.stop();
      }
    }, 50);
  };

  const downloadArt = () => {
    if (format === 'mp4') {
      startRecording();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `wizard-art-${Date.now()}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`, 1.0);
    link.click();
  };

  const isDark = theme === 'dark';
  const isEther = renderState.activeBook === 'ether';

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px]">
      <div className={`p-1 bg-transparent transition-all duration-700 border relative group overflow-hidden ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          className="w-full aspect-square block bg-black shadow-2xl"
          style={{ imageRendering: 'auto' }}
        />
        
        {/* Recording Overlay */}
        {isRecording && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
            <div className="w-full max-w-[200px] h-[2px] bg-white/10 relative overflow-hidden mb-4">
              <div 
                className="absolute inset-y-0 left-0 bg-indigo-500 transition-all duration-100 ease-linear"
                style={{ width: `${recordProgress}%` }}
              />
            </div>
            <span className="text-white text-[9px] font-mystical uppercase tracking-[0.5em] animate-pulse">
              Capturing Essence
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-6 border-t border-inherit pt-6">
        {/* Awesome File Selector */}
        <div className="flex items-center justify-between">
          <label className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Incarnation Type</label>
          <div className={`flex p-1 rounded-lg border transition-all ${isDark ? 'border-zinc-800 bg-zinc-950/50' : 'border-zinc-100 bg-zinc-50'}`}>
            {(['png', 'jpeg', 'mp4'] as const).map((f) => {
              const disabled = f === 'mp4' && !isEther;
              return (
                <button
                  key={f}
                  onClick={() => !disabled && setFormat(f)}
                  disabled={disabled}
                  title={disabled ? "Requires Book of Ether" : ""}
                  className={`px-4 py-2 rounded-md text-[10px] uppercase tracking-widest font-black transition-all ${
                    format === f && !disabled
                      ? (isDark ? 'bg-indigo-600 text-white shadow-lg' : 'bg-black text-white shadow-lg') 
                      : 'text-zinc-500 hover:text-zinc-300 disabled:opacity-10 disabled:cursor-not-allowed'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
        
        <button 
          onClick={downloadArt}
          disabled={isRecording}
          className={`group relative overflow-hidden text-[11px] uppercase tracking-[0.4em] font-black border py-5 transition-all active:scale-95 active:brightness-90 ${
            isRecording ? 'opacity-50 cursor-not-allowed border-zinc-700' : 
            isDark ? 'border-white text-white hover:text-black' : 'border-black text-black hover:text-white'
          }`}
        >
          <span className="relative z-10 font-mystical">
            {isRecording ? 'Capturing...' : format === 'mp4' ? 'Initiate Capture' : 'Manifest Art'}
          </span>
          {!isRecording && (
            <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          )}
        </button>
      </div>

      {renderState.errors.length > 0 && (
        <div className={`text-[9px] font-code p-4 border-l-4 uppercase tracking-tight animate-in slide-in-from-left-2 duration-300 ${isDark ? 'bg-red-950/20 border-red-900 text-red-500' : 'bg-red-50 border-red-200 text-red-600'}`}>
          <span className="font-bold mr-2 text-red-700">X</span> {renderState.errors[0]}
        </div>
      )}
    </div>
  );
};

export default MagicCanvas;

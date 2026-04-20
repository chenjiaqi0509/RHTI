import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Play, Pause, RefreshCcw, Volume2, VolumeX } from 'lucide-react';
import { useRef } from 'react';
import { questions, albums, tenthAlbum, Question, Dimension } from './data';

type AppState = 'landing' | 'quiz' | 'calculating' | 'result';

interface Answer {
  questionId: number;
  score: number; // 0 to 100 based on standard scale
  dimension: Dimension;
  reversed: boolean;
}

const SHUFFLED_QUESTIONS = [...questions].sort(() => Math.random() - 0.5);

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
  }, []);

  const handleStart = () => {
    setAppState('quiz');
  };

  const handleAnswer = (score: number) => {
    const question = shuffledQuestions[currentIdx];
    if (!question) return;

    const newAnswer: Answer = {
      questionId: question.id,
      score,
      dimension: question.dimension,
      reversed: question.reversed,
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== question.id);
      return [...filtered, newAnswer];
    });

    if (currentIdx < shuffledQuestions.length - 1) {
      setTimeout(() => setCurrentIdx(prev => prev + 1), 300);
    } else {
      setTimeout(() => setAppState('calculating'), 300);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
    setAnswers([]);
    setCurrentIdx(0);
    setAppState('landing');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans overflow-x-hidden selection:bg-neutral-800">
      <AnimatePresence mode="wait">
        {appState === 'landing' && <Landing key="landing" onStart={handleStart} />}
        {appState === 'quiz' && shuffledQuestions[currentIdx] && (
          <Quiz 
            key={`quiz-${currentIdx}`} 
            question={shuffledQuestions[currentIdx]} 
            currentIndex={currentIdx} 
            total={shuffledQuestions.length} 
            onAnswer={handleAnswer} 
            onBack={handleBack} 
            selectedScore={answers.find(a => a.questionId === shuffledQuestions[currentIdx]?.id)?.score}
          />
        )}
        {appState === 'calculating' && <Calculating key="calc" onDone={() => setAppState('result')} />}
        {appState === 'result' && <Result key="result" answers={answers} onRestart={handleRestart} />}
      </AnimatePresence>
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.95, filter: 'blur(10px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
          RHTI
        </h1>
        <h2 className="text-xl md:text-2xl tracking-widest uppercase font-light text-neutral-400 mb-12">
          Radiohead Type Indicator
        </h2>
        <p className="max-w-md mx-auto text-neutral-500 mb-12 leading-relaxed font-serif italic">
          "I'm not here. This isn't happening."<br/>
          Find your soul's resonance across 4 dimensions.
        </p>
      </motion.div>

      <motion.button 
        onClick={onStart}
        whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-8 py-3 overflow-hidden border border-neutral-700 bg-neutral-900/50 hover:bg-neutral-100 hover:text-black transition-all duration-300 ease-out"
      >
        <span className="relative z-10 uppercase tracking-widest text-sm font-medium">Start Test</span>
      </motion.button>
    </motion.div>
  );
}

const CIRCLE_OPTIONS = [
  { score: 100, size: 'h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20', label: '强烈同意' },
  { score: 83, size: 'h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16', label: '' },
  { score: 66, size: 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12', label: '' },
  { score: 50, size: 'h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8', label: '中立' },
  { score: 33, size: 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12', label: '' },
  { score: 16, size: 'h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16', label: '' },
  { score: 0, size: 'h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20', label: '强烈不同意' },
];

function Quiz({ question, currentIndex, total, onAnswer, onBack, selectedScore }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-screen w-full max-w-3xl mx-auto px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute top-6 sm:top-8 left-4 right-4 sm:left-8 sm:right-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={onBack}
            className={`p-2 rounded-full hover:bg-neutral-800 transition-colors ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ArrowLeft className="w-5 h-5 text-neutral-400" />
          </button>
        </div>
        <div className="text-neutral-600 font-mono text-xs sm:text-sm tracking-widest">
          {currentIndex + 1} / {total}
        </div>
      </div>

      <div className="w-full mb-12 sm:mb-16 text-center mt-12 sm:mt-0">
        <motion.h2 
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg sm:text-xl md:text-3xl lg:text-4xl leading-relaxed md:leading-tight font-medium text-neutral-200"
        >
          {question.text}
        </motion.h2>
      </div>

      <div className="w-full max-w-full overflow-visible">
        <div className="flex w-full items-center justify-between gap-1 sm:gap-4 mb-8 sm:mb-12 relative px-1 sm:px-0">
          {CIRCLE_OPTIONS.map((opt, i) => {
            const isSelected = selectedScore === opt.score;
            const isSide = i === 0 || i === 6;
            const colorClass = i < 3 ? 'border-white/50 hover:border-white' : i > 3 ? 'border-neutral-500/50 hover:border-neutral-500' : 'border-neutral-700 hover:border-neutral-400';
            const fillClass = isSelected ? (i < 3 ? 'bg-white' : i > 3 ? 'bg-neutral-400' : 'bg-neutral-700') : 'bg-transparent';

            return (
              <div key={i} className="flex flex-col items-center group cursor-pointer relative" onClick={() => onAnswer(opt.score)}>
                <div className="relative flex items-center justify-center h-12 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-full border-2 transition-all duration-300 ${opt.size} ${colorClass} ${fillClass}`}
                  />
                </div>
                {opt.label && (
                  <span className={`absolute -bottom-6 sm:-bottom-8 whitespace-nowrap text-[8px] sm:text-xs font-mono tracking-widest text-neutral-500 group-hover:text-neutral-300 ${i===0?'-left-0 sm:-left-2':i===6?'-right-0 sm:-right-2':''}`}>
                    {opt.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between w-full max-w-sm mt-4 text-[10px] sm:text-xs font-mono tracking-widest text-neutral-600">
        <span className="text-neutral-300">同意</span>
        <span>不同意</span>
      </div>
    </motion.div>
  );
}

function Calculating({ onDone }: { onDone: () => void, key?: React.Key }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen text-neutral-500 font-mono"
    >
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-neutral-500 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <p className="tracking-widest uppercase text-sm">Synchronizing frequencies...</p>
    </motion.div>
  );
}

function Result({ answers, onRestart }: { answers: Answer[], onRestart: () => void, key?: React.Key }) {
  // Calculate dimension scores
  const dimensionScores = useMemo(() => {
    const sums: Record<Dimension, number> = { focus: 0, energy: 0, texture: 0, coping: 0 };
    const counts: Record<Dimension, number> = { focus: 0, energy: 0, texture: 0, coping: 0 };

    answers.forEach(ans => {
      const finalScore = ans.reversed ? (100 - ans.score) : ans.score;
      if (typeof sums[ans.dimension] !== 'undefined') {
        sums[ans.dimension] += finalScore;
        counts[ans.dimension] += 1;
      }
    });

    return {
      focus: counts.focus > 0 ? sums.focus / counts.focus : 50,
      energy: counts.energy > 0 ? sums.energy / counts.energy : 50,
      texture: counts.texture > 0 ? sums.texture / counts.texture : 50,
      coping: counts.coping > 0 ? sums.coping / counts.coping : 50,
    };
  }, [answers]);

  // Match against albums
  const matchResults = useMemo(() => {
    const results = albums.map(album => {
      const diff = 
        Math.abs(dimensionScores.focus - album.focus) +
        Math.abs(dimensionScores.energy - album.energy) +
        Math.abs(dimensionScores.texture - album.texture) +
        Math.abs(dimensionScores.coping - album.coping);
      
      const matchPercentage = Math.max(0, (1 - (diff / 400)) * 100);
      return { album, match: matchPercentage, diff };
    }).sort((a, b) => b.match - a.match);

    return results;
  }, [dimensionScores]);

  const bestMatch = (matchResults[0] && matchResults[0].match < 20) ? { album: tenthAlbum, match: matchResults[0].match, diff: 0 } : (matchResults[0] || { album: tenthAlbum, match: 0, diff: 0 });
  const secondBest = matchResults[1] || bestMatch;
  const worstMatch = matchResults[matchResults.length - 1] || bestMatch;

  const radarData = [
    { subject: '聚焦 (宏大)', A: dimensionScores.focus, fullMark: 100 },
    { subject: '能量 (外放)', A: dimensionScores.energy, fullMark: 100 },
    { subject: '质感 (异化)', A: dimensionScores.texture, fullMark: 100 },
    { subject: '应对 (对抗)', A: dimensionScores.coping, fullMark: 100 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen py-16 px-6 max-w-5xl mx-auto"
    >
      {/* Background Audio Player */}
      {bestMatch.album.audioUrl && <AudioPlayer audioUrl={bestMatch.album.audioUrl} />}

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Result Info */}
        <div className="flex-1 space-y-12">
          <motion.div initial={{ opacity: 0, filter: 'blur(5px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.2 }}>
            <h3 className="text-neutral-500 font-mono tracking-widest uppercase text-sm mb-2">最高契合度 ({bestMatch.match.toFixed(1)}%)</h3>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{bestMatch.album.name}</h1>
            <p className="text-neutral-400 font-mono text-sm mb-6 border-b border-neutral-800 pb-6">{bestMatch.album.year}</p>
            <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-neutral-300 max-w-none">
              {bestMatch.album.desc.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Radar Chart */}
          <div className="h-48 sm:h-64 w-full -ml-2 sm:-ml-4 md:-ml-8 opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="You" dataKey="A" stroke="#ffffff" fill="#ffffff" fillOpacity={0.1} strokeWidth={1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-8 border-t border-neutral-800">
            {bestMatch.album.name !== "第十张专辑" && (
              <>
                <SubResult title="第二契合" match={secondBest} />
                <SubResult title="最不契合" match={worstMatch} />
              </>
            )}
          </div>
        </div>

        {/* Right Side: Cover Art & Actions */}
        <div className="w-full lg:w-96 flex flex-col items-center mt-8 lg:mt-0">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="w-full aspect-square bg-neutral-900 overflow-hidden mb-8 group relative border border-neutral-800"
          >
            {bestMatch.album.cover ? (
              <img 
                src={bestMatch.album.cover} 
                alt={bestMatch.album.name} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-800 font-mono">
                [NO IMAGE DATA]
              </div>
            )}
          </motion.div>

          {/* Now we don't need the iframe since we have the invisible/overlay HTML5 audio component taking care of the music */}

          <button 
            onClick={onRestart}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-mono tracking-widest text-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            RESTART TEST
          </button>
        </div>

      </div>
    </motion.div>
  );
}

function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      // Start slightly lower volume to be less jarring
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.warn("Autoplay prevented or failed, user interaction may be required:", e);
      });
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop={true} />
      
      {/* Floating Audio Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-2xl scale-90 sm:scale-100 origin-bottom-right"
      >
        <div className="flex flex-col mx-2 justify-center h-full">
          <div className="flex items-end gap-[2px] h-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-white"
                animate={{ 
                  height: isPlaying ? [3, 12, 6, 12, 3] : 3,
                  opacity: isPlaying ? 0.8 : 0.3
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  type: 'tween'
                }}
              />
            ))}
          </div>
        </div>

        <button 
          onClick={togglePlay}
          className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button 
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </motion.div>
    </>
  );
}

function SubResult({ title, match }: { title: string, match: any }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 shrink-0 bg-neutral-900 overflow-hidden border border-neutral-800 hidden md:block">
        <img src={match.album.cover} alt="" className="w-full h-full object-cover filter grayscale" referrerPolicy="no-referrer" />
      </div>
      <div>
        <h4 className="text-xs font-mono text-neutral-500 tracking-widest mb-1">{title} ({match.match.toFixed(1)}%)</h4>
        <p className="font-medium text-neutral-300">{match.album.name}</p>
      </div>
    </div>
  );
}




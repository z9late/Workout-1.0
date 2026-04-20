/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  History, 
  X, 
  Plus,
  TrendingUp,
  Award,
  Zap,
  MoreHorizontal,
  Clock,
  Play,
  RotateCcw
} from 'lucide-react';
import { SessionLog, DayType } from './types';
import { DAYS, PROGRAM, COLOR_VARIANTS } from './constants';
import { cn } from './lib/utils';

export default function App() {
  const [curWeek, setCurWeek] = useState(1);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<Record<string, SessionLog>>({});
  const [selectedDay, setSelectedDay] = useState<DayType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedWeek = localStorage.getItem('curWeek');
    const savedCompleted = localStorage.getItem('completed');
    const savedLogs = localStorage.getItem('logs');

    if (savedWeek) setCurWeek(parseInt(savedWeek));
    if (savedCompleted) {
      try {
        setCompleted(new Set(JSON.parse(savedCompleted)));
      } catch (e) {
        setCompleted(new Set());
      }
    }
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs) as Record<string, SessionLog>);
      } catch (e) {
        setLogs({});
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('curWeek', curWeek.toString());
    localStorage.setItem('completed', JSON.stringify([...completed]));
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [curWeek, completed, logs]);

  const totalSessions = completed.size;
  const sessionsThisWeek = [...completed].filter(id => id.startsWith(`w${curWeek}-`)).length;

  const openWorkout = (day: DayType) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const saveSession = (day: DayType, modalLogs: any, notes: string) => {
    const id = `w${curWeek}-${day}`;
    const newLog: SessionLog = {
      week: curWeek,
      workout: day,
      date: new Date().toISOString(),
      exercises: modalLogs,
      notes
    };

    setLogs(prev => ({ ...prev, [id]: newLog }));
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setIsModalOpen(false);
  };

  const historyLogs = (Object.values(logs) as SessionLog[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-8 py-16 pb-32 min-h-screen relative font-sans">
      {/* Header */}
      <header className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold block">Programme Overview</p>
            <h1 className="text-6xl font-light font-serif italic">Hypertrophy</h1>
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium accent-text">Week {curWeek} · Calibration Phase</p>
              <div className="flex items-center gap-1.5 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{sessionsThisWeek}/4 This Week</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-subtle">
            <Award className="w-6 h-6 accent-text" />
          </div>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <StatCard label="Goal" value="16" sub="Sessions" icon={Zap} />
        <StatCard label="Progress" value={totalSessions.toString()} sub="Total" icon={TrendingUp} />
        <StatCard label="This Week" value={`${sessionsThisWeek}/4`} sub="Complete" icon={Calendar} />
      </div>

      {/* Week Selector */}
      <div className="flex bg-white/5 p-1.5 rounded-2xl mb-12 border border-subtle">
        {[1, 2, 3, 4].map(w => (
          <button
            key={w}
            onClick={() => setCurWeek(w)}
            className={cn(
              "flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all",
              curWeek === w 
                ? "bg-white text-black shadow-lg" 
                : "text-white/40 hover:text-white/70"
            )}
          >
            Week {w}
          </button>
        ))}
      </div>

      {/* Program Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Current Plan</h2>
          <span className="text-[9px] border border-accent/30 text-accent px-2.5 py-1 rounded-full font-black uppercase tracking-tighter">Live Session</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DAYS.map((day, idx) => (
            <WorkoutCard 
              key={`${curWeek}-${day}`}
              day={day}
              index={idx}
              week={curWeek}
              isCompleted={completed.has(`w${curWeek}-${day}`)}
              onClick={() => openWorkout(day)}
            />
          ))}
        </div>
      </section>

      {/* History Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <History className="w-4 h-4 accent-text opacity-40" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {historyLogs.length === 0 ? (
            <div className="bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] py-16 flex flex-col items-center justify-center">
              <Plus className="w-10 h-10 mb-4 opacity-5 accent-text" />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">No sessions logged yet</p>
            </div>
          ) : (
            historyLogs.map(log => <HistoryCard key={log.date} log={log} />)
          )}
        </div>
      </section>

      {/* Log Modal */}
      <AnimatePresence>
        {isModalOpen && selectedDay && (
          <LoggingModal 
            day={selectedDay}
            week={curWeek}
            existingLog={logs[`w${curWeek}-${selectedDay}`]}
            onClose={() => setIsModalOpen(false)}
            onSave={saveSession}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
}

function StatCard({ label, value, sub, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-card p-6 rounded-[2rem] border border-subtle shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{label}</span>
        <Icon className="w-4 h-4 accent-text opacity-50" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-light tabular-nums serif">{value}</span>
        <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{sub}</span>
      </div>
    </div>
  );
}

interface WorkoutCardProps {
  day: DayType;
  index: number;
  week: number;
  isCompleted: boolean;
  onClick: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, index, week, isCompleted, onClick }) => {
  const variant = COLOR_VARIANTS[day];
  const exercises = PROGRAM[day];

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full bg-card group p-6 rounded-[2.5rem] border border-subtle flex flex-col items-start gap-6 transition-all hover:border-white/20 relative overflow-hidden",
        isCompleted && "opacity-60"
      )}
    >
      <div className={cn(
        "w-full h-32 rounded-[2rem] flex items-center justify-center transition-all bg-white/[0.03] border border-white/5 relative overflow-hidden",
      )}>
        {exercises[0].image && (
          <img 
            src={exercises[0].image} 
            alt={day}
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute top-0 right-0 p-4 text-4xl font-black opacity-[0.03] italic serif">0{index + 1}</div>
        <div className="relative z-10">
          {isCompleted ? (
            <CheckCircle2 className="w-10 h-10 text-accent/40" />
          ) : (
            <div className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
              <Play className="w-6 h-6 text-white opacity-80" />
            </div>
          )}
        </div>
      </div>
      <div className="w-full text-left">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-30">Session {index + 1}</p>
          {isCompleted && <span className="text-[9px] font-bold text-accent border border-accent/20 px-2 py-0.5 rounded-full uppercase italic serif">Logged</span>}
        </div>
        <h3 className={cn("text-2xl font-light serif italic", isCompleted && "opacity-40")}>{day}</h3>
        <p className="text-xs opacity-40 font-medium mt-1">
          {exercises.length} Exercises · {exercises[0].name}
        </p>
      </div>
    </motion.button>
  );
}

interface HistoryCardProps {
  log: SessionLog;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ log }) => {
  const dateStr = new Date(log.date).toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric' 
  });
  
  return (
    <div className="bg-card p-6 rounded-3xl border border-subtle shadow-xl group hover:border-white/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-bold accent-text uppercase tracking-[0.3em] opacity-60 mb-2 block">{dateStr}</span>
          <h4 className="text-xl font-light font-serif italic">{log.workout} <span className="text-white/20 font-sans not-italic font-bold ml-2 text-xs tracking-widest underline decoration-accent/30 decoration-2 underline-offset-4 uppercase">Week {log.week}</span></h4>
        </div>
        <div className="bg-white/5 p-2 rounded-xl border border-subtle">
          <MoreHorizontal className="w-4 h-4 text-white/30" />
        </div>
      </div>
      <p className="text-sm opacity-50 leading-relaxed font-light italic serif border-l border-accent/20 pl-4 py-1">
        {log.notes || "No session notes added."}
      </p>
    </div>
  );
}

interface LoggingModalProps {
  day: DayType;
  week: number;
  existingLog?: SessionLog;
  onClose: () => void;
  onSave: (day: DayType, logs: any, notes: string) => void;
}

function RestTimer() {
  const [seconds, setSeconds] = useState(90);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(90);
    setIsActive(false);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border border-accent/20 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] -mr-16 -mt-16" />
      <div className="flex items-center gap-5 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
          isActive ? "bg-accent/20 accent-text animate-pulse" : "bg-white/5 text-white/30"
        )}>
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-0.5">Rest Intensity</p>
          <p className="text-3xl font-light tabular-nums font-serif italic">{formatTime(seconds)}</p>
        </div>
      </div>
      <div className="flex gap-2 relative z-10">
        <button 
          onClick={toggle}
          className="bg-white text-black p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          {isActive ? <X className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button 
          onClick={reset}
          className="bg-white/5 text-white/40 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

const LoggingModal: React.FC<LoggingModalProps> = ({ day, week, existingLog, onClose, onSave }) => {
  const exercises = PROGRAM[day];
  const [modalLogs, setModalLogs] = useState<any>(existingLog?.exercises || {});
  const [notes, setNotes] = useState(existingLog?.notes || "");

  const handleInputChange = (exName: string, field: 'reps' | 'rpe', value: string) => {
    setModalLogs((prev: any) => ({
      ...prev,
      [exName]: {
        ...(prev[exName] || {}),
        [field]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
      />
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0, scale: 0.98 }}
        className="relative bg-[#0A0A0A] w-full max-w-2xl h-[90vh] rounded-[3.5rem] shadow-2xl border border-subtle overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-10 pb-6 flex justify-between items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px] -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-black accent-text border border-accent/30 px-3 py-1 rounded-full uppercase tracking-tighter">Logging Hub</span>
              <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Week {week}</span>
            </div>
            <h2 className="text-4xl font-light font-serif italic">{day}</h2>
          </div>
          <button 
            onClick={onClose}
            className="relative z-10 p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-white/40"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto px-10 py-6 space-y-12 scrollbar-hide pb-12">
          {/* Header Image Preview */}
          <div className="relative h-56 rounded-[2rem] overflow-hidden border border-subtle group">
            <img 
              src={exercises[0].image} 
              alt="Context"
              className="w-full h-full object-cover opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] accent-text mb-1">Active Set Guidance</p>
              <p className="text-xl font-light font-serif italic text-white/90">Maintain strict tempo control</p>
            </div>
          </div>

          <RestTimer />

          {exercises.map((ex, idx) => (
            <div key={ex.name} className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 relative group hover:border-white/10 transition-all">
              <div className="absolute top-0 right-0 p-6 text-6xl font-black opacity-[0.03] italic serif">SET {ex.sets}</div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 shadow-2xl relative">
                  <img 
                    src={ex.image} 
                    alt={ex.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-light font-serif italic">
                    <span className="accent-text not-italic font-bold tabular-nums text-sm mr-2 opacity-30 tracking-widest uppercase">0{idx + 1}</span>
                    {ex.name}
                  </h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-bold uppercase tracking-[0.15em] opacity-30">
                    <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent/40" />{ex.sets} Sets</span>
                    <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent/40" />{ex.reps} Reps</span>
                    <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent/40" />{ex.rpe} RPE</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] ml-2 block">Performance</label>
                  <input 
                    type="text" 
                    placeholder="Achieved Reps"
                    value={modalLogs[ex.name]?.reps || ""}
                    onChange={(e) => handleInputChange(ex.name, 'reps', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] ml-2 block">Exertion</label>
                  <input 
                    type="text" 
                    placeholder="RPE 1-10"
                    value={modalLogs[ex.name]?.rpe || ""}
                    onChange={(e) => handleInputChange(ex.name, 'rpe', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-4 pt-10 border-t border-white/5">
            <h4 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em] ml-2 block">Session Context</h4>
            <textarea 
              placeholder="Energy, sleep, recovery notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 text-sm font-light italic serif focus:border-accent/40 outline-none transition-all min-h-[160px] placeholder:text-white/10 resize-none leading-relaxed tracking-wide"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-10 pt-6 border-t border-white/5 bg-white/[0.01]">
          <button 
            onClick={() => onSave(day, modalLogs, notes)}
            className="w-full bg-white text-black font-black py-5 rounded-2xl shadow-2xl active:scale-[0.99] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-xs"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finalize Session
          </button>
        </div>
      </motion.div>
    </div>
  );
}

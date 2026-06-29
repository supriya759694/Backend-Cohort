import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import type { JudgeResult } from '../../types/arena.types';

interface JudgePanelProps {
  judge: JudgeResult;
}

// Animated score bar component
function ScoreBar({ score, color, label }: { score: number; color: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="text-lg font-bold text-zinc-100">{score}/10</span>
      </div>

      {/* Track (background bar) */}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        {/* Fill (animated width) */}
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: '0%' }}
          animate={{ width: `${score * 10}%` }} // score 8 → 80%
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
}

export function JudgePanel({ judge }: JudgePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6 mt-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Scale className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-100">Gemini's Verdict</h3>
          <p className="text-xs text-zinc-500">gemini-1.5-flash • AI Judge</p>
        </div>
      </div>

      {/* Score bars */}
      <div className="space-y-4 mb-6">
        <ScoreBar score={judge.solution_1_score} color="bg-violet-500" label="Mistral AI" />
        <ScoreBar score={judge.solution_2_score} color="bg-teal-500" label="Cohere" />
      </div>

      {/* Reasoning */}
      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
        {/* Mistral reasoning */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-500"/>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Mistral Feedback</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {judge.solution_1_reasoning}
          </p>
        </div>

        {/* Cohere reasoning */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500"/>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Cohere Feedback</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {judge.solution_2_reasoning}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

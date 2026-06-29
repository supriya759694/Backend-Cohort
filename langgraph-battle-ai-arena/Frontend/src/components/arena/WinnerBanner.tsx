import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { JudgeResult } from '../../types/arena.types';

interface WinnerBannerProps {
  judge: JudgeResult;
}

export function WinnerBanner({ judge }: WinnerBannerProps) {
  const { solution_1_score, solution_2_score } = judge;
  const isTie = solution_1_score === solution_2_score;
  const mistralWins = solution_1_score > solution_2_score;

  const winner = isTie
    ? { name: 'It\'s a Tie!', color: 'text-amber-400', bg: 'from-amber-900/40 to-amber-950/40', border: 'border-amber-700/40' }
    : mistralWins
    ? { name: 'Mistral AI Wins!', color: 'text-violet-400', bg: 'from-violet-900/40 to-violet-950/40', border: 'border-violet-700/40' }
    : { name: 'Cohere Wins!', color: 'text-teal-400', bg: 'from-teal-900/40 to-teal-950/40', border: 'border-teal-700/40' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
      className={`mt-6 p-6 rounded-2xl bg-linear-to-br ${winner.bg} border ${winner.border} flex items-center gap-4`}
    >
      {/* Bouncing trophy */}
      <motion.div
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 0.5, delay: 1, repeat: 3 }}
      >
        <Trophy className={`w-10 h-10 ${winner.color}`} />
      </motion.div>

      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Winner</p>
        <p className={`text-2xl font-bold ${winner.color}`}>{winner.name}</p>
        <p className="text-sm text-zinc-400 mt-1">
          {isTie
            ? `Both scored ${solution_1_score}/10`
            : `${solution_1_score} vs ${solution_2_score} — margin of ${Math.abs(solution_1_score - solution_2_score)}`
          }
        </p>
      </div>
    </motion.div>
  );
}

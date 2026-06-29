import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '../Ui/button';
import { SolutionCard } from './SolutionCard';
import { JudgePanel } from './JudgePanel';
import { WinnerBanner } from './WinnerBanner';
import type { ArenaResult } from '../../types/arena.types';

interface ArenaResultsProps {
  result: ArenaResult;
  onReset: () => void;
}

export function ArenaResults({ result, onReset }: ArenaResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Problem header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Problem</p>
          <h2 className="text-xl font-semibold text-zinc-100">{result.problem}</h2>
        </div>

        {/* New battle button */}
        <Button
          onClick={onReset}
          className="border-zinc-700 text-zinc-400 hover:text-zinc-100 gap-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          New battle
        </Button>
      </div>

      {/* Two solution cards side by side */}
      <div className="grid md:grid-cols-2 gap-6">
        <SolutionCard
          modelName="Mistral AI"
          modelId="mistral-medium-latest"
          solution={result.solution_1}
          score={result.judge.solution_1_score}
          accentColor="bg-violet-500"
          delay={0.1}
        />
        <SolutionCard
          modelName="Cohere"
          modelId="command-a-03-2025"
          solution={result.solution_2}
          score={result.judge.solution_2_score}
          accentColor="bg-teal-500"
          delay={0.2}
        />
      </div>

      {/* Judge + Winner */}
      <JudgePanel judge={result.judge} />
      <WinnerBanner judge={result.judge} />
    </motion.div>
  );
}

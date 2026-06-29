import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Sending problem to Mistral AI...', color: 'bg-violet-500' },
  { id: 2, label: 'Sending problem to Cohere...', color: 'bg-teal-500' },
  { id: 3, label: 'Gemini is judging both solutions...', color: 'bg-amber-500' },
];

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-20 gap-8"
    >
      {/* Pulsing brain icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-600/30 flex items-center justify-center"
      >
        <Brain className="w-8 h-8 text-violet-400" />
      </motion.div>

      {/* Step list with staggered animation */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.8, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            {/* Pulsing colored dot */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${step.color}`}
            />
            <span className="text-sm text-zinc-400">{step.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-zinc-600">
        This usually takes 10–20 seconds
      </p>
    </motion.div>
  );
}

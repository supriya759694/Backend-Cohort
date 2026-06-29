import { motion, type Variants } from 'framer-motion';
import {Zap} from 'lucide-react';

//Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0},
    visible: {
         opacity: 1,
         transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.5,
                     ease:[0.25, 0.1, 0.25, 1],

        },
},
};

const MODELS = [
    { name: 'Mistral AI', color: 'text-violet-400 bg-violet-950 border-violet-800' },
    { name: 'Cohere', color: 'text-teal-400 bg-teal-950 border-teal-800' },
    { name: 'Gemini Judge', color: 'text-amber-400 bg-amber-950 border-amber-800' },
];

export function heroSection(){
    return (
        <motion.div
            className="text-center py-16 sm:py-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

         {/* Tag line pill */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border bg-violet-950 border-violet-800 text-violet-300">
          <Zap className="w-3 h-3" />
          Powered by LangGraph + 3 AI Models
        </span>
      </motion.div>


       {/* Main headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 mb-4"
      >
        AI{' '}
        {/* Gradient text — CSS gradient on text */}
        <span className="bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Battle Arena
        </span>
      </motion.h1>


      {/* Subheadline */}
      <motion.p
        variants={itemVariants}
        className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed"
      >
        Submit any problem. Watch{' '}
        <span className="text-violet-400 font-medium">Mistral</span>
        {' '}and{' '}
        <span className="text-teal-400 font-medium">Cohere</span>
        {' '}compete. Let{' '}
        <span className="text-amber-400 font-medium">Gemini</span>
        {' '}decide the winner.
      </motion.p>


      {/* Model badges */}
      <motion.div variants={itemVariants} className="flex justify-center gap-3 flex-wrap">
        {MODELS.map((model) => (
          <span
            key={model.name}
            className={`text-xs font-medium px-3 py-1 rounded-full border ${model.color}`}
          >
            {model.name}
          </span>
        ))}
      </motion.div>

        </motion.div>
    );
}     
 

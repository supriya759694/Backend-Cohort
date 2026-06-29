import { motion } from 'framer-motion';
import { CodeBlock } from '../shared/CodeBlock';

// Regex: finds ```language\n code \n``` blocks in AI responses
const CODE_BLOCK_REGEX = /```(\w+)?\n?([\s\S]*?)```/g;

interface SolutionCardProps {
  modelName: string;      // "Mistral AI" or "Cohere"
  modelId: string;        // "mistral-medium-latest"
  solution: string;      // the full markdown response
  score: number;         // 0-10
  accentColor: string;   // tailwind color classes
  delay?: number;        // animation delay
}

// Parses AI response into text segments and code blocks
function parseContent(text: string) {
  const parts: { type: 'text' | 'code'; content: string; lang?: string }[] = [];
  let lastIndex = 0;
  let match;

  CODE_BLOCK_REGEX.lastIndex = 0; // reset regex state

  while ((match = CODE_BLOCK_REGEX.exec(text)) !== null) {
    // text before the code block
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    // the code block itself
    parts.push({ type: 'code', content: match[2].trim(), lang: match[1] || 'javascript' });
    lastIndex = match.index + match[0].length;
  }

  // remaining text after the last code block
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts.length ? parts : [{ type: 'text' as const, content: text }];
}

export function SolutionCard({
  modelName, modelId, solution, score, accentColor, delay = 0
}: SolutionCardProps) {
  const parts = parseContent(solution);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      {/* Card header */}
      <div className="flex items-center justify-between p-5 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          {/* Colored dot accent */}
          <div className={`w-2.5 h-2.5 rounded-full ${accentColor}`} />
          <div>
            <p className="font-semibold text-zinc-100">{modelName}</p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{modelId}</p>
          </div>
        </div>

        {/* Score badge */}
        <div className="text-right">
          <div className="text-2xl font-bold text-zinc-100">
            {score}<span className="text-sm text-zinc-500 font-normal">/10</span>
          </div>
          <div className="text-xs text-zinc-500">Judge score</div>
        </div>
      </div>

      {/* Card body — render text and code blocks */}
      <div className="p-5 flex-1 overflow-auto space-y-4">
        {parts.map((part, i) => (
          part.type === 'code' ? (
            <CodeBlock key={i} code={part.content} language={part.lang} />
          ) : (
            <p key={i} className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {part.content}
            </p>
          )
        ))}
      </div>
    </motion.div>
  );
}

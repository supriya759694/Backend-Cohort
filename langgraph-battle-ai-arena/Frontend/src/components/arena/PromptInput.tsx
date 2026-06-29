import {useState,useRef} from "react";
import type { KeyboardEvent } from "react";
import { Button } from "../Ui/button";
import {Swords,Loader2} from 'lucide-react';
import { motion } from "framer-motion";

const MAX_CHARS = 500; //prevent huge input
const EXAMPLE_PROMPTS = [
  'Write a binary search algorithm in JavaScript',
  'Explain how React hooks work with an example',
  'Build a REST API for a todo app',
];


interface PromptInputProps{
    onSubmit:(input:string) =>void;
    isLoading:boolean;
} 

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
    }
  };

  // Ctrl+Enter or Cmd+Enter submits the form
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExampleClick = (prompt: string) => {
    setValue(prompt);
    textareaRef.current?.focus(); // focus textarea after clicking
  };

  const remaining = MAX_CHARS - value.length;
return(
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
          {/* Main input card */}
      <div className="glass-card p-1 shadow-xl shadow-black/30">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            // Don't allow more than MAX_CHARS
            if (e.target.value.length <= MAX_CHARS) {
              setValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask a coding question, system design problem, or algorithm challenge..."
          disabled={isLoading}
          rows={3}
          className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-500 text-base resize-none p-4 pb-2 focus:outline-none disabled:opacity-50"
        />
        {/* Bottom bar: char count + submit button */}
        <div className="flex items-center justify-between px-4 pb-3">
          {/* Character count — turns red when close to limit */}
          <span className={`text-xs ${remaining < 50 ? 'text-red-400' : 'text-zinc-500'}`}>
            {remaining} characters remaining
          </span>

          <Button
  onClick={handleSubmit}
  disabled={!value.trim() || isLoading}
  className="bg-violet-600 hover:bg-violet-500 text-white gap-2 rounded-xl"
>
  {isLoading ? (
    <>
      {/* Spinning loader icon */}
      <Loader2 className="w-4 h-4 animate-spin" />
      Battling...
    </>
  ) : (
    <>
      <Swords className="w-4 h-4" />
      Start Battle
    </>
  )}
</Button>
        </div>
      </div>

      {/* Example prompts */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleExampleClick(prompt)}
            disabled={isLoading}
            className="text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-600 rounded-full px-3 py-1.5 transition-all disabled:opacity-50"
          >
            {prompt.length > 40 ? prompt.slice(0, 40) + '...' : prompt}
          </button>
        ))}
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-zinc-600 mt-3">
        Press Ctrl+Enter to submit
      </p>
    </motion.div>
  );
}




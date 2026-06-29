import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface CodeBlockProps {
  code: string;
  language?: string; // 'javascript', 'python', etc.
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  // copied: shows checkmark for 2 seconds after copying
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied!');
      // Reset back to copy icon after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-zinc-800">
      {/* Copy button — appears on hover */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-100 opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Copy code"
      >
        {copied
          ? <Check className="w-3.5 h-3.5 text-green-400" />
          : <Copy className="w-3.5 h-3.5" />
        }
      </button>

      {/* The actual syntax highlighter */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '13px',
          background: '#0d0d12',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
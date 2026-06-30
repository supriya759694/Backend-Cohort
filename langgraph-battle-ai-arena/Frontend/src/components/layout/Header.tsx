import { Swords, ExternalLink, Moon, Sun } from "lucide-react";
import {useState,useEffect} from 'react';
// import {Button} from '../Ui/button';
// import { header } from 'framer-motion/client';

export function Header(){
      // isDark: true = dark mode active, false = light mode
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if(isDark){
            document.documentElement.classList.add('dark');
        }else {
            document.documentElement.classList.remove('dark');
        }
    },[isDark]);

    return (
    //sticky : stay at top scrolling
    // backdrop-blur: frosted glass effect

<header className = 'sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md'>
<div className = 'max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
{/* Logo + title */}
<div className='flex items-center gap-3'>
<div className= 'w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center'>
   <Swords className='w-5 h-5 text-white'/>
</div>
<span className="font-semibold text-zinc-100 hidden sm:block">
            AI Battle Arena          
</span>
</div>

    {/* Right side actions */}
    <a
            href="https://github.com/supriya759694"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800"
            aria-label="GitHub"
          >
            <ExternalLink className="w-5 h-5" />
   </a>

  {/* Dark/light mode toggle */}
  <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800"
            aria-label="Toggle dark mode" 
   >

   {isDark
              ? <Sun className="w-5 h-5" />
              : <Moon className="w-5 h-5" />
    }
    </button>

</div>
</header>
);
}

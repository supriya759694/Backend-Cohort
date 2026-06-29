import { AnimatePresence } from "framer-motion"
import { Toaster } from "react-hot-toast";
import {Header} from './components/layout/Header';
import { PageWrapper } from "./components/layout/PageWrapper";
import { HeroSection } from "./components/arena/HeroSection";
import { PromptInput } from "./components/arena/PromptInput";
import {LoadingState} from "./components/arena/LoadingState";
import { ArenaResults } from './components/arena/ArenaResults';
import { useArena } from './hooks/useArena';


const App = () => {
  const { status, result, runBattle, reset } = useArena();

   return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#f4f4f5',
            border: '1px solid #3f3f46',
            borderRadius: '12px',
          },
        }}
      />

      <Header />

      <PageWrapper>
        {/* AnimatePresence: animates components when they mount/unmount */}
        <AnimatePresence mode="wait">

          {/* IDLE state: show hero + input */}
          {status === 'idle' && (
            <>
              <HeroSection />
              <PromptInput onSubmit={runBattle} isLoading={false} />
            </>
          )}

          {/* LOADING state: show spinner */}
          {status === 'loading' && (
            <>
              <PromptInput onSubmit={runBattle} isLoading={true} />
              <LoadingState />
            </>
          )}

          {/* SUCCESS state: show results */}
          {status === 'success' && result && (
            <ArenaResults result={result} onReset={reset} />
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-red-400 text-lg">Something went wrong</p>
              <button onClick={reset} className="text-violet-400 hover:underline text-sm">
                Try again
              </button>
            </div>
          )}

        </AnimatePresence>
      </PageWrapper>
    </div>
  );
}

export default App
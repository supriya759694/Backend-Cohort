import {useState, useCallback} from 'react';
import toast from 'react-hot-toast';
import type{
    ArenaResult,
    ArenaStatus,
    
} from "../types/arena.types";
import { AxiosError } from 'axios';
import { runArenaBattle } from '../services/arena.service';

interface UseArenaReturn{
    status: ArenaStatus;
    result: ArenaResult | null;
    error: string | null;
    runBattle: (input: string)=> Promise<void>;
    reset: ()=> void;
}

export function useArena(): UseArenaReturn{
    const [status, setStatus] = useState<ArenaStatus>('idle');
    const [result, setResult] = useState<ArenaResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    console.log("Calling runArenaBattle...");
    const runBattle =  useCallback(async(input: string)=>{
         console.log('3. runBattle called with:', input);
        //don't do anything if the input is empty
        if(!input.trim()){
            toast.error('please enter a problem to solve');
            return;
        }

        

        setStatus('loading');
        setResult(null);
        setError(null);

        const toastId = toast.loading('AI models are battling... ⚔️');
        try{

    const response = await runArenaBattle({
    input,
     });

   console.log("SERVICE RESPONSE");
   console.log(response);

setResult(response.result);
console.log("Result stored:", response.result);
setStatus("success");

console.log("Status changed to success");


        //setResult(response.data.result);
        setStatus('success');

        toast.success('Battle complete! 🏆', { id: toastId });

    }catch(error){
        console.error('6. CAUGHT ERROR:', error); // ADD THIS — note console.error not .log
        let message = 'Something went wrong . please try again';
        if(error instanceof AxiosError){
            if(error.response){
                message = error.response.data?.message || `Server error: ${error.response.status}`;

            }else if(error.request){
                message = 'cannot reach the server. Is your backend running?';

            }
        }

        setError(message);
        setStatus('error');
        toast.error(message, {id: toastId});
    }

    },[]);


    const reset = useCallback(()=>{
        setStatus('idle');
        setResult(null);
        setError(null);
    },[]);

    return {
        status,
        result,
        error,
        runBattle,
        reset
    };

}

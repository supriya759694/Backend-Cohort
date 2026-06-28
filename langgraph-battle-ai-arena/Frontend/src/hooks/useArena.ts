import {useState, useCallback} from 'react';
import toast from 'react-hot-toast';
import {API_ENDPOINTS} from "../config/app";
import type{
    ArenaResult,
    ArenaStatus,
    ApiResponse,
} from "../types/arena.types";
import axios, { AxiosError } from 'axios';


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

    const runBattle =  useCallback(async(input: string)=>{
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
        const response = await axios.post<ApiResponse>(
        API_ENDPOINTS.invoke,
        { input }   
        );
        setResult(response.data.result);
        setStatus('success');

        toast.success('Battle complete! 🏆', { id: toastId });

    }catch(error){
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

// ------------- API REQUEST-----------------------------

//shape of date we send to the bbackend

export interface ArenaRequest {
    input: string; // the user's Problem/question

}

// ------Judge Result-------------
// Gemini's scoring output

export interface JudgeResult{
  solution_1_score: number;      // Mistral's score 0-10
  solution_2_score: number;      // Cohere's score 0-10
  solution_1_reasoning: string;  // why Mistral got that score
  solution_2_reasoning: string;  // why Cohere got that score

}

//----------Full arena result------------
//shape of data we RECEIVED from Backend
export interface ArenaResult{
    problem:string;
    solution_1:string;
    solution_2:string;
    judge:JudgeResult;
}

//---------API response wrapper-----------------
export interface ApiResponse{
    message: string;
    success:boolean;
    result:ArenaResult;
}

//-- UI status--------
export type ArenaStatus =
    | 'idle' 
    | 'loading' 
    | 'success'
    | 'error';

    export interface ModelInfo{
        name:string;
        model:string;
        color: string;
        bgColor:string;
        borderColor:string;
    }



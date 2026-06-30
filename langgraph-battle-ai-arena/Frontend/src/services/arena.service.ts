import axios from 'axios';
import { API_ENDPOINTS } from '../config/app';
import type { ArenaRequest, ApiResponse } from '../types/arena.types';
import { input } from 'framer-motion/m';

// Send the user's problem to the backend and get the result
export const runArenaBattle = async (
  data: ArenaRequest
): Promise<ApiResponse> => {
  try {
      console.log('4. About to POST to:', API_ENDPOINTS.invoke, { input }); // ADD THIS
    
    const response = await axios.post<ApiResponse>(
      API_ENDPOINTS.invoke,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }

    );
    console.log('5. Got response:', response.data); // ADD THIS

    return response.data;
  } catch (error) {
    throw new Error('Failed to run arena battle');
  }
};
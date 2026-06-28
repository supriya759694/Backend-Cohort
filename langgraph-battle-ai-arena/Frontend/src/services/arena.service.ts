import axios from 'axios';
import { API_ENDPOINTS } from '../config/app';
import type { ArenaRequest, ApiResponse } from '../types/arena.types';

// Send the user's problem to the backend and get the result
export const runArenaBattle = async (
  data: ArenaRequest
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      API_ENDPOINTS.invoke,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to run arena battle');
  }
};
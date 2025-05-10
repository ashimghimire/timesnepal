"use client";

import { useCallback } from 'react';
import { useLoading } from '../context/LoadingContext';

const useApiRequest = (taskId = 'default') => {
  const { startLoading, stopLoading, doneLoading } = useLoading();

  const executeRequest = useCallback(async (requestFn) => {
    try {
      startLoading(taskId);
      const result = await requestFn();
      return result;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    } finally {
      stopLoading(taskId);
    }
  }, [startLoading, stopLoading, taskId]);

  const isDoneLoading = useCallback(() => {
    return doneLoading(taskId);
  }, [doneLoading, taskId]);

  return { 
    executeRequest, 
    startLoading: () => startLoading(taskId), 
    stopLoading: () => stopLoading(taskId),
    isDoneLoading
  };
};

export default useApiRequest; 
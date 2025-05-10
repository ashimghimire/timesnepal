"use client";

import React, { createContext, useState, useContext, useCallback } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(new Set());

  const startLoading = useCallback((taskId = 'default') => {
    setLoadingTasks(prev => {
      const newTasks = new Set(prev);
      newTasks.add(taskId);
      setIsLoading(true);
      return newTasks;
    });
  }, []);

  const stopLoading = useCallback((taskId = 'default') => {
    setLoadingTasks(prev => {
      const newTasks = new Set(prev);
      newTasks.delete(taskId);
      if (newTasks.size === 0) {
        setIsLoading(false);
      }
      return newTasks;
    });
  }, []);

  const doneLoading = useCallback((taskId = 'default') => {
    return !loadingTasks.has(taskId);
  }, [loadingTasks]);

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      startLoading, 
      stopLoading, 
      doneLoading,
      loadingTasks: Array.from(loadingTasks)
    }}>
      <LoadingOverlay isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingContext; 
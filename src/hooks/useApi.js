'use client';

import { useState, useCallback } from 'react';
import { get, post, put, del } from '../lib/fetchClient';

/**
 * Custom hook for making API requests with automatic accessToken handling
 * @returns {Object} API methods and loading/error states
 */
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic request handler
  const request = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // API methods that automatically handle loading and error states
  const api = {
    get: useCallback((endpoint, options) => 
      request(get, endpoint, options), [request]),
    
    post: useCallback((endpoint, data, options) => 
      request(post, endpoint, data, options), [request]),
    
    put: useCallback((endpoint, data, options) => 
      request(put, endpoint, data, options), [request]),
    
    delete: useCallback((endpoint, options) => 
      request(del, endpoint, options), [request]),
  };

  return {
    ...api,
    loading,
    error,
  };
} 
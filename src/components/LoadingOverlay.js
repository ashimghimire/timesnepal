"use client";

import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
});

// Custom styles for the progress bar
const customStyles = `
  #nprogress .bar {
    background: #3b82f6 !important;
    height: 3px !important;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #3b82f6, 0 0 5px #3b82f6 !important;
  }
`;

const LoadingOverlay = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null;
};

export default LoadingOverlay; 
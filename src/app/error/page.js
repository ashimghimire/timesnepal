"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ErrorPage = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
            <p className="mb-4">Error: {error || 'Unknown error occurred'}</p>
            <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Back to Login
            </Link>
        </div>
    );
};

export default ErrorPage;
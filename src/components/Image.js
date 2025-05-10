'use client';
import React from 'react';
import Image from 'next/image';

const XImage = ({ src, alt = '', customHeight, responsive = false }) => {
    if (!src) {
        console.warn('Missing image src in XImage');
        return null;
    }

    const heightClass =
        customHeight && customHeight.includes(' ')
            ? customHeight
            : customHeight || 'h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]';

    return (
        <div className={`relative w-full ${heightClass} overflow-hidden ${responsive ? 'hidden md:block' : ''}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
            />
        </div>
    );
};

export default XImage;

import React from 'react';

const Triangle = ({ className = '', text = 'POLITICS' }) => {
    return (
        <div className="flex flex-row">
            <div className={
                `w-0 h-0 rotate-90
                border-l-[20px] border-l-transparent
                border-b-[35px] border-b-black
                border-r-[20px] border-r-transparent
                ${className}`}
            >  </div>
            <p className='p-2 font-bold text-md'>{text}</p>
        </div>
    );
};

export default Triangle; 
import Link from 'next/link';
import React, { CSSProperties } from 'react';

const TitleGroup = (feed) => {
    return (
        <div className='flex flex-col gap-2'>
           {feed.intro && <p style={feed?.style?.intro} className='uppercase text-blue-500 text-sm mt-2 font-semibold'>{feed.intro}</p> }
           {feed.title && (
            //  <Link href={feed?.url} className='group'>
               <p style={feed?.style?.title} className='hover:underline'>
                 {feed.title}
               </p>
            //  </Link>
           )}
           {feed.date && <p style={feed?.style?.date} className='text-gray-500 text-sm'>{feed.date}</p> }
        </div>
    );
};

export default TitleGroup;
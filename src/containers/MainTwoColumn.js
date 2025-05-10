"use client";
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../lib/fetchClient';
import XImage from '../components/Image';
import TitleGroup from '../components/TitleGroup';
const MainTwoColumn = () => {
    const [twoColData, setTwoColData]=useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            const data = await get('/misc');
            setTwoColData(data);
        };
        fetchData();
    },[]);

    const trimDescription = (text, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        twoColData && twoColData.length > 0 ? (
        <div className="main_two_column">
				<div className="news-card">
                <XImage src={twoColData[0]?.urlToImage} />
                <TitleGroup {...twoColData[0]}/>
                <p className="text-gray-600"> {trimDescription(twoColData[0]?.description)}</p></div>
				<div className="news-card"> <XImage src={twoColData[1]?.urlToImage} /> 
                <TitleGroup {...twoColData[1]}/>
               <p className="text-gray-600"> {trimDescription(twoColData[1]?.description)}</p></div>
			</div>
        ) : null
    );
};

export default MainTwoColumn;
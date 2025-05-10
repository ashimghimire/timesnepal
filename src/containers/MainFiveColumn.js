"use client";
import XImage from '../components/Image';
import TitleGroup, { TileGroupStyle } from '../components/TitleGroup';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../lib/fetchClient';
import Link from 'next/link';
import { useArticleStore } from '../store/articleStore';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200
});

const MainFiveColumn = ({type}) => {
    const [fiveColData, setFiveColData]=useState([]);
    const { addArticles, setArticles } = useArticleStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchDataSports = async () => {
            NProgress.start();
            setIsLoading(true);
            try {
                const data = await get('/top-news');
                const processedData = data.map((item, index) => {
                    // Generate a unique ID if not present
                    const uniqueId = item.id || `sports-${Date.now()}-${index}`;
                    
                    // Create a complete article object
                    return {
                        ...item,
                        id: uniqueId,
                        style: tileGroupStyle[0],
                        intro: 'SPORTS',
                        date: item.publishedAt,
                        category: 'Sports',
                        content: item.content || item.description || 'No content available'
                    };
                });
                
                setFiveColData(processedData);
                
                // Store articles in the article store
                addArticles(processedData);
            } catch (error) {
                console.error('Error fetching sports data:', error);
            } finally {
                NProgress.done();
                setIsLoading(false);
            }
        };
        
        const fetchDataPolitics = async () => {
            NProgress.start();
            setIsLoading(true);
            try {
                const data = await get('/top-news');
                const processedData = data.map((item, index) => {
                    // Generate a unique ID if not present
                    const uniqueId = item.id || `politics-${Date.now()}-${index}`;
                    
                    // Create a complete article object
                    return {
                        ...item,
                        id: uniqueId,
                        style: tileGroupStyle[0],
                        intro: 'POLITICS',
                        date: item.publishedAt,
                        category: 'Politics',
                        content: item.content || item.description || 'No content available'
                    };
                });
                
                setFiveColData(processedData);
                
                // Store articles in the article store
                addArticles(processedData);
            } catch (error) {
                console.error('Error fetching politics data:', error);
            } finally {
                NProgress.done();
                setIsLoading(false);
            }
        };
      
        if(type==='sports'){ 
            fetchDataSports();
        }
        if(type==='politics'){
            fetchDataPolitics();
        }
        
        // Cleanup function to ensure NProgress is completed if component unmounts
        return () => {
            NProgress.done();
        };
    },[type, addArticles]);

    const tileGroupStyle=[{
        title:{
            fontSize:'18px',
            fontWeight:'800'
        },intro:{
            fontWeight:'700',
        },date:{
            fontWeight:'500'
        }
    },{
        title:{
            fontWeight:'800'
        },intro:{
            fontWeight:'700',
        },date:{
            fontWeight:'500'
        }
    },{
        title:{
            fontWeight:'800',
            fontSize:'18px',
        },intro:{
        },date:{
        }
    }];

    const trimDescription = (text, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    // Show loading state if data is not loaded
    if (isLoading) {
        return null; // The LoadingOverlay will be shown by the LoadingProvider
    }

    return (
        fiveColData && fiveColData.length > 0 ?
        <div className="main_five_column">
            <div className="news-card">
                <Link href={`/article/${encodeURIComponent(fiveColData[0]?.id)}`} className="block">
                    <XImage src={fiveColData[0]?.urlToImage} />
                    <TitleGroup {...fiveColData[0]}/>
                    <p className="text-gray-600"> {trimDescription(fiveColData[0]?.description)}</p>
                </Link>
            </div>
            <div className="news-card">
                <Link href={`/article/${encodeURIComponent(fiveColData[1]?.id)}`} className="block">
                    <XImage src={fiveColData[1]?.urlToImage} />
                    <TitleGroup {...fiveColData[1]}/>
                    <p className="text-gray-600"> {trimDescription(fiveColData[1]?.description)}</p>
                </Link>
            </div>
            <div className="news-card">
                <Link href={`/article/${encodeURIComponent(fiveColData[2]?.id)}`} className="block">
                    <XImage src={fiveColData[2]?.urlToImage} />
                    <TitleGroup {...fiveColData[2]}/>
                    <p className="text-gray-600"> {trimDescription(fiveColData[2]?.description)}</p>
                </Link>
            </div>
            <div className="news-card">
                <Link href={`/article/${encodeURIComponent(fiveColData[3]?.id)}`} className="block">
                    <XImage src={fiveColData[3]?.urlToImage} />
                    <TitleGroup {...fiveColData[3]}/>
                    <p className="text-gray-600"> {trimDescription(fiveColData[3]?.description)}</p>
                </Link>
            </div>
            <div className="news-card">
                <Link href={`/article/${encodeURIComponent(fiveColData[4]?.id)}`} className="block">
                    <XImage src={fiveColData[4]?.urlToImage} />
                    <TitleGroup {...fiveColData[4]}/>
                    <p className="text-gray-600"> {trimDescription(fiveColData[4]?.description)}</p>
                </Link>
            </div>
        </div>
        : null
    );
};

export default MainFiveColumn;
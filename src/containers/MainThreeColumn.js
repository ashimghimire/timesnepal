"use client";
import XImage from '../components/Image';
import TitleGroup from '../components/TitleGroup';
import React, { useEffect } from 'react'; 
import { get } from '../lib/fetchClient';
import { useState } from 'react';
import Link from 'next/link';
import useApiRequest from '../hooks/useApiRequest';
import { useArticleStore } from '../store/articleStore';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Triangle from '../components/Triangle';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200
});

const MainThreeColumn = () => {
    const[topNews, setTopNews]=useState([]);
    const [sports, setSports]=useState([]);
    const [politics, setPolitics]=useState([]);
    const { executeRequest, isDoneLoading } = useApiRequest('main-three-column');
    const { addArticles, getArticleById, setArticles } = useArticleStore();
    const [isLoading, setIsLoading] = useState(true);

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
            fontSize:'28px',
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
    
    useEffect(()=>{
        const fetchAllData = async () => {
            // Start NProgress
            NProgress.start();
            setIsLoading(true);
            
            try {
                // Fetch all data in parallel using executeRequest
                const [topNewsResult, sportsResult, politicsResult] = await Promise.all([
                    executeRequest(() => get('/top-news')),
                    executeRequest(() => get('/top-news')),
                    executeRequest(() => get('/top-news'))
                ]);
                
                console.log("Raw top news data:", topNewsResult);
                
                // Process top news data
                const processedTopNews = topNewsResult.map((item, index) => {
                    // Generate a unique ID if not present
                    const uniqueId = item.id || `top-news-${Date.now()}-${index}`;
                    
                    // Create a complete article object
                    const articleWithId = {
                        ...item,
                        id: uniqueId,
                        style: tileGroupStyle[index],
                        intro: 'Top News',
                        date: item.publishedAt,
                        category: 'Top News',
                        content: item.content || item.description || 'No content available'
                    };
                    console.log(`Processed article ${index}:`, articleWithId);
                    return articleWithId;
                });
                
                // Process sports data
                const processedSports = sportsResult.map((item, index) => {
                    const uniqueId = item.id || `sports-${Date.now()}-${index}`;
                    return {
                        ...item,
                        id: uniqueId,
                        category: 'Sports',
                        content: item.content || item.description || 'No content available'
                    };
                });
                
                // Process politics data
                const processedPolitics = politicsResult.map((item, index) => {
                    const uniqueId = item.id || `politics-${Date.now()}-${index}`;
                    return {
                        ...item,
                        id: uniqueId,
                        category: 'Politics',
                        content: item.content || item.description || 'No content available'
                    };
                });
                
                // Set all state at once
                setTopNews(processedTopNews);
                setSports(processedSports);
                setPolitics(processedPolitics);
                
                // Store all articles in the article store
                const allArticles = [...processedTopNews, ...processedSports, ...processedPolitics];
                console.log("All articles to store:", allArticles);
                
                // Clear existing articles and set new ones
                setArticles(allArticles);
                
                // Test if we can retrieve an article by ID
                if (processedTopNews.length > 0) {
                    const testId = processedTopNews[0].id;
                    console.log("Testing retrieval with ID:", testId);
                    const retrievedArticle = getArticleById(testId);
                    console.log("Retrieved article:", retrievedArticle);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Always complete NProgress
                NProgress.done();
                setIsLoading(false);
            }
        };
        
        fetchAllData();
        
        // Cleanup function to ensure NProgress is completed if component unmounts
        return () => {
            NProgress.done();
        };
    }, [executeRequest, addArticles, getArticleById, setArticles]);

    const trimDescription = (text, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    // Show loading state if data is not loaded
    if (!isDoneLoading() || isLoading) {
        return null; // The LoadingOverlay will be shown by the LoadingProvider
    }

    return (
        <>
        { topNews.length > 0 && (
            <div className="main_three_column">
                <div className="main_three_column_left">
                    <Link href={`/article/${encodeURIComponent(topNews[0]?.id)}`} className="block">
                        <XImage src={topNews[0]?.urlToImage} />
                        <TitleGroup {...topNews[0]}/>
                        <p className="text-gray-600">{trimDescription(topNews[0].description)}</p>
                    </Link>
                </div>
                <div className="main_three_column_center">  
                    <div className="main_three_column_center-image"> 
                        <Link href={`/article/${encodeURIComponent(topNews[1]?.id)}`} className="block">
                            <XImage src={topNews[1]?.urlToImage} customHeight={'h-[200px] xs:h-[300px] sm:h-[400px] md:h-[500px]'} responsive={false} />
                        </Link>
                    </div>
                    <Link href={`/article/${encodeURIComponent(topNews[1]?.id)}`} className="block">
                        <TitleGroup {...topNews[1]}/>
                        <p className="text-gray-600">{trimDescription(topNews[1]?.description)}</p>
                    </Link>
                </div>
                <div className="main_three_column_right">
                    <Link href={`/article/${encodeURIComponent(topNews[2]?.id)}`} className="block">
                        <XImage src={topNews[2]?.urlToImage} />
                        <TitleGroup {...topNews[2]}/>
                        <p className="text-gray-600">{trimDescription(topNews[2].description)}</p>
                    </Link>
                </div>
            </div>
        )}
        </>
    )
};

export default MainThreeColumn;
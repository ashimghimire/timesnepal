"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import XImage from '../../../components/Image';
import { formatDate } from '../../../utils/dateUtils';
import { useArticleStore } from '../../../store/articleStore';
import useApiRequest from '../../../hooks/useApiRequest';
import { get } from '../../../lib/fetchClient';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Triangle from '../../../components/Triangle';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200
});

const ArticleDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { articles, getArticleById, addArticle } = useArticleStore();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { executeRequest } = useApiRequest('article-detail');
  
  useEffect(() => {
    const loadArticle = async () => {
      // Start NProgress
      NProgress.start();
      
      try {
        console.log("Article ID from params:", id);
        console.log("All articles in store:", articles);
        
        // Try to find the article by ID in the store
        let foundArticle = null;
        
        // First try exact match
        foundArticle = getArticleById(id);
        
        // If not found, try to find by partial match (in case of URL encoding issues)
        if (!foundArticle && id) {
          console.log("Trying to find article by partial match");
          foundArticle = articles.find(article => {
            // Check if article and article.id exist and are strings
            if (!article || !article.id || typeof article.id !== 'string') {
              return false;
            }
            
            // Check if the ID contains the search term or vice versa
            return article.id.includes(id) || id.includes(article.id);
          });
        }
        
        console.log("Found article in store:", foundArticle);
        
        // If still not found, try to fetch it from API
        if (!foundArticle) {
          console.log("Article not found in store, fetching from API");
          const articleData = await executeRequest(() => get(`/articles/${id}`));
          
          if (articleData) {
            // Add to store
            addArticle(articleData);
            foundArticle = articleData;
            console.log("Fetched article from API:", foundArticle);
          }
        }
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Get related articles from the same category
          const related = articles.filter(a => 
            a.category === foundArticle.category && 
            a.id !== foundArticle.id
          ).slice(0, 3);
          
          console.log("Related articles:", related);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error("Error loading article:", error);
      } finally {
        // Always complete NProgress and set loading to false
        NProgress.done();
        setIsLoading(false);
      }
    };
    
    loadArticle();
    
    // Cleanup function to ensure NProgress is completed if component unmounts
    return () => {
      NProgress.done();
    };
  }, [id, articles, getArticleById, addArticle, executeRequest]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loading article...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Article not found</h1>
          <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">{article.author || 'Staff Reporter'}</span>
            <span>{formatDate(article.publishedAt)}</span>
            {article.category && (
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {article.category}
              </span>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {article.urlToImage && (
          <div className="mb-8">
            <XImage 
              src={article.urlToImage} 
              customHeight="h-[300px] md:h-[500px]"
              responsive={false}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-700 mb-6">{article.description}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {/* View More Button */}
          {article.url && (
            <div className="mt-8 text-center">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-none hover:bg-red-700 transition-colors"
              >
                View Full Article
              </a>
              <p className="mt-2 text-sm text-gray-500">
                Opens in a new tab
              </p>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            {/* Divider with title */}
           <div className="divider">
            <Triangle text='Related Articles' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {relatedArticle.urlToImage && (
                    <div className="h-48 overflow-hidden">
                      <XImage src={relatedArticle.urlToImage} />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      <a href={`/article/${relatedArticle.id}`} className="hover:text-blue-600">
                        {relatedArticle.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600">{formatDate(relatedArticle.publishedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail; 
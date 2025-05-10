"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useArticleStore = create(
  persist(
    (set, get) => ({
      articles: [],
      
      // Set articles
      setArticles: (articles) => {
        console.log("Setting articles:", articles);
        set({ articles });
      },
      
      // Add a single article
      addArticle: (article) => {
        console.log("Adding single article:", article);
        set((state) => {
          // Check if article already exists
          const exists = state.articles.some(a => a.id === article.id);
          if (exists) {
            return state;
          }
          return { articles: [...state.articles, article] };
        });
      },
      
      // Add multiple articles
      addArticles: (newArticles) => {
        console.log("Adding multiple articles:", newArticles);
        set((state) => {
          // Filter out duplicates
          const uniqueArticles = newArticles.filter(newArticle => 
            !state.articles.some(existingArticle => existingArticle.id === newArticle.id)
          );
          return { articles: [...state.articles, ...uniqueArticles] };
        });
      },
      
      // Get article by ID
      getArticleById: (id) => {
        const state = get();
        console.log("Looking for article with ID:", id);
        console.log("Available articles:", state.articles);
        
        // First try exact match
        let article = state.articles.find(article => article.id === id);
        
        // If not found, try string comparison
        if (!article && id) {
          console.log("Trying string comparison for ID:", id);
          article = state.articles.find(article => {
            // Check if article and article.id exist
            if (!article || !article.id) {
              return false;
            }
            
            // Convert both to strings for comparison
            const articleIdStr = String(article.id);
            const searchIdStr = String(id);
            
            // Try exact match with strings
            if (articleIdStr === searchIdStr) {
              return true;
            }
            
            // Try partial match
            return articleIdStr.includes(searchIdStr) || searchIdStr.includes(articleIdStr);
          });
        }
        
        console.log("Found article:", article);
        return article;
      },
      
      // Get related articles by category
      getRelatedArticles: (category, excludeId, limit = 3) => {
        const state = get();
        console.log("Looking for related articles in category:", category, "excluding ID:", excludeId);
        const relatedArticles = state.articles
          .filter(article => 
            article.category === category && 
            article.id !== excludeId
          )
          .slice(0, limit);
        console.log("Found related articles:", relatedArticles);
        return relatedArticles;
      },
      
      // Clear all articles
      clearArticles: () => set({ articles: [] })
    }),
    {
      name: 'article-storage', // unique name for localStorage
      getStorage: () => localStorage, // use localStorage
    }
  )
); 
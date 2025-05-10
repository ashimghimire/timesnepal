"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import XImage from '../../components/Image';
import { format } from 'date-fns';
import useBlogStore from '../../store/blogStore';
import { get } from '../../lib/fetchClient';

export default function BlogList() {
  const { blogs, setBlogs } = useBlogStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [pagination,setPagination]=useState({});
  const [page,setPage]=useState(0);
  const fetchBlogs=async (page)=>{
    const result= await get("/blog?page="+page);
    return result;
  }



  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        

        const sampleBlogs= await fetchBlogs(page);
        if(sampleBlogs) setLoading(false);
        setBlogs(sampleBlogs.content);
        setFilteredBlogs(sampleBlogs.content);
        setPagination(delete sampleBlogs.contents)
        // Otherwise, simulate fetching from API
        // In a real application, you would fetch the blog posts from an API

      } catch (err) {
        console.error("Error loading blogs:", err);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };
    loadBlogs();
  },[page]);

  // Filter blogs by category

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <Link href="/" className="text-red-600 hover:text-red-800 underline">
          Return to Home
        </Link>
      </div>
    );
  }

  // Get unique categories from blogs
  // const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Times Nepal Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Insights, analysis, and perspectives on news, media, and digital journalism in Nepal and beyond.
        </p>
      </header>

      {/* Categories */}
      {/* <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div> */}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <XImage 
                  src={blog.image} 
                  alt={blog.title} 
                  customHeight="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-red-600">{blog.author}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{blog.publishedAt}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {blog.description}
                </p>
                <div className="flex items-center mt-auto">
                  <img 
                    src={`https://avatar.iran.liara.run/public`} 
                    alt={blog.author} 
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{blog.author}</div>
                    <div className="text-sm text-gray-500">
                      {format(blog.publishedAt, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center">
          {/* <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 hover:bg-gray-300 transition-colors">
            Previous
          </button> */}
          
          <button className= {`px-3 py-1 rounded-md ${page==0?'bg-red-600  text-white':'bg-gray-200'}  mr-2 `} onClick={()=>setPage(0)}>1</button>
          <button className={`px-3 py-1 rounded-md ${page==1?'bg-red-600  text-white':'bg-gray-200'} text-gray-700 mr-2 hover:bg-gray-300 transition-colors`} onClick={()=>setPage(1)}>2</button>
          <button className={`px-3 py-1 rounded-md ${page==2?'bg-red-600  text-white':'bg-gray-200'} text-gray-700 mr-2 hover:bg-gray-300 transition-colors`} onClick={()=>setPage(2)}>3</button>
          {/* <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
            Next
          </button> */}
        </nav>
      </div>
    </div>
  );
} 
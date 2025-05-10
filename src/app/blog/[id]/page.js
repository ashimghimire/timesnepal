"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import XImage from '../../../components/Image';
import { format } from 'date-fns';
import useBlogStore from '../../../store/blogStore';
import { get, post } from '../../../lib/fetchClient';

export default function BlogDetail() {
  const { id } = useParams();
  const { getBlogById, blogs,updateBlog } = useBlogStore();
  const [blog, setBlogs] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment,setComment]=useState({});


  const getCommentsByBlogId = async (dbBlogId) => {
    const response = await get(`/comment/${dbBlogId}`);

    const data = response;
    return data;
  };

  const handleCommentChange=(event)=>{
    let dbBlogId = id.replace("blog-","blog_");
    const comment1={
      commentText:event.target.innerText,
      blogId:dbBlogId,
      id:`comment-${comments.length}-${dbBlogId}`
    }
    setComment(comment1);
  }

  const saveComment=async ()=>{
    setLoading(true);
        
    // If blogs are already in the store, use them
   console.log(comment);
    const result= await post("/comment/save",comment);
    if(result) {
      console.log(result);
      comments.push(result);
      console.log(comments);
      blog.comments=comments;
      console.log(blog);

      updateBlog(blog.id,blog);
      setLoading(false);
    } else setLoading(false);
  }


  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);

        // First try to get the blog from the store
        let blogData = getBlogById(id);

        let dbBlogId = id.replace("blog-","blog_");

        // let comments = await getCommentsByBlogId(dbBlogId);
        console.log(blogData);
        setComments(blogData.comments);
        // If not found in store, simulate fetching from API
        
        
        
        
        setBlogs(blogData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading blog:", err);
        setError("Failed to load blog post. Please try again later.");
        setLoading(false);
      }
    };

    loadBlog();
  }, [id, getBlogById]);

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
        <Link href="/blog" className="text-red-600 hover:text-red-800 underline">
          Return to Blog List
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-gray-600 text-xl mb-4">Blog post not found</div>
        <Link href="/blog" className="text-red-600 hover:text-red-800 underline">
          Return to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-red-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{blog.title}</span>
      </div>

      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 mr-4">
            <img 
              src={`https://avatar.iran.liara.run/public`} 
              alt={blog.author} 
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{blog.author}</div>
            {/* <div className="text-sm text-gray-500">{blog.author.role}</div> */}
          </div>
          <div className="ml-auto text-sm text-gray-500">
            {format(blog.publishedAt, 'MMMM d, yyyy')}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <XImage 
          src={blog.image} 
          alt={blog.title} 
          customHeight="h-[400px]"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div >{blog.content} </div>
      </div>

      {/* Tags
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div> */}

      {/* Related Posts
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blog.relatedPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <div className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <XImage 
                    src={post.image} 
                    alt={post.title} 
                    customHeight="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> */}

    <div className="m-2 mb-0 flex flex-col bg-gray-100 p-3">
      { comments?.map((comment) => (<div key={comment?.id}>
      <div  className="flex flex-row items-center gap-2">
        <p><img src="https://avatar.iran.liara.run/public" className="rounded-full" width="30" height="30" /></p>
        <p className="text-sm text-gray-500">{comment.commentText}</p>
      </div>
       
      <div className="mt-2 mb-2 flex flex-row">
        <p className="text-xs"><a className="hover:underline" href="">Like</a></p>
      </div></div>
       )) }
       
      <div contentEditable="true"   onInput={handleCommentChange}
  suppressContentEditableWarning={true} value={comment} className="min-h-50 rounded-lg text-sm bg-gray-200 p-2 focus:border-0 focus:outline-1 focus:outline-gray-400"></div>
      <button className="text-md mt-2 w-1/6 rounded-lg bg-gray-400 p-2 font-medium shadow-md hover:bg-blue-400" onClick={saveComment}>Send</button>
    </div>

      {/* Back to Blog List */}
      <div className="text-center">
        <Link 
          href="/blog" 
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          Back to Blog List
        </Link>
      </div>
    </div>
  );
} 
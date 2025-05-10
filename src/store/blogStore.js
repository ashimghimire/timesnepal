import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBlogStore = create(
  persist(
    (set, get) => ({
      blogs: [],
      setBlogs: (blogs) => set({ blogs }),
      addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
      getBlogById: (id) => {
        const blogs = get().blogs;
        return blogs.find((blog) => blog.id === id);
      },
      getBlogsByCategory: (category) => {
        const blogs = get().blogs;
        if (category === 'all') return blogs;
        return blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
      },
      updateBlog: (id, updatedBlog) => 
        set((state) => ({
          blogs: state.blogs.map((blog) => 
            blog.id === id ? { ...blog, ...updatedBlog } : blog
          ),
        })),
      deleteBlog: (id) => 
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        })),
    }),
    {
      name: 'blog-storage',
    }
  )
);

export default useBlogStore; 
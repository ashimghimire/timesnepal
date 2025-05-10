"use client";
import React from 'react';
import Link from 'next/link';
import XImage from '../../components/Image';
import Triangle from '../../components/Triangle';
import './about.css';

export default function About() {
  return (
    <div className="about-page max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">About Times Nepal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="about-image">
          <XImage 
            src="https://picsum.photos/800/600" 
            alt="Times Nepal Office" 
            customHeight="h-[400px]"
            fallbackSrc="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          />
        </div>
        
        <div className="about-content">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Times Nepal is a unique digital platform that brings together the best of local Nepali news, top international headlines, and a comprehensive e-commerce marketplace under a single umbrella. We believe in providing our readers with a comprehensive view of the world while keeping them connected to their local community.
          </p>
          <p className="text-gray-700 mb-4">
            Founded with the vision of creating a bridge between local perspectives and global events, Times Nepal has grown to become a trusted source of information and a convenient shopping destination for readers who want to stay informed and shop in one place.
          </p>
        </div>
      </div>
      
      <div className="divider">
        <Triangle text="What Sets Us Apart" />
      </div>
      
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">
              <span className="material-icons">public</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Global Perspective</h3>
            <p className="text-gray-600">
              We curate the most important international news, ensuring our readers are informed about global events that matter.
            </p>
          </div>
          
          <div className="feature-card p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">
              <span className="material-icons">location_on</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Local Focus</h3>
            <p className="text-gray-600">
              Our deep connection to Nepal allows us to cover local news with authenticity and insight that only comes from being part of the community.
            </p>
          </div>
          
          <div className="feature-card p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="text-3xl mb-4">
              <span className="material-icons">balance</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Balanced Coverage</h3>
            <p className="text-gray-600">
              We strive to present news in a balanced manner, giving voice to different perspectives and allowing readers to form their own opinions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="divider">
        <Triangle text="Our E-Commerce Platform" />
      </div>
      
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-xl font-medium mb-4">Shop While You Read</h3>
            <p className="text-gray-700 mb-4">
              Times Nepal's integrated e-commerce platform allows you to shop for a wide range of products while staying informed about the latest news. Our marketplace features everything from local handicrafts to international brands, all in one convenient location.
            </p>
            <p className="text-gray-700 mb-4">
              We've carefully curated our product selection to ensure quality and value for our customers. Whether you're looking for traditional Nepali items, electronics, fashion, or home goods, our shop has something for everyone.
            </p>
            <div className="mt-6">
              <Link href="/shop" className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors">
                Explore Our Shop
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="shop-image">
              <XImage 
                src="https://picsum.photos/800/600" 
                alt="Times Nepal Shop" 
                customHeight="h-[300px]"
                fallbackSrc="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="divider">
        <Triangle text="Our Commitment" />
      </div>
      
      <div className="mb-16">
        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700 mb-4">
            At Times Nepal, we are committed to journalistic integrity and excellence. Our team of experienced journalists and editors work tirelessly to bring you accurate, timely, and relevant news from both Nepal and around the world.
          </p>
          <p className="text-gray-700 mb-4">
            We understand that in today's interconnected world, local events can have global implications, and global events can impact local communities. Our platform reflects this interconnectedness, providing a holistic view of the news that matters to you.
          </p>
          <p className="text-gray-700 mb-4">
            Our e-commerce platform is designed with the same commitment to quality and customer satisfaction. We partner with trusted vendors and ensure that all products meet our high standards before being offered to our customers.
          </p>
          <p className="text-gray-700">
            Whether you're interested in local politics, international affairs, business, technology, culture, or shopping for quality products, Times Nepal is your one-stop destination for comprehensive news coverage and convenient online shopping.
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/" className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
} 
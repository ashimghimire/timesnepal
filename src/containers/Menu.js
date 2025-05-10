"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import {
    getCookie,
    deleteCookie
  } from 'cookies-next/client';

const Menu = ({mobileMenuOpen, toggleMobileMenu}) => {
    const [display__menu, setDisplayMenu] = useState('none');
    const { data: session, status } = useSession(); // Get session data
    const jwt = getCookie('JWT');
    
    // Debug session data
    useEffect(() => {
        console.log("Session status:", status);
        console.log("Session data:", session);
        console.log("Cookie data:", jwt);
    }, [session, status]);
    
    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
        deleteCookie('JWT');
         // Redirect user to home page or any other page after logout
    };
    
    function menuOpenerListner(event) {
        console.log(event.target);
        setDisplayMenu('block');
    }

    function menuCloseListener(event){
        setDisplayMenu('none');
    }

    return (
        <div className="header-menu">
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
                <div className="mobile-dropdown-menu md:hidden">
                    <ul>
                        <li>
                            <Link href="/" className="block" onClick={toggleMobileMenu}>HOME</Link>
                        </li>
                        <li>
                            <Link href="/about" className="block" onClick={toggleMobileMenu}>ABOUT</Link>
                        </li>
                        {session?.accessToken || jwt ? (
                            <li>
                                <Link onClick={handleLogout} className="block cursor-pointer">LOGOUT</Link>
                            </li>
                        ) : (
                            <li>
                                <Link href="/login" className="block" onClick={toggleMobileMenu}>LOGIN</Link>
                            </li>
                        )}
                        <li>
                            <a className="block">BLOGS</a>
                        </li>
                        <li>
                            <a className="block">SHOP</a>
                        </li>
                    </ul>
                </div>
            )}
            
            {/* Desktop menu - hidden on xs and sm screens, visible on md and larger */}
            <div className="hidden md:flex">
                <ul className="main_menu w-full">
                    <li><Link href="/" className="active">HOME</Link></li>
                    <li><Link href="/about">ABOUT</Link></li>
                    {/* {session?.accessToken || jwt &&   } */}
                    <li>{(session?.accessToken && jwt) ?  <Link onClick={handleLogout} href="#">LOGOUT</Link>: <Link href="/login" >LOGIN</Link> }</li> 
                    <li onMouseLeave={menuCloseListener}>
                        <Link href="#" className="flex items-center has-dropdown" 
                        onMouseOver={menuOpenerListner}>MENU <span className="material-icons-outlined text-sm">add</span> </Link>
                        <ul style={{display:display__menu,zIndex:1000}}>
                            <li><a>Item1</a></li>
                            <li><a>Item2</a></li>
                            <li><a>Item3</a></li>
                        </ul>
                    </li>
                    <li><Link href="/blog">BLOGS</Link></li>
                    <li><a>SHOP</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
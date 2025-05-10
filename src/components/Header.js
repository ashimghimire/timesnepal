"use client";
import Menu from '../containers/Menu';
import React from 'react';
import { useState } from 'react';
const Header = () => {

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    return (
        <React.Fragment>
            <header>
			<div className="header-top flex flex-row min-h-[80px] " >
				<div className="header_containter_left flex basis-1/6 h-auto items-center flex-row gap-4  md:hidden">	
					<a><span className="material-icons-outlined  text-gray-500" onClick={toggleMobileMenu}>menu</span></a>
					<a><span className="material-icons-outlined text-gray-500">search</span></a>
					</div>
				<div className="header_containter_center  flex basis-5/6 sm:basis-[100%] flex-col items-center justify-center">
					<h1 className="md:text-3xl font-extrabold dark:text-white xs:text-xs">TIMES NEPAL</h1>
					<p className="text-gray-400 text-[7px] md:text-base lg:text-lg">Breaking News - Shopping Center - Since 2025</p>
				</div>

			</div>
			<Menu mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
		</header>
        </React.Fragment>
    );
};

export default Header;
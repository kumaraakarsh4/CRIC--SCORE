import React, { useState, useEffect } from 'react';

import { headerStyles } from '../assets/dummyStyles';

import logo from '../assets/logo.png';


const Header = ({ onSearch = () => {} }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [q, setQ] = useState('');

    // === 1. NEW STATE FOR SCROLL HANDLING ===
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    // ======================================
    
    // Existing useEffect to load the Eczar font
    useEffect(() => {
        const id = 'eczar-google-font';
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Eczar:wght@600;700&display=swap';
        document.head.appendChild(link);
    }, []);

    // === 2. NEW useEffect FOR SCROLL LOGIC ===
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 50; // Pixels to scroll before hiding

            // Hide header if scrolling down AND past the threshold
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                setShowHeader(false);
            } 
            // Show header if scrolling up OR near the very top of the page
            else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
                setShowHeader(true);
            }

            // Update the last scroll position
            setLastScrollY(currentScrollY);
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup: Remove the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]); // Depend on lastScrollY to maintain state across checks


    const handleSearch = (e) => {
        e.preventDefault(); // Prevents the default form submission and page reload
        onSearch(q.trim());
    };

    return (
        // === 3. CONDITIONAL CLASS & STYLING ===
        // Note: For this to work, you must define a class in your CSS/headerStyles 
        // that handles the smooth transition and the translateY transformation.
        <header 
            className={`${headerStyles.container} ${!showHeader ? headerStyles.scrolledDown : ''}`}
        >
            <div className={headerStyles.innerContainer}>
                <div className={headerStyles.mainWrapper}>
                    <div className={headerStyles.logoContainer}>
                        <div className={headerStyles.logoImage}>
                            <img src={logo} alt="Cricscore Logo" className={headerStyles.logoImg} />
                        </div>
                        <div className={headerStyles.logoText}>
                            <div className={headerStyles.logoTitle} style={{
                                fontFamily : "'Eczar' serif"
                            }}>
                                Cricscore
                            </div>
                        </div>
                    </div>
                    {/* center */}
                    <form onSubmit={handleSearch} className={headerStyles.searchForm} role='search' >
                        <div className={headerStyles.searchWrapper}>
                            <label htmlFor="header-search" className='sr-only'>
                                Search Matches
                            </label>
                            <div className='relative'>
                                <input 
                                    id='header-search' 
                                    value={q} 
                                    onChange={(e) => setQ(e.target.value)} 
                                    placeholder="Search" 
                                    className={headerStyles.searchInput} 
                                />
                                <button type='submit' className={headerStyles.searchButton}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Right Side */}
                    <div className={headerStyles.navContainer}>
                        <nav className="flex items-center gap-2">
                            <button className={headerStyles.navButtons}>Live</button>
                            <button className={headerStyles.navButtons}>Fixtures</button>
                            <button className={headerStyles.navButtons}>Teams</button>
                        </nav>
                        <div className={headerStyles.authContainer}>
                            <button className={headerStyles.loginButton}>
                                Log In
                            </button>
                            <button className={headerStyles.signupButton}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile View */}
                    <div className={headerStyles.mobileMenuButton}>
                           <button
                             aria-expanded={menuOpen}
                             aria-label="Open menu"
                             onClick={() => setMenuOpen((s) => !s)}
                             className={headerStyles.menuToggleButton}
                           >
                             <svg className={headerStyles.menuIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
                               {menuOpen ? (
                                 <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                               ) : (
                                 <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                               )}
                             </svg>
                           </button>
                           {menuOpen &&(
                               <div className={headerStyles.mobileMenu}>
                                   <nav className={headerStyles.mobileNav}>
                                   <button className={headerStyles.mobileNavButton}>Live</button>
                                       <button className={headerStyles.mobileNavButton}>Fixtures</button>
                                       <button className={headerStyles.mobileNavButton}>Teams</button>
                               </nav>
                               <div className={headerStyles.mobileAuthContainer}>
                                   <button className={`${headerStyles.mobileAuthButton} ${headerStyles.mobileLogin}`}>
                                       Log In
                                   </button>
                                   <button className={`${headerStyles.mobileAuthButton} ${headerStyles.mobileSignup}`}>
                                       Sign up
                                   </button>
                               </div>
                               </div>
                           )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
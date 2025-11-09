// 1. CRITICAL FIX: Import useEffect
import React, { useState, useEffect } from 'react' 

import { headerStyles } from '../assets/dummyStyles'

import logo from '../assets/logo.png'


const Header = ({onSearch = () =>{}}) => {
    const [menuOpen , setMenuOpen] = useState(false);
    const [q,setQ] = useState(''); 
    
    // useEffect is now imported and works correctly
    useEffect(() => {
        const id = 'eczar-google-font';
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Eczar:wght@600;700&display=swap';
        document.head.appendChild(link);
    }, []);


    const handleSearch = (e) => {
        e.preventDefault(); // Prevents the default form submission and page reload
        onSearch(q.trim());
    };

    return (
        <header className={headerStyles.container}>
            <div className={headerStyles.innerContainer}>
                <div className={headerStyles.mainWrapper}>
                    <div className={headerStyles.logoContainer}>
                        <div className={headerStyles.logoImage}>
                            <img src={logo} alt="Logo" className={headerStyles.logoImg} />
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
                                {/* 3. FIX: Changed id to 'header-search' for accessibility */}
                                {/* 4. POTENTIAL FIX: Changed className to 'searchInput' (assuming it exists) */}
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
                            {/* 2. CRITICAL FIX: Corrected typo in class name */}
                            <button className={headerStyles.signupButton}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                    {/* Mobile View */}
                    <div className={headerStyles.mobileMenuButton}>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
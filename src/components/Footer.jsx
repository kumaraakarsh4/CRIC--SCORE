import React from 'react'
import { footerStyles } from '../assets/dummyStyles'

const Footer = () => {
  return (
    <footer className={footerStyles.container}>
        <div className={footerStyles.innerContainer}>
            <div className={footerStyles.content}>
                <div className={footerStyles.logoContainer}>
                    <div>
                        <div className={footerStyles.copyright}>
                            &copy; {new Date().getFullYear()} Aakarsh Kumar

                        </div>
                    </div>

                </div>
                <div className={footerStyles.navContainer}>
                    <nav className={footerStyles.nav}>
                        <a href="#live" className={footerStyles.navLink}>Live</a>
                         <a href="#upcoming" className={footerStyles.navLink}>Upcoming</a>
                          <a href="#about" className={footerStyles.navLink}>About</a>

                    </nav>
<div className={footerStyles.socialContainer}>
     
              <a title="GitHub" href="https://github.com/kumaraakarsh4" className={footerStyles.socialLink}>
                <svg className={footerStyles.socialIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.36-3.37-1.36-.45-1.2-1.1-1.52-1.1-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.8c.85.01 1.71.12 2.51.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.4.21 2.44.11 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.59 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.58.69.48A10.22 10.22 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" fill="currentColor"/>
                </svg>
              </a>

</div>
                </div>

            </div>

        </div>

    </footer>
  )
}

export default Footer
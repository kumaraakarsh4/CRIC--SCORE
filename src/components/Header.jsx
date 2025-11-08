import React from 'react'

import { headerStyles } from '../assets/dummyStyles'

import logo from '../assets/logo.png'



const Header = () => {

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

        </div>



    </div>



   </header>

  )

}



export default Header
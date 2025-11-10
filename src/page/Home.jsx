import React from 'react'
import {homeStyles} from "../assets/dummyStyles"
import Header from '../components/Header'
import Footer from '../components/Footer';
const Home = () => {
  const heroWrapperStyle = {
    perspective: '1100px',
    WebkitPerspective: '1100px',
  };

  const heroBoxStyle = {
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
  };
  return (
    <div className={homeStyles.root}>
        <div className={homeStyles.blob1}
        style={{
            background: homeStyles.blob1Gradient,
        }}>

        </div>

         <div className={homeStyles.blob2}
        style={{
            background: homeStyles.blob2Gradient,
        }}>

        </div>
        <div className={homeStyles.headerContainer}>
            <Header onsearch={(q)=>console.log('search' , q)}
            />

        </div>
        <main className={homeStyles.main}>
          <section className={homeStyles.section}>
            <div className={homeStyles.heroWrapper} style={heroWrapperStyle}>
              <div className={homeStyles.heroBox} style={heroBoxStyle}>
                <div className={homeStyles.heroSpotlight} style={{background: homeStyles.heroSpotlightGradient}}>

                </div>
                <div className={homeStyles.heroContent}>
                  <div className={homeStyles.heroText}>
                    <h1 className={homeStyles.heroTitle} style={{fontFamily:"'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"}}>
                  Follow every match <br /> Real Time score , classy insights.
                    </h1>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </main>
    </div>
  );
};

export default Home
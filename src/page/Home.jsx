import React , {useState,useRef} from 'react'
import {homeStyles} from "../assets/dummyStyles"
import Header from '../components/Header'
import Footer from '../components/Footer';
import bat from '../assets/bat.png';
import ball from '../assets/ball.png';
import Loader from '../components/Loader';
import LiveMatch from '../components/LiveMatch';
const Home = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);
  const [teamIdInput, setTeamIdInput] = useState('');
  const [teamId, setTeamId] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [liveList, setLiveList] = useState([]);
  const [liveError, setLiveError] = useState(null);
   const stylesInjected = useRef(false);
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
                    <p className={homeStyles.heroSubtitle}>
                      Live scorecards , upcoming fixtures and match analytics - 
                      fast live scores schedule  Tracking and compact analytics.

                    </p>
                    <div className={homeStyles.heroButtons}>
                      <button onClick={()=> document.getElementById('live')?.scrollIntoView({behavior:'smooth'})

                      } className={homeStyles.primaryButton}>
                        View Live matches

                      </button>
                       <button onClick={()=> document.getElementById('matchdetails')?.scrollIntoView({behavior:'smooth'})

                      } className={homeStyles.secondaryButton}>
                        Quick details

                      </button>

                    </div>
                    <div className={homeStyles.heroFeatures}>
                      <div className={homeStyles.featureTag}>
                        Live Scorecards

                      </div>
                       <div className={homeStyles.featureTag}>
                        Match Details

                      </div>
                       <div className={homeStyles.featureTag}>
                        Team Stats

                      </div>



                    </div>
                  </div>

                </div>
                
            {/* subtle outer border/shadow */}
            <div className={homeStyles.heroShadow} style={{ boxShadow: '0 8px 30px rgba(14, 30, 50, 0.06)', borderRadius: '24px' }} />
    


              </div>
              <img src={bat} alt="bat" className='hero-bat' />
                 <img src={ball} alt="ball" className='hero-ball' />

            </div>

          </section>

          {/* top-section */}
        <section className={homeStyles.gridSection}>
          <div className={homeStyles.mainContent}>
            <div id='live' className='space-y-4'>
              <div className={homeStyles.sectionHeader}>
                <div className={homeStyles.liveStatus}>
                  <div className={homeStyles.liveCount}>
                    {loadingInitial?'Loading....':`${liveList.length}matches`}

                  </div>

                </div>

              </div>
              {loadingInitial?(
                <Loader message='Loading Live matches...' centered/>
              ): liveError ? (
            <div className="text-sm text-rose-600">{liveError}</div>
              
              ): (
                <LiveMatch matches= {liveList} onselect = {(id)=>onselectMatch(id)} selectedMatch={selectedMatch}/>
              )}
              </div> 

          </div>

        </section>
        </main>
    </div>
  );
};

export default Home
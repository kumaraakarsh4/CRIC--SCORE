import React , {useState,useRef, useEffect , useCallback} from 'react'
import {homeStyles} from "../assets/dummyStyles"
import Header from '../components/Header'
import Footer from '../components/Footer';
import bat from '../assets/bat.png';
import ball from '../assets/ball.png';
import Loader from '../components/Loader';
import LiveMatch from '../components/LiveMatch';
import { getLiveMatches } from '../api/cricApi';
import UpcomingMatches from '../components/UpcomingMatches';
import Scoreboard from '../components/Scoreboard';

const Home = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [teamIdInput, setTeamIdInput] = useState('');
  const [teamId, setTeamId] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [liveList, setLiveList] = useState([]);
  const [liveError, setLiveError] = useState(null);
  const stylesInjected = useRef(false);

  // --- External Font Injection ---
  useEffect(() => {
    const id = 'poppins-google-font';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  // --- Data Transformation Functions ---
  const tryExtract = (resp) => {
    if (!resp) return null;
    if (resp.data) return resp.data;
    if (resp.rawResponse && resp.rawResponse.data) return resp.rawResponse.data;
    if (resp.data && resp.data.data) return resp.data.data;
    if (resp.response) return resp.response;
    if (resp.body && typeof resp.body === 'string') {
      try { return JSON.parse(resp.body); } catch { /* ignore */ }
    }
    return resp;
  };
  
  const flattenLiveMatches = (payload) => {
    if (!payload) return [];

    const out = [];
    if (Array.isArray(payload.matches) && payload.matches.length) out.push(...payload.matches);
    else if (Array.isArray(payload.data) && payload.data.length) out.push(...payload.data);
    else if (Array.isArray(payload)) out.push(...payload);

    if (Array.isArray(payload.typeMatches)) {
      payload.typeMatches.forEach((tm) => {
        const series = tm.seriesMatches || tm.series || [];
        if (Array.isArray(series)) {
          series.forEach((s) => {
            const saw = s.seriesAdWrapper || s;
            if (saw && Array.isArray(saw.matches)) out.push(...saw.matches);
            else if (Array.isArray(s.seriesMatches)) out.push(...s.seriesMatches);
            else if (Array.isArray(s.matches)) out.push(...s.matches);
          });
        }
      });
    }

    if (payload.match) out.push(payload.match);

    const seen = new Set();
    const deduped = [];
    out.forEach((m) => {
      const id = m?.match?.id || m?.matchId || m?.id || m?.unique_id || m?.mid ||
        (m?.matchInfo && m.matchInfo.matchId) || JSON.stringify(m).slice(0, 80);
      if (!seen.has(String(id))) {
        seen.add(String(id));
        deduped.push({ raw: m, id: String(id) });
      }
    });

    return deduped;
  };

  const normalizeMatchId = (id) => {
    if (id === null || id === undefined) return null;
    if (typeof id === 'number') return id;
    const s = String(id);
    const digits = s.match(/\d{2,}/);
    return digits ? digits[0] : s;
  };

  // --- Handler Functions ---
  // Consolidated the duplicate onSelectMatch and viewTeam functions
  const onSelectMatch = useCallback((id) => {
    const s = id != null ? String(id) : null;
    setSelectedMatch(s);
    const el = document.getElementById('match-detail');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []); // Added useCallback for stability, though not strictly necessary here

  const viewTeam = useCallback(() => {
    if (!teamIdInput) return;
    setTeamId(teamIdInput.trim());
    const el = document.getElementById('team-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [teamIdInput]); // Added useCallback for stability

  // --- Fetch Initial Live List (no polling) ---
  const fetchInitialLive = useCallback(async () => {
    setLoadingInitial(true);
    setLiveError(null);
    try {
      const resp = await getLiveMatches();
      const payload = tryExtract(resp);
      const matches = flattenLiveMatches(payload);
      setLiveList(matches);
      // Automatically select the first live match if available
      if (matches && matches.length > 0) setSelectedMatch(String(matches[0].id));
    } catch (err) {
      console.warn('Auto-select live match failed', err);
      // Capture detailed error message if available
      setLiveError(err?.message || 'Failed to load live matches. Check your API key and network connection.');
    } finally {
      setLoadingInitial(false);
    }
  }, []);

  useEffect(() => { 
    fetchInitialLive(); 
  }, [fetchInitialLive]);

  // perspective parent for translateZ
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
      {/* Background Blobs */}
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
        <Header onsearch={(q) => console.log('search', q)} />
      </div>

      <main className={homeStyles.main}>
        {/* Hero Section */}
        <section className={homeStyles.section}>
          <div className={homeStyles.heroWrapper} style={heroWrapperStyle}>
            <div className={homeStyles.heroBox} style={heroBoxStyle}>
              <div className={homeStyles.heroSpotlight} style={{ background: homeStyles.heroSpotlightGradient }}>
              </div>
              <div className={homeStyles.heroContent}>
                <div className={homeStyles.heroText}>
                  <h1 className={homeStyles.heroTitle} style={{ fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
                    Follow every match <br /> Real Time score , classy insights.
                  </h1>
                  <p className={homeStyles.heroSubtitle}>
                    Live scorecards , upcoming fixtures and match analytics -
                    fast live scores schedule Tracking and compact analytics.
                  </p>
                  <div className={homeStyles.heroButtons}>
                    <button onClick={() => document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' })} 
                      className={homeStyles.primaryButton}>
                      View Live matches
                    </button>
                    <button onClick={() => document.getElementById('match-detail')?.scrollIntoView({ behavior: 'smooth' })} 
                      className={homeStyles.secondaryButton}>
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

        {/* Live and Upcoming Matches Section */}
        <section className={homeStyles.gridSection}>
          <div className={homeStyles.mainContent}>
            <div id='live' className='space-y-4'>
              <div className={homeStyles.sectionHeader}>
                <div className={homeStyles.liveStatus}>
                  <div className={homeStyles.liveCount}>
                    {loadingInitial ? 'Loading....' : `${liveList.length} matches`}
                  </div>
                </div>
              </div>
              {loadingInitial ? (
                <Loader message='Loading Live matches...' centered />
              ) : liveError ? (
                <div className="text-sm text-rose-600">{liveError}</div>
              ) : (
                <LiveMatch 
                    matches={liveList} 
                    // FIX: Changed 'onselect' (in your original code) to 'onSelectMatch'
                    onselect={onSelectMatch} 
                    selectedMatch={selectedMatch} 
                />
              )}
            </div>
            
            <div id='upcoming'>
              <div className={homeStyles.sectionHeader}>
                <h2 className={homeStyles.sectionTitle}>Upcoming Matches</h2>
                <div className={homeStyles.sectionSubtitle}>Plan ahead</div>
              </div>
              <UpcomingMatches onselect={onSelectMatch} />
            </div>
          </div>

          {/* Sidebar/Quick Scoreboard */}
          <aside className={homeStyles.sidebar}>
            <div className={homeStyles.sidebarSticky}>
              <div className={homeStyles.quickScoreCard}>
                <div className={homeStyles.quickScoreHeader}>
                  <div className={homeStyles.quickScoreTitle}>
                    Quick Score
                  </div>
                  <div className={homeStyles.quickScoreStatus}>
                    Live / Selected
                  </div>
                </div>
                {loadingInitial ? (
                  <Loader message='Loading live summary...' centered />
                ) : !selectedMatch ? (
                  <div className={homeStyles.quickScoreContent}>
                    No match selected. Click any match card to load quick score.
                  </div>
                ) : (
                  <div>
                    <div className={homeStyles.quickScoreContent}>
                      Match ID: {selectedMatch}
                    </div>
                    {/* Placeholder for the Match Detail Section - ID used for scrolling */}
                    <div id="match-detail"> 
                        <Scoreboard matchId={normalizeMatchId(selectedMatch)} />
                    </div>
                    <div className='mt-3 flex gap-2'>
                      <button onClick={() => {
                          // FIX: Changed 'match detail' to 'match-detail' for correct scrolling
                          const el = document.getElementById('match-detail');
                          if (el)
                            el.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                            });
                        }} 
                        className={homeStyles.quickScoreButton}>
                        View details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

        </section>
        <section id='match-detail' className={homeStyles.detailsSection}>
          <div className={homeStyles.detailsCard}>
            <div className={homeStyles.detailsTitle}>Match Detail</div>

          </div>

        </section>
      </main>
      <Footer /> {/* Added Footer for completeness, assuming it's used */}
    </div>
  );
};

export default Home;
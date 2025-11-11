import React,{useState} from 'react'
import { upcomingMatchesStyles,pickColors,getGradientStyle } from '../assets/dummyStyles'
import { getUpcomingMatches } from '../api/cricApi'
import { useState } from 'react'
const UpcomingMatches = ({onselect}) => {
     const [groups, setGroups] = useState([]);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [quotaMode, setQuotaMode] = useState(false);
   function fmtEpochString(val) {
    if (val === undefined || val === null || val === '') return '';
    const n = Number(val);
    if (Number.isNaN(n)) return String(val);
    const ms = n < 1e12 && n > 1e9 ? n * 1000 : n;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return String(val);
    return d.toLocaleString();
  } // helper function 

  
  function extractAndGroup(payload) {
    if (!payload) return [];
    const root = payload.data ?? payload;
    const typeMatches = root.typeMatches || root.type_matches || root;
    if (!Array.isArray(typeMatches)) return [];

    const temp = [];
    for (const tm of typeMatches) {
      const seriesMatches = tm?.seriesMatches || tm?.series_matches || [];
      for (const sEntry of seriesMatches) {
        const saw = sEntry?.seriesAdWrapper || sEntry;
        const matchesArr = (saw && (saw.matches || saw.matchesList)) || sEntry?.matches || [];
        if (Array.isArray(matchesArr)) {
          for (const mm of matchesArr) {
            const info = mm.matchInfo || mm.matchinfo || mm || {};
            const t1 = info?.team1 || info?.teamA || {};
            const t2 = info?.team2 || info?.teamB || {};
            const start = info?.startDate || info?.start_date || info?.start || info?.startTime || '';
            const seriesName = sEntry?.seriesAdWrapper?.seriesName || sEntry?.seriesName || info?.seriesName || info?.series || (tm?.seriesName || tm?.type || 'All matches');
            temp.push({
              matchId: String(info?.matchId ?? info?.matchId ?? `${t1?.teamName}-${t2?.teamName}-${start}`),
              series: seriesName || 'All matches',
              team1: { name: t1?.teamSName || t1?.teamName || t1?.name || 'Team 1' },
              team2: { name: t2?.teamSName || t2?.teamName || t2?.name || 'Team 2' },
              time: fmtEpochString(start),
              venue: info?.venueInfo?.ground || info?.venueInfo?.city || info?.venue || '',
              raw: mm,
            });
          }
        }
      }
    }

     const groupsObj = {};
    for (const g of temp) {
      const key = g.series || 'All matches';
      if (!groupsObj[key]) groupsObj[key] = [];
      if (!groupsObj[key].find((x) => x.matchId === g.matchId)) groupsObj[key].push(g);
    }
   return Object.keys(groupsObj).map((k) => ({ title: k, matches: groupsObj[k] }));
  }

  
  async function fetchUpcoming() {
    setLoading(true);
    setError(null);
    try {
      const res = await getUpcomingMatches({ cacheTTL: 300 });
      const payload = res.data ?? res.rawResponse?.data ?? res;
      setRaw(payload);
      setQuotaMode(Boolean(res.quotaExceeded || res.fallback || res.quota_exceeded));

      const grouped = extractAndGroup(payload);
      setGroups(grouped);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('[UpcomingMatches] error', err);
      setError(err?.message || 'Failed to load upcoming matches');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUpcoming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Flag + initials fallback UI component
  function Flag({ name }) {
    const f = flagForTeamName(name || '');
    const srcPng = f?.srcPng ?? f?.src ?? null;
    const srcSvg = f?.srcSvg ?? null;
    const emoji = f?.emoji ?? null;
    const initials = f?.initials ?? null;
    const label = f?.label ?? name ?? '';

    const [src, setSrc] = useState(srcPng || srcSvg || null);
    const [triedSvg, setTriedSvg] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
      setSrc(srcPng || srcSvg || null);
      setTriedSvg(false);
      setImgError(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    const onImgError = () => {
      if (srcSvg && !triedSvg && src !== srcSvg) {
        setTriedSvg(true);
        setSrc(srcSvg);
        return;
      }
      setImgError(true);
    };

    if (src && !imgError) {
      return (
        <img
          src={src}
          alt={`${label} flag`}
          className={upcomingMatchesStyles.flagImage}
          onError={onImgError}
        />
      );
    }

    if (emoji) {
      return (
        <div className={upcomingMatchesStyles.emojiContainer}>
          {emoji}
        </div>
      );
    }

    const text = (initials || (label || '').split(' ').map(s => s[0] || '').slice(0, 2).join('').toUpperCase() || '?');
    const [c1, c2] = pickColors(label || text);
    return (
      <div
        className={upcomingMatchesStyles.initialsContainer}
        style={getGradientStyle(c1, c2)}
        title={label}
      >
        <span className="text-xs">{text}</span>
      </div>
    );
  }


  return (
    <div>UpcomingMatches</div>
  )
}

export default UpcomingMatches
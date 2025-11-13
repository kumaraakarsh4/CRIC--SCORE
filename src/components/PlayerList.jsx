import React from 'react'
import { playerListStyles, avatarSizes } from '../assets/dummyStyles'

const Avatar = ({ name, imgUrl, size = 'default' })=> {
    const { width, height } = avatarSizes[size] || avatarSizes.default;
  const avatarStyle = { width, height };
if (imgUrl) {
    return (
      <img 
        src={imgUrl} 
        alt={name} 
        className={playerListStyles.avatarImage}
        style={avatarStyle}
      />
    );
  }

  const initials = name
    ? name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

return (
    <div style={avatarStyle} className={playerListStyles.avatarFallback}>
        {initials}

    </div>
)

}

const PlayerList = ({ players = [], onSelect, compact = false }) => {
if(!Array.isArray(players) || players.length === 0){
  return(
    <div className={playerListStyles.noPlayersContainer}> No Player to show

    </div>
  );
}
// for compact avtar icon 
const avatarSize = compact ? "compact" : "default";
  return (
    <div className={playerListStyles.listContainer}>
      {players.map((p)=>(
        <button key={p.id || p.name} onClick={()=>onSelect && onselect(p)} className={playerListStyles.playerItem}>
          <div className={playerListStyles.avatarContainer}>
            <div style={{
              
            }}>

            </div>

          </div>

        </button>
      ))}
        
    </div>
  )
}

export default PlayerList
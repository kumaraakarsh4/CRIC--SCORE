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
              width : compact ? avatarSizes.compact.width : avatarSizes.default.width,
              height : compact ? avatarSizes.compact.height : avatarSizes.default.height,
            }}>
              {p.imgUrl ? (
                <img src={p.imgUrl} alt={p.name} className={playerListStyles.avatarImage} />
              ) :(
                <div className={playerListStyles.avatarFallback}>
                   {(p.name || '?').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}

                </div>
              )}

            </div>

          </div>
          <div className={playerListStyles.playerInfo}>
            <div className={playerListStyles.playerMainInfo}>
              <div>
                <div className={playerListStyles.playerName}>{p.name}

                </div>
                <div className={playerListStyles.playerDetails}>{p.role || p.position || ''}
                  {p.country ? ` •${p.country}` : ""}

                </div>
              </div>
              <div>
                
              </div>

            </div>

          </div>

        </button>
      ))}
        
    </div>
  )
}

export default PlayerList
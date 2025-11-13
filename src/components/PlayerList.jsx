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
  return (
    <div>
        
    </div>
  )
}

export default PlayerList
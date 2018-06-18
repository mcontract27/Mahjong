import React from 'react'

const EnemyHand = props => {
  const handsize = props.handsize || 0
  return (
    <div id={`hand-${props.position}`}>
      {[...Array(handsize)].map((e, index) => (
        <img className={`tile-${props.position}`} key={index} src={'/images/facedown.png'} />
      ))}
    </div>
  )
}

export default EnemyHand

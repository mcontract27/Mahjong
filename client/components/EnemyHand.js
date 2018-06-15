import React from 'react'

const EnemyHand = props => {
  const handsize = props.handsize || 13
  return (
    <div id={`hand-${props.position}`}>
      {[...Array(handsize)].map((e, index) => (
        <img className="playertile" key={index} src={'/images/facedown.png'} />
      ))}
    </div>
  )
}

export default EnemyHand

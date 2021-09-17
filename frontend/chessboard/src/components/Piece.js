import React from 'react'

const Piece = (props)=> {
  return (
    <div style={{height: '78px'}}>
      {
        props.image !== undefined ? (
          <div style={{
            backgroundImage:`url(${props.image})`,
          }}
            className='chess-piece'
          >
          </div>
        ) :
        null
      }
    </div>
  )
}

export default Piece

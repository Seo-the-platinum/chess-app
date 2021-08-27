import React from 'react'

const Piece = (props)=> {
  console.log(props.image)
  return (
    <div>
      {
        props.image !== undefined ? (
          <img src={props.image} alt='chess piece'/>
        ) :
        null
      }
    </div>
  )
}

export default Piece

import React from 'react'
import Piece from './Piece'

const white = {
  backgroundColor: 'white',
  border: 'solid',
  borderColor: 'black',
  borderWidth: 1,
  height: '78px',
  width: '78px',
}

const green = {
  backgroundColor: 'green',
  border: 'solid',
  borderColor: 'black',
  borderWidth: 1,
  height: '78px',
  width: '78px',
}

const Tile = (props)=> {
  console.log(props.image)
  return (
    <div style={props.color === 'white' ? white : green}>
      <Piece image ={props.image}/>
    </div>
  )
}

export default Tile

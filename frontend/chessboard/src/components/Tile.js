import React from 'react'
import Piece from './Piece'

const white = {
  backgroundColor: 'white',
  border: 'solid',
  borderColor: 'black',
  borderWidth: 1,
  height: '68px',
  width: '68px',
}

const green = {
  backgroundColor: 'green',
  border: 'solid',
  borderColor: 'black',
  borderWidth: 1,
  height: '68px',
  width: '68px',
}

const Tile = (props)=> {
  return (
    <div style={props.number % 2 === 0 ? white : green}>
      <Piece image={props.image}/>
    </div>
  )
}

export default Tile

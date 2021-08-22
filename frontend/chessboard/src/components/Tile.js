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
  if (props.xVal === 1) {
    if (props.color === 'white') {
      return (
        <div style={white}>
          <Piece/>
        </div>
      )
    }
    return (
      <div style={green}>
        <Piece/>
      </div>
    )
  }
  if (props.color === 'white') {
    return (
      <div style={white}></div>
    )
  }
  return (
    <div style={green}></div>
  )
}

export default Tile

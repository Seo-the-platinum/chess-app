import React from 'react'
import Tile from './Tile'

const container = {
  display: 'flex',
  border: 'solid',
  borderColor: 'black',
  borderWidth: '2',
  flexWrap: 'wrap',
  width: '640px'
}

const Chessboard = ()=> {
  const board = []
  const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const vertical = ['1', '2', '3', '4', '5', '6', '7', '8']
  const pieces=[]

  for (let i=0; i<2; i++) {
      const type= i === 0 ? 'l':'d'
      const y = i === 0 ? 0 : 7
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_k${type}t60.png`,
        x: 4,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_q${type}t60.png`,
        x: 3,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_r${type}t60.png`,
        x: 0,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_r${type}t60.png`,
        x: 7,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_b${type}t60.png`,
        x: 2,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_b${type}t60.png`,
        x: 5,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_n${type}t60.png`,
        x: 1,
        y:y,
      })
      pieces.push({
        source: `${process.env.PUBLIC_URL}/assets/Chess_n${type}t60.png`,
        x: 6,
        y:y,
      })
  }

  for (let i=0; i<8; i++) {
    pieces.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
      x: i,
      y: 1
    })
  }

  for (let i=0; i<8; i++) {
    pieces.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
      x: i,
      y: 6,
    })
  }

  horizontal.map((h, hIndex)=> {
    vertical.map((v, vIndex)=> {
      const sum = vIndex + hIndex
      let image = undefined
      pieces.map(p=> {
        if (p.x === vIndex && p.y === hIndex) {
          image = p.source
        }
        return null
      })
      if (sum % 2 === 0) {
        board.push(<Tile color="white" image={image}/>)
      }
      else {
        board.push(<Tile color='green' image={image}/>)
      }
      return null
    })
    return null
  })
  return (
    <div style={container}>
      {board}
    </div>
  )
}
export default Chessboard

import React, { useRef, useState } from 'react'
import Tile from './Tile'
import Referee from '../referee.js'

const container = {
  display: 'flex',
  border: 'solid',
  borderColor: 'black',
  borderWidth: '2',
  flexWrap: 'wrap',
  width: '640px'
}

const initialBoardState=[];

for (let i=0; i<2; i++) {
    const team = i === 0 ? 'ours': 'opponent'
    const type = i === 0 ? 'l':'d'
    const y = i === 0 ? 0 : 7
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_k${type}t60.png`,
      x: 4,
      y:y,
      type: 'king',
      team: team,
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_q${type}t60.png`,
      x: 3,
      y:y,
      type: 'queen',
      team: team,
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_r${type}t60.png`,
      x: 0,
      y:y,
      type: 'rook'
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_r${type}t60.png`,
      x: 7,
      y:y,
      type: 'rook',
      team: team,
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_b${type}t60.png`,
      x: 2,
      y:y,
      type: 'bishop',
      team: team,
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_b${type}t60.png`,
      x: 5,
      y:y,
      type: 'bishop',
      team: team,
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_n${type}t60.png`,
      x: 1,
      y:y,
      type: 'knight',
      team: team,
    })
    initialBoardState.push({
      source: `${process.env.PUBLIC_URL}/assets/Chess_n${type}t60.png`,
      x: 6,
      y:y,
      type: 'knight',
      team: team,
    })
}

for (let i=0; i<8; i++) {
  initialBoardState.push({
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    x: i,
    y: 1,
    type: 'pawn',
    team: 'ours'
  })
}

for (let i=0; i<8; i++) {
  initialBoardState.push({
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    x: i,
    y: 6,
    type: 'pawn',
    team: 'opponent'
  })
}

const Chessboard = ()=> {
  const board = []
  const [activePiece, setActivePiece] = useState(null)
  const [pieces, setPieces] = useState(initialBoardState)
  const [gridX, setGridX] = useState(0)
  const [gridY, setGridY] = useState(0)
  const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const vertical = ['1', '2', '3', '4', '5', '6', '7', '8']
  const chessboardRef = useRef(null)
  const referee = new Referee()

  const grabPiece= (e)=> {
    const element = e.target

    if (element.classList.contains('chess-piece')) {
      const chessboard = chessboardRef.current
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft)/80))
      setGridY(Math.floor((e.clientY - chessboard.offsetTop)/80))
      const x = e.clientX - 50
      const y = e.clientY - 50
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      setActivePiece(element)
    }
  }

  const movePiece = (e)=> {
    const chessboard = chessboardRef.current

      if (activePiece && chessboard) {
        const x = e.clientX - 50
        const y = e.clientY - 50
        const minX = chessboard.offsetLeft - 25
        const minY = chessboard.offsetTop - 20
        const maxX = minX + chessboard.clientWidth - 25
        const maxY = minY + chessboard.clientHeight - 40
        activePiece.style.position = 'absolute';

        if (x < minX) {
          activePiece.style.left = `${minX}px`
        }
        else if (x > maxX) {
          activePiece.style.left = `${maxX}px`
        }
        else {
          activePiece.style.left = `${x}px`
        }

        if (y < minY) {
          activePiece.style.top = `${minY}px`
        }
        else if (y > maxY) {
          activePiece.style.top = `${maxY}px`
        }
        else {
          activePiece.style.top = `${y}px`
        }

      }
  }

  const dropPiece = (e)=> {
    const chessboard = chessboardRef.current
    if(activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft)/80)
      const y = Math.floor((e.clientY - chessboard.offsetTop)/80)
      setPieces((value)=> {
        const pieces = value.map(p=> {
          if (p.x === gridX && p.y === gridY) {
            const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value)
            if (validMove) {
              p.x = x
              p.y = y
            } else {
            activePiece.style.position = 'relative'
            activePiece.style.removeProperty('top')
            activePiece.style.removeProperty('left')
          }
        }
        return p
      })
        return pieces
      })
      setActivePiece(null)
    }
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
        board.push(<Tile color="white" image={image} key={`${vIndex}, ${hIndex}`}/>)
      }
      else {
        board.push(<Tile color='green' image={image} key={`${vIndex}, ${hIndex}`}/>)
      }
      return null
    })
    return null
  })
  return (
    <div
      onMouseDown={e=> grabPiece(e)}
      onMouseMove={e=> movePiece(e)}
      onMouseUp={e=> dropPiece(e)}
      ref={chessboardRef}
      style={container}>
      {board}
    </div>
  )
}
export default Chessboard

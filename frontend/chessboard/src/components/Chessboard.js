import React, { useRef, useState } from 'react'
import Tile from './Tile'
import Referee from '../referee.js'
import {
  HORIZONTAL,
  VERTICAL,
  GRIDSIZE,
  initialBoardState,
  samePosition,
 } from '../Constants.js'

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
  const [activePiece, setActivePiece] = useState(null)
  const [pieces, setPieces] = useState(initialBoardState)
  const [grabPosition, setGrabPosition] = useState({x:-1, y: -1})
  const chessboardRef = useRef(null)
  const referee = new Referee()

  const grabPiece= (e)=> {
    const element = e.target

    if (element.classList.contains('chess-piece')) {
      const chessboard = chessboardRef.current
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft)/GRIDSIZE)
      const grabY = Math.floor((e.clientY - chessboard.offsetTop)/GRIDSIZE)
      setGrabPosition({x: grabX, y: grabY})
      const x = e.clientX - GRIDSIZE / 2
      const y = e.clientY - GRIDSIZE / 2
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      setActivePiece(element)
    }
  }

  const movePiece = (e)=> {
    const chessboard = chessboardRef.current

      if (activePiece && chessboard) {
        const x = e.clientX - GRIDSIZE / 2
        const y = e.clientY - GRIDSIZE / 2
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
      const x = Math.floor((e.clientX - chessboard.offsetLeft)/GRIDSIZE)
      const y = Math.floor((e.clientY - chessboard.offsetTop)/GRIDSIZE)
      const currentPiece = pieces.find(p=> samePosition(p.position, grabPosition))

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          {x, y},
          currentPiece.type,
          currentPiece.team,
          pieces
        )

        const isEnPassant = referee.isEnPassantMove(
          grabPosition,
          {x, y},
          pieces,
          currentPiece.team,
          currentPiece.type
        )

        const pawnDirection = currentPiece.team === 'ours' ? -1: 1

        if (isEnPassant) {
          const updatedPieces = pieces.reduce((results, piece)=> {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false
              piece.position.x = x
              piece.position.y = y
              results.push(piece)
            } else if (!samePosition(piece.position, {x, y: y-pawnDirection})) {
              if (piece.type === 'pawn') {
                piece.enPassant =  false
              }
              results.push(piece)
            }
            return results
          },[])
          setPieces(updatedPieces)
        }

        //REDUCE FUNCTION
        else if (validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.type === 'pawn'
              piece.position.x = x
              piece.position.y = y
              results.push(piece);
            }
            else if (!samePosition(piece.position, {x,y})) {
              if (piece.type === 'pawn') {
                piece.enPassant = false
              }
              results.push(piece);
            }
            return results
          }, [])
          setPieces(updatedPieces)

        } else {
          activePiece.style.position = 'relative'
          activePiece.style.removeProperty('top')
          activePiece.style.removeProperty('left')
        }
      }
      //UPDATES PIECE POSITION
      setPieces((value)=> {
        const pieces = value.map(p=> {
          if (samePosition(p.position, grabPosition)) {
            const validMove = referee.isValidMove(
              grabPosition,
              {x, y},
              p.type,
              p.team,
              value
            )
            if (validMove) {
              p.position.x = x
              p.position.y = y
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

  HORIZONTAL.map((h, hIndex)=> {
    VERTICAL.map((v, vIndex)=> {
      const sum = vIndex + hIndex
      const piece = pieces.find(p=> samePosition(p.position, {x: vIndex, y: hIndex}))
      let image = piece ? piece.source : undefined
      board.push(<Tile image={image} key={`${vIndex}, ${hIndex}`} number={sum} />)
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

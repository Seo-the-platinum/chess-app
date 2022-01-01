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
import Alert from 'react-popup-alert'

const container = {
  display: 'flex',
  border: 'solid',
  borderColor: 'black',
  borderWidth: '2',
  flexWrap: 'wrap',
  width: '560px',
}

const Chessboard = ()=> {
  let board = []
  const [activePiece, setActivePiece] = useState(null)
  const [pieces, setPieces] = useState(initialBoardState)
  const [grabPosition, setGrabPosition] = useState({x:-1, y: -1})
  const [turn, setTurn] = useState('opponent')
  const [alert, setAlert] = useState({
    type: '',
    text: 'alert message',
    show: false,
  })
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
      if (currentPiece.team === turn) {
        if (currentPiece) {
          const validMove = referee.isValidMove(
            grabPosition,
            {x, y},
            currentPiece.type,
            currentPiece.team,
            pieces,
            currentPiece.checked
          )

          const isEnPassant = referee.isEnPassantMove(
            grabPosition,
            {x, y},
            pieces,
            currentPiece.team,
            currentPiece.type
          )

          const isPromotion = referee.isPromotion(
            grabPosition,
            {x,y},
            pieces,
            currentPiece.team,
            currentPiece.type
          )

          const isCheck = referee.isCheck(
              grabPosition,
              {x,y},
              pieces,
              currentPiece.team,
              currentPiece.type
          )

          const isSelfCheck = referee.isSelfCheck(
            grabPosition,
            {x,y},
            pieces,
            currentPiece.team,
            currentPiece.type,
          )

          const isCheckMate = referee.isCheckMate(
            grabPosition,
            {x,y},
            pieces,
            currentPiece.team,
            currentPiece.type
          )

          const pawnDirection = currentPiece.team === 'ours' ? -1: 1

          if (isCheck) {
            const updatedPieces = pieces.reduce((results, piece)=> {
              if (piece.team !== currentPiece.team && piece.team === 'king') {
                piece.castle = false
                piece.check = true
                results.push(piece)
              }
              return results
            }, [])
            setPieces(updatedPieces)
            setTurn(turn === 'opponent' ? 'ours': 'opponent')
          }

          if (isSelfCheck) {
            console.log('check yourself!')

          }

          if (isCheckMate) {
            console.log('game over')
            //onShowAlert()
          }

          if (isPromotion) {
            const updatedPieces = pieces.reduce((results, piece)=> {
              if (samePosition(piece.position, grabPosition)) {
                piece.type = 'queen'
                piece.source = (currentPiece.team === 'ours') ? `${process.env.PUBLIC_URL}/assets/Chess_qdt60.png` : `${process.env.PUBLIC_URL}/assets/Chess_qlt60.png`
                results.push(piece)
              }
              return results
            }, [])
            setPieces(updatedPieces)
            setTurn(turn === 'opponent' ? 'ours': 'opponent')
          }

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
            setTurn(turn === 'opponent' ? 'ours': 'opponent')

          }
          //REDUCE FUNCTION
          else if (validMove && !isSelfCheck) {
            console.log(validMove, isSelfCheck)
            console.log('validMove')
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
            setTurn(turn === 'opponent' ? 'ours': 'opponent')
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
                value,
              )
              const isSelfCheck = referee.isSelfCheck(
                grabPosition,
                {x,y},
                value,
                currentPiece.team,
                currentPiece.type,
              )
              if (validMove && !isSelfCheck) {
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
      } else {
        activePiece.style.position = 'relative'
        activePiece.style.removeProperty('top')
        activePiece.style.removeProperty('left')
        setActivePiece(null)
      }
    }
  }

  const onCloseAlert = () => {
    setAlert({
      type: '',
      text: '',
      show: false,
    })
    window.location.reload()
  }

  const onShowAlert = () => {
    const winner = turn === 'opponent' ? 'Light' : 'Dark'
      setAlert({
        type: '',
        text: `Checkmate! ${winner} wins!`,
        show: true
      })
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
    <div style={{
        border: 'solid red 1px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'}}>
      <div>{turn === 'ours' ? 'Dark': 'Light'}</div>
      <div
        onMouseDown={e=> grabPiece(e)}
        onMouseMove={e=> movePiece(e)}
        onMouseUp={e=> dropPiece(e)}
        ref={chessboardRef}
        style={container}>
        {board}
      </div>
      <Alert
        header={'Header'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{
          backgroundColor: 'white',
          border: 'solid black 5px',
          position: 'absolute',
          top: '10%',
          right: '25%',
          width: '50%'
        }}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
    </div>
  )
}
export default Chessboard

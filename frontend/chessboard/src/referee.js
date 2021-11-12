import {
  samePosition,
} from './Constants'

export default class Referee {
  tileIsOccupied(position,boardState) {
    const piece = boardState.find(p=> samePosition(p.position, position))
    if (piece) {
      return true
    } else {
      return false
    }
  }

  tileIsOccupiedByOpponent(position,boardState, team) {
    const piece = boardState.find(p=> samePosition(p.position, position) && p.team !== team)
    if (piece) {
      return true
    } else {
      return false
    }
  }

  tileIsEmptyOrOccupiedByOpponent (position, boardState, team) {
    return (
      !this.tileIsOccupied(position, boardState) ||
      this.tileIsOccupiedByOpponent(position, boardState, team))
    }

  tileIsSafe (position, boardState, team) {
    const enemies = boardState.filter(p=> {
      return p.team !== team
    })
    const vulnerable = enemies.find(e=> {
      this.isValidMove(e.position, position, e.type, e.team, boardState)
    })
    if (vulnerable) {
      return false
    }
    return true
  }

  isEnPassantMove(
    initialPosition,
    desiredPosition,
    boardState,
    team,
    type
  ) {
    const pawnDirection = (team === 'ours') ? -1 : 1
    if(type === 'pawn') {
      if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x -initialPosition.x === 1)
      && desiredPosition.y -initialPosition.y === pawnDirection) {
        const piece = boardState.find(p=> p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant)
        if (piece) {
          return true
        }
      }
    }
    return false
  }

  isValidMove(
    initialPosition,
    desiredPosition,
    type,
    team,
    boardState
  ) {

    if ( type === 'pawn') {
      const specialRow = (team === 'ours') ? 6 : 1
      const pawnDirection = (team === 'ours') ? -1: 1

      //MOVEMENT LOGIC
      if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2*pawnDirection) {
        if (!this.tileIsOccupied(desiredPosition,boardState) &&
        !this.tileIsOccupied({x: desiredPosition.x, y: desiredPosition.y -pawnDirection}, boardState)) {
          return true
        }
      } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (!this.tileIsOccupied(desiredPosition,boardState)) {
          return true
        }
      }
    //ATTACK LOGIC
      else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y -initialPosition.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(desiredPosition,boardState, team)) {
          return true
          }
        }
      else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(desiredPosition,boardState, team)) {
          return true
          }
      }
    } else if(type === 'knight') {
      console.log('knight')
      //moving logic for knight
      //8 different moving patterns
      for (let i = -1; i < 2; i+=2) {
        for (let j = -1; j < 2; j+=2) {
          //TOP AND BOTTOM SIDE MOVEMENT
          if (desiredPosition.y - initialPosition.y === 2 * i) {
            if (desiredPosition.x - initialPosition.x === j) {
              if (!this.tileIsOccupied(desiredPosition, boardState)
                || this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)
                ) {
                  return true
              }
            }
          }
          //RIGHT AND LEFT SIDE MOVEMENT
          if (desiredPosition.x - initialPosition.x === 2 * i) {
            if (desiredPosition.y - initialPosition.y === j) {
              if (!this.tileIsOccupied(desiredPosition, boardState)
                || this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)
                ) {
                  return true
              }
            }
          }
        }
      }
    } else if (type === 'bishop') {
      //MOVEMENT AND ATTATCK LOGIC FOR BISHOP

      for ( let i = 1; i < 8; i++) {
        //BOTTOM RIGHT MOVEMENT
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
          let passedPosition = { x:initialPosition.x + i, y:initialPosition.y + i}
          if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else {
              if (this.tileIsOccupied(passedPosition, boardState)) {
                console.log('illegal move')
                break;
              }
          }
        }

        //UPPER RIGHT MOVEMENT
        if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
          let passedPosition = {x:initialPosition.x+ i, y: initialPosition.y - i}
          if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else {
              if (this.tileIsOccupied(passedPosition, boardState)) {
                console.log('illegal move')
                break;
              }
            }
         }

        //BOTTOM LEFT MOVEMENT
        if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
          let passedPosition = {x:initialPosition.x - i, y: initialPosition.y + i}
          if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else {
            if (this.tileIsOccupied(passedPosition, boardState)) {
              console.log('illegal move')
              break;
            }
          }
        }

        //UPPER LEFT MOVEMENT
        if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
          let passedPosition = {x:initialPosition.x - i, y: initialPosition.y - i}
          if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else {
              if (this.tileIsOccupied(passedPosition, boardState)) {
                console.log('illegal move')
                break;
              }
          }
        }
      }
    } else if (type === 'rook') {
      if (initialPosition.x === desiredPosition.x) {
        console.log('moving vertically')
        for (let i = 1; i < 8; i++) {
          let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1
          let passedPosition = {x: initialPosition.x, y: initialPosition.y + (i * multiplier)}
          if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else if (this.tileIsOccupied(passedPosition, boardState)) {
              break;
          }
        }
      }
      if (initialPosition.y === desiredPosition.y) {
        console.log('moving horizontally')
        for (let i = 1; i < 8; i++) {
          let multiplier = (desiredPosition.x < initialPosition.x) ? -1: 1
          let passedPosition = { x:initialPosition.x + (i * multiplier), y: initialPosition.y}
          if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    } else if (type === 'queen') {
      console.log('queen')
      for (let i = 1; i < 8; i++) {
        let multiplierX = (desiredPosition.x < initialPosition.x) ?  -1 : (desiredPosition.x > initialPosition.x) ? 1 :0
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0
        let passedPosition = {x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY)}
        if (samePosition(passedPosition, desiredPosition)) {
          if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
            return true
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    } else if (type === 'king') {
      console.log('king')
      let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0
      let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0
      let passedPosition = {x: initialPosition.x + (multiplierX), y: initialPosition.y + multiplierY}
      if (Math.abs(desiredPosition.x - initialPosition.x) === 2 && desiredPosition.y === initialPosition.y) {
        if (!this.tileIsOccupied(desiredPosition, boardState)) {
          if (desiredPosition.x - initialPosition.x === -2){
            console.log('long castle attempt')
            for ( let i = 1; i < 3; i++) {
              let passedPosition = {x: initialPosition.x -i, y: initialPosition.y}
              if(this.tileIsSafe(desiredPosition, boardState, team)) {
              if (samePosition(passedPosition, desiredPosition)) {
                if (!this.tileIsOccupied({x:passedPosition.x - 1, y: passedPosition.y}, boardState)) {
                  const king = boardState.find(p => p.type === type && p.team === team)
                  const rook = boardState.find(p => p.type === 'rook' && p.team === team && p.position.x === 0 && p.castle)
                  rook.position.x = desiredPosition.x + 1
                  rook.castle = false
                  king.castle = false
                  return true
                }
              } else if (this.tileIsOccupied(passedPosition, boardState)) {
                console.log('false')
                break;
              }
            }
            }
          } else if (desiredPosition.x - initialPosition.x === 2) {
            console.log('short castle attempt')
            for ( let i = 1; i < 3; i++) {
              let passedPosition = {x: initialPosition.x + i, y: initialPosition.y}
              console.log(passedPosition, desiredPosition, i)
              if (samePosition(passedPosition, desiredPosition)) {
                  console.log('same')
                const king = boardState.find(p => p.type === type && p.team === team)
                const rook = boardState.find(p => p.type === 'rook' && p.team === team && p.position.x === 7 && p.castle)
                console.log(rook)
                rook.position.x = desiredPosition.x - 1
                rook.castle = false
                king.castle = false
                return true
              } else if (this.tileIsOccupied(passedPosition, boardState)) {
                break;
              }
            }
          }
        }
      }
      else if (samePosition(passedPosition, desiredPosition)) {
        if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else if (this.tileIsOccupied(passedPosition, boardState)) {
          return false
      }
    }
    return false
  }
}

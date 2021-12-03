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
    const ep = enemies.filter(e => {
      if (this.isValidMove(e.position, position, e.type, e.team, boardState) === true) {
        return true
      }
      return false
    })
    if (ep.length > 0) {
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

  isPromotion(
    initialPosition,
    desiredPosition,
    boardState,
    team,
    type
  ) {
    const pawnDirection = (team === 'ours') ? -1 : 1
    const promoteRow = (team === 'ours') ? 0 : 7
    if (type === 'pawn') {
      if (initialPosition.y +  pawnDirection === promoteRow) {
        return true
      }
    }
  }

  isCheck(
    initialPosition,
    desiredPosition,
    boardState,
    team,
    type,
  ) {
    if (this.isValidMove(initialPosition, desiredPosition, type, team, boardState)) {
      const eKing = boardState.find(k=> k.team !== team)
      if (this.isValidMove(desiredPosition, eKing.position, type, team, boardState)) {
        eKing.checked = true
        eKing.castle = false
        return true
      }
    }
  }

  canBeBlocked(
    initialPosition,
    desiredPosition,
    boardState,
    team,
    type
  ) {
    const king = boardState.find(p=> p.team !== team && p.type === 'king')
    const findBlockers = boardState.filter(p=> {
      if (p.team !== team && p.type !== 'king') {
        const blockablePositions= {
          x: king.position.x - desiredPosition.x,
          y: king.position.y - desiredPosition.y}
          for (let i = 1; i < Math.abs(blockablePositions.x); i++) {
            for (let j = 1; j < Math.abs(blockablePositions.y); j++) {
              let iDirect = blockablePositions.x < 0 ? -1 : 1
              let jDirect = blockablePositions.y < 0 ? -1 : 1
              console.log(i*iDirect + desiredPosition.x, j*jDirect + desiredPosition.y)
              if (this.isValidMove(
                desiredPosition,{x: i*iDirect + (desiredPosition.x), y: j*jDirect + (desiredPosition.y)},
                type,
                team,
                boardState
              )) {
                if (this.isValidMove(
                  p.position,
                  {x: i*iDirect + (desiredPosition.x), y: j*jDirect + (desiredPosition.y)},
                  p.type,
                  p.team,
                  boardState,
                  king.checked
                )){
                  console.log('can be blocked', p)
                  return true
                }
              }
            }
          }
      }
      return p
    })
    if (findBlockers) {
      return true
    } else {
      return false
    }
  }

  isCheckMate(
    initialPosition,
    desiredPosition,
    boardState,
    team,
    type
  ) {
    if (this.isValidMove(initialPosition, desiredPosition, type, team, boardState)) {
      const eKing = boardState.find(p => p.team !== team && p.type === 'king')
      if (this.isValidMove(desiredPosition, eKing.position, type, team, boardState)) {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let xCoord = i
            let yCoord = j
            let passedPosition = {x: eKing.position.x + (xCoord), y: eKing.position.y + (yCoord)}
            if (!this.isValidMove(eKing.position, passedPosition, eKing.type, eKing.team, boardState)) {
              if(!this.canBeBlocked(initialPosition, desiredPosition, boardState, team, type)) {
                console.log('unblockable')
              }
            }
          }
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
    boardState,
    checked
  ) {
    if (desiredPosition !== initialPosition) {
      if ( type === 'pawn') {
        const specialRow = (team === 'ours') ? 6 : 1
        const pawnDirection = (team === 'ours') ? -1: 1
        //MOVEMENT LOGIC
        if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2*pawnDirection) {
          if (!this.tileIsOccupied(desiredPosition,boardState) &&
          (!this.tileIsOccupied({x: desiredPosition.x, y: desiredPosition.y -pawnDirection}, boardState))) {
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
                  break;
                }
            }
          }
        }
      } else if (type === 'rook') {
        if (initialPosition.x === desiredPosition.x) {
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
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0
        let passedPosition = {x: initialPosition.x + (multiplierX), y: initialPosition.y + multiplierY}
        if (checked === false) {
          if (Math.abs(desiredPosition.x - initialPosition.x) === 2 && desiredPosition.y === initialPosition.y) {
            if (!this.tileIsOccupied(desiredPosition, boardState)) {
              if (desiredPosition.x - initialPosition.x === -2){
                console.log('long castle attempt')
                for ( let i = 1; i < 3; i++) {
                  let passedPosition = {x: initialPosition.x -i, y: initialPosition.y}
                  if (this.tileIsSafe(passedPosition, boardState, team)) {
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
                      break;
                    }
                  }
                }
              } else if (desiredPosition.x - initialPosition.x === 2) {
                console.log('short castle attempt')
                console.log(checked)
                for ( let i = 1; i < 3; i++) {
                  let passedPosition = {x: initialPosition.x + i, y: initialPosition.y}
                  if (this.tileIsSafe(passedPosition, boardState, team)) {
                    if (samePosition(passedPosition, desiredPosition)) {
                      const king = boardState.find(p => p.type === type && p.team === team)
                      const rook = boardState.find(p => p.type === 'rook' && p.team === team && p.position.x === 7 && p.castle)
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
          } else if (samePosition(passedPosition, desiredPosition)) {
            if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
              return true
            }
          } else if (this.tileIsOccupied(passedPosition, boardState)) {
              return false
          }
        }
         else if (checked === true) {
          if (this.tileIsSafe(passedPosition, boardState, team)) {
            return true
          }
        }
      }
    }
    return false
  }
}

export default class Referee {
  tileIsOccupied(x,y,boardState) {
    const piece = boardState.find(p=> p.position.x === x && p.position.y === y)
    if (piece) {
      return true
    } else {
      return false
    }
  }

  tileIsOccupiedByOpponent(x,y,boardState, team) {
    const piece = boardState.find(p=> p.position.x === x && p.position.y === y && p.team !== team)
    if (piece) {
      return true
    } else {
      return false
    }
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
        if (!this.tileIsOccupied(desiredPosition.x,desiredPosition.y,boardState) &&
        !this.tileIsOccupied(desiredPosition.x,desiredPosition.y-pawnDirection, boardState)) {
          return true
        }
      } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (!this.tileIsOccupied(desiredPosition.x,desiredPosition.y,boardState)) {
          return true
        }
      }
    //ATTACK LOGIC
      else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y -initialPosition.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(desiredPosition.x,desiredPosition.y,boardState, team)) {
          return true
          }
        }
      else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(desiredPosition.x,desiredPosition.y,boardState, team)) {
          return true
          }
      }
    }
    return false
  }
}

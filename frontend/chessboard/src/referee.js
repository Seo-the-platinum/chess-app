export default class Referee {
  tileIsOccupied(x,y,boardState) {
    const piece = boardState.find(p=> p.x === x && p.y === y)
    if (piece) {
      return true
    } else {
      return false
    }
  }

  tileIsOccupiedByOpponent(x,y,boardState, team) {
    const piece = boardState.find(p=> p.x === x && p.y === y && p.team !== team)
    if (piece) {
      return true
    } else {
      return false
    }
  }

  isEnPassantMove(px, py, x, y, boardState, team, type) {
    const pawnDirection = (team === 'ours') ? 1 : -1
    if(type === 'pawn') {
      if ((x - px === -1 || x -px === 1) && y -py === pawnDirection) {
        const piece = boardState.find(p=> p.x === x && p.y === y - pawnDirection)
        console.log(piece)
      }
    }

    return false
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    console.log('checking move....', `px:${px}, py:${py},x:${x},y:${y},${type}, ${team}`)

    if ( type === 'pawn') {
      const specialRow = (team === 'ours') ? 1 : 6
      const pawnDirection = (team === 'ours') ? 1: -1

      //MOVEMENT LOGIC
      if (px === x && py === specialRow && y - py === 2*pawnDirection) {
        if (!this.tileIsOccupied(x,y,boardState) &&
        !this.tileIsOccupied(x,y-pawnDirection, boardState)) {
          return true
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x,y,boardState)) {
          return true
        }
      }
    //ATTACK LOGIC
      else if (x - px === -1 && y -py === pawnDirection) {
        console.log('attack in upper or bottom left corner')
        if (this.tileIsOccupiedByOpponent(x,y,boardState, team)) {
          return true
          }
        }
      else if (x - px === 1 && y - py === pawnDirection) {
        console.log('attack in upper or bottom right corner')
        if (this.tileIsOccupiedByOpponent(x,y,boardState, team)) {
          return true
          }
      }
    }
    return false
  }
}

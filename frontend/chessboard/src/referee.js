export default class Referee {
  tileIsOccupied(x,y,boardState) {
    console.log('checking if tile is occupied')
    const piece = boardState.find(p=> p.x === x && p.y === y)
    if (piece) {
      return true
    } else {
      return false
    }
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    console.log('checking move....', `px:${px}, py:${py},x:${x},y:${y},${type}, ${team}`)

    if ( type === 'pawn') {
      const specialRow = (team === 'ours') ? 1 : 6
      const pawnDirection = (team === 'ours') ? 1: -1

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
      /*
      if (py === specialRow) {
        if (px === x && y - py === 1*pawnDirection) {
          if (!this.tileIsOccupied(x,y,boardState)) {
            return true;
          }
        } else if (px === x && y - py === 2*pawnDirection) {
          if (!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-pawnDirection, boardState)) {
            return true
          }
        }
      } else {
        if (px === x && y - py === pawnDirection) {
          if (!this.tileIsOccupied(x,y,boardState)) {
            return true
          }
        }
      }*/
    }
    return false
  }
}

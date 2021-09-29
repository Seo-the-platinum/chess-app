export default class Referee {
  isValidMove(px,py,x,y,type, team) {
    console.log('checking move....', px,py,x,y,type, team)
    if (type === 'pawn') {
      if (team === 'ours') {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            console.log('valid move')
            return true
          }
        } else {
          if (px === x && y - py === 1) {
            return true
        }
      }
    }
      return false
    }
  }
}

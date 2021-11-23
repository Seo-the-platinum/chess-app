export const HORIZONTAL = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const VERTICAL = ['1', '2', '3', '4', '5', '6', '7', '8']
export const GRIDSIZE = 80
class Position {
  constructor(x,y) {
    this.x = x;
    this.y = y
  }
}
export const samePosition = (p1, p2)=> {
  return p1.x === p2.x && p1.y === p2.y
}

export const initialBoardState = [
  {
    castle: true,
    source: `${process.env.PUBLIC_URL}/assets/Chess_kdt60.png`,
    position: new Position(4,7),
    type: 'king',
    team: 'ours',
    checked: false,
  },

  {
    castle: true,
    source: `${process.env.PUBLIC_URL}/assets/Chess_klt60.png`,
    position: new Position(4,0),
    type: 'king',
    team: 'opponent',
    checked: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_qdt60.png`,
    position: new Position(3,7),
    type: 'queen',
    team: 'ours',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_qlt60.png`,
    position: new Position(3,0),
    type: 'queen',
    team: 'opponent',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_bdt60.png`,
    position: new Position(2,7),
    //x: 2,
    //y:7,
    type: 'bishop',
    team: 'ours',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_bdt60.png`,
    position: new Position(5,7),
    //x: 5,
    //y:7,
    type: 'bishop',
    team: 'ours',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_blt60.png`,
    position: new Position(2,0),
    //x: 2,
    //y:0,
    type: 'bishop',
    team: 'opponent',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_blt60.png`,
    position: new Position(5,0),
    //x: 5,
    //y:0,
    type: 'bishop',
    team: 'opponent',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_ndt60.png`,
    position: new Position(1,7),
    //x: 1,
    //y:7,
    type: 'knight',
    team: 'ours',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_ndt60.png`,
    position: new Position(6,7),
    //x: 6,
    //y:7,
    type: 'knight',
    team: 'ours',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_nlt60.png`,
    position: new Position(1,0),
    //x: 1,
    //y:0,
    type: 'knight',
    team: 'opponent',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_nlt60.png`,
    position: new Position(6,0),
    type: 'knight',
    team: 'opponent',
  },

  {
    castle: true,
    source: `${process.env.PUBLIC_URL}/assets/Chess_rdt60.png`,
    position: new Position(0,7),
    type: 'rook',
    team: 'ours',
  },

  {
    castle: true,
    source: `${process.env.PUBLIC_URL}/assets/Chess_rdt60.png`,
    position: new Position(7,7),
    type: 'rook',
    team: 'ours',
  },

  {
    castle: true,
    source: `${process.env.PUBLIC_URL}/assets/Chess_rlt60.png`,
    position: new Position(0,0),
    type: 'rook',
    team: 'opponent',
  },

  {
    castle: true,
    source: `${process.env.PUBLIC_URL}/assets/Chess_rlt60.png`,
    position: new Position(7,0),
    type: 'rook',
    team: 'opponent',
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(0,6),
    //x: 0,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(1,6),
    //x: 1,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(2,6),
    //x: 2,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(3,6),
    //x: 3,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(4,6),
    //x: 4,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(5,6),
    //x: 5,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(6,6),
    //x: 6,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_pdt60.png`,
    position: new Position(7,6),
    //x: 7,
    //y: 6,
    type: 'pawn',
    team: 'ours',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(0,1),
    //x: 0,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(1,1),
    //x: 1,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(2,1),
    //x: 2,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(3,1),
    //x: 3,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(4,1),
    //x: 4,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(5,1),
    //x: 5,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(6,1),
    //x: 6,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },

  {
    source: `${process.env.PUBLIC_URL}/assets/Chess_plt60.png`,
    position: new Position(7,1),
    //x: 7,
    //y: 1,
    type: 'pawn',
    team: 'opponent',
    enPassant: false,
  },
]

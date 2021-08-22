import React from 'react'
import Tile from './Tile'

const container = {
  display: 'flex',
  border: 'solid',
  borderColor: 'black',
  borderWidth: '2',
  flexWrap: 'wrap',
  width: '640px'
}

const Chessboard = ()=> {
  const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const vertical = ['1', '2', '3', '4', '5', '6', '7', '8']

  horizontal.map((h, hIndex)=>
    vertical.map((v, vIndex)=> {
      const sum = vIndex + hIndex
      console.log(vIndex, hIndex)
      if (sum % 2 === 0) {
        return <Tile
                  xVal={hIndex}
                  yVal={vIndex}
                  color='white'/>
      }

      return (
        <Tile
          xVal={hIndex}
          yVal={vIndex}
          color='green'
        />
      )
    })
  )

  return (
    <div style={container}>{
      horizontal.map((h, hIndex)=>
        vertical.map((v, vIndex)=> {
          const sum = vIndex + hIndex
          if (sum % 2 === 0) {
            return <Tile color="white"
                      yVal={vIndex}
                      xVal={hIndex}/>
          }
          return (
            <Tile color="black"
                  yVal={vIndex}
                  xVal={hIndex}/>
          )
        })
      )}
    </div>
  )
}
export default Chessboard

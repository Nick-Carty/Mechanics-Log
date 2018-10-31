import React from 'react'

const CarTile = props => {


  return (
    <div>
      <p>{props.year} {props.make} {props.model}</p>
    </div>

  )
}

export default CarTile;

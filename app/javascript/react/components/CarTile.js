import React from 'react'
import { Link } from 'react-router';


const CarTile = props => {


  return (
    <div className="car-tile">

      <div className="left-float">
      </div>
      <div className="">
        <Link to={`/cars/${props.id}`}>
          <h1>{props.year} {props.make} {props.model}</h1>
        </Link>
      </div>
    </div>

  )
}

export default CarTile;

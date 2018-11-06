import React from 'react'
import { Link } from 'react-router';

const CarTile = props => {

  return (
    <div className="car-tile">
      <div>

        <Link to={`/cars/${props.id}`}>
          <h1>{props.year} {props.make} {props.model}</h1>
        </Link>

        <a id={props.id} onClick={props.deleteCar} className="right-float button4">
          Delete
        </a>

      </div>
    </div>

  )
}

export default CarTile;

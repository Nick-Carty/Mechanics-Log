import React from 'react'
import { Link } from 'react-router';

const CarTile = props => {
  const repairCount = `${props.repairCount || "No"} Repairs`;
  return (
    <div className="car-tile">
      <Link to={`/cars/${props.id}`}>
        <h1>{props.year} {props.make} {props.model}</h1>
      </Link>
      <p className="left-float font">{repairCount}</p>
      <a id={props.id} onClick={props.deleteCar} className="right-float button4">Delete</a>
      <a href={`/cars/${props.id}/edit`} className="right-float button4">Edit</a>
    </div>
  )
};

export default CarTile;

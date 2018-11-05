import React from 'react'
import { Link } from 'react-router';


const RepairTile = props => {

  return (
    <div className="car-tile">
      <div className="left-float">
          <p>Image</p>
      </div>
      <div>
        <p>{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>

  )
}

export default RepairTile;

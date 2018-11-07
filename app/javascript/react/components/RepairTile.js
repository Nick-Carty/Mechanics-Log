import React from 'react'
import { Link } from 'react-router';


const RepairTile = props => {

  return (
    <div className="car-tile">
      <div className="left-float">
      </div>
      <div className="repair-tile font">
        <p>{props.title}</p>
        <p>{props.description}</p>

        <a id={props.id} onClick={props.deleteRepair} className="right-float button4">
        Delete
        </a>

        <Link to={`/repairs/${props.id}/edit`}>
          <p className="right-float button4">Edit</p>
        </Link>

      </div>
    </div>

  )
}

export default RepairTile;

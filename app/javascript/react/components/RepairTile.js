import React from 'react'
import { Link } from 'react-router';


const RepairTile = props => {

  return (
    <div className="car-tile">
      <div className="font">
        <p className="repair-font">{props.title}</p>
        <p className="repair-font2">{props.description}</p>
      </div>

      <div className="">
        <a id={props.id} onClick={props.deleteRepair} className="right-float button4">
          Delete
        </a>

        <Link to={`/repairs/${props.id}/edit`}>
          <p className="right-float button4">Edit</p>
        </Link>

        <p className="left-float dates">Created: {props.createdDate} / Last Updated: {props.updatedDate}</p>
      </div>
    </div>

  )
}

export default RepairTile;

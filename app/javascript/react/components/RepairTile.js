import React from 'react'
import { Link } from 'react-router';

const RepairTile = props => {

  return (
    <div className="car-tile">
      <div className="row font">
        <div className="medium-12 columns">
          <h4 className="car-tile__title">{props.title}</h4>
          <p className="car-tile__desc">{props.description}</p>
        </div>
      </div>

      <div className="row">

        <div className="medium-6 columns car-tile__col">
          <p className="car-tile__date car-tile__text-left"><b>Created:</b> <i>{props.createdDate}</i></p>
          <p className="car-tile__date car-tile__text-left"><b>Last Updated:</b> <i>{props.updatedDate}</i></p>
        </div>

        <div className="medium-6 columns car-tile__col">
          <a href={`/repairs/${props.id}/edit`} className="car-tile__text-right car-tile__button">
            Edit
          </a>
          <a id={props.id} onClick={props.deleteRepair} className="car-tile__text-right car-tile__button">
            Delete
          </a>
        </div>

      </div>
    </div>

  )
}

export default RepairTile;

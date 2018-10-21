import React from "react";
import { Link } from "@reach/router";
// Example pet component
/*
const Pet = props => {
  // props : Properties passed from the parent component

  
  The return down there translates into this commented code.
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed)
  ]);
  

  return (
    <div>
      <h1>Name: {props.name.toUpperCase()}</h1>
      <h2>Type: {props.animal}</h2>
      <h2>Breed: {props.breed}</h2>
    </div>
  );
}; */

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props; // Destructuring this.props into the consts

    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img alt={name} src={hero} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}

export default Pet;

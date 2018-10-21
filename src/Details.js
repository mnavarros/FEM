// Base React
import React from "react";
import { navigate } from "@reach/router";
// Custom
import pf from "petfinder-client";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  /* 
  Regular React Way
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  */

  // We can do this thanks to class props in Babel, so we don't need a constructor anymore
  state = {
    loading: true,
    showModal: true
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(petData => {
        const pet = petData.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error: error });
        navigate("/");
      });
  }
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>Hell yes</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
    /* Ternary null so we render nothing
     * Instead of the ternary we can do the following:
     * let modal;
     *  if (showModal) {
     *    modal = <Modal />;
     *  } else {
     *    modal = null;
     * }
     * Ternary replaced by: { modal }
     */
  }
}

export default Details;

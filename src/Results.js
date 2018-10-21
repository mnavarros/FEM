import React from "react";

// Custom
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  // Constructor -> Will Mount -> Render -> Did Mount

  // Needed by React, always with props and super
  constructor(props) {
    super(props);
    // Initialize state always in the constructor
    this.state = {
      pets: [],
      somethingelse: true // Not overwritten by below setState with pets
    };
  }

  componentDidMount() {
    this.search();
  }

  // It's called only once
  search = () => {
    // const breedList = petfinder.breed.list({ animal: "dog" });

    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(petList => {
        let pets;
        if (petList.petfinder.pets && petList.petfinder.pets.pet) {
          if (Array.isArray(petList.petfinder.pets.pet)) {
            pets = petList.petfinder.pets.pet;
          } else {
            pets = [petList.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          // pets: pets if the name in the state and the variable are the same, we can just write pets
          pets
        });
      });
  };

  render() {
    /*
     * This lines dumps your state 
     * <pre>
     *  <code>{JSON.stringify(this.state, null, 4)}</code>
     * </pre>
     *      
     */
    return (
      // We can use <> </> in newer versions
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              // We need key when doing this, and it must be unique
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

// export default Results;
export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}

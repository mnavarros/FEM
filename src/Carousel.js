import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  /* 
  constructor(props) {
    super(props);

    this.handleIndexClick = this.handleIndexClick.bind(this);
  }
  */

  // Takes props and give back state, 1 copy for all instances of Carousel
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos: photos }; // Or { photos } remember, it's the same
  }

  handleIndexClickOne(event) {
    /**
     * We don't know the context for this
     * Ways to handle this:
     * 1 - this.handleIndexClick = this.handleIndexClick.bind(this); in the constructor, this in handle click will be the this from Carousel
     *
     * 2 - handleIndexClickTwo
     */
    this.setState({
      active: +event.target.dataset.index // + sign takes the string and turns it into a number
    });
  }

  /** Method 2 - Arrow function does not create a new context */
  handleIndexClickTwo = event => {
    this.setState({
      active: +event.target.dataset.index // + sign takes the string and turns it into a number
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* So we can have the onClick inside an image, which is wrong, we use the following line */

            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClickTwo}
              data-index={index}
              alt="animal thumbnail"
              key={photo.value}
              src={photo.value}
              className={index === active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

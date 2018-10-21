// Base React
import React from "react";
import { navigate } from "@reach/router";
// Custom
import pf, { ANIMALS } from "petfinder-client";
import SearchBox from "./Searchbox";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class SearchParams extends React.Component {
  handleSearchSubmit() {
    navigate("/");
  }

  render() {
    return (
      <div className="search-route">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}

export default SearchParams;

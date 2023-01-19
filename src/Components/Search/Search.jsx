import React from "react";

const Search = () => {
  return (
    <div className="search-layout">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          className="input-search"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInput}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;

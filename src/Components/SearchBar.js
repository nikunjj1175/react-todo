import React from "react";

function SearchBar({ searchQuery, handleSearch, setSearchQuery }) {
    return (
        <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
                handleSearch(e.target.value);
                setSearchQuery(e.target.value);
            }}
        />
    );
}

export default SearchBar;

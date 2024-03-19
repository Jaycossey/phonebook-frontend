const Search = (props) => {
    const {searchParam, handleSearch, filterResults} = props;
    return (
        <> 
            <h2>Search:</h2>
            <input type="text" value={searchParam} onChange={(e) => handleSearch(e.target.value)} />
            <h3>Results: </h3>

            {filterResults.map((person, i) => {
                return <p key ={i}>{person.name}: {person.number}</p>
            })}
        </>
    );
}

export default Search;
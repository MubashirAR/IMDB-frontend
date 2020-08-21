import React, { useEffect, useState } from 'react';

function Searchbar(props) {
  let { movie = {} } = props;
  const [search, setSearch] = useState('');
  const submit = (_) => props.onSubmit(search);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };
  return (
    <form>
      <div class="row mb-2 mt-2">
        <div className="form-group col-sm-10">
          <input
            type="text"
            className="form-control"
            id="SearchBar"
            placeholder="Search a movie..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div class="col-sm-1">
          <button type="button" className="btn btn-primary" onClick={submit}>
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default Searchbar;

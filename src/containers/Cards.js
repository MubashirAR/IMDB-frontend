import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import { getMovies, deleteMovie } from '../apis/movies';
import AppContext from '../AppContext';
import Searchbar from '../components/Searchbar';
import { useHistory } from 'react-router-dom';
function Cards() {
  const context = useContext(AppContext);
  const [updateMovies, setUpdateMovies] = useState(0);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('99popularity');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [reverse, setReverse] = useState(1);
  const [searchVal, setSearchVal] = useState('');
  const history = useHistory();
  const count = 100;
  const isEditable = window.location.href.includes('admin');
  // let pages = new Array(total / count);
  const sortList = {
    '99popularity': 'Popularity',
    director: 'Director Name',
    name: 'Movie Name',
  };

  useEffect(() => {
    getNewMovies({
      searchVal: searchVal,
      limit: count,
      skip: (page - 1) * count,
      sortBy,
      reverse,
      genre: selectedGenres,
    });
  }, [updateMovies, searchVal, page, count, sortBy, reverse, selectedGenres]);

  const getNewMovies = (params = {}) => {
    getMovies(params)
      .then((resp) => resp.json())
      .then((resp) => {
        setItems(resp.data);
        setTotal(resp.totalCount || 0);
      })
      .catch((e) => alert('There was an error processing your request'));
  };
  const addGenre = (genre) => {
    const genres = [...selectedGenres];
    let index = genres.findIndex((g) => g === genre);
    if (index > -1) {
      genres.splice(index, 1);
    } else {
      genres.push(genre);
    }
    setSelectedGenres(genres);
  };
  const deleteMov = (movieId) => {
    if (window.confirm(`Are you sure you wish to delete this movie? THIS CANNOT BE UNDONE`))
      deleteMovie(movieId)
        .then((resp) => resp.json())
        .then((resp) => {
          alert(resp.msg);
          setUpdateMovies(updateMovies + 1);
        })
        .catch((e) => alert(`Sorry, couldn't delete the movie. Please try again later`));
  };
  return (
    <>
      <Searchbar onSubmit={setSearchVal} />
      <div>
        {context.genres.map((genre) => {
          let isSelected = selectedGenres.find((g) => g === genre);
          let className = `badge badge-pill ${isSelected ? 'badge-primary' : 'badge-secondary'} mr-2`;
          return (
            <span className={className} onClick={(e) => addGenre(genre)}>
              {genre}
            </span>
          );
        })}
      </div>
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" class="btn btn-primary">
          Sort By: {sortList[sortBy]}
        </button>
        <div class="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            {Object.keys(sortList).map((item) => (
              <a class="dropdown-item" onClick={(e) => setSortBy(item)}>
                {sortList[item]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" class="btn btn-primary">
          {sortBy === '99popularity' ? (reverse === 1 ? 'Low to High' : 'High to Low') : reverse === 1 ? 'Alphabetical' : 'Reverse'}
        </button>
        <div class="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            {sortBy === '99popularity' ? (
              <>
                <a class="dropdown-item" onClick={(e) => setReverse(-1)}>
                  High to Low
                </a>
                <a class="dropdown-item" onClick={(e) => setReverse(1)}>
                  Low to High
                </a>
              </>
            ) : (
              <>
                <a class="dropdown-item" onClick={(e) => setReverse(1)}>
                  Alphabetical
                </a>
                <a class="dropdown-item" onClick={(e) => setReverse(-1)}>
                  Reverse
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="d-flex flex-row bd-highlight mb-3"> */}
      <hr></hr>
      <div class="container">
        <div class="row">
          {items.length
            ? items.map((item) => <Card key={Math.random()} movie={item} isEditable={isEditable} deleteMovie={deleteMov} />)
            : 'No Movies to display!'}
        </div>
      </div>
      {/* </div> */}
      {/* <div>
          <ul class="pagination pagination-lg">
            <li class="page-item disabled">
              <a class="page-link" href="#">
                &laquo;
              </a>
            </li>
            {
              pages.map(_ => {
                <li class="page-item disabled">
                  <a class="page-link" href="#">
                    &laquo;
                  </a>
                </li>
              })
            }
            <li class="page-item">
              <a class="page-link" href="#">
                &raquo;
              </a>
            </li>
          </ul>
        </div> */}
    </>
  );
}

export default Cards;

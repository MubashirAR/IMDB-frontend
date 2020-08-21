import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
  let { movie = {} } = props;
  return (
    <div className="col-sm-3" style={{ minWidth: '20rem' }}>
      <div className="card text-white bg-primary mb-3">
        <div className="card-header">
          {movie.name} | Popularity: {movie['99popularity']}
        </div>
        <div className="card-body">
          <h4 className="card-title">{movie.imdb_score}</h4>
          {movie.genre
            ? movie.genre.map((g) => (
                <span key={g} className="badge badge-secondary">
                  {g}
                </span>
              ))
            : ''}
          <p className="card-text">{movie.director}</p>
          {props.isEditable ? (
            <>
              <Link to={{ pathname: `/movie/edit/${movie._id}` }}>
                <button type="button" className="btn btn-secondary">
                  Edit
                </button>
              </Link>
              <button type="button" className="btn btn-danger" onClick={(_) => props.deleteMovie(movie._id)}>
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;

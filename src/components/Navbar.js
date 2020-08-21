import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';

export default function Navbar() {
  const { loggedInUser } = useContext(AppContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <Link to="/">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
            </Link>
            {loggedInUser && loggedInUser.name ? (
              <>
                <Link to="/login">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Update Movies
                    </a>
                  </li>
                </Link>
                <Link to="/movie/create">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Movie
                    </a>
                  </li>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Login
                  </a>
                </li>
              </Link>
            )}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </nav>
    </>
  );
}

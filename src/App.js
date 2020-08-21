import React, { useState, useEffect } from 'react';
import './bootstrap.css';
import Cards from './containers/Cards';
import Routes from './components/Routes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import AppContext from './AppContext';
import { getGenres } from './apis/movies';

function App() {
  const [genres, setGenres] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const context = {
    genres,
    loggedInUser,
    onLogin: setLoggedInUser,
  };
  useEffect(() => {
    // console.log('fetch genres')
    getGenres()
      .then((resp) => resp.json())
      .then((resp) => setGenres(resp.data.genres))
      .catch((err) => {
        console.error(err);
        alert('Sorry, we were unable to fetch the genre list');
      });
  }, []);
  return (
    <div className="App">
      <Router>
        <AppContext.Provider value={context}>
          <Navbar />
          <Routes />
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;

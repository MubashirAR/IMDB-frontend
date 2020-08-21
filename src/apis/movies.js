import request from './index';
const getSingleMovie = (id) => {
  return request('/api/movie/single?movieId=' + id);
};
const getMovies = (params) => {
  let query = Object.keys(params)
    .map((p) => `${p}=${params[p]}`)
    .join('&');
  return request('/api/movie?' + query);
};
const getGenres = () => {
  return request('/api/movie/genres');
};
const postMovie = (data) => {
  return request('/api/movie', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
const putMovie = (data) => {
  return request('/api/movie', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
const deleteMovie = (movieId) => {
  return request('/api/movie', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId }),
  });
};
export { getSingleMovie, getMovies, getGenres, postMovie, putMovie, deleteMovie };

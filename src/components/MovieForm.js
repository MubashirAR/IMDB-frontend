import React, { useState, useEffect } from 'react';
import Form from 'react-formal';
// import './Login.css'
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Navbar from './Navbar';
import { putMovie, postMovie, getSingleMovie } from '../apis/movies';

const modelSchema = yup.object({
  name: yup.string().required('Name is required'),
  director: yup.string().required('Director Name is required'),
  imdb_score: yup.number().required('Score is required').min(0, 'Score should be positive').max(10, 'Score should not be more than 10'),
  '99popularity': yup.number().required('Popularity is required').min(0, 'Popularity should be positive').max(100, 'Popularity should not be more than 100'),
  genre: yup.string(),
});
export default () => {
  const initialState = {
    name: '',
    director: '',
    imdb_score: 0,
    '99popularity': 0,
    genre: '',
  };
  let { id } = useParams();
  useEffect(() => {
    getSingleMovie(id)
      .then(resp => resp.json())
      .then(resp => setModel(resp.data))
      .catch(e => alert('There was an error! Please try again later.'))
  }, [id])
  const [model, setModel] = useState(initialState);
  // const [register, { data, client }] = useMutation(REGISTER_USER_MUTATION)
  const history = useHistory();
  const submit = async () => {
    if(id) await putMovie({...model, movieId: id})
    else await postMovie(model);
    history.push('/admin');
  };
  return (
    <>
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">{/* <h2>Sign Up</h2> */}</div>
          <div className="card-body">
            <Form className="w-100" schema={modelSchema} value={model} onSubmit={(e) => submit()} onChange={(model) => setModel(model)}>
              <fieldset className="w-100">
                <legend className="text-center">{`${id ? 'Edit ' : 'Add '} Movie`}</legend>

                <Form.Field className="form-control mt-3 w-100" name="name" placeholder="Movie name" disabled={!!id}/>
                <Form.Message className="pl-1 text-danger" for="name" />

                <Form.Field className="form-control mt-3 w-100" name="director" placeholder="Director Name" />
                <Form.Message className="pl-1 text-danger" for="director" />

                <Form.Field className="form-control mt-3 w-100" name="imdb_score" placeholder="IMDB Score" />
                <Form.Message className="pl-1 text-danger" for="imdb_score" />

                <Form.Field className="form-control mt-3 w-100" name="99popularity" placeholder="Popularity" />
                <Form.Message className="pl-1 text-danger" for="99popularity" />

                <Form.Field className="form-control mt-3 w-100" name="genre" placeholder="Genre (Comma Seperated)" />
                <Form.Message className="pl-1 text-danger" for="genre" />

                <Form.Submit className="btn btn-primary mt-3 w-100" type="button">
                  Submit
                </Form.Submit>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

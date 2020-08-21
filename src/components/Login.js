import React, { useState, useContext } from 'react';
import { login } from '../apis/auth';
import AppContext from '../AppContext';
import MovieForm from './MovieForm';
import { Redirect } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(AppContext);

  const changeHandler = (key) => (e) => {
    // console.log(key);
    const { value } = e.target;
    switch (key) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };
  const submit = (_) => {
    let status;
    login({ email, password })
      .then((resp) => {
        status = resp.status;
        return resp.json();
      })
      .then((resp) => {
        if (status !== 200) resp.msg ? alert(resp.msg) : console.error(resp);
        else context.onLogin(resp.user);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      {context.loggedInUser && context.loggedInUser.name ? (
        <Redirect to="/admin" />
      ) : (
        <form>
          <fieldset>
            <legend>Login</legend>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={changeHandler('email')}
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={changeHandler('password')}
              />
              <button type="button" className="btn btn-primary" onClick={submit}>
                Login
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
}

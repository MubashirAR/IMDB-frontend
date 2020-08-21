import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext';

export default function AuthChecker({ children }) {
  const context = useContext(AppContext);
  return <>{context.loggedInUser.name ? children : <Redirect to="/login" />}</>;
}

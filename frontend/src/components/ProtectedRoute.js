import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, path, redirect, ...props  }) => {
  return (
    <Route path={path}>
      { loggedIn ? props.children : <Redirect to={redirect} /> }
    </Route>
)}

export default ProtectedRoute;
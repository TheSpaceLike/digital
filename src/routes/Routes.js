import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Listado from '../pages/Listado';

function Routes() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/listado" component={Listado}/>
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}

export default Routes;

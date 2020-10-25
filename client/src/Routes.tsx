// basic routes defined here
import React, { useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { Route } from 'react-router';
import Home from './pages/Home';

function usePageViews() {
  const location = useLocation();

  useEffect(() => {}, [location]);
}

function Routes() {
  usePageViews();
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={Home} />
    </Switch>
  );
}

export default Routes;

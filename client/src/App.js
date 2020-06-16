import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Landing from './components/Landing';


import { fetchUser } from './redux/auth/auth.actions';

import { connect } from 'react-redux';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Survey New</h2>;

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <Header></Header>
      <Switch>
        <Route path="/surveys/new" component={SurveyNew} />
        <Route path="/surveys" component={Dashboard} />
        <Route path="/" exact={true} component={Landing}></Route>
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
});


export default connect(null, mapDispatchToProps)(App);

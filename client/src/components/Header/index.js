import React from 'react';

import Payments from '../Payments';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const Header = ({ user, loading }) => {
  const renderContent = () => {
    if (loading) {
      return null;
    }
    if (!user) {
      return (
        <li>
          <a href="/auth/google">Login with google</a>
        </li>
      );
    } else {
      return [
        <li key="1">
          <Payments></Payments>
        </li>,
        <li key="3" style={{margin: '0 10px'}}>Credits : {user.credits}</li>,
        <li key="2">
          <a href="/api/logout">Logout</a>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={user ? '/surveys' : '/'} className="left brand-logo">
          Emaily
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);

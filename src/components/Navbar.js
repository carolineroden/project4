import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">

        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1 className="logo">lingpost.</h1>
          </Link>
        </div>

        <div className="navbar-end">
          <Link to="/articles" className="navbar-item navbar-icon"><span className="nav-icon-display"><i className="far fa-lg fa-list-alt"></i></span></Link>

          {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item navbar-icon">Register</Link>}

          {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item navbar-icon">Login</Link>}

          {Auth.isAuthenticated() && <Link to="/articles/new" className="navbar-item navbar-icon"><span className="nav-icon-display"><i className="fas fa-lg fa-pencil-alt"></i></span></Link>}

          {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item navbar-icon"><span className="nav-icon-display"><i className="fas fa-lg fa-sign-out-alt"></i></span></a>}
        </div>

      </nav>
    );
  }
}

export default withRouter(Navbar);

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/logging/login.component";
import Register from "./components/logging/register.component";
import Profile from "./components/userProfile/profile.component";
import SearchResorts from "./components/searchResorts/search-resorts.component";
import TripView from "./components/tripView/trip-view";
import TripForm from "./components/tripView/trip-form";
import ResortView from "./components/resortView/resort-view";
import ResortForm from "./components/resortView/resort-form";
import GradeResort from "./components/resortView/grade-resort";
import PasswordChange from "./components/userProfile/password.change.component";
import UserDataChange from "./components/userProfile/user.data.change.component";
import News from "./components/news/news.component";
import Acquaintances from "./components/acquaintances/acquaintances.component";
import {Colors} from "./constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router>
        <div style={{backgroundColor: Colors.background}}>
        <div className="container mt-3" style={{backgroundColor: Colors.background}}>
          <Switch>
          <nav className="navbar navbar-expand navbar-dark" style={{backgroundColor: Colors.primary}}>
            <Link to={"/resorts"} className="navbar-brand">
              SkiWithMe
            </Link>
            <div className="navbar-nav mr-auto">
              {currentUser && (
                <li className="nav-item">
                  <Link id="nav-news" to={"/news"} className="nav-link">
                    Aktualności
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link id="nav-resort" to={"/resorts"} className="nav-link">
                  Szukaj ośrodka
                </Link>
              </li>

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/acquaintances/" + this.state.currentUser.username} className="nav-link">
                    Znajomi
                  </Link>
                </li>
              )}
              
              {currentUser && (
                <li className="nav-item">
                  <Link id="nav-new-trip" to={"/tripForm/"} className="nav-link">
                    Nowy wyjazd
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link id="nav-user" to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Wyloguj się
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Zaloguj się
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Zarejestruj się
                  </Link>
                </li>
              </div>
            )}
          </nav>
              <Route exact path="/news" component={News} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/passwordChange/:username" component={PasswordChange} />
              <Route exact path="/userDataChange/:username" component={UserDataChange} />
              <Route exact path="/acquaintances/:username" component={Acquaintances} />
              <Route path="/resorts" component={SearchResorts} />
              <Route path="/resortView/:resortId" component={ResortView} />
              <Route path="/gradeResort/:resortId" component={GradeResort} />
              <Route path="/tripView/:tripId" component={TripView} />
              <Route path="/tripForm/:tripId" component={TripForm} />
              <Route path="/tripForm" component={TripForm} />
              <Route path="/resortForm/:resortId" component={ResortForm} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
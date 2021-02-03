import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import HelloPage from "./components/logging/hello.page.component";
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
    const size = 18;

    console.log("This is the process.env", process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div style={{backgroundColor: Colors.background}}>
          <nav className="navbar navbar-expand navbar-dark" style={{backgroundColor: Colors.primary}}>
            <Link to={"/resorts"} className="navbar-brand" style={{ fontSize: 24, fontWeight: "bold"}}>
              SkiWithMe
            </Link>
            <div className="navbar-nav mr-auto">
              {currentUser && (
                <li className="nav-item">
                  <Link id="nav-news" to={"/news"} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                    Aktualności
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link id="nav-resort" to={"/resorts"} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                  Szukaj ośrodka
                </Link>
              </li>

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/acquaintances/" + this.state.currentUser.username} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                    Znajomi
                  </Link>
                </li>
              )}
              
              {currentUser && (
                <li className="nav-item">
                  <Link id="nav-new-trip" to={"/tripForm/"} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                    Nowy wyjazd
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link id="nav-user" to={"/profile"} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut} style={{ fontSize: size, fontWeight: "bold"}}>
                    Wyloguj się
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                    Zaloguj się
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link" style={{ fontSize: size, fontWeight: "bold"}}>
                    Zarejestruj się
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3" style={{backgroundColor: Colors.background}}>
            <Switch>
              <Route path="/news" component={News} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/passwordChange/:username" component={PasswordChange} />
              <Route path="/userDataChange/:username" component={UserDataChange} />
              <Route path="/acquaintances/:username" component={Acquaintances} />
              <Route path="/resorts" component={SearchResorts} />
              <Route path="/resortView/:resortId" component={ResortView} />
              <Route path="/gradeResort/:resortId" component={GradeResort} />
              <Route path="/tripView/:tripId" component={TripView} />
              <Route path="/tripForm/:tripId" component={TripForm} />
              <Route path="/tripForm" component={TripForm} />
              <Route path="/resortForm/:resortId" component={ResortForm} />
              <Route path="/" component={HelloPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
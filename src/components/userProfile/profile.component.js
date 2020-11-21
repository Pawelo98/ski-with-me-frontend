import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import UserInfo from "./user.info.component";
import { Grid, Segment, GridRow, GridColumn, Button } from "semantic-ui-react";
import LoadingIndicator from "../../common/LoadingIndicator";
import { Colors } from "../../constants";
import resortService from "../../services/resort.service";
import { notification } from "antd";
import { GiAchievement, GiMountaintop } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";

    this.state = {
      username: AuthService.getCurrentUser().username,
      currentUser: null,
      achievements: null,
      acquaintances: null,
      acquaintanceNumber: 0,
      trips: null,
      resortImage: null
    };
  }

  componentDidMount () {
    this.getCurrentUser(this.state.username).then(user => {
      this.setState({
        currentUser: user.data
      })
    });

    this.getAchievements(this.state.username).then(achievements => {
      this.setState({
        achievements: achievements.data
      })});

    this.getAcquaintances(this.state.username).then(acquaintances => {
      this.setState({
        acquaintances: acquaintances.data.userDTO,
        acquaintanceNumber: acquaintances.data.countAcquaintances
      })});

    this.getTrips(this.state.username).then(trips => {
      this.setState({
        trips: trips.data
      })});
  }

  handleDeleteAcquaintance(username) {
    UserService
    .deleteAcquaintance(AuthService.getCurrentUser().username, username)
    .then((response) => {
        notification.success({
            message: "Znajomy został usunięty!",
            description:
                "Usunięto znajomego o loginie " + username + "!",
        });
    })
    .then((response) => {
        this.getAcquaintances(this.state.username).then(acquaintances => { this.setState({
            acquaintances: acquaintances.data.userDTO,
            acquaintanceNumber: acquaintances.data.countAcquaintances
          })});
    })
    .catch((error) => {
        notification.error({
            message: "Nie udało się usunąć znajomego!",
            description:
                "Użytkownik o loginie " + username + " nie został usunięty ze znajomych!",
        });
    });
  }

  getCurrentUser (username) {
    return UserService.getUserFromUsername(username);
  }

  getAchievements (username) {
    return UserService.getAchievementsFromUsername(username);
  }

  getAcquaintances (username) {
    return UserService.getAcquaintancesFromUsername(username);
  }

  getTrips (username) {
    return UserService.getTripsFromUsername(username);
  }

  getResortImage (id) {
    return resortService.getResortImage(id);
  }

  render () {
    if (this.state.currentUser === null || this.state.achievements === null || this.state.acquaintances === null || this.state.trips === null) {
      return <LoadingIndicator />
    } else {
      return (
        <Grid textAlign="center">
          <Grid.Column mobile={16} tablet={13} computer={10}>
            <Segment padded>
              <UserInfo
                currentUser={this.state.currentUser}
                userImage={this.state.resortImage}
              />
            </Segment>
            <Segment padded>
              <Grid textAlign="left">
                <GridRow style={{ padding: 5 }}>
                  <GridColumn floated="left" textAlign="left" style={{ padding: 3, paddingLeft: 20 }}>
                    <h2 style={{ width: 150 }}>Znajomi: </h2>
                  </GridColumn>
                </GridRow>
                <GridRow columns={this.state.acquaintances.length + 1} style={{ padding: 5, paddingLeft: 15 }}>
                  <React.Fragment>
                  {this.state.acquaintances.length === 0 ? (
                        <h4 style={{ padding: 3, paddingLeft: 10 }}>Brak znajomych do wyświetlenia</h4>
                    ) : (
                    this.state.acquaintances
                      .map((user) => (
                        <Segment style={{ margin: 3 }} key={user.username}>
                          <Grid textAlign="center">
                              <Grid.Row stretched columns={3} style={{ padding: 8 }}>
                                  <Grid.Column style={{ margin: 0 }} width="2" floated="left">
                                      <FaUser size="35px"/>
                                  </Grid.Column>
                                  <Grid.Column textAlign="left" verticalAlign="middle">
                                      <h3 style={{ margin: 5, marginBottom: 0 }}>{user.username}</h3>
                                      <h4 style={{ margin: 5 }}>{user.email}</h4>
                                  </Grid.Column>
                                  <Grid.Column width="5" floated="right" verticalAlign="middle" style={{ height: 40 }}>
                                      <Button
                                          size="small"
                                          onClick={() => this.handleDeleteAcquaintance(user.username)}
                                          style={{ backgroundColor: '#ff5f57', color: Colors.background }}>
                                          Usuń ze znajomych
                                      </Button>
                                  </Grid.Column>
                              </Grid.Row>
                          </Grid>
                        </Segment>
                      ))
                    )
                      }
                  </React.Fragment>
                </GridRow>
              </Grid>
            </Segment>
            <Segment padded>
              <Grid textAlign="left">
                <GridRow style={{ padding: 5 }}>
                  <GridColumn floated="left" textAlign="left" style={{ padding: 3, paddingLeft: 20 }}>
                    <h2>Wyjazdy: </h2>
                  </GridColumn>
                </GridRow>
                <GridRow columns={this.state.trips.length + 1} style={{ padding: 5, paddingLeft: 15 }}>
                  <React.Fragment>
                  {this.state.trips.length === 0 ? (
                        <h4 style={{ padding: 3, paddingLeft: 10 }}>Brak wyjazdów do wyświetlenia</h4>
                    ) : (
                    this.state.trips
                      .map((trip) => (
                        <Segment style={{ margin: 3 }} key={trip.tripId}>
                          <Link to={{ pathname: `../tripView/${trip.tripId}`, state: { trip: trip } }}>
                            <Grid textAlign="center">
                                <Grid.Row stretched columns={3} style={{ padding: 8 }}>
                                    <Grid.Column style={{ margin: 0 }} width="2" floated="left">
                                        <GiMountaintop style={{ color: 'black' }} size="40px"/>
                                    </Grid.Column>
                                    <Grid.Column textAlign="left" verticalAlign="middle">
                                        <h4 style={{ margin: 5 }}>{trip.resortName}</h4>
                                    </Grid.Column>
                                    <Grid.Column width="8" floated="right" verticalAlign="middle">
                                        <h5 style={{ margin: 5, textAlign: "left" }}>{trip.description}</h5>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                          </Link>
                        </Segment>
                      ))
                    )
                  }
                  </React.Fragment>
                </GridRow>
              </Grid>
            </Segment>
            <Segment padded>
              <Grid textAlign="left">
                <GridRow style={{ padding: 5 }}>
                  <GridColumn floated="left" textAlign="left" style={{ padding: 3, paddingLeft: 20 }}>
                    <h2>Osiągnięcia: </h2>
                  </GridColumn>
                </GridRow>
                <GridRow columns={this.state.achievements.length + 1} style={{ padding: 5, paddingLeft: 15 }}>
                  <React.Fragment>
                  {this.state.achievements.length === 0 ? (
                        <h4 style={{ padding: 3, paddingLeft: 10 }}>Brak osiągnięć do wyświetlenia</h4>
                    ) : (
                    this.state.achievements
                      .map((achievement) => (
                        <Segment style={{ margin: 3 }} key={achievement.achievementId}>
                          <Grid textAlign="center">
                              <Grid.Row stretched columns={3} style={{ padding: 8 }}>
                                  <Grid.Column style={{ margin: 0 }} width="2" floated="left">
                                      <GiAchievement size="40px"/>
                                  </Grid.Column>
                                  <Grid.Column textAlign="left" verticalAlign="middle">
                                      <h4 style={{ margin: 5 }}>{achievement.achievementName}</h4>
                                  </Grid.Column>
                                  <Grid.Column width="8" floated="right" verticalAlign="middle">
                                      <h5 style={{ margin: 5, textAlign: "left" }}>{achievement.achievementDescription}</h5>
                                  </Grid.Column>
                              </Grid.Row>
                          </Grid>
                        </Segment>
                      ))
                    )
                  }
                  </React.Fragment>
                </GridRow>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
}
import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import UserInfo from "./user.info.component";
import { Grid, Segment, GridRow, GridColumn, Button } from "semantic-ui-react";
import LoadingIndicator from "../../common/LoadingIndicator";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";
import resortService from "../../services/resort.service";
import { GiAchievement, GiPerson, GiMountaintop } from 'react-icons/gi';

export default class Profile extends Component {
  constructor(props) {
    super(props);

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

  componentDidMount() {
    this.getCurrentUser(this.state.username).then(user => { this.setState({
      currentUser: user.data
    })});

    this.getAchievements(this.state.username).then(achievements => { this.setState({
      achievements: achievements.data
    })});

    this.getAcquaintances(this.state.username).then(acquaintances => { this.setState({
      acquaintances: acquaintances.data.userDTO,
      acquaintanceNumber: acquaintances.data.countAcquaintances
    })});

    this.getTrips(this.state.username).then(trips => { this.setState({
      trips: trips.data
    })});

    this.getResortImage(1).then(image => { this.setState({
      resortImage: "data:image/jpeg;base64," + image.data
    })
    //console.log(this.state.resortImage)
  })
  }

  getCurrentUser(username) {
    return UserService.getUserFromUsername(username);
  }

  getAchievements(username) {
    return UserService.getAchievementsFromUsername(username);
  }

  getAcquaintances(username) {
    return UserService.getAcquaintancesFromUsername(username);
  }

  getTrips(username) {
    return UserService.getTripsFromUsername(username);
  }

  getResortImage(id) {
    return resortService.getResortImage(id);
  }

  render() {
    if(this.state.currentUser === null || this.state.achievements === null || this.state.acquaintances === null || this.state.trips === null || this.state.resortImage === null) {
      return <LoadingIndicator/>
    } else {
      return (
        <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={14}>
          <Segment padded>
            <UserInfo
              currentUser={this.state.currentUser}
              userImage={this.state.resortImage}
            />
          </Segment>
          <Segment padded>
            <Grid textAlign="left">
              <GridRow columns={10} style={{padding: 5}}>
                <GridColumn floated="left" textAlign="left" style={{padding: 3, paddingLeft: 20}}>
                  <h3>Osiągnięcia: </h3>
                </GridColumn>
                <GridColumn floated="right" textAlign="left" style={{padding: 3, marginRight: 65}}>
                  <Link style={{width: 160}} to={"/achievements/" + this.state.currentUser.username}>
                      <Button style={{backgroundColor: Colors.primary, width: 155}} size="small">
                          <Button.Content visible style={{color: Colors.background}}>Zobacz wszystkie</Button.Content>
                      </Button>
                  </Link>
                </GridColumn>
              </GridRow>
              <GridRow columns={this.state.achievements.length + 1} style={{padding: 5, paddingLeft: 15}}>
                <React.Fragment>
                  {this.state.achievements
                    .map((achievement) => (
                        <h4 key={achievement.achievementId} title={achievement.achievementName} style={{ fontWeight: "bold", paddingRight: 5, margin: 0 }}><GiAchievement size="40px" tooltip={achievement.achievementName}/></h4>
                    ))}
                </React.Fragment>
              </GridRow>
            </Grid>
          </Segment>
          <Segment padded>
            <Grid textAlign="left">
              <GridRow columns={10} style={{padding: 5}}>
                <GridColumn floated="left" textAlign="left" style={{padding: 3, paddingLeft: 20}}>
                  <h3 style={{width: 150}}>Znajomi: </h3>
                </GridColumn>
                <GridColumn floated="right" textAlign="left" style={{padding: 3, marginRight: 65}}>
                  <Link style={{width: 160}} to={"/acquaintances/" + this.state.currentUser.username}>
                      <Button style={{backgroundColor: Colors.primary, width: 155}} size="small">
                          <Button.Content visible style={{color: Colors.background}}>Zobacz wszystkie</Button.Content>
                      </Button>
                  </Link>
                </GridColumn>
              </GridRow>
              <GridRow columns={this.state.acquaintances.length + 1} style={{padding: 5, paddingLeft: 15}}>
                <React.Fragment>
                  {this.state.acquaintances
                    .map((acquaintance) => (
                        <h4 key={acquaintance.username} title={acquaintance.name + " " + acquaintance.surname} style={{ fontWeight: "bold", paddingRight: 5, margin: 0 }}><GiPerson size="40px" tooltip={acquaintance.name + " " + acquaintance.surname}/></h4>
                    ))}
                </React.Fragment>
              </GridRow>
            </Grid>
          </Segment>
          <Segment padded>
            <Grid textAlign="left">
              <GridRow columns={10} style={{padding: 5}}>
                <GridColumn floated="left" textAlign="left" style={{padding: 3, paddingLeft: 20}}>
                  <h3>Wyjazdy: </h3>
                </GridColumn>
                <GridColumn floated="right" textAlign="left" style={{padding: 3, marginRight: 65}}>
                  <Link style={{width: 160}} to={"/trips/" + this.state.currentUser.username}>
                      <Button style={{backgroundColor: Colors.primary, width: 155}} size="small">
                          <Button.Content visible style={{color: Colors.background}}>Zobacz wszystkie</Button.Content>
                      </Button>
                  </Link>
                </GridColumn>
              </GridRow>
              <GridRow columns={this.state.trips.length + 1} style={{padding: 5, paddingLeft: 25}}>
                <React.Fragment>
                  {this.state.trips
                    .map((trip) => (
                        <h4 key={trip.tripId} title={trip.resortName} style={{ fontWeight: "bold", paddingRight: 5, margin: 0 }}><GiMountaintop size="40px" tooltip={trip.resortName}/></h4>
                    ))}
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
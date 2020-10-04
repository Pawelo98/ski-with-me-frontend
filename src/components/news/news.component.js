import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import NewsService from "../../services/news.service";
import { Grid, Segment, GridRow, GridColumn, Button } from "semantic-ui-react";
import LoadingIndicator from "../../common/LoadingIndicator";
import { Colors } from "../../constants";
import TripCard from "./trip-card";
import ReportCard from "./report-card";
import { Link } from "react-router-dom";
import { GiAchievement, GiPerson, GiMountaintop } from 'react-icons/gi';

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: AuthService.getCurrentUser().username,
      upcomingTrips: null,
      pastTrips: null,
      upcomingAcquaintancesTrips: null,
      acquaintancesTripsReports: null
    };
  }

  componentDidMount() {
    this.getUpcomingTrips(AuthService.getCurrentUser().username).then(upcomingTrips => { this.setState({
        upcomingTrips: upcomingTrips.data.content
    })
    console.log(upcomingTrips)});
    
    this.getPastTrips(AuthService.getCurrentUser().username).then(pastTrips => { this.setState({
        pastTrips: pastTrips.data.content
    })
    console.log(pastTrips)});

    this.getUpcomingAcquaintancesTrips(AuthService.getCurrentUser().username).then(upcomingAcquaintancesTrips => { this.setState({
        upcomingAcquaintancesTrips: upcomingAcquaintancesTrips.data.content
    })
    console.log(upcomingAcquaintancesTrips)});

    this.getAcquaintancesTripsReports(AuthService.getCurrentUser().username).then(acquaintancesTripsReports => { this.setState({
        acquaintancesTripsReports: acquaintancesTripsReports.data.content
    })
    console.log(acquaintancesTripsReports)});
  }

  getUpcomingTrips(username) {
    return NewsService.getUpcomingTrips(username);
  }

  getPastTrips(username) {
    return NewsService.getPastTrips(username);
  }

  getUpcomingAcquaintancesTrips(username) {
    return NewsService.getUpcomingAcquaintancesTrips(username);
  }

  getAcquaintancesTripsReports(username) {
    return NewsService.getAcquaintancesTripsReports(username);
  }

  render() {
    if(this.state.upcomingTrips === null || this.state.pastTrips === null || this.state.upcomingAcquaintancesTrips === null || this.state.acquaintancesTripsReports === null) {
      return <LoadingIndicator/>
    } else {
      return (
        <Grid textAlign="center">
        <Grid.Column mobile={16} tablet={16} computer={14}>
          <Segment padded>
            <Grid textAlign="left">
              <GridRow columns={1} style={{padding: 5}}>
                <GridColumn textAlign="center" verticalAlign="middle" style={{padding: 3}}>
                    <h2 style={{ fontWeight: "bold", color: Colors.primary }}>Tablica aktualności</h2>
                </GridColumn>
              </GridRow>
              <GridRow columns={2} stretched style={{padding: 5}}>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <h4 style={{ fontWeight: "bold" }}>Ostatnie wyjazdy:</h4>
                    </GridColumn>
                </GridRow>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <h4 style={{ fontWeight: "bold" }}>Zaplanowane wyjazdy:</h4>
                    </GridColumn>
                </GridRow>
              </GridRow>
              <GridRow columns={2} stretched style={{padding: 5}}>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <Link to={{ pathname: `/tripView/${this.state.pastTrips[0].tripId}`, state: { trip: this.state.pastTrips[0] } }}>
                            <Segment key={this.state.pastTrips[0].tripId}>
                                <TripCard trip={this.state.pastTrips[0]}/>
                            </Segment>
                        </Link>
                    </GridColumn>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <Link to={{ pathname: `/tripView/${this.state.pastTrips[1].tripId}`, state: { trip: this.state.pastTrips[1] } }}>
                            <Segment key={this.state.pastTrips[1].tripId}>
                                <TripCard trip={this.state.pastTrips[1]}/>
                            </Segment>
                        </Link>
                    </GridColumn>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        {this.state.pastTrips[2] !== undefined && (
                            <Link to={{ pathname: `/tripView/${this.state.pastTrips[2].tripId}`, state: { trip: this.state.pastTrips[2] } }}>
                                <Segment key={this.state.pastTrips[2].tripId}>
                                    <TripCard trip={this.state.pastTrips[2]}/>
                                </Segment>
                            </Link>
                        )}
                    </GridColumn>
                </GridRow>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <Link to={{ pathname: `/tripView/${this.state.upcomingTrips[0].tripId}`, state: { trip: this.state.upcomingTrips[0] } }}>
                            <Segment key={this.state.upcomingTrips[0].tripId}>
                                <TripCard trip={this.state.upcomingTrips[0]}/>
                            </Segment>
                        </Link>
                    </GridColumn>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <Link to={{ pathname: `/tripView/${this.state.upcomingTrips[1].tripId}`, state: { trip: this.state.upcomingTrips[1] } }}>
                            <Segment key={this.state.upcomingTrips[1].tripId}>
                                <TripCard trip={this.state.upcomingTrips[1]}/>
                            </Segment>
                        </Link>
                    </GridColumn>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <Link to={{ pathname: `/tripView/${this.state.upcomingTrips[2].tripId}`, state: { trip: this.state.upcomingTrips[2] } }}>
                            <Segment key={this.state.upcomingTrips[2].tripId}>
                                <TripCard trip={this.state.upcomingTrips[2]}/>
                            </Segment>
                        </Link>
                    </GridColumn>
                </GridRow>
              </GridRow>
              <GridRow columns={2} stretched style={{padding: 5, paddingTop: 20}}>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <h4 style={{ fontWeight: "bold" }}>Relacje z wyjazdów Twoich znajomych:</h4>
                    </GridColumn>
                </GridRow>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                        <h4 style={{ fontWeight: "bold" }}>Nadchodzące wyjazdy Twoich znajomych:</h4>
                    </GridColumn>
                </GridRow>
              </GridRow>
              <GridRow columns={2} stretched style={{padding: 5}}>
                <GridRow columns={this.state.acquaintancesTripsReports.length + 1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <React.Fragment>
                        {this.state.acquaintancesTripsReports
                        .map((report) => (
                            <Link to={{ pathname: `/tripView/${report.tripId}`, state: { trip: report } }}>
                                <Segment key={report.tripId}>
                                    <ReportCard report={report}/>
                                </Segment>
                            </Link>
                        ))}
                    </React.Fragment>
                </GridRow>
                <GridRow columns={this.state.upcomingAcquaintancesTrips.length + 1} stretched style={{padding: 5, paddingLeft: 50}}>
                    <React.Fragment>
                        {this.state.upcomingAcquaintancesTrips
                        .map((trip) => (
                            <Link to={{ pathname: `/tripView/${trip.tripId}`, state: { trip: trip } }}>
                                <Segment key={trip.tripId}>
                                    <TripCard trip={trip}/>
                                </Segment>
                            </Link>
                        ))}
                    </React.Fragment>
                </GridRow>
              </GridRow>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
    }
  }
}
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Button,
  List,
  Header
} from "semantic-ui-react";
import { Colors } from "../../constants";
import resortService from "../../services/resort.service";
import userService from "../../services/user.service";
import tripService from "../../services/trip.service";
import LoadingIndicator from "../../common/LoadingIndicator";
import { FaUser } from 'react-icons/fa';
import AuthService from "../../services/auth.service";
import { notification } from "antd";

class TripView extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";
    
    this.state = {
      trip: null,
      resortDetails: null,
      departureDate: null,
      departureTime: null,
      arrivalDate: null,
      participants: null,
      isTripActive: null
    };
  }

  componentDidMount () {
    this.setState({
        trip: this.props.location.state.trip
    });

    this.getResortFromTripId(this.props.location.state.trip.tripId).then(resort => { this.setState({
            resortDetails: resort.data
        })
    })

    this.getParticipants(this.props.location.state.trip.tripId).then(participants => { this.setState({
        participants: participants.data
        })
    })

    this.getTripActivity(this.props.location.state.trip.tripId).then(trip => { 
        this.setState({
            isTripActive: trip.data
        })
    })

    var tripDate = this.props.location.state.trip.tripDate;
    var daysNumber = this.props.location.state.trip.daysNumber;

    var departureDate = tripDate.toString().substring(0, 10);
    var departureTime = tripDate.toString().substring(11, 16);

    var tripDateArrival = new Date(departureDate);
    tripDateArrival.setDate(tripDateArrival.getDate() + parseInt(daysNumber));
    let monthArrival = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(tripDateArrival.toString().substring(4, 7)) / 3 + 1;
    if(monthArrival < 10)
      monthArrival = "0" + monthArrival.toString();
    var arrivalFormated = tripDateArrival.toString().substring(11, 15) + "-" + monthArrival + "-" + tripDateArrival.toString().substring(8, 10);

    this.setState({
      departureDate: departureDate,
      departureTime: departureTime,
      arrivalDate: arrivalFormated
    });
  }

  getTripActivity(tripId) {
    return tripService.getTripActivity(tripId);
  }

  getResortFromTripId(tripId) {
    return resortService.getResortFromTripId(tripId);
  }

  getParticipants(tripId) {
    return userService.getParticipants(tripId);
  }

  isEarlierThanNow() {
      return new Date() < new Date(this.props.location.state.trip.tripDate);
  }

  isActive() {
      return this.state.isTripActive;
  }

  currentUserParticipates() {
    for(let i = 0; i < this.state.participants.length; i++) {
        if(AuthService.getCurrentUser().username === this.state.participants[i].username) {
            return true;
        }
    }
    return false;
  }

  quitTrip() {
    tripService
    .quitTrip(AuthService.getCurrentUser().username, this.props.location.state.trip.tripId)
    .then((response) => {
        notification.success({
            message: "Zrezygnowałeś z wyjazdu!",
            description:
                "Wyjazd, na który byłeś zapisany odbędzie się bez Twojego udziału!",
        });

        this.props.history.push(`../news`);
    })
    .catch((error) => {
        notification.error({
            message: "Nie udało się zrezygnować z wyjazdu!",
            description:
                "Rezygnacja nie powiodła się!",
        });
    });
  }

  cancelTrip() {
    tripService
    .cancelTrip(AuthService.getCurrentUser().username, this.props.location.state.trip.tripId)
    .then((response) => {
        notification.success({
            message: "Wyjazd został odwołany!",
            description:
                "Odwołano wyjazd!",
        });

        this.props.history.push(`../news`);
    })
    .catch((error) => {
        notification.error({
            message: "Nie udało się odwołać wyjazdu!",
            description:
                "Wyjazd nie został odwołany!",
        });
    });
  }

  joinTrip() {
    tripService
    .joinTrip(AuthService.getCurrentUser().username, this.props.location.state.trip.tripId)
    .then((response) => {
        notification.success({
            message: "Dołączyłeś do wyjazdu!",
            description:
                "Zapisałeś się na wyjazd!",
        });

        this.props.history.push(`../news`);
    })
    .catch((error) => {
        notification.error({
            message: "Nie udało się dołączyć do wyjazdu!",
            description:
                "Dołączenie do wyjazdu nie powiodło się!",
        });
    });
  }

  render () {
    if(this.state.trip === null || this.state.resortDetails === null || this.state.participants === null || this.state.isTripActive === null) {
        return <LoadingIndicator/>
    } else {
        return (
        <Grid columns="equal">
            <Grid.Column mobile={16} tablet={16} computer={14}>
                <Segment padded>
                    <Grid columns="equal">
                        <GridRow columns={3} textAlign="center" verticalAlign="middle" centered stretched style={{padding: 5}}>
                            <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingBottom: 15, paddingLeft: 20}}>
                                <Link
                                    to={{
                                    pathname: `../resortView/${this.state.resortDetails.resortId}`,
                                    state: { resortDetails: this.state.resortDetails },
                                    }}
                                >
                                    <Button id={this.state.resortId} style={{ backgroundColor: Colors.primary, color: Colors.background, width: 200 }} size="small">
                                        <Button.Content visible style={{ color: Colors.background }}>Zobacz ośrodek</Button.Content>
                                    </Button>
                                </Link>
                            </GridColumn>
                            <GridColumn textAlign="center" style={{padding: 5, paddingBottom: 15}}>
                                <h1 style={{ fontWeight: "bold", color: Colors.primary }}>{this.state.trip.resortName}</h1>
                            </GridColumn>
                            <GridColumn floated="right" textAlign="right" style={{padding: 5, paddingBottom: 15, paddingRight: 20}}>
                                {(this.currentUserParticipates()) && (
                                    <Link
                                        style={{ padding: 5 }}
                                        to={{
                                            pathname: `../tripForm/${this.state.trip.tripId}`, 
                                            state: { trip: this.state.trip, resort: this.state.resortDetails }
                                        }}
                                    >
                                        <Button id="settings" style={{ backgroundColor: Colors.primary, color: Colors.background, width: 200 }} size="small">
                                            <Button.Content visible style={{ color: Colors.background }}>Zmień ustawienia wyjazdu</Button.Content>
                                        </Button>
                                    </Link>
                                )}
                                {(!this.currentUserParticipates() && this.isActive() && this.isEarlierThanNow()) && (
                                    <Link
                                        style={{ padding: 5 }}
                                        to={{
                                            pathname: `./${this.props.location.state.trip.tripId}`,
                                            state: { trip: this.state.trip }
                                        }}
                                    >
                                        <Button id="join" style={{ backgroundColor: Colors.primary, color: Colors.background, width: 200 }} size="small"
                                            onClick={() => this.joinTrip()}>
                                            <Button.Content visible style={{ color: Colors.background }}>Dołącz do wyjazdu</Button.Content>
                                        </Button>
                                    </Link>
                                )}
                                {(this.currentUserParticipates() && this.isActive() && this.isEarlierThanNow()) && (
                                    <Link
                                        style={{ padding: 5 }}
                                        to={{
                                            pathname: `./${this.props.location.state.trip.tripId}`,
                                            state: { trip: this.state.trip }
                                        }}
                                    >
                                        <Button id="cancel" style={{ backgroundColor: '#ff5f57', color: Colors.background, width: 200 }} size="small"
                                            onClick={() => this.cancelTrip()}>
                                            <Button.Content visible style={{ color: Colors.background }}>Odwołaj wyjazd</Button.Content>
                                        </Button>
                                    </Link>
                                )}
                                {(this.currentUserParticipates() && this.isActive() && this.isEarlierThanNow()) && (
                                    <Link
                                        style={{ padding: 5 }}
                                        to={{
                                            pathname: `./${this.props.location.state.trip.tripId}`,
                                            state: { trip: this.state.trip }
                                        }}
                                    >
                                        <Button id="quit" style={{ backgroundColor: '#ff5f57', color: Colors.background, width: 200 }} size="small"
                                            onClick={() => this.quitTrip()}>
                                            <Button.Content visible style={{ color: Colors.background }}>Zrezygnuj z wyjazdu</Button.Content>
                                        </Button>
                                    </Link>
                                )}
                            </GridColumn>
                        </GridRow>
                    </Grid>
                    <Grid columns="equal" style={{paddingTop: 15}}>
                        <GridRow columns={2} stretched style={{padding: 5, paddingLeft: 50, paddingTop: 0}}>
                            <GridRow columns={1} stretched style={{padding: 5}}>
                                <Grid.Column textAlign="center" verticalAlign="middle" style={{paddingBottom: 15}}>
                                    <Header as="h2" textAlign="center">
                                        Użytkownicy biorący udział w wyjeździe
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <React.Fragment>
                                        <List divided verticalAlign="middle" size="huge">
                                            {this.state.participants.length === 0 ? (
                                                    <h3>Brak użytkowników biorących udział w wyjeździe</h3>
                                                ) : (
                                                this.state.participants.map((user) => (
                                                    <Segment key={user.username}>
                                                        <Grid textAlign="center">
                                                            <Grid.Row stretched columns={3}>
                                                                <Grid.Column style={{ marginRight: 10, marginLeft: 10 }} width="2" floated="left">
                                                                    <FaUser size="30px"/>
                                                                </Grid.Column>
                                                                <Grid.Column textAlign="left" verticalAlign="middle">
                                                                    <h3>{user.username}</h3>
                                                                </Grid.Column>
                                                                <Grid.Column width="7" style={{ marginLeft: 10 }} floated="right">
                                                                    <Header as="h4" textAlign="left" style={{ margin: 5 }}>
                                                                        {user.name} {user.surname}
                                                                    </Header>
                                                                    <Header as="h5" textAlign="left" style={{ margin: 5 }}>
                                                                        {user.email}
                                                                    </Header>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </Segment>
                                                )))
                                            }
                                        </List>
                                    </React.Fragment>
                                </Grid.Column>
                            </GridRow>
                            <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 150, paddingTop: 0}}>
                                <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingBottom: 15}}>
                                    <h4>Stan wyjazdu: Aktualny</h4>
                                    <h4 style={{ marginTop: 0 }}>Data i godzina wyjazdu: {this.state.departureDate} {this.state.departureTime}</h4>
                                    <h4 style={{ marginTop: 0 }}>Data powrotu: {this.state.arrivalDate}</h4>
                                    <h3 style={{ fontWeight: "bold" }}>Opis wyjazdu:</h3>
                                    <h4 style={{ fontStyle: "italic", marginTop: 0 }}>{this.state.trip.description}</h4>
                                </GridColumn>
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

export default withRouter(TripView);
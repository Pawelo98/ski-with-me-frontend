import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  GridColumn,
  GridRow
} from "semantic-ui-react";
import { Colors } from "../../constants";

class TripCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resortName: null,
      departureDate: null,
      departureTime: null,
      arrivalDate: null,
      description: null
    };
  }

  componentDidMount () {
    var tripDate = this.props.trip.tripDate;
    var daysNumber = this.props.trip.daysNumber;

    var departureDate = tripDate.toString().substring(0, 10);
    var departureTime = tripDate.toString().substring(11, 16);

    var tripDateArrival = new Date(departureDate);
    tripDateArrival.setDate(tripDateArrival.getDate() + parseInt(daysNumber));
    var arrivalFormated = tripDateArrival.toString().substring(11, 15) + "-" + tripDateArrival.toString().substring(8, 10) + "-" + tripDateArrival.toString().substring(8, 10);

    this.setState({
        resortName: this.props.trip.resortName,
        departureDate: departureDate,
        departureTime: departureTime,
        arrivalDate: arrivalFormated,
        description: this.props.trip.description
    });
  }

  render () {
    return (
        <Grid columns="equal">
            <GridRow columns={1} stretched style={{padding: 5}}>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 35}}>
                    <GridColumn textAlign="center" style={{padding: 3}}>
                        <h4 style={{ fontWeight: "bold" }}>{this.state.resortName}</h4>
                    </GridColumn>
                    <GridColumn verticalAlign="middle" style={{padding: 3}}>
                        <h5 style={{ fontWeight: "bold" }}>Data wyjazdu: {this.state.departureDate}</h5>
                    </GridColumn>
                    <GridColumn verticalAlign="middle" style={{padding: 3}}>
                        <h5 style={{ fontWeight: "bold" }}>Godzina wyjazdu: {this.state.departureTime}</h5>
                    </GridColumn>
                    <GridColumn verticalAlign="middle" style={{padding: 3}}>
                        <h5 style={{ fontWeight: "bold" }}>Data powrotu: {this.state.arrivalDate}</h5>
                    </GridColumn>
                    <GridColumn verticalAlign="middle" style={{padding: 3}}>
                        <h5 style={{ fontWeight: "bold" }}>{this.state.description}</h5>
                    </GridColumn>
                </GridRow>
            </GridRow>
        </Grid>
    );
  }
}

export default withRouter(TripCard);
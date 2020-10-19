import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Grid,
  GridColumn,
  GridRow,
  Button,
} from "semantic-ui-react";
import { Colors } from "../../constants";
import { TiLightbulb } from "react-icons/ti";
import { FaLightbulb } from "react-icons/fa";

class ResortCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clouds: 70,
      humidity: 90.36896897756206,
      lastChange: "2016-02-18T13:11:51.000+00:00",
      latitude: 52.977947,
      liftCount: 0,
      longitude: 52.977947,
      nightSkiing: false,
      region: "Newfoundland and Labrador",
      resortId: 1,
      resortName: "Smokey Mountain Ski Club",
      runCount: 0,
      sensedTemperature: -22.19486568548723,
      snowThickness: 44,
      temperature: 19.189346395452873,
      terrainPark: false,
      windSpeed: 10.054735036652962,
      distance: 10.0,
      isLoading: false
    };
  }

  componentDidMount () {
    var temp = this.props.resortDetails.temperature.toString();
    var dotIndex = temp.indexOf('.');
    var temperatureRounded = temp.substring(0, dotIndex + 2);

    var senTemp = this.props.resortDetails.sensedTemperature.toString();
    dotIndex = senTemp.indexOf('.');
    var sensedTemperatureRounded = senTemp.substring(0, dotIndex + 2);

    var disTemp = this.props.resortDetails.distance.toString();
    dotIndex = disTemp.indexOf('.');
    var distanceRounded = disTemp.substring(0, dotIndex + 3);

    this.setState({
      clouds: this.props.resortDetails.clouds,
      humidity: this.props.resortDetails.humidity,
      lastChange: this.props.resortDetails.lastChange,
      latitude: this.props.resortDetails.latitude,
      liftCount: this.props.resortDetails.liftCount,
      longitude: this.props.resortDetails.longitude,
      nightSkiing: this.props.resortDetails.nightSkiing,
      region: this.props.resortDetails.region,
      resortId: this.props.resortDetails.resortId,
      resortName: this.props.resortDetails.resortName,
      runCount: this.props.resortDetails.runCount,
      sensedTemperature: sensedTemperatureRounded,
      snowThickness: this.props.resortDetails.snowThickness,
      temperature: temperatureRounded,
      terrainPark: this.props.resortDetails.terrainPark,
      windSpeed: this.props.resortDetails.windSpeed,
      distance: distanceRounded
    });
  }

  render () {
    return (
      <Grid columns="equal">
        <GridRow columns={10} stretched style={{ padding: 5 }}>
          <GridRow columns={10} stretched style={{ padding: 5, paddingLeft: 35 }}>
            <GridColumn textAlign="center" style={{ padding: 3 }}>
              <h2 style={{ fontWeight: "bold" }}>{this.state.resortName}</h2>
            </GridColumn>
            <GridColumn verticalAlign="middle" style={{ padding: 3 }}>
              <h5 style={{ fontWeight: "bold" }}>Otwartych tras: {this.state.runCount}</h5>
            </GridColumn>
            <GridColumn verticalAlign="middle" style={{ padding: 3 }}>
              <h5 style={{ fontWeight: "bold" }}>Temperatura (odczuwalna): {this.state.temperature}℃ ({this.state.sensedTemperature}℃)</h5>
            </GridColumn>
          </GridRow>
          <GridRow columns={10} stretched style={{ padding: 5, paddingLeft: 45 }}>
            <GridColumn textAlign="center" style={{ padding: 3 }}>
              <h5 style={{ fontWeight: "bold" }}>Odległość do przebycia: {this.state.distance}km</h5>
            </GridColumn>
            <GridColumn verticalAlign="middle" style={{ padding: 3 }}>
              <h5 style={{ fontWeight: "bold" }}>Grubość pokrywy śnieżnej: {this.state.snowThickness}cm</h5>
            </GridColumn>
            <GridColumn verticalAlign="middle" style={{ padding: 3 }}>
              {this.state.nightSkiing === true &&
                <h5 title="Nocne jazdy możliwe" style={{ fontWeight: "bold" }}>Nocne jazdy: {this.state.nightSkiing} <TiLightbulb tooltip="Nocne jazdy możliwe" /></h5>
              }
              {this.state.nightSkiing === false &&
                <h5 title="Brak nocnych jazd" style={{ fontWeight: "bold" }}>Nocne jazdy: {this.state.nightSkiing} <FaLightbulb tooltip="Brak nocnych jazd" /></h5>
              }
            </GridColumn>
          </GridRow>
          <GridColumn
            centered="true"
            textAlign="center"
            verticalAlign="middle"
            mobile={4}
            tablet={4}
            computer={2}
            padded="horizontally"
            style={{ padding: 5, paddingLeft: 25 }}
          >
            <Grid.Row centered={true} textAlign="center">
              <Link
                to={{
                  pathname: `/resortView/${this.state.resortId}`,
                  state: { resortDetails: this.props.resortDetails },
                }}
              >
                <Button style={{ backgroundColor: Colors.primary }} size="small">
                  <Button.Content visible style={{ color: Colors.background }}>Więcej</Button.Content>
                </Button>
              </Link>
            </Grid.Row>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

export default withRouter(ResortCard);
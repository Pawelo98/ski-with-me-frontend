import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Image
} from "semantic-ui-react";
import { Colors } from "../../constants";
import resortService from "../../services/resort.service";
import ratingService from "../../services/rating.service";
import LoadingIndicator from "../../common/LoadingIndicator";
import { FaMountain } from "react-icons/fa";
import { TiLightbulb } from "react-icons/ti";
import { MdNotInterested } from "react-icons/md";
import StarRatings from 'react-star-ratings';

class ResortView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resortDetails: null,
      resortRating: null,
      resortImageLink: null,
      ratings: null,
      lastChange: '',
      avgRat1: 0,
      avgRat2: 0,
      avgRat3: 0,
      avgRat4: 0,
      avgRat5: 0
    };
  }

  componentDidMount () {
    this.setState({
        resortDetails: this.props.location.state.resortDetails
    });

    var lastChangeCustom = this.props.location.state.resortDetails.lastChange.substring(0, 10) + " " + this.props.location.state.resortDetails.lastChange.substring(11, 19);

    this.setState({
        lastChange: lastChangeCustom
    });

    this.getRatings().then(ratings => { this.setState({
        ratings: ratings.data
      })})

    this.getResortApi(this.props.match.params.resortId).then(resort => { if(resort.data.ski_maps[0] !== undefined) { this.setState({
        resortImageLink: resort.data.ski_maps[0].media.original.url
        })
        console.log(this.state.resortImageLink);
        }
    })
    
    this.getResortRating(this.props.match.params.resortId).then(resortRating => { this.setState({
        resortRating: resortRating.data
      })

    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var counter4 = 0;
    var counter5 = 0;

    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;

    var resortArr = this.state.resortRating;
    for(var i = 0; i < resortArr.length; i++) {
        switch(resortArr[i].ratingCategoryId) {
            case 1:
                counter1++;
                sum1 += resortArr[i].grade;
                break;
            case 2:
                counter2++;
                sum2 += resortArr[i].grade;
                break;
            case 3:
                counter3++;
                sum3 += resortArr[i].grade;
                break;
            case 4:
                counter4++;
                sum4 += resortArr[i].grade;
                break;
            case 5:
                counter5++;
                sum5 += resortArr[i].grade;
                break;
            default:
                break;
        }
    }

    var rat1, rat2, rat3, rat4, rat5;

    if(counter1 === 0) {
        rat1 = 3;
    } else {
        rat1 = sum1/counter1;
    }

    if(counter2 === 0) {
        rat2 = 3;
    } else {
        rat2 = sum2/counter2;
    }

    if(counter3 === 0) {
        rat3 = 3;
    } else {
        rat3 = sum3/counter3;
    }

    if(counter4 === 0) {
        rat4 = 3;
    } else {
        rat4 = sum4/counter4;
    }

    if(counter5 === 0) {
        rat5 = 3;
    } else {
        rat5 = sum5/counter5;
    }

    this.setState({
        avgRat1: rat1,
        avgRat2: rat2,
        avgRat3: rat3,
        avgRat4: rat4,
        avgRat5: rat5
    })
    
    var tempDetails = this.state.resortDetails;

    var temp = tempDetails.temperature.toString();
    var dotIndex = temp.indexOf('.');
    tempDetails.temperature = temp.substring(0, dotIndex + 2);

    var senTemp = tempDetails.sensedTemperature.toString();
    dotIndex = senTemp.indexOf('.');
    tempDetails.sensedTemperature = senTemp.substring(0, dotIndex + 2);

    var disTemp = tempDetails.distance.toString();
    dotIndex = disTemp.indexOf('.');
    tempDetails.distance = disTemp.substring(0, dotIndex + 2);

    var latTemp = tempDetails.latitude.toString();
    dotIndex = latTemp.indexOf('.');
    tempDetails.latitude = latTemp.substring(0, dotIndex + 2);

    var longTemp = tempDetails.longitude.toString();
    dotIndex = longTemp.indexOf('.');
    tempDetails.longitude = longTemp.substring(0, dotIndex + 2);

    var windTemp = tempDetails.windSpeed.toString();
    dotIndex = windTemp.indexOf('.');
    tempDetails.windSpeed = windTemp.substring(0, dotIndex + 2);

    var humTemp = tempDetails.humidity.toString();
    dotIndex = humTemp.indexOf('.');
    tempDetails.humidity = humTemp.substring(0, dotIndex + 2);

    this.setState({
        resortDetails: tempDetails
    })})
  }

  getResortApi(id) {
    return resortService.getResortImageApi(id);
  }

  getResortRating(id) {
    return resortService.getResortRatings(id);
  }

  getRatings() {
      return ratingService.getRatings();
  }

  render () {
    if(!this.state.resortImage === null || this.state.resortDetails === null || this.state.resortRating === null || this.state.ratings === null || this.state.resortImage === null) {
        return <LoadingIndicator/>
    } else {
        return (
        <Grid columns="equal">
            <Grid.Column mobile={16} tablet={16} computer={14}>
            <Segment padded>
            <Grid columns="equal">
                <GridRow columns={1} textAlign="center" verticalAlign="middle" centered stretched style={{padding: 5}}>
                    <h1 style={{ fontWeight: "bold", color: Colors.primary }}>{this.state.resortDetails.resortName}</h1>
                </GridRow>
                <GridRow columns={2} stretched style={{padding: 5}}>
                    <GridRow columns={9} stretched style={{padding: 5, paddingLeft: 50}}>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h3 style={{ fontWeight: "bold" }}>Dane o ośrodku:</h3>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Odległość od obecnej lokalizacji: {this.state.resortDetails.distance}km</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Długość geograficzna: {this.state.resortDetails.longitude}°</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Szerokość geograficzna: {this.state.resortDetails.latitude}°</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Liczba wyciągów: {this.state.resortDetails.liftCount}</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Liczba tras: {this.state.resortDetails.runCount}</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            {this.state.resortDetails.nightSkiing === true &&
                                <h4 title="Nocne jazdy możliwe" style={{ fontWeight: "bold" }}>Nocne jazdy: {this.state.resortDetails.nightSkiing} <TiLightbulb tooltip="Nocne jazdy możliwe"/></h4>
                            }
                            {this.state.resortDetails.nightSkiing === false &&
                                <h4 title="Brak nocnych jazd" style={{ fontWeight: "bold" }}>Nocne jazdy: {this.state.resortDetails.nightSkiing} <MdNotInterested tooltip="Brak nocnych jazd"/></h4>
                            }
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            {this.state.resortDetails.terrainPark === true &&
                                <h4 title="Jazda terenowa dostępna" style={{ fontWeight: "bold" }}>Jazdy terenowe: {this.state.resortDetails.terrainPark} <FaMountain tooltip="Jazda terenowa dostępna"/></h4>
                            }
                            {this.state.resortDetails.terrainPark === false &&
                                <h4 title="Brak jazd terenowych" style={{ fontWeight: "bold" }}>Jazdy terenowe: {this.state.resortDetails.terrainPark} <MdNotInterested tooltip="Brak jazd terenowych"/></h4>
                            }
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Region: {this.state.resortDetails.region}</h4>
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={9} stretched style={{padding: 5, paddingLeft: 50}}>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h3 style={{ fontWeight: "bold" }}>Warunki pogodowe: </h3>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Temperatura: {this.state.resortDetails.temperature}℃</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Temperatura odczuwalna: {this.state.resortDetails.sensedTemperature}℃</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Grubość pokrywy śnieżnej: {this.state.resortDetails.snowThickness}cm</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Prędkość wiatru: {this.state.resortDetails.windSpeed}m/s</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Wilgotność: {this.state.resortDetails.humidity}%</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>Zachmurzenie: {this.state.resortDetails.clouds}%</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}><h4 style={{ fontWeight: "bold", color: "white" }}>&nbsp;</h4></GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 5}}>
                            <h4 style={{ fontStyle: "italic", fontWeight: "bold" }}>Ostatnia aktualizacja: {this.state.lastChange}</h4>
                        </GridColumn>
                    </GridRow>
                </GridRow>
                <GridRow columns={2} stretched style={{padding: 5, paddingLeft: 50, paddingTop: 0}}>
                    <GridRow columns={6} stretched style={{padding: 5}}>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h3 style={{ fontWeight: "bold" }}>Oceny: </h3>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[0].ratingCategoryName}</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[1].ratingCategoryName}</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[2].ratingCategoryName}</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[3].ratingCategoryName}</h4>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[4].ratingCategoryName}</h4>
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={6} stretched style={{padding: 5, paddingLeft: 30}}>
                        <GridColumn floated="left" textAlign="left">
                            <h3 style={{ fontWeight: "bold" }}>&nbsp;</h3>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left">
                            <StarRatings
                                rating={this.state.avgRat1}
                                starRatedColor={Colors.primary}
                                numberOfStars={5}
                                starSpacing="5px"
                                starDimension="40px"/>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left">
                            <StarRatings
                                rating={this.state.avgRat2}
                                starRatedColor={Colors.primary}
                                numberOfStars={5}
                                starSpacing="5px"
                                starDimension="40px"/>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left">
                            <StarRatings
                                rating={this.state.avgRat3}
                                starRatedColor={Colors.primary}
                                numberOfStars={5}
                                starSpacing="5px"
                                starDimension="40px"/>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left">
                            <StarRatings
                                rating={this.state.avgRat4}
                                starRatedColor={Colors.primary}
                                numberOfStars={5}
                                starSpacing="5px"
                                starDimension="40px"/>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left">
                            <StarRatings
                                rating={this.state.avgRat5}
                                starRatedColor={Colors.primary}
                                numberOfStars={5}
                                starSpacing="5px"
                                starDimension="40px"/>
                        </GridColumn>
                    </GridRow>
                </GridRow>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50, paddingTop: 0}}>
                    <GridRow columns={1} stretched style={{padding: 5}}>
                        <GridColumn floated="left" textAlign="left" style={{padding: 5}}>
                            <h3 style={{ fontWeight: "bold" }}>Mapa tras: </h3>
                        </GridColumn>
                        <GridColumn floated="left" textAlign="left" style={{padding: 15}}>
                            { this.state.resortImageLink === null ? 
                            (
                                <h3 style={{ fontWeight: "bold" }}>Brak mapy tras dla tego ośrodka</h3>
                            ) : (
                            <Image
                                fluid
                                bordered
                                rounded
                                centered
                                src={this.state.resortImageLink}/>
                            )}
                        </GridColumn>
                    </GridRow>
                </GridRow>
                <GridRow columns={1} stretched style={{padding: 5, paddingLeft: 50, paddingTop: 0}}>
                    <GridRow columns={1} stretched textAlign="center" style={{padding: 5}}>
                        <div xmlns="http://creativecommons.org/ns#" about="https://skimap.org/"><a rel="cc:attributionURL" property="cc:attributionName" href="https://skimap.org/">
                        Maps provided by Skimap.org</a> / <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/us/">CC BY-NC-SA 3.0</a></div>
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

export default withRouter(ResortView);
import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ResortService from "../../services/resort.service";
import RatingService from "../../services/rating.service";
import { Form } from "antd";
import { GridColumn, GridRow, Grid, Segment, Button, Container } from "semantic-ui-react";
import { Colors } from "../../constants";
import { notification } from "antd";
import StarRatings from 'react-star-ratings';
import LoadingIndicator from "../../common/LoadingIndicator";
const FormItem = Form.Item;

export default class GradeResort extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";
    
    this.submitGrade = this.submitGrade.bind(this);

    this.state = {
      category1: 3,
      category2: 3,
      category3: 3,
      category4: 3,
      category5: 3,
      resortDetails: null,
      ratings: null
    };
  }

  componentDidMount() {
    this.setState({
        resortDetails: this.props.location.state.resortDetails
    });

    this.getRatings().then(ratings => { this.setState({
        ratings: ratings.data
      })})
  }

  getRatings() {
    return RatingService.getRatings();
  }

  goBack() {
      this.props.history.goBack();
  }

  submitGrade(e) {
    e.preventDefault();

    var resortGradeRequest = {
        resortId: this.state.resortDetails.resortId,
        category1: this.state.category1,
        category2: this.state.category2,
        category3: this.state.category3,
        category4: this.state.category4,
        category5: this.state.category5
    }
    
    ResortService.submitGrade(
      resortGradeRequest,
      AuthService.getCurrentUser().username
    )
    .then(
      () => {
        notification.success({
          message: "Oceniono!",
          description:
              "Udana próba ocenienia ośrodka!",
        });

        this.props.history.push({
            pathname: `../resortView/${this.state.resortDetails.resortId}`,
            state: { resortDetails: this.state.resortDetails }
          })
    })
    .catch((error) => {
      notification.error({
          message: "Ocena nieudana!",
          description:
              "Nieudana próba ocenienia ośrodka!",
      });
    });
  }

  render() {
    if(this.state.resortDetails === null || this.state.ratings === null) {
        return <LoadingIndicator/>
    } else {
        return (
        <Grid textAlign="center">
            <Grid.Column mobile={12} tablet={10} computer={9}>
            <Segment padded>
                <Container>
                    <Form onSubmit={this.onSubmit} autoComplete="off">
                        <Grid.Column>
                            <h2 title="Rejestracja" style={{ fontWeight: "bold", textAlign: "center", marginBottom: 30 }}>Ocena ośrodka {this.state.resortDetails.resortName}</h2>
                        </Grid.Column>
                        <Grid columns="equal">
                            <GridRow columns={2} stretched style={{padding: 5, paddingLeft: 50, paddingTop: 0}}>
                                <GridRow columns={1} stretched style={{padding: 5}}>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5, paddingTop: 25}}>
                                        <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[0].ratingCategoryName}</h4>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5, paddingTop: 25}}>
                                        <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[1].ratingCategoryName}</h4>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5, paddingTop: 25}}>
                                        <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[2].ratingCategoryName}</h4>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5, paddingTop: 25}}>
                                        <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[3].ratingCategoryName}</h4>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5, paddingTop: 25}}>
                                        <h4 style={{ fontWeight: "bold" }}>{this.state.ratings[4].ratingCategoryName}</h4>
                                    </GridColumn>
                                </GridRow>
                                <GridRow columns={1} stretched style={{padding: 5}}>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5}}>
                                        <FormItem
                                            style={{margin: 5}}
                                            autoComplete="off">
                                                <StarRatings
                                                    rating={this.state.category1}
                                                    starRatedColor={Colors.primary}
                                                    starHoverColor={Colors.primary}
                                                    changeRating={(rating) => {
                                                        this.setState({
                                                            'category1': rating
                                                        });
                                                    }}
                                                    numberOfStars={5}
                                                    starSpacing="5px"
                                                    starDimension="40px"
                                                    name='category1'
                                                    />
                                        </FormItem>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5}}>
                                        <FormItem
                                            style={{margin: 5}}
                                            autoComplete="off">
                                                <StarRatings
                                                    rating={this.state.category2}
                                                    starRatedColor={Colors.primary}
                                                    starHoverColor={Colors.primary}
                                                    changeRating={(rating) => {
                                                        this.setState({
                                                            'category2': rating
                                                        });
                                                    }}
                                                    numberOfStars={5}
                                                    starSpacing="5px"
                                                    starDimension="40px"
                                                    name='category2'
                                                    />
                                        </FormItem>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5}}>
                                        <FormItem
                                            style={{margin: 5}}
                                            autoComplete="off">
                                                <StarRatings
                                                    rating={this.state.category3}
                                                    starRatedColor={Colors.primary}
                                                    starHoverColor={Colors.primary}
                                                    changeRating={(rating) => {
                                                        this.setState({
                                                            'category3': rating
                                                        });
                                                    }}
                                                    numberOfStars={5}
                                                    starSpacing="5px"
                                                    starDimension="40px"
                                                    name='category3'
                                                    />
                                        </FormItem>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5}}>
                                        <FormItem
                                            style={{margin: 5}}
                                            autoComplete="off">
                                                <StarRatings
                                                    rating={this.state.category4}
                                                    starRatedColor={Colors.primary}
                                                    starHoverColor={Colors.primary}
                                                    changeRating={(rating) => {
                                                        this.setState({
                                                            'category4': rating
                                                        });
                                                    }}
                                                    numberOfStars={5}
                                                    starSpacing="5px"
                                                    starDimension="40px"
                                                    name='category4'
                                                    />
                                        </FormItem>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 5}}>
                                        <FormItem
                                            style={{margin: 5}}
                                            autoComplete="off">
                                                <StarRatings
                                                    rating={this.state.category5}
                                                    starRatedColor={Colors.primary}
                                                    starHoverColor={Colors.primary}
                                                    changeRating={(rating) => {
                                                        this.setState({
                                                            'category5': rating
                                                        });
                                                    }}
                                                    numberOfStars={5}
                                                    starSpacing="5px"
                                                    starDimension="40px"
                                                    name='category5'
                                                    />
                                        </FormItem>
                                    </GridColumn>
                                </GridRow>
                            </GridRow>
                        </Grid>
                        <FormItem style={{ marginBottom: 1, marginTop: 20 }}>
                            <GridRow columns={2} textAlign="center" verticalAlign="middle" centered stretched style={{padding: 5}}>
                                <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingBottom: 15, paddingLeft: 20}}>
                                    <Button id="goBack" basic style={{ width: 200, backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginBottom: 5 }} size="small" onClick={() => this.goBack()}>
                                        Powrót
                                    </Button>
                                </GridColumn>
                                <GridColumn floated="right" textAlign="right" style={{padding: 5, paddingBottom: 15, paddingRight: 20}}>
                                    <Button
                                        size="small"
                                        onClick={this.submitGrade}
                                        style={{ width: 200, backgroundColor: Colors.primary, color: Colors.background }}>
                                        Oceń ośrodek
                                    </Button>
                                </GridColumn>
                            </GridRow>
                        </FormItem>
                    </Form>
                </Container>
            </Segment>
            </Grid.Column>
        </Grid>
        );
        }
    }   
}
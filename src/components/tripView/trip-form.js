import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ResortService from "../../services/resort.service";
import TripService from "../../services/trip.service";
import { validation } from "../../common/validation-rules";
import { Input, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Grid, Segment, Button, Container, GridRow, GridColumn } from "semantic-ui-react";
import { Colors } from "../../constants";
import { notification } from "antd";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import LoadingIndicator from "../../common/LoadingIndicator";
const FormItem = Form.Item;

export default class TripForm extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";

    this.state = {
        isEditionForm: null,
        duration: {
            value: '',
            validateStatus: ''
        },
        dateTime: '',
        description: {
            value: '',
            validateStatus: ''
        },
        chosenResortId: '',
        resorts: null
    };

    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.tripId === undefined) {
        this.setState({
            isEditionForm: false
        });
    } else {
        this.setState({
            isEditionForm: true,
            latitude: 0,
            longitude: 0,
            chosenResortId: this.props.location.state.resort.resortId,
            duration: {
                value: this.props.location.state.trip.daysNumber,
                validateStatus: ''
            },
            description: {
                value: this.props.location.state.trip.description,
                validateStatus: ''
            },
            dateTime: this.props.location.state.trip.tripDate.toString().substring(0, 10) + ' ' + this.props.location.state.trip.tripDate.toString().substring(11, 16)
        });
    }

    navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          this.getClosestResorts(
            this.state.latitude,
            this.state.longitude
          );
        },
        error => console.log(error)
      );
  }

  resortInList(resort, resorts) {
      for(let i = 0; i < resorts.length; i++) {
          if(resort.resortId === resorts[i].resortId) {
              return true;
          }
      }
      return false;
  }

  getClosestResorts(latitude, longitude) {
    ResortService
      .getClosestResorts(latitude, longitude)
      .then((response) => {
        var resorts = response.data.content;
        if(this.props.location.state !== undefined && !this.resortInList(this.props.location.state.resort, resorts)) {
            resorts.push(this.props.location.state.resort);
        }
        this.setState({ resorts: resorts });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  onChange(event, validationFunction) {
    const target = event.target;
    const inputValue = target.value;
    const inputName = target.name;

    this.setState({
        [inputName]: {
            value: inputValue,
            ...validationFunction(inputValue),
        },
    })
  }
  
  onChangeSelect(event, validationFunction) {
    const target = event.target;
    const inputValue = target.value;
    const inputName = target.name;

    this.setState({
        [inputName]: inputValue
    })
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmitAdd(e) {
    e.preventDefault();

    var tripObject = {
        daysNumber: this.state.duration.value,
        dateTime: this.state.dateTime.toString().substring(0, 10) + "T" + this.state.dateTime.toString().substring(11, 16) + ":00",
        description: this.state.description.value,
        resortId: this.state.chosenResortId
    }

  TripService.createTrip(
    tripObject,
    AuthService.getCurrentUser().username
  )
  .then(
    () => {
      notification.success({
        message: "Stworzono wyjazd!",
        description:
            "Udane stworzenie wyjazdu!",
      });

      this.props.history.push(`../news`);
  })
  .catch((error) => {
    notification.error({
        message: "Tworzenie wyjazdu nieudane!",
        description:
            "Nieudane stworzenie wyjazdu!",
    });
  });
  }

  handleSubmitEdit(e) {
        e.preventDefault();

        var tripObject = {
            daysNumber: this.state.duration.value,
            dateTime: this.state.dateTime.toString().substring(0, 10) + "T" + this.state.dateTime.toString().substring(11, 16) + ":00",
            description: this.state.description.value,
            resortId: this.state.chosenResortId,
            tripId: this.props.match.params.tripId
        }
    
      TripService.updateTrip(
        tripObject,
        AuthService.getCurrentUser().username
      )
      .then(
        () => {
          notification.success({
            message: "Zmieniono dane!",
            description:
                "Udana zmiana danych wyjazdu!",
          });
  
          this.props.history.push(`../news`);
      })
      .catch((error) => {
        notification.error({
            message: "Zmiana danych nieudana!",
            description:
                "Nieudana zmiana danych wyjazdu!",
        });
      });
  }

  goBack() {
      this.props.history.goBack();
  }

  isFormInvalid() {
    if(this.state.duration.validateStatus === "error" || this.state.description.validateStatus === "error" || this.state.chosenResortId === "") {
        return true;
    }

    return false;
  }

  render() {
    if(this.state.isEditionForm === null || this.state.duration === null || this.state.dateTime === null || this.state.description === null || this.state.resorts === null) {
        return <LoadingIndicator/>
    } else {
        return (
        <Grid textAlign="center">
            <Grid.Column mobile={12} tablet={10} computer={9}>
                <Segment id="segmentId" padded>
                    <Container>
                        <Form autoComplete="off">
                            <Grid.Column>
                                {this.state.isEditionForm === true && (
                                    <h2 style={{ fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>Edycja wyjazdu</h2>
                                )}
                                {this.state.isEditionForm === false && (
                                    <h2 style={{ fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>Tworzenie wyjazdu</h2>
                                )}
                            </Grid.Column>
                            <FormItem 
                                hasFeedback
                                autoComplete="off">
                                <Select
                                    style={{ width: '100%' }}
                                    value={this.state.chosenResortId}
                                    name="chosenResortId"
                                    onChange={(event) => {
                                        this.onChangeSelect(
                                            event,
                                            validation.validateSuccess
                                        );
                                    }}
                                >
                                    {this.state.resorts
                                        .map((resort) => (
                                            <MenuItem id={resort.resortId} key={resort.resortId} value={resort.resortId}>{resort.resortName}</MenuItem>
                                        ))}
                                </Select>
                                <FormHelperText>Ośrodek narciarski</FormHelperText>
                            </FormItem>
                            <FormItem
                                hasFeedback
                                autoComplete="off"
                                help={this.state.duration.errorMsg}>
                                <Input
                                    style={{ textAlign: 'right', width: '100%' }}
                                    type="number"
                                    autoComplete="off"
                                    name="duration"
                                    value={this.state.duration.value}
                                    placeholder="Czas trwania wyjazdu  "
                                    onChange={(duration) => {
                                        this.onChange(
                                            duration,
                                            validation.validateNumberGreater
                                        );
                                    }}/>
                            </FormItem>
                            <FormItem
                                hasFeedback
                                autoComplete="off">
                                <DateTimeInput
                                    style={{ width: '100%' }}
                                    name="dateTime"
                                    startMode="year"
                                    initialDate={new Date()}
                                    clearable={true}
                                    dateFormat="YYYY-MM-DD"
                                    placeholder="Data i godzina wyjazdu"
                                    iconPosition='left'
                                    value={this.state.dateTime}
                                    onChange={this.handleChange}
                                />
                            </FormItem>
                            <FormItem
                                hasFeedback
                                autoComplete="off"
                                help={this.state.description.errorMsg}>
                                <TextArea
                                    autoComplete="off"
                                    rows="3"
                                    name="description"
                                    value={this.state.description.value}
                                    placeholder="Opis"
                                    onChange={(description) => {
                                        this.onChange(
                                            description,
                                            validation.validateDescription
                                        );
                                    }}/>
                            </FormItem>
                            <FormItem style={{ marginBottom: 6 }}>
                                {this.state.isEditionForm === true && (
                                    <GridRow columns={2} textAlign="center" verticalAlign="middle" centered stretched style={{padding: 5}}>
                                        <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingBottom: 15, paddingLeft: 20}}>
                                            <Button id="goBack" basic style={{ width: 200, backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginBottom: 5 }} size="small" onClick={() => this.goBack()}>
                                                Powrót
                                            </Button>
                                        </GridColumn>
                                        <GridColumn floated="right" textAlign="right" style={{padding: 5, paddingBottom: 15, paddingRight: 20}}>
                                            <Button
                                                disabled={this.isFormInvalid()}
                                                size="small"
                                                onClick={this.handleSubmitEdit}
                                                style={{ width: 200, backgroundColor: Colors.primary, color: Colors.background }}>
                                                Zaktualizuj wyjazd
                                            </Button>
                                        </GridColumn>
                                    </GridRow>
                                )}
                                {this.state.isEditionForm === false && (
                                <GridRow columns={2} textAlign="center" verticalAlign="middle" centered stretched style={{padding: 5}}>
                                    <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingBottom: 15, paddingLeft: 20}}>
                                        <Button id="goBack" basic style={{ width: 200, backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginBottom: 5 }} size="small" onClick={() => this.goBack()}>
                                            Powrót
                                        </Button>
                                    </GridColumn>
                                    <GridColumn floated="right" textAlign="right" style={{padding: 5, paddingBottom: 15, paddingRight: 20}}>
                                        <Button
                                            disabled={this.isFormInvalid()}
                                            size="small"
                                            onClick={this.handleSubmitAdd}
                                            style={{ width: 200, backgroundColor: Colors.primary, color: Colors.background }}>
                                            Stwórz wyjazd
                                        </Button>
                                    </GridColumn>
                                </GridRow>
                                )}
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
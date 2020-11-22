import React, { Component } from "react";
import ResortService from "../../services/resort.service";
import { validation } from "../../common/validation-rules";
import { Input, Form, Checkbox } from "antd";
import { Grid, Segment, Button, Container, GridColumn, GridRow } from "semantic-ui-react";
import { Colors } from "../../constants";
import { notification } from "antd";
import LoadingIndicator from "../../common/LoadingIndicator";
import { FaSkiing, FaSnowboarding } from 'react-icons/fa';
const FormItem = Form.Item;

export default class ResortForm extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";

    this.state = {
        resortName: {
            value: '',
            validateStatus: ''
        },
        runCount: {
            value: '',
            validateStatus: ''
        },
        liftCount: {
            value: '',
            validateStatus: ''
        },
        terrainPark: '',
        nightSkiing: ''
    };
    this.handleEditResort = this.handleEditResort.bind(this);
    this.toggleTerrainPark = this.toggleTerrainPark.bind(this);
    this.toggleNightSkiing = this.toggleNightSkiing.bind(this);
  }

  componentDidMount() {
    this.setState({
        resortName: {
            value: this.props.location.state.resort.resortName,
            validateStatus: ''
        },
        runCount: {
            value: this.props.location.state.resort.runCount,
            validateStatus: ''
        },
        liftCount: {
            value: this.props.location.state.resort.liftCount,
            validateStatus: ''
        },
        terrainPark: this.props.location.state.resort.terrainPark,
        nightSkiing: this.props.location.state.resort.nightSkiing
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

  toggleTerrainPark() {
    var actualValue = this.state.terrainPark;

    this.setState({
        terrainPark: !actualValue
    });
  }

  toggleNightSkiing() {
    var actualValue = this.state.nightSkiing;

    this.setState({
        nightSkiing: !actualValue
    });
  }

  goBack() {
      this.props.history.goBack();
  }

  handleEditResort(e) {
    e.preventDefault();

    var resortObject = {
        resortName: this.state.resortName.value,
        runCount: this.state.runCount.value,
        liftCount: this.state.liftCount.value,
        terrainPark: this.state.terrainPark,
        nightSkiing: this.state.nightSkiing,
        resortId: this.props.location.state.resort.resortId
    }

  ResortService.editResort(
    resortObject
  )
  .then(
    () => {
      notification.success({
        message: "Zmieniono dane ośrodka!",
        description:
            "Dane ośrodka narciarskiego zostały zmienione!",
      });

      this.props.history.push(`../resorts`);
  })
  .catch((error) => {
    notification.error({
        message: "Nieudana zmiana danych ośrodka!",
        description:
            "Dane ośrodka narciarskiego nie zostały zmienione!",
    });
  });
  }

  isFormInvalid() {
    if(this.state.resortName.validateStatus === "error" || this.state.runCount.validateStatus === "error" || this.state.liftCount.validateStatus === "error") {
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
            <Grid.Column mobile={12} tablet={10} computer={8}>
                <Segment id="segmentId" padded>
                    <Container>
                        <Form autoComplete="off">
                            <Grid.Column>
                                <h2 style={{ fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>Edycja ośrodka</h2>
                            </Grid.Column>
                            <FormItem
                                style={{ marginBottom: 10 }}
                                hasFeedback
                                autoComplete="off"
                                help={this.state.resortName.errorMsg}>
                                <label style={{ textAlign: 'left', margin: 0, marginBottom: 5 }}>Nazwa ośrodka narciarskiego</label>
                                <Input
                                    autoComplete="off"
                                    name="resortName"
                                    value={this.state.resortName.value}
                                    placeholder="Nazwa ośrodka narciarskiego"
                                    onChange={(resortName) => {
                                        this.onChange(
                                            resortName,
                                            validation.validateDescription
                                        );
                                    }}/>
                            </FormItem>
                            <FormItem
                                style={{ marginBottom: 10 }}
                                hasFeedback
                                autoComplete="off"
                                help={this.state.runCount.errorMsg}>
                                <label style={{ textAlign: 'left', margin: 0, marginBottom: 5 }}>Liczba tras zjazdowych</label>
                                <Input
                                    style={{ textAlign: 'right', width: '100%' }}
                                    type="number"
                                    autoComplete="off"
                                    name="runCount"
                                    value={this.state.runCount.value}
                                    placeholder="Liczba tras zjazdowych  "
                                    onChange={(runCount) => {
                                        this.onChange(
                                            runCount,
                                            validation.validateNumberGreater
                                        );
                                    }}/>
                            </FormItem>
                            <FormItem
                                style={{ marginBottom: 10 }}
                                hasFeedback
                                autoComplete="off"
                                help={this.state.liftCount.errorMsg}>
                                <label style={{ textAlign: 'left', margin: 0, marginBottom: 5 }}>Liczba wyciągów</label>
                                <Input
                                    style={{ textAlign: 'right', width: '100%' }}
                                    type="number"
                                    autoComplete="off"
                                    name="liftCount"
                                    value={this.state.liftCount.value}
                                    placeholder="Liczba wyciągów  "
                                    onChange={(liftCount) => {
                                        this.onChange(
                                            liftCount,
                                            validation.validateNumberGreater
                                        );
                                    }}/>
                            </FormItem>
                            <Grid columns="equal" textAlign="left">
                                <GridRow columns={2} verticalAlign="middle" centered stretched style={{paddingBottom: 10, padding: 5, marginTop: 10}}>
                                    <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingLeft: 11}}>
                                        <FormItem autoComplete="off">
                                            <Checkbox onChange={this.toggleTerrainPark} name="terrainPark" checked={this.state.terrainPark}>Ski Park <FaSnowboarding/></Checkbox>
                                        </FormItem>
                                    </GridColumn>
                                    <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingLeft: 11}}>
                                        <FormItem autoComplete="off">
                                            <Checkbox onChange={this.toggleNightSkiing} name="nightSkiing" checked={this.state.nightSkiing}>Nocne jazdy <FaSkiing/></Checkbox>
                                        </FormItem>  
                                    </GridColumn>
                                </GridRow>
                            </Grid>
                            <FormItem style={{ marginBottom: 6 }}>
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
                                            onClick={this.handleEditResort}
                                            style={{ width: 200, backgroundColor: Colors.primary, color: Colors.background }}>
                                            Zaktualizuj dane ośrodka
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
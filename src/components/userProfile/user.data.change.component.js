import React, { Component } from "react";
import UserService from "../../services/user.service";
import { validation } from "../../common/validation-rules";
import { Input, Form, Checkbox } from "antd";
import { Grid, Segment, Button, Container } from "semantic-ui-react";
import { Colors } from "../../constants";
import { notification } from "antd";
import { FaSkiing, FaSnowboarding } from 'react-icons/fa';
import { IoIosPerson } from 'react-icons/io';
import TextArea from "antd/lib/input/TextArea";
const FormItem = Form.Item;

export default class UserDataChange extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";
    
    this.handleDataChange = this.handleDataChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleSkiing = this.toggleSkiing.bind(this);
    this.toggleSnowboarding = this.toggleSnowboarding.bind(this);

    this.state = {
      username: {
        value: '',
        validateStatus: ""
      },
      email: {
        value: '',
        validateStatus: ""
      },
      name: {
        value: '',
        validateStatus: ""
      },
      surname: {
        value: '',
        validateStatus: ""
      },
      phoneNumber: {
        value: '',
        validateStatus: ""
      },
      description: {
        value: '',
        validateStatus: ""
      },
      skiing: false,
      snowboarding: false
    };
  }

  componentDidMount() {
    var usernameObj = {
        value: this.props.location.state.userData.username,
        validateStatus: ""
    }

    var emailObj = {
        value: this.props.location.state.userData.email,
        validateStatus: ""
    }

    var nameObj = {
        value: this.props.location.state.userData.name,
        validateStatus: ""
    }

    var surnameObj = {
        value: this.props.location.state.userData.surname,
        validateStatus: ""
    }

    var phoneNumberObj = {
        value: this.props.location.state.userData.phoneNumber,
        validateStatus: ""
    }

    var descriptionObj = {
        value: this.props.location.state.userData.description,
        validateStatus: ""
    }

    this.setState(() => ({
        username: usernameObj,
        email: emailObj,
        name: nameObj,
        surname: surnameObj,
        phoneNumber: phoneNumberObj,
        description: descriptionObj,
        skiing: this.props.location.state.userData.skier,
        snowboarding: this.props.location.state.userData.snowboarder
      })
    );
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

  toggleSkiing() {
    var actualValue = this.state.skiing;

    this.setState({
      skiing: !actualValue
    });
  }

  toggleSnowboarding() {
    var actualValue = this.state.snowboarding;

    this.setState({
      snowboarding: !actualValue
    });
  }

  isFormInvalid() {
    if(this.state.username.validateStatus === "error" || this.state.email.validateStatus === "error" || this.state.name.validateStatus === "error"
    || this.state.surname.validateStatus === "error" || this.state.phoneNumber.validateStatus === "error" || this.state.description.validateStatus === "error") {
        return true;
    }

    return false;
  }

  handleDataChange(e) {
    e.preventDefault();

    var userDataRequest= {
        username: this.state.username.value,
        email: this.state.email.value,
        name: this.state.name.value,
        surname: this.state.surname.value,
        phoneNumber: this.state.phoneNumber.value,
        description: this.state.description.value,
        skiing: this.state.skiing,
        snowboarding: this.state.snowboarding
    }
    
    UserService.updateUserData(
      userDataRequest,
      this.state.username.value
    )
    .then(
      () => {
        notification.success({
          message: "Zmieniono dane!",
          description:
              "Udana zmiana danych użytkownika!",
        });

        this.props.history.push(`../profile`);
    })
    .catch((error) => {
      notification.error({
          message: "Zmiana danych nieudana!",
          description:
              "Nieudana zmiana danych użytkownika!",
      });
    });
  }

  render() {
    return (
      <Grid textAlign="center">
        <Grid.Column mobile={12} tablet={9} computer={6}>
          <Segment padded>
              <Container>
                  <Form onSubmit={this.onSubmit} autoComplete="off">
                      <Grid.Column>
                          <h4 title="Zmiana danych" style={{ fontWeight: "bold", textAlign: "center", paddingBottom: 20 }}><IoIosPerson size="100px" tooltip="Zmiana danych"/></h4>
                      </Grid.Column>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.username.validateStatus}
                          help={this.state.username.errorMsg}>
                          <Input
                              autoComplete="off"
                              disabled
                              name="username"
                              value={this.state.username.value}
                              placeholder="Nazwa użytkownika"
                              onChange={(username) => {
                                  this.onChange(
                                      username,
                                      validation.validateUsername
                                  );
                              }}/>
                      </FormItem>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.email.validateStatus}
                          help={this.state.email.errorMsg}>
                          <Input
                              autoComplete="off"
                              name="email"
                              value={this.state.email.value}
                              placeholder="Email"
                              onChange={(email) => {
                                  this.onChange(
                                    email,
                                      validation.validateEmail
                                  );
                              }}/>
                      </FormItem>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.name.validateStatus}
                          help={this.state.name.errorMsg}>
                          <Input
                              autoComplete="off"
                              name="name"
                              value={this.state.name.value}
                              placeholder="Imię"
                              onChange={(name) => {
                                  this.onChange(
                                      name,
                                      validation.validateName
                                  );
                              }}/>
                      </FormItem>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.surname.validateStatus}
                          help={this.state.surname.errorMsg}>
                          <Input
                              autoComplete="off"
                              name="surname"
                              value={this.state.surname.value}
                              placeholder="Nazwisko"
                              onChange={(surname) => {
                                  this.onChange(
                                      surname,
                                      validation.validateSurname
                                  );
                              }}/>
                      </FormItem>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.phoneNumber.validateStatus}
                          help={this.state.phoneNumber.errorMsg}>
                          <Input
                              autoComplete="off"
                              name="phoneNumber"
                              value={this.state.phoneNumber.value}
                              placeholder="Numer telefonu"
                              onChange={(phoneNumber) => {
                                  this.onChange(
                                      phoneNumber,
                                      validation.validatePhoneNumber
                                  );
                              }}/>
                      </FormItem>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.description.validateStatus}
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
                      <Grid textAlign="left">
                        <FormItem autoComplete="off" style={{ marginBottom: 6 }}>
                          <Checkbox onChange={this.toggleSnowboarding} name="snowboarding" checked={this.state.snowboarding}>Umiejętność jeżdżenia na snowboardzie <FaSnowboarding/></Checkbox>
                        </FormItem>  
                        <FormItem autoComplete="off" style={{ marginBottom: 26 }}>
                          <Checkbox onChange={this.toggleSkiing} name="skiing" checked={this.state.skiing}>Umiejętność jeżdżenia na nartach <FaSkiing/></Checkbox>
                        </FormItem>  
                      </Grid>
                      <FormItem style={{ marginBottom: 6 }}>
                          <Button
                              disabled={this.isFormInvalid()}
                              size="small"
                              onClick={this.handleDataChange}
                              style={{ backgroundColor: Colors.primary, color: Colors.background }}>
                              Zmień dane
                          </Button>
                      </FormItem>
                  </Form>
              </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
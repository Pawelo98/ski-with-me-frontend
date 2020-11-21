import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import { validation } from "../../common/validation-rules";
import { Input, Form } from "antd";
import { Grid, Segment, Button, Container } from "semantic-ui-react";
import { Colors } from "../../constants";
import { notification } from "antd";
import { IoIosPerson } from 'react-icons/io';
const FormItem = Form.Item;

export default class Login extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";
    
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      username: {
        value: '',
        validateStatus: ""
      },
      password: {
        value: '',
        validateStatus: ""
      },
      loading: false
    };
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

  isFormInvalid() {
    if(this.state.password.value === "" || this.state.username.value === "") {
        return true;
    }
    return false;
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true
    });

    AuthService.login(this.state.username.value, this.state.password.value)
    .then(
      () => {
        notification.success({
          message: "Zalogowano!",
          description:
              "Udana próba logowania!",
        });

        this.props.history.push("/profile");
        window.location.reload();
    })
    .catch((error) => {
      notification.error({
          message: "Logowanie nieudane!",
          description:
              "Nieudana próba logowania!",
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
                          {/* <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="start-img" style={{ textAlign: "center", padding: 20, paddingBottom: 30 }}/> */}
                          <h4 title="Logowanie" style={{ fontWeight: "bold", textAlign: "center", paddingBottom: 20 }}><IoIosPerson size="100px" tooltip="Logowanie"/></h4>
                      </Grid.Column>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.username.validateStatus}
                          help={this.state.username.errorMsg}>
                          <Input
                              autoComplete="off"
                              name="username"
                              value={this.state.username.value}
                              placeholder="Nazwa użytkownika"
                              onChange={(username) => {
                                  this.onChange(
                                      username,
                                      validation.validateNotBlank
                                  );
                              }}/>
                      </FormItem>
                      <FormItem
                          hasFeedback
                          autoComplete="off"
                          validateStatus={this.state.password.validateStatus}
                          help={this.state.password.errorMsg}>
                          <Input
                              autoComplete="off"
                              name="password"
                              type="password"
                              value={this.state.password.value}
                              placeholder="Hasło"
                              onChange={(password) => {
                                  this.onChange(
                                      password,
                                      validation.validateNotBlank
                                  );
                              }}/>
                      </FormItem>
                      <FormItem style={{ marginBottom: 6 }}>
                          <Button
                              disabled={this.isFormInvalid()}
                              size="small"
                              onClick={this.handleLogin}
                              style={{ backgroundColor: Colors.primary, color: Colors.background }}>
                              Zaloguj
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
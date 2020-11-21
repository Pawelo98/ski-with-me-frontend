import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Grid, Segment, Button, Container } from "semantic-ui-react";
import { Colors } from "../../constants";
import { notification } from "antd";
import { validation } from "../../common/validation-rules";
import { Input, Form } from "antd";
const FormItem = Form.Item;

export default class PasswordChange extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";

    this.state = {
      currentUser: '',
      password: {
        value: '',
        validateStatus: "error"
      },
      passwordConfirmation: {
        value: '',
        validateStatus: "error"
      },
      oldPassword: {
        value: '',
        validateStatus: "error"
      }
    };
    
    this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleGoBack() {
    this.props.history.push(`../profile`);
  }

  handleSubmit() {
    const passwordChangeRequest = {
        password: this.state.password.value,
        oldPassword: this.state.oldPassword.value
    };

    UserService
        .changePassword(passwordChangeRequest, AuthService.getCurrentUser().username)
        .then((response) => {
            notification.success({
                message: "Hasło zostało zmienione!",
                description:
                    "Udana zmiana hasła!",
            });

            this.props.history.push(`../profile`);
        })
        .catch((error) => {
            notification.error({
                message: "Nieudana zmiana hasła!",
                description:
                    "Podano niepoprawne hasło!",
            });
        });
    }

    onChange (event, validationFunction) {
        const target = event.target;
        const inputValue = target.value;
        const inputName = target.name;

        this.getCurrentUser(AuthService.getCurrentUser().username).then(user => { this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFunction(inputValue),
            },
        })

        if(inputName === "password") {
            const passwordConfirmation = {
                target: {
                  value: this.state.passwordConfirmation.value,
                  name: "passwordConfirmation",
                },
              };
            
            this.onChange(passwordConfirmation, this.validatePasswordConfirmation); 
        }
    })
    }

    isFormInvalid() {
        if(!this.state.password === this.state.passwordConfirmation) {
            return true;
        }

        if(this.state.password.validateStatus === "error" || this.state.oldPassword.validateStatus === "error" || this.state.passwordConfirmation.validateStatus === "error") {
            return true;
        }

        return false;
    }

    validatePassword (password) {
        const pattern = new RegExp("[0-9]");
    
        if (password.length < 7) {
            return {
                validateStatus: "error",
                errorMsg: `Hasło jest zbyt krótkie, wymagane jest 7 znaków!`,
            };
        } else if (!pattern.test(password)) {
            return {
                validateStatus: "error",
                errorMsg: `Hasło powinno zawierać co najmniej jedną cyfrę!`,
            };
        } else {
            return {
                validateStatus: "success",
                errorMsg: null,
            };
        }
    }

    validatePasswordConfirmation(confirmPassword) {
        if (confirmPassword !== this.state.password.value) {
            return {
              validateStatus: "error",
              errorMsg: `Hasła się nie zgadzają!`,
            };
          }
          return {
            validateStatus: "success",
            errorMsg: null,
          };
      }

  componentDidMount() {
    this.getCurrentUser(AuthService.getCurrentUser().username).then(user => { this.setState({
      currentUser: user.data
    })});
  }

  getCurrentUser(username) {
    return UserService.getUserFromUsername(username);
  }

  render() {
      return (
        <Grid>
            <Grid.Column mobile={16} tablet={14} computer={12}>
                <Segment padded>
                    <Container text>
                        <Form onSubmit={this.onSubmit} autoComplete="off">
                            <Grid.Column>
                                <h3 style={{ fontWeight: "bold", color: Colors.primary, textAlign: "center", padding: 20 }}>Zmiana hasła </h3>
                            </Grid.Column>
                            <FormItem
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.state.oldPassword.validateStatus}
                                help={this.state.oldPassword.errorMsg}>
                                <Input
                                    autoComplete="off"
                                    name="oldPassword"
                                    type="password"
                                    value={this.state.oldPassword.value}
                                    placeholder="Stare hasło"
                                    onChange={(oldPassword) => {
                                        this.onChange(
                                            oldPassword,
                                            validation.validateSuccess
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
                                    placeholder="Nowe hasło"
                                    onChange={(password) => {
                                        this.onChange(
                                            password,
                                            this.validatePassword
                                        );
                                    }}/>
                            </FormItem>
                            <FormItem
                                hasFeedback
                                autoComplete="off"
                                validateStatus={this.state.passwordConfirmation.validateStatus}
                                help={this.state.passwordConfirmation.errorMsg}>
                                <Input
                                    autoComplete="off"
                                    name="passwordConfirmation"
                                    type="password"
                                    value={this.state.passwordConfirmation.value}
                                    placeholder="Potwierdź nowe hasło"
                                    onChange={(passwordConfirmation) => {
                                        this.onChange(
                                            passwordConfirmation,
                                            this.validatePasswordConfirmation
                                        );
                                    }}/>
                            </FormItem>
                            <FormItem style={{ marginBottom: 6 }}>
                                <Button
                                    floated="right"
                                    disabled={this.isFormInvalid()}
                                    size="small"
                                    onClick={this.handleSubmit}
                                    style={{ backgroundColor: Colors.primary, color: Colors.background }}>
                                    Zatwierdź
                                </Button>
                                <Button
                                    floated="right"
                                    size="small"
                                    basic
                                    onClick={this.handleGoBack}
                                    style={{ backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginRight: 15 }}>
                                    Powrót
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
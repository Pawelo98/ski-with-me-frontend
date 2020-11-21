import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Grid, Segment, List, Header, Form, Input, Button, Icon } from "semantic-ui-react";
import LoadingIndicator from "../../common/LoadingIndicator";
import { notification } from "antd";
import {Colors} from "../../constants";
import { FaUser } from 'react-icons/fa';

export default class Acquaintances extends Component {
    constructor(props) {
        super(props);
        
        document.title = "SkiWithMe";
    
        this.state = {
            username: AuthService.getCurrentUser().username,
            acquaintances: [],
            acquaintancesToAdd: null,
            usernameInput: "",
            isLoading: true
          };
      }
    
      componentDidMount() {
        this.getAcquaintances(this.state.username).then(acquaintances => { this.setState({
            acquaintances: acquaintances.data.userDTO
          })});

        this.getAcquaintancesToAdd(this.state.username, this.state.usernameInput);
      }
    
      getAcquaintances(username) {
        return UserService.getAcquaintancesFromUsername(username);
      }

      getAcquaintancesToAdd(username, usernameInput) {
        this.setState({ isLoading: true });
        UserService
          .getAcquaintancesToAddFromUsername(username, usernameInput)
          .then((response) => {
            this.setState({ acquaintancesToAdd: response.data.content });
            this.setState({ isLoading: false });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      onSubmit = () => {
          this.getAcquaintancesToAdd(AuthService.getCurrentUser().username, this.state.usernameInput);
      }

      onChangeUsername(event) {
        this.setState({
            usernameInput: event.target.value
        })
      }

      handleAddAcquaintance(username) {
        UserService
        .addAcquaintance(AuthService.getCurrentUser().username, username)
        .then((response) => {
            notification.success({
                message: "Znajomy został dodany!",
                description:
                    "Dodano znajomego o loginie " + username + "!",
            });
        })
        .then((response) => {
            this.getAcquaintances(this.state.username).then(acquaintances => { this.setState({
                acquaintances: acquaintances.data.userDTO
              })});

              this.getAcquaintancesToAdd(this.state.username, this.state.usernameInput);
        })
        .catch((error) => {
            notification.error({
                message: "Nie udało się dodać znajomego!",
                description:
                    "Użytkownik o loginie " + username + " nie został dodany do znajomych!",
            });
        });
      }

      handleDeleteAcquaintance(username) {
        UserService
        .deleteAcquaintance(AuthService.getCurrentUser().username, username)
        .then((response) => {
            notification.success({
                message: "Znajomy został usunięty!",
                description:
                    "Usunięto znajomego o loginie " + username + "!",
            });
        })
        .then((response) => {
            this.getAcquaintances(this.state.username).then(acquaintances => { this.setState({
                acquaintances: acquaintances.data.userDTO
              })});

              this.getAcquaintancesToAdd(this.state.username, this.state.usernameInput);
        })
        .catch((error) => {
            notification.error({
                message: "Nie udało się usunąć znajomego!",
                description:
                    "Użytkownik o loginie " + username + " nie został usunięty ze znajomych!",
            });
        });
      }
    
      render() {
        return (
            <Grid columns="equal" textAlign="center">
            <Grid.Column mobile={16} tablet={16} computer={14}>
              <Segment padded>
                <Header as="h2" style={{color: Colors.primary, paddingBottom: 25}}>
                    Znajomi
                </Header>
                <Grid columns="equal" textAlign="center">
                    <Grid.Row stretched columns={2}>
                        <Grid.Column textAlign="center" verticalAlign="middle" >
                            <Header as="h2">
                                Lista znajomych
                            </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle" >
                            <Header as="h2">
                                Szukaj znajomych
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched columns={2}>
                        <Grid.Column>
                            <React.Fragment>
                                <List divided verticalAlign="middle" size="huge">
                                    {this.state.acquaintances.length === 0 ? (
                                            <h3>Brak znajomych do wyświetlenia</h3>
                                        ) : (
                                        this.state.acquaintances.map((user) => (
                                            <Segment key={user.username}>
                                                <Grid textAlign="center">
                                                    <Grid.Row stretched columns={3}>
                                                        <Grid.Column style={{ marginRight: 10, marginLeft: 10 }} width="2" floated="left">
                                                            <FaUser size="30px"/>
                                                        </Grid.Column>
                                                        <Grid.Column textAlign="left" verticalAlign="middle">
                                                            <h3 style={{ margin: 5, marginBottom: 0 }}>{user.username}</h3>
                                                            <h4 style={{ margin: 5 }}>{user.email}</h4>
                                                        </Grid.Column>
                                                        <Grid.Column width="5" floated="right" style={{ height: 50 }}>
                                                            <Button
                                                                size="small"
                                                                onClick={() => this.handleDeleteAcquaintance(user.username)}
                                                                style={{ backgroundColor: '#ff5f57', color: Colors.background }}>
                                                                Usuń ze znajomych
                                                            </Button>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Segment>
                                        )))
                                    }
                                </List>
                            </React.Fragment>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle" >
                            <Form>
                                <Form.Field>
                                    <Input
                                        placeholder="Wpisz nazwę użytkownika"
                                        onChange={(user) => {
                                            this.onChangeUsername(user);
                                        }}
                                        name="usernameInput" />
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                    fluid
                                    animated
                                    style={{backgroundColor: Colors.primary}}
                                    onClick={this.onSubmit}
                                    loading={this.isLoading}>
                                        <Button.Content visible style={{color: Colors.background}}>Wyszukaj</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="search" />
                                        </Button.Content>
                                    </Button>
                                </Form.Field>
                            </Form>
                            {this.state.isLoading === true ? (
                            <LoadingIndicator />
                            ) : (
                            <React.Fragment>
                                <List divided verticalAlign="middle" size="huge">
                                {this.state.acquaintancesToAdd.length === 0 ? (
                                    <h3>Brak użytkowników o loginie z podanym ciągiem znaków</h3>
                                ) : (
                                this.state.acquaintancesToAdd.map((user) => (
                                    <Segment key={user.username}>
                                        <Grid textAlign="center">
                                            <Grid.Row stretched columns={3}>
                                                <Grid.Column style={{ marginRight: 10, marginLeft: 10 }} width="2" floated="left">
                                                    <FaUser size="30px"/>
                                                </Grid.Column>
                                                <Grid.Column textAlign="left" verticalAlign="middle">
                                                    <h3 style={{ margin: 5, marginBottom: 0 }}>{user.username}</h3>
                                                    <h4 style={{ margin: 5 }}>{user.email}</h4>
                                                </Grid.Column>
                                                <Grid.Column width="5" floated="right" style={{ height: 50 }}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => this.handleAddAcquaintance(user.username)}
                                                        style={{ backgroundColor: Colors.primary, color: Colors.background }}>
                                                        Dodaj do znajomych
                                                    </Button>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                )))
                                }
                                </List>
                            </React.Fragment>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid>
        );
      }
}
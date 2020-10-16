import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Grid, Segment, List, Header, Form, Input, Button, Icon } from "semantic-ui-react";
import LoadingIndicator from "../../common/LoadingIndicator";
import {Colors} from "../../constants";

export default class Acquaintances extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: AuthService.getCurrentUser().username,
            acquaintances: null,
            acquaintancesToAdd: null,
            usernameInput: "a",
            isLoading: true
          };
      }
    
      componentDidMount() {
        this.getAcquaintances(this.state.username).then(acquaintances => { this.setState({
            acquaintances: acquaintances.data.userDTO
          })
        console.log(this.state.acquaintances)});

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
            console.log(this.state.acquaintancesToAdd);
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
            username: event.target.value
        })
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
                            <Header as="h3">
                                Lista znajomych
                            </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle" >
                            <Header as="h3">
                                Szukaj znajomych
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched columns={2}>
                        <Grid.Column textAlign="center" verticalAlign="middle" >
                            <Header as="h3">
                                Lista znajomych
                            </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle" >
                            <Form>
                                <Form.Field>
                                    <Input
                                        placeholder="Wpisz nazwę użytkownika"
                                        onChange={this.props.onChangeUsername}
                                        name="usernameInput"/>
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
                                {this.state.acquaintancesToAdd.map((user) => (
                                    <Segment key={user.username}>
                                    {/* <ResortCard
                                        isAdmin={this.props.isAdmin}
                                        resortDetails={resort}

                                    ></ResortCard> */}
                                        <h4>{user.username}</h4>
                                    </Segment>
                                ))}
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
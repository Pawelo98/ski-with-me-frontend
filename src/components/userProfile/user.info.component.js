import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { Grid, GridRow, GridColumn, Button } from "semantic-ui-react";
import { FaSnowboarding, FaSkiing } from 'react-icons/fa';
import { MdNotInterested } from 'react-icons/md';
import { Colors } from "../../constants";
import { Link } from "react-router-dom";
import { notification } from "antd";
import LoadingIndicator from "../../common/LoadingIndicator";
import { FaUser } from 'react-icons/fa';

export default class UserInfo extends Component {
    constructor(props) {
      super(props);
        
      document.title = "SkiWithMe";
  
      this.state = {
        currentUser: "",
        uppercase: "",
        resortImage: null
      };

      this.handleSendEmail = this.handleSendEmail.bind(this);
    }

    componentDidMount() {
        this.setState(() => ({
            currentUser: this.props.currentUser,
            resortImage: this.props.resortImage
          }), () => {
              var username = this.state.currentUser.username;
              var uppercase = username.toUpperCase();
              this.setState(() => ({
                uppercase: uppercase
              }))
          }
        );
    }

    handleSendEmail() {
        UserService
            .sendEmail(AuthService.getCurrentUser().username)
            .then(() => {
                notification.success({
                    message: "Wysłano emaila!",
                    description:
                        "Wysłanie email z nowym hasłem zakończone powodzeniem!",
                });
            })
            .catch(() => {
                notification.error({
                    message: "Nieudana wysyłka emaila!",
                    description:
                        "Wysłanie email z nowym hasłem zakończone niepowodzeniem!",
                });
            });
    }

    render() {
        if(this.state.resortImage === null) {
            return <LoadingIndicator/>
        } else {
        return (
            <Grid columns="equal">
                <GridRow columns={10} stretched style={{padding: 5}}>
                    <GridRow columns={10} style={{padding: 5, paddingLeft: 50}}>
                        <Grid.Column floated="left" textAlign="left" verticalAlign="middle" style={{paddingTop: 7, marginLeft: 20}}>
                            <FaUser size="100px"/>
                        </Grid.Column>
                    </GridRow>
                    <GridRow verticalAlign="middle" columns={10} style={{padding: 5, paddingLeft: 50}}>
                        <GridColumn floated="left" textAlign="left" verticalAlign="middle" style={{padding: 3}}>
                            <h3 style={{ fontWeight: "bold", color: Colors.primary }}>{this.state.uppercase}</h3>
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={10} style={{padding: 5, paddingLeft: 50}}>
                        <GridColumn floated="right" textAlign="left" style={{padding: 3}}>
                            <Link style={{ width: 160 }} to={{ pathname: `/userDataChange/${this.state.currentUser.username}`,
                                state: { userData: this.state.currentUser }, }}>
                                <Button 
                                    floated="right"
                                    size="small"
                                    basic
                                    style={{ width: 155, backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginBottom: 5 }}>
                                    Zmień dane
                                </Button>
                            </Link>
                            <Link style={{width: 160}} to={"/passwordChange/" + this.state.currentUser.username}>
                                <Button floated="right" style={{backgroundColor: Colors.primary, width: 155}} size="small">
                                    <Button.Content visible style={{color: Colors.background}}>Zmień hasło</Button.Content>
                                </Button>
                            </Link>
                            <Button 
                                floated="right"
                                size="small"
                                basic
                                onClick={this.handleSendEmail}
                                style={{ width: 155, backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginTop: 5 }}>
                                Zapomniałem hasła
                            </Button>
                        </GridColumn>
                    </GridRow>
                </GridRow>
                <GridRow columns={10} stretched style={{padding: 5}}>
                    <GridRow columns={3} stretched style={{padding: 5, paddingLeft: 50}}>
                        <GridColumn floated="left" textAlign="left" style={{padding: 3}}>
                            <h4 style={{ fontWeight: "bold" }}>Imię i nazwisko: {this.props.currentUser.name} {this.state.currentUser.surname}</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 3}}>
                            <h4 style={{ fontWeight: "bold" }}>Numer telefonu: {this.state.currentUser.phoneNumber}</h4>
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 3}}>
                            <h4 style={{ fontWeight: "bold" }}>Email: {this.state.currentUser.email}</h4>
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={3} stretched style={{padding: 5, paddingLeft: 50}}>
                        <GridColumn floated="left" textAlign="center" style={{padding: 3}}>
                            {this.state.currentUser.snowboarder === true &&
                                <h4 title="Umiejętność jazdy na snowboardzie" style={{ fontWeight: "bold" }}>Umiejętność jazdy na snowboardzie: {this.state.currentUser.snowboarder} <FaSnowboarding tooltip="Umiejętność jazdy na snowboardzie"/></h4>
                            }
                            {this.state.currentUser.snowboarder === false &&
                                <h4 title="Brak umiejętności jazdy na snowboardzie" style={{ fontWeight: "bold" }}>Umiejętność jazdy na snowboardzie: {this.state.currentUser.snowboarder} <MdNotInterested tooltip="Brak umiejętności jazdy na snowboardzie"/></h4>
                            }
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 3}}>
                            {this.state.currentUser.skier === true &&
                                <h4 title="Umiejętność jazdy na nartach" style={{ fontWeight: "bold" }}>Umiejętność jazdy na nartach: {this.state.currentUser.skier} <FaSkiing tooltip="Umiejętność jazdy na nartach"/></h4>
                            }
                            {this.state.currentUser.skier === false &&
                                <h4 title="Brak umiejętności jazdy na nartach" style={{ fontWeight: "bold" }}>Umiejętność jazdy na nartach: {this.state.currentUser.skier} <MdNotInterested tooltip="Brak umiejętności jazdy na nartach"/></h4>
                            }
                        </GridColumn>
                        <GridColumn floated="left" verticalAlign="middle" style={{padding: 3}}>
                            <h4 style={{ fontWeight: "bold" }}>&nbsp;</h4>
                        </GridColumn>
                    </GridRow>
                </GridRow>
                <GridRow columns={10} stretched style={{padding: 5}}>
                    <GridRow columns={10} stretched style={{padding: 5, paddingLeft: 35}}>
                        <h5>{this.state.currentUser.description}</h5>
                    </GridRow>
                </GridRow>
            </Grid>
  );
  }
}
}
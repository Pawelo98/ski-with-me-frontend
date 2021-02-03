import React, { Component } from "react";
import { Grid, GridRow, GridColumn, Segment, Button, Container } from "semantic-ui-react";
import { Colors } from "../../constants";
import { BsDot } from 'react-icons/bs';

export default class HelloPage extends Component {
  constructor(props) {
    super(props);
        
    document.title = "SkiWithMe";

    this.state = {
      
    };
  }

  render() {
    return (
      <Grid textAlign="left">
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <Segment padded>
              <Container>
                <Grid.Column>
                    <h1 title="Logowanie" style={{ fontWeight: "bold", textAlign: "center", paddingBottom: 20, color: Colors.primary }}>Witaj na stronie SkiWithMe!</h1>
                </Grid.Column>
                <Grid.Column textAlign="left" style={{paddingLeft: 20}}>
                    <h4 style={{ width: "90%", margin: 0, marginLeft: 0 }}><BsDot size="30"></BsDot>Znajdź najlepsze ośrodki narciarskie dostosowane do Twoich preferencji!</h4>
                    <h4 style={{ width: "90%", margin: 0, marginLeft: 0 }}><BsDot size="30"></BsDot>Twórz wyjazdy ze swoimi znajomymi!</h4>
                    <h4 style={{ width: "90%", margin: 0, marginLeft: 0 }}><BsDot size="30"></BsDot>Chwal się zdobytymi osiągnięciami!</h4>
                    <h4 style={{ width: "90%", margin: 0, marginLeft: 0 }}><BsDot size="30"></BsDot>Podziwiaj widoki jak na obrazku poniżej!</h4>
                </Grid.Column>
                <Grid.Column>
                    <img src={require('../../Home mountains.png')}
                    alt="Obraz gór" style={{ textAlign: "center", padding: 20, paddingBottom: 30, width: "90%", opacity: 0.9 }}/>
                </Grid.Column>
                <GridRow columns={2} textAlign="center" verticalAlign="middle" centered stretched style={{padding: 0, width: "90%", margin: 0}}>
                    <GridColumn floated="left" textAlign="left" style={{padding: 5, paddingBottom: 15, paddingLeft: 20}}>
                        <Button id="login" style={{ width: 200, backgroundColor: Colors.primary, color: Colors.background, fontWeight: "bold", marginBottom: 5, height: 45 }} size="small" onClick={() => this.props.history.push("/login")}>
                            Zaloguj się
                        </Button>
                    </GridColumn>
                    <GridColumn style={{padding: 5, paddingBottom: 15, paddingRight: 20}}>
                        <Button id="resorts" basic style={{ width: 200, backgroundColor: Colors.background, color: "black", fontWeight: "bold", marginBottom: 5, height: 45 }} size="small" onClick={() => this.props.history.push("/resorts")}>
                            Szukaj ośrodka narciarskiego
                        </Button>
                    </GridColumn>
                    <GridColumn floated="right" textAlign="right" style={{padding: 5, paddingBottom: 15, paddingRight: 20}}>
                        <Button id="register" style={{ width: 200, backgroundColor: Colors.primary, color: Colors.background, fontWeight: "bold", marginBottom: 5, height: 45 }} size="small" onClick={() => this.props.history.push("/register")}>
                            Zarejestruj się
                        </Button>
                    </GridColumn>
                </GridRow>
              </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
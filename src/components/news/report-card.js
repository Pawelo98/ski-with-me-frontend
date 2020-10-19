import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  GridColumn,
  GridRow
} from "semantic-ui-react";

class ReportCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resortName: null,
      daysNumber: null,
      name: null,
      userTripDescription: null
    };
  }

  componentDidMount () {
    this.setState({
      resortName: this.props.report.resortName,
      daysNumber: this.props.report.daysNumber,
      name: this.props.report.name,
      userTripDescription: this.props.report.userTripDescription
    });
  }

  render () {
    return (
      <Grid columns="equal">
        <GridRow columns={1} stretched style={{ padding: 5 }}>
          <GridRow columns={1} stretched style={{ padding: 5, paddingLeft: 35 }}>
            <GridColumn textAlign="center" style={{ padding: 3 }}>
              <h4 style={{ fontWeight: "bold" }}>{this.state.name} brał(a) udział w {this.state.daysNumber} dniowym wyjeździe w ośrodku {this.state.resortName}</h4>
            </GridColumn>
            <GridColumn verticalAlign="middle" style={{ padding: 3 }}>
              <h5 style={{ fontWeight: "bold" }}>"{this.state.userTripDescription}"</h5>
            </GridColumn>
          </GridRow>
        </GridRow>
      </Grid>
    );
  }
}

export default withRouter(ReportCard);
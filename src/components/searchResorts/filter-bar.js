import React, { Component } from 'react';
import {
  Form,
  Header,
  Dropdown,
  Button,
  Input,
  Icon,
  Grid,
} from "semantic-ui-react";
import {Colors} from "../../constants";


const itemsOnPageOptions = [
  { key: "1", value: 10, text: "10" },
  { key: "2", value: 25, text: "25" },
  { key: "3", value: 50, text: "50" },
];

const sortingOptions = [
  { key: "1", value: "DESC_resortName", text: "Niealfabetycznie po nazwie ośrodka" },
  { key: "2", value: "ASC_resortName", text: "Alfabetycznie po nazwie ośrodka" },
  { key: "3", value: "DESC_distance", text: "Malejąco po odległości od obecnej pozycji" },
  { key: "4", value: "ASC_temperature", text: "Rosnąco po temperaturze" },
  { key: "5", value: "DESC_temperature", text: "Malejąco po temperaturze" },
  { key: "6", value: "ASC_snowThickness", text: "Rosnąco po grubości pokrywy śnieżnej" },
  { key: "7", value: "DESC_snowThickness", text: "Malejąco po grubości pokrywy śnieżnej" },
  { key: "8", value: "DESC_runCount", text: "Malejąco po liczbie otwartych tras" },
  { key: "9", value: "DESC_clouds", text: "Malejąco po zachmurzeniu" },
  { key: "10", value: "ASC_clouds", text: "Rosnąco po zachmurzeniu" }
];

const filteringOptions = [
  { key: "1", value: "ALL", text: "Wszystkie" },
  { key: "2", value: "TER", text: "Jazda terenowa" },
  { key: "3", value: "OTW", text: "Otwarte trasy" },
  { key: "4", value: "NIG", text: "Nocne jazdy" },
];

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listOfResorts: null,
      itemsOnPage: "10",
    };
  }

  handleChange = (resort, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Form>
        <Header as="h1" style={{color: Colors.primary, paddingBottom: 25}}>
          Znajdź ośrodek narciarski dla siebie!
        </Header>
        <Grid columns="equal">
          <Grid.Row columns={10} stretched style={{padding: 5}}>
            <Grid.Column>
              <Form.Field>
                <label>Liczba ośrodków na stronie</label>
                <Dropdown
                  placeholder="Liczba ośrodków na stronie"
                  compact
                  disabled={this.props.isLoading}
                  selectOnNavigation={false}
                  name="itemsCountPerPage"
                  selection
                  value={this.props.itemsCountPerPage}
                  options={itemsOnPageOptions}
                  onChange={this.props.onChangeItemsOnPage}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
                <Form.Field>
                <label>Wyszukaj po nazwie</label>
                <Input
                    placeholder="Nazwa ośrodka"
                    onChange={this.props.onChangeName}
                    name="resortName"
                ></Input>
                </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={10} stretched style={{padding: 5}}>
            <Grid.Column>
              <Form.Field>
                <label>Filtrowanie</label>
                <Dropdown
                  placeholder="Filtrowanie ośrodków"
                  compact
                  disabled={this.props.isLoading}
                  selectOnNavigation={false}
                  name="filtering"
                  selection
                  value={this.props.filtering}
                  options={filteringOptions}
                  onChange={this.props.onChangeFiltering}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Sortowanie</label>
                <Dropdown
                  placeholder="Sortowanie ośrodków"
                  compact
                  disabled={this.props.isLoading}
                  selectOnNavigation={false}
                  name="sorting"
                  selection
                  value={this.props.sorting}
                  options={sortingOptions}
                  onChange={this.props.onChangeSorting}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={10} stretched style={{padding: 5}}>
            <Grid.Column>
                  <Form.Field>
                    <label> </label>
                    <Button
                      fluid
                      animated
                      style={{backgroundColor: Colors.primary}}
                      onClick={this.props.onSumbit}
                      loading={this.props.isLoading}
                    >
                      <Button.Content visible style={{color: Colors.background}}>Wyszukaj</Button.Content>
                      <Button.Content hidden>
                        <Icon name="search" />
                      </Button.Content>
                    </Button>
                  </Form.Field>
                </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form.Group widths="equal"></Form.Group>
      </Form>
    );
  }
}

export default FilterBar;
import React, { Component } from "react";
import resortService from "../../services/resort.service";
import { Grid, Segment, List, Pagination} from "semantic-ui-react";
import LoadingIndicator from "../../common/LoadingIndicator";
import FilterBar from "./filter-bar";
import ResortCard from "./resort-card";

export default class SearchResorts extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            listOfResorts: null,
            activePage: 1,
            totalPages: 10,
            itemsCountPerPage: 10,
            totalItemsCount: null,
            filtering: "OTW",
            sorting: "ASC_resortId",
            name: "",
            latitude: "",
            longitude: ""
          };
      }
    
      componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            this.getAllResorts(
              this.state.activePage,
              this.state.itemsCountPerPage,
              this.state.filtering,
              this.state.sorting,
              this.state.name,
              this.state.latitude,
              this.state.longitude
            );
          },
          error => console.log(error)
        );
      }
    
      handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage });
        this.getAllResorts(
          activePage,
          this.state.itemsCountPerPage,
          this.state.filtering,
          this.state.sorting,
          this.state.name,
          this.state.latitude,
          this.state.longitude
        );
      };
    
      handleChangeItemsOnPage = (e, { value }) => {
        this.setState({ itemsCountPerPage: value });
        this.getAllResorts(
          this.state.activePage,
          value,
          this.state.filtering,
          this.state.sorting,
          this.state.name,
          this.state.latitude,
          this.state.longitude
        );
      };
    
      handleChangeFiltering = (e, { value }) => {
        this.setState({ filtering: value, activePage: 1 });
        this.getAllResorts(
          1,
          this.state.itemsCountPerPage,
          value,
          this.state.sorting,
          this.state.name,
          this.state.latitude,
          this.state.longitude
        );
      };
    
      handleChangeSorting = (e, { value }) => {
        this.setState({ sorting: value });
        this.getAllResorts(
          this.state.activePage,
          this.state.itemsCountPerPage,
          this.state.filtering,
          value,
          this.state.name,
          this.state.latitude,
          this.state.longitude
        );
      };
    
      handleChangeName = (e, { value }) => {
        this.setState({ name: value });
      };
    
      handleSubmit = () =>{
        this.getAllResorts(
          this.state.activePage,
          this.state.itemsCountPerPage,
          this.state.filtering,
          this.state.sorting,
          this.state.name,
          this.state.latitude,
          this.state.longitude
        );
      }
    
      handleChange(event, validationFunction) {
        const target = event.target;
        const inputValue = target.value;
        const inputName = target.name;
    
        this.setState({
          [inputName]: {
            value: inputValue,
            ...validationFunction(inputValue),
          },
        });
      }
    
      getAllResorts(activePage, itemsOnSite, filtering, sorting, name, latitude, longitude) {
        this.setState({ isLoading: true });
        resortService
          .getResorts(activePage, itemsOnSite, filtering, sorting, name, latitude, longitude)
          .then((response) => {
            this.setState({
              totalPages: response.data.totalPages,
              totalItemsCount: response.data.totalElements,
            });
    
            const results = response.data.content;
            const updatedResults = results.map((results) => {
              return {
                ...results,
              };
            });

            this.setState({ listOfResorts: updatedResults });
            this.setState({ isLoading: false });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      render() {
        return (
            <Grid textAlign="center">
            <Grid.Column mobile={16} tablet={14} computer={12}>
              <Segment padded>
                <FilterBar
                  isLoading={this.state.isLoading}
                  itemsCountPerPage={this.state.itemsCountPerPage}
                  sorting={this.state.sorting}
                  filtering={this.state.filtering}
                  name={this.state.name}
                  onChangeItemsOnPage={this.handleChangeItemsOnPage}
                  onChangeSorting={this.handleChangeSorting}
                  onChangeFiltering={this.handleChangeFiltering}
                  onChangeName={this.handleChangeName}
                  onSubmit={this.handleSubmit}
                />
              </Segment>
              <Pagination
                activePage={this.state.activePage}
                boundaryRange={1}
                onPageChange={this.handlePaginationChange}
                size="mini"
                siblingRange={1}
                totalPages={this.state.totalPages}
              />
              <Segment textAlign="left">
                {this.state.isLoading === true ? (
                  <LoadingIndicator />
                ) : (
                  <React.Fragment>
                    <List divided verticalAlign="middle" size="huge">
                      {this.state.listOfResorts.map((resort) => (
                        <Segment key={resort.resortId}>
                          <ResortCard
                            isAdmin={this.props.isAdmin}
                            resortDetails={resort}
                          ></ResortCard>
                        </Segment>
                      ))}
                    </List>
                  </React.Fragment>
                )}
              </Segment>
            </Grid.Column>
          </Grid>
        );
      }
}
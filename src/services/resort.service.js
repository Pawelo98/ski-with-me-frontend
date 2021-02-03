import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://ski-with-me.herokuapp.com/api/resort/';
//const API_URL = 'http://localhost:8080/api/resort/';

class ResortService {
  getResorts(activePage, size, filtering, sorting, name, latitude, longitude) {
    return axios.get(API_URL + 'all?activePage=' + activePage + "&size=" + size + "&filtering=" + filtering + "&sorting=" + 
    sorting + "&name=" + name + "&latitude=" + latitude  + "&longitude=" + longitude, { headers: authHeader() });
  }
  
  getClosestResorts(latitude, longitude) {
    return axios.get(API_URL + 'closestResorts?latitude=' + latitude  + "&longitude=" + longitude, { headers: authHeader() });
  }

  getResortImage(id) {
    return axios.get(API_URL + 'resortImage/' + id, { headers: authHeader() }, { responseType: 'blob' });
  }

  getResortImageApi(id) {
    return axios.get('https://skimap.org/SkiAreas/view/' + id + '.json');
  }

  getResortRatings(id) {
    return axios.get(API_URL + 'rating/' + id, { headers: authHeader() });
  }

  getResortFromTripId(tripId) {
    return axios.get(API_URL + 'fromTripId/' + tripId, { headers: authHeader() });
  }

  submitGrade(resortGradeRequest, username) {
    var headers = authHeader();
    headers = { ...headers, 'Content-Type': 'application/json'};
    return axios.post(API_URL + 'submitGrade/' + username, JSON.stringify(resortGradeRequest), { headers: headers });
  }

  editResort(resortObject) {
    var headers = authHeader();
    headers = { ...headers, 'Content-Type': 'application/json'};
    return axios.put(API_URL + 'editResort', JSON.stringify(resortObject), { headers: headers });
  }
}

export default new ResortService();
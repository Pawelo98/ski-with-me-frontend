import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://ski-with-me.herokuapp.com/api/trip/';
//const API_URL = 'http://localhost:8080/api/trip/';

class TripService {
    createTrip(tripObject, username) {
        var headers = authHeader();
        headers = { ...headers, 'Content-Type': 'application/json'};
        return axios.post(API_URL + 'createTrip/' + username, JSON.stringify(tripObject), { headers: headers });
    }

    updateTrip(tripIdObject, username) {
        var headers = authHeader();
        headers = { ...headers, 'Content-Type': 'application/json'};
        return axios.put(API_URL + 'updateTrip/' + username, JSON.stringify(tripIdObject), { headers: headers });
    }

    getTripActivity(tripId) {
        return axios.get(API_URL + 'getTripActivity/' + tripId, { headers: authHeader() });
    }

    quitTrip(username, tripId) {
        var headers = authHeader();
        headers = { ...headers, 'Content-Type': 'application/json'};
        return axios.post(API_URL + 'quitTrip/' + tripId, username, { headers: headers });
    }

    cancelTrip(username, tripId) {
        var headers = authHeader();
        headers = { ...headers, 'Content-Type': 'application/json'};
        return axios.post(API_URL + 'cancelTrip/' + tripId, username, { headers: headers });
    }

    joinTrip(username, tripId) {
        var headers = authHeader();
        headers = { ...headers, 'Content-Type': 'application/json'};
        return axios.post(API_URL + 'joinTrip/' + tripId, username, { headers: headers });
    }
}

export default new TripService();
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://ski-with-me.herokuapp.com/api/test/';
const USER_URL = 'https://ski-with-me.herokuapp.com/api/user/';
//const API_URL = 'http://localhost:8080/api/test/';
//const USER_URL = 'http://localhost:8080/api/user/';

class UserService {

  getTripsFromUsername(username) {
    return axios.get(USER_URL + 'trips/' + username, { headers: authHeader() });
  }

  addAcquaintance(username, usernameAccept) {
    var headers = authHeader();
    headers = { ...headers, 'Content-Type': 'application/json'};
    return axios.post(USER_URL + 'addAcquaintance/' + username, usernameAccept, { headers: headers });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAchievementsFromUsername(username) {
    return axios.get(USER_URL + 'achievements/' + username, { headers: authHeader() });
  }

  getAcquaintancesFromUsername(username) {
    return axios.get(USER_URL + 'acquaintances/' + username, { headers: authHeader() });
  }

  getUserFromUsername(username) {
    return axios.get(USER_URL + username, { headers: authHeader() });
  }

  getAcquaintancesToAddFromUsername(username, usernameInput) {
    return axios.get(USER_URL + 'acquaintancesToAdd?username=' + username + "&usernameInput=" + usernameInput, { headers: authHeader() });
  }

  getParticipants(tripId) {
    return axios.get(USER_URL + 'getParticipants/' + tripId, { headers: authHeader() });
  }

  changePassword(passwordChangeRequest, username) {
    var headers = authHeader();
    headers = { ...headers, 'Content-Type': 'application/json'};
    return axios.post(USER_URL + 'changePassword/' + username, JSON.stringify(passwordChangeRequest), { headers: headers });
  }

  sendEmail(username) {
    return axios.post(USER_URL + 'sendPasswordEmail/' + username, JSON.stringify(), { headers: authHeader() });
  }

  updateUserData(userDataRequest, username) {
    var headers = authHeader();
    headers = { ...headers, 'Content-Type': 'application/json'};
    return axios.post(USER_URL + 'updateUserData/' + username, JSON.stringify(userDataRequest), { headers: headers });
  }

  deleteAcquaintance(username, usernameAccept) {
    var headers = authHeader();
    headers = { ...headers, 'Content-Type': 'application/json'};
    return axios.post(USER_URL + 'deleteAcquaintance/' + username, usernameAccept, { headers: headers });
  }
}

export default new UserService();
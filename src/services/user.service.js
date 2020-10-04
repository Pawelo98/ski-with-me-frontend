import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const USER_URL = 'http://localhost:8080/api/user/';

class UserService {
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getUserFromUsername(username) {
    return axios.get(USER_URL + username, { headers: authHeader() });
  }

  getAchievementsFromUsername(username) {
    return axios.get(USER_URL + 'achievements/' + username, { headers: authHeader() });
  }

  getAcquaintancesFromUsername(username) {
    return axios.get(USER_URL + 'acquaintances/' + username, { headers: authHeader() });
  }

  getTripsFromUsername(username) {
    return axios.get(USER_URL + 'trips/' + username, { headers: authHeader() });
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
}

export default new UserService();
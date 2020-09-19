import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/resort/';

class ResortService {
  getResorts(activePage, size, filtering, sorting, name, latitude, longitude) {
    return axios.get(API_URL + 'all?activePage=' + activePage + "&size=" + size + "&filtering=" + filtering + "&sorting=" + 
    sorting + "&name=" + name + "&latitude=" + latitude  + "&longitude=" + longitude, { headers: authHeader() });
    }
}

export default new ResortService();
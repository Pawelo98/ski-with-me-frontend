import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/rating/';

class RatingService {
  getRatings() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }
}

export default new RatingService();
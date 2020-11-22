import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://ski-with-me.herokuapp.com/api/rating/';

class RatingService {
  getRatings() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }
}

export default new RatingService();
import axios from 'axios';
import authHeader from './auth-header';

const NEWS_URL = 'https://ski-with-me.herokuapp.com/api/news/';
//const NEWS_URL = 'http://localhost:8080/api/news/';

class NewsService {
  getUpcomingTrips(username) {
    return axios.get(NEWS_URL + 'upcoming/' + username, { headers: authHeader() });
  }

  getPastTrips(username) {
    return axios.get(NEWS_URL + 'past/' + username, { headers: authHeader() });
  }

  getUpcomingAcquaintancesTrips(username) {
    return axios.get(NEWS_URL + 'upcomingAcquaintancesTrips/' + username, { headers: authHeader() });
  }

  getAcquaintancesTripsReports(username) {
    return axios.get(NEWS_URL + 'acquaintancesTripsReports/' + username, { headers: authHeader() });
  }
}

export default new NewsService();
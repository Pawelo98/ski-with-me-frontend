import axios from "axios";

const API_URL = "https://ski-with-me.herokuapp.com/api/auth/";
//const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, name, surname, phoneNumber, description, skiing, snowboarding) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      name,
      surname,
      phoneNumber,
      description,
      skiing,
      snowboarding
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
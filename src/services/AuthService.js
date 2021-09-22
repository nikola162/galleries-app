
import HttpService from "./HttpService";

class AuthService extends HttpService {
  register = async (userData) => {
    const { data } = await this.client.post("/register", userData);
    const { token, user } = data;

    localStorage.setItem("token", data.token);
    return data;
  };

  login = async (credentials) => {
    const { data } = await this.client.post("/login", credentials);
    const { token, user } = data;

    localStorage.setItem("token", data.token);
    return data;
  };

  logout = async () => {
    await this.client.post("/logout");
    localStorage.removeItem("token");
  };

  getActiveUser = async () => {
    const { data } = await this.client.get("/me");
    return data;
  };
}

export default new AuthService();
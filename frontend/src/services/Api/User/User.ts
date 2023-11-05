import { request } from "../../../utils";

export class UserService {
  static getProfile() {
    return request({
      url: "/profile/",
    });
  }

  static logout() {
    return request({
      url: "/api-auth/logout/",
      method: "POST",
    });
  }
}

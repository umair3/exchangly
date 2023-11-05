import { request } from "../../../utils";

export class DomainIdentityService {
  static getDomainList() {
    return request({
      url: "/domains/",
    });
  }

  static addDomain(name: string) {
    return request({
      url: "/domains/",
      method: "POST",
      data: { name },
    });
  }

  static updateDomain(name: string) {
    return request({
      url: "/domains/",
      method: "PUT",
      data: { name },
    });
  }
}

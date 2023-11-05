import { request } from "../../../utils";

interface ICreateIdentityParams {
  first_name: string;
  last_name: string;
  email: string;
}

interface IEditIdentityParams extends ICreateIdentityParams {
  default: boolean;
  identityId: number;
}

export class EmailIdentityService {
  static getEmailIdentities(page: number = 1) {
    return request({
      url: `/email_identities/?page=${page}`,
    });
  }

  static createIdentity(identity: ICreateIdentityParams) {
    return request({
      url: "/email_identities/",
      method: "POST",
      data: identity,
    });
  }

  static editIdentity(identityParams: IEditIdentityParams) {
    const { identityId, ...identity } = identityParams;

    return request({
      url: `/email_identities/${identityId}/`,
      method: "PATCH",
      data: identity,
    });
  }

  static deleteIdentity(id: number) {
    return request({
      url: `/email_identities/${id}/`,
      method: "DELETE",
    });
  }
  static sendVerificationLink(email: string) {
    return request({
      url: "/email_identities/send-verify-email",
      method: "POST",
      data: {
        email,
      },
    });
  }
}

import { IIntegrationRequiredFieldsAPI } from ".";
import { request } from "../../../utils";

interface IEditIntegrationAPIParams {
  id: number;
  integrationFields: IIntegrationRequiredFieldsAPI;
}

export class IntegrationService {
  static getIntegrationsList(page: number) {
    return request({
      url: `/integrations/?page=${page}`,
    });
  }

  static addIntegration(integrationFields: IIntegrationRequiredFieldsAPI) {
    return request({
      url: "/integrations/",
      method: "POST",
      data: integrationFields,
    });
  }

  static editIntegration(params: IEditIntegrationAPIParams) {
    return request({
      url: `/integrations/${params.id}/`,
      method: "PUT",
      data: params.integrationFields,
    });
  }

  static deleteIntegration(id: number) {
    return request({
      url: `/integrations/${id}/`,
      method: "DELETE",
    });
  }
}

import { request } from "../../../utils";

interface ITemplateParams {
  subject: string;
  description: string | null;
  body: string;
}
interface IEditTemplateParams extends ITemplateParams {
  id: number;
}

export class TemplatesService {
  static getEmailTemplates(page: number = 1) {
    return request({
      url: `/email_templates/?page=${page}`,
    });
  }

  static getUserTemplates(page: number = 1) {
    return request({
      url: `/user_email_templates/?page=${page}`,
    });
  }

  static addTemplate(template: ITemplateParams) {
    return request({
      url: "/user_email_templates/",
      method: "POST",
      data: template,
    });
  }

  static editTemplate({ id, ...template }: IEditTemplateParams) {
    return request({
      url: `/user_email_templates/${id}/`,
      method: "PATCH",
      data: template,
    });
  }

  static deleteTemplate(id: number) {
    return request({
      url: `/user_email_templates/${id}/`,
      method: "DELETE",
    });
  }
}

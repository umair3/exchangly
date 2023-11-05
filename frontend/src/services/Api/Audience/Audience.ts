import { request } from "../../../utils";

interface IImportAudienceBulkParams {
  emails: string[];
  status: string;
  tags: string[];
}

interface IAudienceListParams {
  page: string;
  status: string;
  tags: string[];
}

interface IEditContactParams {
  updateId: number;
  email: string;
  status: string;
}

export class AudienceService {
  static getAudienceList(params: IAudienceListParams) {
    const { page, status, tags } = params;

    const paramsObj: { page: string; status?: string } = { page };

    if (status) {
      paramsObj["status"] = status;
    }

    const searchParams = new URLSearchParams(paramsObj);

    if (tags.length) {
      tags.forEach((tag) => searchParams.append("tags", tag));
    }

    return request({
      url: `/audience/?${searchParams.toString()}`,
    });
  }

  static getAllTags() {
    return request({
      url: "/tags/",
    });
  }

  static searchTags(tag: string) {
    return request({
      url: `/tags/?title=${tag}`,
    });
  }

  static bulkImport(importData: IImportAudienceBulkParams) {
    return request({
      url: "/audience_bulk/",
      method: "POST",
      data: importData,
    });
  }

  static getAudienceStats() {
    return request({
      url: "/audience_stats",
    });
  }

  static deleteContact(id: number) {
    return request({
      url: `/audience/${id}/`,
      method: "DELETE",
    });
  }

  static editContact(params: IEditContactParams) {
    const { email, status, updateId } = params;
    return request({
      url: `/audience/${updateId}/`,
      method: "PATCH",
      data: { email, status },
    });
  }
}

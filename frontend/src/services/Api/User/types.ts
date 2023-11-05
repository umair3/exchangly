export interface IUserProfileAPI {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IUserProfileResponseAPI {
  data: IUserProfileAPI;
}

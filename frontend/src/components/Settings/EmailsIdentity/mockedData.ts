export interface MockedDataInterface {
  email: string;
  status: boolean;
  id: number;
}

export const mockedData: MockedDataInterface[] = [
  { id: 1, email: "usama@gmail.com", status: true },
  { id: 2, email: "umair@gmail.com", status: false },

  { id: 3, email: "company@exchangly.com.com", status: true },
  { id: 4, email: "phase@hotmail.com", status: false },
  { id: 5, email: "campaigns@mails.com", status: true },
];

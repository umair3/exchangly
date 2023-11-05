import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { ShowAlert } from "../features/alert";

const mainURL: string = process.env.REACT_APP_MAIN_URL as string;

const client = axios.create({
  baseURL: mainURL,
  withCredentials: true,
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
});

export function request(options: AxiosRequestConfig) {
  const onSucess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = `${mainURL}/login`;
    }

    ShowAlert({ message: error.message, status: "error" });

    throw error;
  };

  return client(options).then(onSucess).catch(onError);
}

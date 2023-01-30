import { ApiStatus } from "../models/apistatus.model";

export class Constants {
  static eventosUrlPrefix = 'http://localhost:3000/eventos';

  static initialApiStatus: ApiStatus = {
  apiResponseMessage: '',
  apiStatus: false,
  };

  static successApiStatus: ApiStatus = {
  apiResponseMessage: 'success',
  apiStatus: true,
  };
}

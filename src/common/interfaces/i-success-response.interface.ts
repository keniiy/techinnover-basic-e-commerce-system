export interface ISuccessResponse<T = any> {
  success: boolean;
  data?: T;
  statusCode: number;
  message: string;
}

import { IProduct } from "./iproduct";

export interface IProductResponse {
  data: IProduct[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

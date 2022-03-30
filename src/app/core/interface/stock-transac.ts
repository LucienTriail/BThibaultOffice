import {Products} from "./products";

export interface StockTransac {
  product: Products,
  category: string,
  stockBis: number,
  operation?: string
}

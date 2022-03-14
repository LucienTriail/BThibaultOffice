export interface Products {

  "discount": number,
  "name": string,
  "id": number,
  "owner": string,
  "comments": string,
  "availability": boolean,
  "category": number,
  "price": number,
  "price_on_sale": number,
  "unit": string,
  "sale": boolean,
  "quantity_stock": number,
  "quantity_sold": number
}

export interface Transactions{
  "id":number,
  "date":Date,
  "amount":number,
  "productQuantity":number,
  "idProduct_id":number
}

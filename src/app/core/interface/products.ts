export interface Products {

  "discount": number,
  "name": string,
  "id": number,
  "comments": string,
  "availability": boolean,
  "category": number,
  "price": number,
  "discounted_price": number,
  "unit": string,
  "sale": boolean,
  "stock": number,
  "sold": number
}

export interface Transactions{
  "id":number,
  "date":Date,
  "amount":number,
  "productQuantity":number,
  "idProduct_id":number
}

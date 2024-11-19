export enum ProductActionTypes{
  GET_ALL_PRODUCTS="[Product] Get all products",
  GET_ALL_CATEGORIE="[Product] Get all categorie",
  ADD_PRODUCT_TO_CADDY="[Product] Add product to caddy",
}
export interface ActionEvent {
  type:ProductActionTypes,
  payload?:any,
}

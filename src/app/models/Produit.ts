import {Category} from "./Category";

export  interface Produit{
  name:string;
  description:string;
  price:number;
  dateExpiration:Date;
  quantity:number;
  promo:boolean;
  prixpromo:number;
  selected:number;
  available:boolean;
  category:Category;
}

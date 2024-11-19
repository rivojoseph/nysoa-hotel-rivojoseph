import {CategoryChambre} from "./CategoryChambre.model";

export class Chambre{
   id!:number;
   numeroChambre!:number;
   detailChambre!:string;
   sonorisation!:boolean;
   prixsono!:number;
   decoration!:boolean;
   prixdeco!:number;
   nombrePerson!:number;
   tv!:boolean;
   wifi!:boolean;
   eauChaude!:boolean;
   climatiseur!:boolean;
   nombrelit!:boolean;
   prix!:number;
   promo!:boolean;
   prixpromo!:number;
   photoname!:string;
   selected!:number;
   disponible!:boolean;
   categoryChambre!: CategoryChambre;
}

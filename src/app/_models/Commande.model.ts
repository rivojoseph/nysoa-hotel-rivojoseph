import {AppUser} from "./AppUser.model";
import {StatusCommande} from "../_enums/StatusCommande";

export class Commande{
  public id!:number;
  public dateCreation!:Date;
  public status!:StatusCommande;
  public appUser!:AppUser;
  public menuItems!:any;
  public total!:number;
}

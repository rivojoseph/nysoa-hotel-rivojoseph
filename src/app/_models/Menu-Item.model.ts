import {Menu} from "./Menu.model";
import {Commande} from "./Commande.model";

export class MenuItem{
  public idMitm?:number;
  public menu?:Menu;
  public commande?:Commande;
  public prix?:number;
  public quantity?:number;
  public discout?:number;
}

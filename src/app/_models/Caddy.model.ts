import {MenuItem} from "./Menu-Item.model";
import {AppUser} from "./AppUser.model";

export class Caddy{
  public name!:string;
  public items:Map<number,MenuItem>= new Map();
  public client!:AppUser;


  constructor(name: string) {
    this.name = name;
  }
}

import {
  IAbility,
  IAncientTrait,
  IAttack,
  ICard,
  ICardImage,
  ICardmarket,
  ILegality,
  IResistance,
  ISet,
  ITCGPlayer,
  IWeakness,
} from "../interfaces/index.ts";

export class Card implements ICard {
  id: string = "";
  name: string = "";
  supertype: string = "";
  subtypes: string[] = [];
  hp?: string = "";
  types?: string[] = [];
  evolvesFrom?: string = "";
  evolvesTo?: string[] = [];
  rules?: string[] = [];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[] = [];
  attacks?: IAttack[] = [];
  weaknesses?: IWeakness[] = [];
  resistances?: IResistance[] = [];
  retreatCost?: string[] = [];
  convertedRetreatCost?: number = 0;
  set?: ISet = undefined;
  number: string = "";
  artist?: string = "";
  rarity: string = "";
  flavorText?: string = "";
  nationalPokedexNumbers?: number[] = [];
  legalities?: ILegality = undefined;
  regulationMark?: string = "";
  images: ICardImage = {
    small: "",
    large: "",
  };
  tcgplayer?: ITCGPlayer = undefined;
  cardmarket?: ICardmarket = undefined;
}

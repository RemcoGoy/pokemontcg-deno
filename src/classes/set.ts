import { ILegality, ISet, ISetImage } from "../interfaces/index.ts";

export class Set implements ISet {
  id: string = "";
  images: ISetImage = {
    symbol: "",
    logo: "",
  };
  legalities?: ILegality = undefined;
  name: string = "";
  printedTotal: number = 0;
  ptcgoCode: string = "";
  releaseDate: string = "";
  series: string = "";
  total: number = 0;
  updatedAt: string = "";
}

import { ISetImage } from "./image.ts";
import { ILegality } from "./legality.ts";

export interface ISet {
  id: string;
  images: ISetImage;
  legalities?: ILegality;
  name: string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}

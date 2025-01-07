import qs from "https://deno.land/x/deno_qs/mod.ts";
import { TcgArgs, TcgHeaders, TcgQueryBuilder, TcgResponse } from "./type.ts";
import { Card } from "./classes/card.ts";
import { Set } from "./classes/set.ts";

export const getApiClient = (apiKey: string) => {
  return new Client(apiKey);
};

export const getClient = () => {
  return new Client();
};

class Client {
  apiKey: string;
  host: string = "https://api.pokemontcg.io/v2";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || "";
  }

  private _getOptions() {
    const headers: TcgHeaders = {};

    if (this.apiKey) {
      headers["X-Api-Key"] = this.apiKey;
    }

    return {
      headers,
    };
  }

  private _get<T>(path: string, args: TcgArgs): Promise<TcgResponse<T>> {
    return fetch(`${this.host}/${path}${args && "?" + qs.stringify(args)}`, {
      ...this._getOptions(),
      method: "GET",
    }).then((response) => response.json());
  }

  private _queryBuilder = <T>(type: string): TcgQueryBuilder<T> => ({
    find: (id: string) => {
      return fetch(`${this.host}/${type}/${id}`, {
        ...this._getOptions(),
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => json.data as T);
    },
    where: (args: TcgArgs) => this._get<T>(type, args),
    all: (args: TcgArgs = {}, data: T[] = []) => {
      const getAll = (type: string, args: TcgArgs): Promise<any> => {
        const page = args.page ? args.page + 1 : 1;

        return this._get<T>(type, { ...args, page })
          .then((response) => {
            data.push(...response.data);

            if (
              !response.totalCount ||
              response.pageSize * response.page >= response.totalCount
            ) {
              return data;
            }

            return getAll(type, { ...args, page });
          })
          .catch((error) => console.error(error));
      };
      return getAll(type, args);
    },
  });

  cards = this._queryBuilder<Card>("cards");
  sets = this._queryBuilder<Set>("sets");
  types = this._queryBuilder<any>("types");
  subtypes = this._queryBuilder<any>("subtypes");
  rarity = this._queryBuilder<any>("rarity");
  supertypes = this._queryBuilder<any>("supertypes");
}

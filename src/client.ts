import qs from "https://deno.land/x/deno_qs/mod.ts";

export const getApiClient = (apiKey: string) => {
    return new Client(apiKey);
}

export const getClient = () => {
    return new Client();
}

class Client {
    apiKey: string;
    host: string = 'https://api.pokemontcg.io/v2';

    constructor(apiKey?: string) {
        this.apiKey = apiKey || '';
    }

    private _getOptions() {
        const headers: any = {};

        if (this.apiKey) {
            headers['X-Api-Key'] = this.apiKey;
        }

        return {
            headers
        }
    }

    private _get(path: string, args: any): Promise<any> {
        return fetch(`${this.host}/${path}${args && '?' + qs.stringify(args)}`, {
            ...this._getOptions(),
            method: 'GET'
        })
        .then(response => response.json());
    }

    private _queryBuilder = (type: string) => ({
        find: (id: string) => {
            return fetch(`${this.host}/${type}/${id}`, {
                ...this._getOptions(),
                method: 'GET'
            })
            .then(response => response.json())
            .then(json => json.data);
        },
        where: (args: any) => this._get(type, args),
        all: (args: any={}, data: any[]=[]) => {
            const getAll = (type: string, args: any): Promise<any> => {
                const page = args.page ? args.page + 1 : 1;
    
                return this._get(type, {...args, page})
                    .then(response => {
                        data.push(...response.data);
    
                        if (!response.totalCount || (response.pageSize * response.page) >= response.totalCount) {
                            return data;
                        }
    
                        return getAll(type, {...args, page})
                    })
                    .catch(error => console.error(error));
            }
            return getAll(type, args);
        }
    })

    cards = this._queryBuilder('cards');
    sets = this._queryBuilder('sets');
    types = this._queryBuilder('types');
    subtypes = this._queryBuilder('subtypes');
    rarity = this._queryBuilder('rarity');
    supertypes = this._queryBuilder('supertypes');
}
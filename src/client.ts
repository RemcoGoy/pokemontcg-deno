const getApiClient = (apiKey: string) => {
    return new Client(apiKey);
}

const getClient = () => {
    return new Client();
}

class Client {
    apiKey: string;

    constructor(apiKey?: string) {
        this.apiKey = apiKey || '';
    }
}

export default {
    getApiClient,
    getClient
}
export default class ExchangeApi {

    static async fetchWithTimeout(url, options) {
        const FETCH_TIMEOUT = 15000;
        let didTimeOut = false;

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                didTimeOut = true;
                reject(new Error("Request timed out"));
            }, FETCH_TIMEOUT);

            fetch(url, options)
                .then(response => {
                    clearTimeout(timeout);
                    if (!didTimeOut) {
                        resolve(response.json());
                    }
                })
                .catch(err => {
                    // Rejection already happened with setTimeout
                    if (didTimeOut) return;
                    reject(err);
                });
        });
    }

    makeGetRequest = async url => {
        const response = await ExchangeApi.fetchWithTimeout(url, {
            headers: { Accept: "application/json" }
        });
        if(response.hasOwnProperty('error')){
            throw new Error(response.error);
        }
        return response;
    };

    async fetchExchangeRates(baseRate, date) {
        const rates = await this.makeGetRequest(`https://api.exchangeratesapi.io/${date}?base=${baseRate}`);
        return rates;
    }


}
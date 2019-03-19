import React, { Component }  from "react";
import ExchangeApi from "../services/exchange-api";
import RatesView from "../components/RatesView";

export class RatesContainer extends Component {
    constructor(props) {
        super(props);
        this.exchangeApi = new ExchangeApi();
        this.state = {
            rates: null,
            isLoading: false,
            error: null
        };
    }

    /*Client side validations here*/
    validateFields = (baseRate, date) => {
        //Don't search twice for same query to prevent spamming API
        const rates = this.state.rates;
        if(rates && (rates.hasOwnProperty('date') && rates.date === date) && (rates.hasOwnProperty('base') && rates.base === baseRate)) {
            return false;
        }

        //Check base rate is a 3 letter string
        if(!baseRate.toString().match(/^[A-Za-z]+$/) || baseRate.toString().length !== 3){
            this.setState({
                error: "Error: Base rate must be a 3 letter currency code (for example EUR)"
            });
            return false;
        }
        // TODO add extra validations to check date against injection etc
        return true;
    };

    /*Date format required by the api*/
    formatDate = (date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    handleLookUpRates = (baseRate, date) => {
        //TODO add some caching to rate requests
        const formattedDate = this.formatDate(date);
        if(this.validateFields(baseRate, formattedDate)) this.handleFetchRates(baseRate, formattedDate);
    };

    fetchRates = async (baseRate, date) => this.exchangeApi.fetchExchangeRates(baseRate, date);

    /* No need to use redux here, simple fetch is fine for these requirements*/
    handleFetchRates = async (baseRate, date) => {

        this.setState({
            isLoading: true,
            error: null
        });

        try {
            const rates = await this.fetchRates(baseRate, date);

            this.setState({
                rates,
                isLoading: false
            });
        } catch (e) {
            this.setState({
                error: e.toString(),
                isLoading: false
            });
        }


    };

    render() {
        return (
            <RatesView handleLookUpRates={this.handleLookUpRates} ratesObj={this.state.rates} error={this.state.error} isLoading={this.state.isLoading}/>
        );
    }
}

export default RatesContainer;
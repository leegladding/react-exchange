import React, { Component } from "react";
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ContentWrapper from "../PageComponents/ContentWrapper";
import Loader from "../Loader";
import styles from "./style.module.css";

class RatesView extends Component {
    state = {
        baseRate: "EUR",
        date: new Date()
    };

    renderRatesList = () => {
        if (!this.props.ratesObj) {
            return false;
        }

        const ratesObj = this.props.ratesObj.rates;

        //TODO split this into a child stateless component if it gets anymore complicated or might be re-used
        const ratesList =
            Object.keys(ratesObj).map(item => {
                if(item === this.state.baseRate) return false;
                return (
                    <li key={item}>
                        <span className={styles.rateId}>{item}</span> : {ratesObj[item]}
                    </li>
                )
            });

        return ratesList.length !== 0 ? <ul id="rateList" className={styles.rateList}>{ratesList}</ul> : false;

    };

    setBaseRate = (e) => {
        this.setState({baseRate: e.target.value.toUpperCase()})
    };

    setDate = (date) => {
        this.setState({
            date: date
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLookUpRates(this.state.baseRate, this.state.date);
    };

    render() {
        return (
            <ContentWrapper>
                <h1>Exchange Rates</h1>
                <p>Please enter a 3 letter currency code as your base rate and select the date that you wish to see the exchange rates for</p>
                <form className={styles.inputArea}>
                    <input id="baseRateInput" className={styles.baseRateInput} maxLength="3" type="text" onChange={ this.setBaseRate } value={ this.state.baseRate } />
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={this.state.date}
                        showYearDropdown
                        minDate={new Date(1999,0,1)}
                        maxDate={new Date()}
                        todayButton={"Today"}
                        onChange={this.setDate} />
                    <span className={styles.buttonWrapper}>
                        {this.props.isLoading && <Loader className={styles.loaderParentStyles} />}
                        {!this.props.isLoading && <button className={styles.submitButton} onClick={this.handleSubmit}>Get Rates</button>}
                    </span>
                </form>
                <span className={styles.error}>{this.props.error}</span>
                {this.renderRatesList()}
            </ContentWrapper>
        );
    }

}

RatesView.propTypes = {
    handleLookUpRates: PropTypes.func.isRequired,
    ratesObj: PropTypes.object,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
};

export default RatesView;
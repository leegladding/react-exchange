import React from "react";
import { shallow } from "enzyme";

import ExchangeApi from "../services/exchange-api";
import RatesView from "../components/RatesView";
import RatesContainer from "./RatesContainer";

jest.mock("../services/exchange-api");

describe(RatesContainer, () => {
    let stubFetchExchangeRates;
    let subject;
    beforeAll(() => {
        stubFetchExchangeRates = jest.fn(() => Promise.resolve());
        ExchangeApi.mockImplementation(() => ({
            fetchExchangeRates: stubFetchExchangeRates
        }));
        subject = shallow(<RatesContainer />);
    });

    it("should render RatesView", () => {
        expect(subject.find(RatesView).exists()).toBe(true);
    });

    it("should call ExchangeApi", () => {
        const requestDetails = [ "EUR", "2000-08-12" ];

        subject
            .find(RatesView)
            .props()
            .handleLookUpRates("EUR", "2000-08-12");

        expect(stubFetchExchangeRates).toHaveBeenCalledWith("EUR", "2000-08-12");
    });

    it("should not call ExchangeApi if base rate empty", () => {
        const requestDetails = [ "EUR", "2000-08-12" ];

        subject
            .find(RatesView)
            .props()
            .handleLookUpRates("", "2000-08-12");

        expect(stubFetchExchangeRates).not.toHaveBeenCalledWith();
    });
});

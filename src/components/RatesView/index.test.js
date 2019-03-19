import React from "react";
import { shallow } from "enzyme";

import RatesView from "./index";

describe(RatesView, () => {
    let submittedData
    let subject;
    let props;

    beforeEach(() => {
        submittedData = null;
        props = {
            handleLookUpRates: jest.fn(data => (submittedData = data)),
            isLoading: false
        };

        subject = shallow(<RatesView {...props} />);
    });

    it("should render form", () => {
        expect(subject.find('form').exists()).toBe(true);
    });

    it("should render search button", () => {
        expect(subject.find('button').exists()).toBe(true);
    });

    it("should render base rate input", () => {
        expect(subject.find('#baseRateInput').exists()).toBe(true);
    });

    it("should not render rates list", () => {
        expect(subject.find('#rateList').exists()).toBe(false);
    });

    it("should try to sumbit the form on submit", () => {
        subject.find('button').simulate('click', {
            preventDefault: () => {
            }});
        expect(props.handleLookUpRates).toHaveBeenCalled();
    });

    it("should render rates list if ratesObj exists", () => {
        submittedData = null;
        props = {
            handleLookUpRates: jest.fn(data => (submittedData = data)),
            isLoading: false,
            ratesObj: {"rates":{"JPY":120.65,"BRL":3.307,"NOK":8.9065}}
        };

        subject = shallow(<RatesView {...props} />);
        expect(subject.find('#rateList').exists()).toBe(true);
    });


});

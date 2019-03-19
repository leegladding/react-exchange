import React from "react";
import ContentWrapper from "../PageComponents/ContentWrapper";
//import styles from "./style.css";

const AboutView = () => (
    <ContentWrapper>
        <h1>About</h1>
        <p>This is a demo web app that lets the user enter a date and a base currency and, when submitted, returns a list of foreign exchange rates from a publicly available API as of that date.</p>
    </ContentWrapper>
);

export default AboutView;
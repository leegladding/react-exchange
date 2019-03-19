import React from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../PageComponents/ContentWrapper";
import styles from "./style.module.css";

const HomeView = () => (
    <ContentWrapper>
        <h1>Exchange Rates App</h1>
        <h2>Welcome</h2>
        <p>This app will allow you to check historic exchange rates of any currency.</p>
        <p>To check out your favorite exchange rate history, head over to our <Link className={styles.link} to="/rates/">Rates</Link> page to get started!</p>
    </ContentWrapper>
);

export default HomeView;
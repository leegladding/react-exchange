import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from "classnames";

import styles from "./style.module.css";

const MainMenu = ({location}: props) => (
    <nav>
        <ul>
            <li>
                <Link
                    className={classNames(styles.link, {
                        [styles.current]: location.pathname === "/"
                    })}
                    to="/"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    className={classNames(styles.link, {
                        [styles.current]: location.pathname === "/about/"
                    })}
                    to="/about/"
                >
                    About
                </Link>
            </li>
            <li>
                <Link
                    className={classNames(styles.link, {
                        [styles.current]: location.pathname === "/rates/"
                    })}
                    to="/rates/"
                >
                    Rates
                </Link>
            </li>
        </ul>
    </nav>
);

MainMenu.propTypes = {
    location: PropTypes.object.isRequired
};

export default withRouter(MainMenu);
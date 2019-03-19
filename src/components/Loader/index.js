import React from "react";
import styles from "./style.module.css";
import PropTypes from 'prop-types';

const Loader = ({ className }: Props) => (
    <div className={`${styles.loadingEllipsis} ${className}`}>
        <span />
        <span />
        <span />
        <span />
    </div>
);

Loader.propTypes = {
    className: PropTypes.string
};

Loader.defaultProps = {
    className: ""
};

export default Loader;

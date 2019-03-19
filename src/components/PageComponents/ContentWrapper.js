import React from "react";
import PropTypes from 'prop-types';

import styles from './ContentWrapper.module.css'; // Import css modules stylesheet as styles

const ContentWrapper = ({ children, ...rest }: Props) => (
    <div className={styles.wrapper} {...rest}>
        {children}
    </div>
);

ContentWrapper.propTypes = {
    children: PropTypes.node
};

export default ContentWrapper;
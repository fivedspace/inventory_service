/**
 * @Description:
 * @author Chen
 * @date 2021-07-29 10:31
 */
import PropTypes from "prop-types";
import React from "react";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanel
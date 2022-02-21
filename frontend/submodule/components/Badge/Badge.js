import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  let customColor = {
    primaryColor: "#9c27b0",
    warningColor: "#ff9800",
    dangerColor: "#f44336",
    successColor: "#4caf50",
    infoColor: "#00acc1",
    roseColor: "#e91e63",
    grayColor: "#999999"
  };
  if (theme.customSetting && theme.customSetting.customColor)
  {
    customColor = {...customColor, ...theme.customSetting.customColor};
  }
  return ({
    badge: {
      marginRight: "3px",
      borderRadius: "12px",
      padding: "5px 12px",
      textTransform: "uppercase",
      fontSize: "10px",
      fontWeight: "500",
      lineHeight: "1",
      color: "#fff",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      display: "inline-block",
    },
    primary: {
      backgroundColor: customColor.primaryColor,
    },
    warning: {
      backgroundColor: customColor.warningColor,
    },
    danger: {
      backgroundColor: customColor.dangerColor,
    },
    success: {
      backgroundColor: customColor.successColor,
    },
    info: {
      backgroundColor: customColor.infoColor,
    },
    rose: {
      backgroundColor: customColor.roseColor,
    },
    gray: {
      backgroundColor: customColor.backgroundColor,
    },

  });
});

export default function Badge(props) {
  const classes = useStyles();
  const { color, children } = props;
  return (
    <span className={classes.badge + " " + classes[color]}>{children}</span>
  );
}

Badge.defaultProps = {
  color: "gray",
};

Badge.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  children: PropTypes.node,
};

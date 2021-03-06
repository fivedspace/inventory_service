import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => {
    const styles = {
        grid: {
            marginRight: "15px",
            marginLeft: "15px",
            marginTop:"10px",
            width: "auto",
            alignItems:"center",
            justifyContent:"center"
        },
    };
    return styles;
});

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: "",
};

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

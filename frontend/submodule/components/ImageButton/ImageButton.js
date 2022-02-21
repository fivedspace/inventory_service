import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { IconButton } from '@material-ui/core';
import Image from "next/image"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

/*
 * 
*/
const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: 0
    }
  };
});

export default function ImageButton({ imgSrc, notifyClick, notifyKey, children, ...rest }) {
  const classes = useStyles();

  const handleClick = () => {
    if (notifyClick) {
      notifyClick(notifyKey);
    }
  };
  return (
    <>
      <IconButton className={classes.root} color="primary" onClick={handleClick} {...rest}>
        <Image src={imgSrc} {...rest} />
        {children}
      </IconButton>
    </>
  );
}

ImageButton.defaultProps = {
  imgSrc: "",
  notifyKey: "",
  notifyClick: () => { console.log("Button clicked"); }
};

ImageButton.propTypes = {
  imgSrc: PropTypes.string,
  notifyKey: PropTypes.string,
  notifyClick: PropTypes.func,
  children: PropTypes.node,
};

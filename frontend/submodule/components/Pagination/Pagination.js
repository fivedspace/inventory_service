import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    margin:'0 auto'
  },
}));

export default function BasicPagination(props) {
  const classes = useStyles();
  const {count,color,...rest} = props
  return (
    <div className={classes.root}>
      <Pagination count={count} color={color} {...rest} />
    </div>
  );
}

BasicPagination.propTypes = {
    count : PropTypes.number,
    color : PropTypes.string
}

BasicPagination.defaultProps = {
    count : 1,
    color : 'primary'
}
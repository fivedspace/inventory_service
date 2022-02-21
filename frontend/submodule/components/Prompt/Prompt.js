import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from 'prop-types'

function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}
function Prompt(props) {
  const { message, severity, open, handleClose ,timer} = props;

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={timer}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={handleClose}
      >
        {/* severity='success' | 'info' | 'error' | 'warning' */}
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}

export default Prompt;

Prompt.defaultProps = {
  timer : 2000
}

Prompt.propTypes = {
  timer : PropTypes.number
}

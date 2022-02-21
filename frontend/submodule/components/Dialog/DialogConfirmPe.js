/**
 * @Description:
 * @author Chen
 * @date 2021-07-26 11:52
 */

import React from "react";
// import DialogWithContentAction from "DialogWithContentAction"
// import DialogContentText from "@material-ui/core/DialogContentText";
import Button from '@material-ui/core/Button'
import DialogWithContentAction from "./DialogWithContentAction"
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

export default function DialogConfirm(props) {
    const {status, title, txtContent, confirmText, cancelText, notifyConfirm, notifyCancel} = props
    return (
        <DialogWithContentAction
          dialogStatus={status}
          dialogTitle={title}
          dialogContent={
            <Typography variant="subtitle2" gutterBottom>
            {txtContent}
            </Typography>
          }
          dialogActions={
            <>
              <Button onClick={notifyConfirm} color="primary">
                {confirmText}
              </Button>
              <Button onClick={notifyCancel} color="primary" autoFocus>
                {cancelText} 
              </Button>
            </>
          }
      />
    );
}

DialogConfirm.defaultProps = {
  status:false,
  title: "请确认操作!",
  confirmText: "确认",
  cancelText: "取消",
  txtContent: '请选择确认或者取消!',
  notifyConfirm: e => console.log(e),
  notifyCancel: e => console.log(e)
};

DialogConfirm.propTypes = {
  status: PropTypes.bool,
  title: PropTypes.string, 
  confirmText: PropTypes.string, 
  cancelText: PropTypes.string, 
  notifyConfirm: PropTypes.func,
  notifyCancel: PropTypes.func,
  children: PropTypes.node
};



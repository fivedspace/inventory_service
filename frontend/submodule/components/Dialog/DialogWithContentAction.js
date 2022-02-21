/**
 * @Description:
 * @author Chen
 * @date 2021-07-26 11:52
 */
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";
import {Dialog} from "@material-ui/core";

export default function DialogWithContentAction(props) {
    const {dialogStatus, dialogTitle, dialogContent, dialogActions} = props
    return (
        <Dialog
            open={dialogStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                {dialogActions}
            </DialogActions>
        </Dialog>
    )
}

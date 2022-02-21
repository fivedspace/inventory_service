/**
 * @Description:
 * @author Chen
 * @date 2021-07-26 11:52
 */
 import DialogWithContentAction from "./DialogWithContentAction"
 import TextField from "material-ui/TextField";
 import PropTypes from "prop-types";
 import { ChangeHistory } from "@material-ui/icons";
 
 export default function DialogConfirmTextField(props) {
     const {status, title, id, label, type, Change, confirmText, cancelText, notifyConfirm, notifyCancel} = props
     return (
         <DialogWithContentAction
           dialogStatus={status}
           dialogTitle={title}
           dialogContent={
            <TextField
            autoFocus
            margin="dense"
            id={id}
            label={label}
            type={type}
            fullWidth
            onChange={Change}
        />
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
   status:true,
   title: "请确认操作!",
   label:"手机号或邮箱",
   type:'email',
   Change:e=>console.log(e),
   confirmText: "确认",
   cancelText: "取消",
   notifyConfirm: e => console.log(e),
   notifyCancel: e => console.log(e)
 };
 
 DialogConfirm.propTypes = {
   status: PropTypes.bool,
   title: PropTypes.string, 
   label: PropTypes.string, 
   type: PropTypes.string, 
   Change: PropTypes.func,
   confirmText: PropTypes.string, 
   cancelText: PropTypes.string, 
   notifyConfirm: PropTypes.func,
   notifyCancel: PropTypes.func,
   children: PropTypes.node
 };
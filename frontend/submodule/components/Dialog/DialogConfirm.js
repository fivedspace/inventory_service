import React from "react";
import Button from '@material-ui/core/Button'
import DialogWithContentAction from "./DialogWithContentAction"
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

export default function DialogConfirm(props) {
    const {status, title, txtContent, buttonGroup} = props
    return (
        <DialogWithContentAction
          dialogStatus={status ? true : false}
          dialogTitle={title}
          dialogContent={
            <Typography variant="subtitle2" gutterBottom>
            {txtContent}
            </Typography>
          }
          dialogActions={
            buttonGroup.map((item,index)=>{
              return (
                <Button key={index} onClick={item.func} color={item.color ? item.color : "primary"}>
                {item.text}
              </Button>
              )
            })
          }
      />
    );
}

DialogConfirm.defaultProps = {
  status:false,
  title: "请确认操作!",
  txtContent: '请选择确认或者取消!',
  buttonGroup: [{text:'确认',func:e => console.log(e)}]
};

DialogConfirm.propTypes = {
  title: PropTypes.string, 
  children: PropTypes.node,
  buttonGroup: PropTypes.array
};
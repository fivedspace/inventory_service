import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const options = [
    '图片',
    '视频',
    '音频',
    '文本',
    '整数',
    '小数'
];

export default function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, proper, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    const [property,setproperty] = React.useState(proper);
    const [id, setid] = React.useState(1);
  
    React.useEffect(() => {
      if (!open) {
        setValue(valueProp);
      }
    }, [valueProp, open]);
  
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
    const handleCancel = () => {
      onClose();
    };
    
    const handleOk = () => {
      setproperty((props) => {
        props.push({id: id, name:'', type: value, value: ''})
        return props
      })

      setid(++id);
      onClose(value,property);
    };
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
        <>
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntering: handleEntering }}
                aria-labelledby="confirmation-dialog-title"
                open={open}
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">选择属性类型</DialogTitle>
                <DialogContent dividers>
                  <RadioGroup
                      ref={radioGroupRef}
                      aria-label="ringtone"
                      name="ringtone"
                      value={value}
                      onChange={handleChange}
                  >
                      {options.map((option) => (
                        <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                      ))}
                  </RadioGroup>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleCancel} color="primary">取消</Button>
                  <Button onClick={handleOk} color="primary">确定</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};
  

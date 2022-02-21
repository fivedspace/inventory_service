import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "submodule/components/CustomButtons/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '25ch',
    },
  },
  input: {
    display: 'none',
  },
}));

export default function imageCut(props) {
  const classes = useStyles();
  const [item, setitem] = useState(props.cut);
  const { handleProperty, handleDelete, amend } = props;
  const [err, seterr] = useState(false);//输入框状态
  const [helperText, sethelperText] = useState('');//输入框提示语


  function uploadCutvalue (e){
    let val = e.target.value;
    if(val*1 % 1 != 0){
      sethelperText('请输入整数');
      seterr(true);
      return
    }
    sethelperText('');
    seterr(false);
    let data = Object.assign({},item, {value : val})
    setitem(data);
    handleProperty(data);
  }

  function uploadCutname (e){
    let val = e.target.value;
    let data = Object.assign({},item, {name : val})
    setitem(data);
    handleProperty(data);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="属性名" value={item.name} onChange={ uploadCutname } disabled={amend} />
      <TextField id="filled-basic" label="属性类型" variant="filled" value={item.type} disabled />
      <TextField
        id="outlined-number"
        label="属性值"
        type='number'
        variant="outlined"
        helperText={helperText}
        InputLabelProps={{
          shrink: true,
        }}
        value={item.value}
        onChange={ uploadCutvalue }
        error={err}
        disabled={amend}
      />
      <Button color={"danger"} onClick={ () => { handleDelete(item.id ? item.id : item.uuid) } } style={{ display: amend ? 'none' : 'inline-block' }}>删除</Button>
    </form>
  );
}
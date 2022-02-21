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

export default function videoCut(props) {
  const classes = useStyles();
  const [item, setitem] = useState(props.cut);
  const [fileUrl, setfileUrl] = useState('');
  const { handleProperty, handleDelete, amend } = props;

  useEffect(() => {
    if(item.value){
      setfileUrl(item.value)
    }
  },[])


  function uploadCutvalue (e){
    let val = e.target.files[0];
    const res = null;

    if(val){
      const url = URL.createObjectURL(val);
      setfileUrl(url);
      var reader = new FileReader();
      // 绑定load事件
      reader.onload = function(evt) {
        res = evt.target.result;
        let data = Object.assign({},item, {value : res})
        setitem(data);
        handleProperty(data);
      }
      // 读取File对象的数据
      reader.readAsDataURL(val);
    }
  }

  function uploadCutname (e){
    let val = e.target.value;
    let data = Object.assign({},item, {name : val})
    setitem(data);
    handleProperty(data);
  }
  
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="属性名" value={item.name} onChange={ uploadCutname } disabled={amend}/>
      <TextField id="filled-basic" label="属性类型" variant="filled" value={item.type} disabled />
      <>
        <input
          accept="audio/*"
          className={classes.input}
          id={ item.id ? item.id : item.uuid }
          multiple
          type="file"
          onChange={ uploadCutvalue }
        />
        <label htmlFor={ item.id ? item.id : item.uuid }>
          <Button variant="contained" color="primary" component="span" style={{ display: amend ? 'none' : 'inline-block' }}>
            选择文件
          </Button>
        </label>
      </>
      <Button color={"danger"} onClick={ () => { handleDelete(item.id ? item.id : item.uuid) } } style={{ display: amend ? 'none' : 'inline-block' }}>删除</Button>
      <div>
        <audio src={fileUrl} width={150} controls></audio>
      </div>
    </form>
  );
}
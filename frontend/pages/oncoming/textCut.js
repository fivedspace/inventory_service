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
  text: {
    width: 250,
    height: 100,
    resize: 'none'
  }
}));

export default function videoCut(props) {
  const classes = useStyles();
  const [item, setitem] = useState(props.cut);
  const [fileUrl, setfileUrl] = useState('');//文件路径
  const { handleProperty, handleDelete, amend } = props;

  useEffect(() => {
    setfileUrl(item.value)
  },[])

  function uploadCutvalue (e){
    let val = e.target.files[0];
    
    const reader = new FileReader();
    reader.readAsText(val)
    let fileContent = null;
    reader.onload = () => {
      fileContent = reader.result;
      setfileUrl(fileContent)

      let data = Object.assign({},item, {value : fileContent})
      setitem(data);
      handleProperty(data);
    };
  }

  function uploadCutname (e){
    let val = e.target.value;
    let data = Object.assign({},item, {name : val})
    setitem(data);
    handleProperty(data);
  }

  //修改文本内容
  function handleText (e){
    let val = e.target.value;

    let data = Object.assign({},item, {value : val})
    setitem(data);
    handleProperty(data);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="属性名" value={item.name} onChange={ uploadCutname } disabled={amend} />
      <TextField id="filled-basic" label="属性类型" variant="filled" value={item.type} disabled />
      <>
        <input
          accept="MIME_type"
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
        <textarea className={classes.text} value={fileUrl} onChange={ handleText } />
      </div>
    </form>
  );
}
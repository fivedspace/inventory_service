import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    maxWidth:160
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 70,
  },
}));
export default function DialogSelect(props) {
  const classes = useStyles();
  const {titleText,menuItemData,open,handleSelect,CloseSelect} = props;
  const [type, setType] = useState('address');
  const [value,setValue] = useState('')

  const handleChange = (event) => {
    setType(event.target.value || '');
  };

  const handleClose = (e) => {
    if(e){
      handleSelect(type,value)
    }else{
      CloseSelect()
    }
    setValue('')
  };
  const lists = (e)=>{
    let arr = []
    for(let i in e){
      arr.push(
        <MenuItem key={i} value={i}>{e[i]}</MenuItem>
        )
    }
    return arr
  }

  return (
    <div>
      <Dialog open={open} onClose={CloseSelect}>
        <DialogTitle>{titleText}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">类别</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={type}
                onChange={handleChange}
              >
                {
                  lists(menuItemData)
                }
              </Select>
            </FormControl>
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              label="搜索"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <SearchIcon />
                      </InputAdornment>
                  ),
              }}
              onChange={(e)=>{setValue(e.target.value)}}
              value={value}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose.bind(this,1)} color="primary">
            确定
          </Button>
          <Button onClick={handleClose.bind(this,0)} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

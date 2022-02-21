import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  dateTime: {
    marginTop: 8,
  },
  fullList: {
    width: "auto",
  },
  list: {
    width: 300,
    "& div": {
      fontSize: "14px",
    },
  },
  width: {
    width: "100%",
    marginTop: "10px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
}));
/** 查询时候的筛选条件组件*/
export default function FilterField(props) {
  const classes = useStyles();
  const { imports, exports } = props
  const { resetFilter, setResetFilter, importData } = imports
  if (exports()[importData[0]['id']] !== undefined) {//保留过滤字段修改状态
    importData.map(info => {
      if(info.type == 'textSection'){
        info['value'] = exports()[info['id']][0]
        info['extra'] = exports()[info['id']][1]
      }else{
        info['value'] = exports()[info['id']]
      }
    })
  }
  const FilterDetails = (props) => {//过滤字段
    const { data } = props;
    const [value, setValue] = useState(data.value ? data.value : '')
    const [extra,setExtra] = useState(data.extra ? data.extra:'')
    useEffect(() => {
      if (resetFilter) {//重置
        resetFilter.map(item => {//初始化状态
          if (data.id == item.id) {
            if(item.type == 'textSection'){
              setExtra(item.extra)
              exports(data.id, [item.value,item.extra])
            }else{
              exports(data.id, item.value)
            }
            setValue(item.value)
          }
        })
      }else{
        if(data.type == 'textSection'){
          exports(data.id, [data.value,data.extra])
        }else{
          exports(data.id, data.value)
        }
      }
    }, [])
    const valueChange = (e) => {//改变value状态事件
      setValue(e.target.value)
      setResetFilter(null)//初始化重置
      if(extra){
        exports(data.id, [e.target.value,extra])
      }
      exports(data.id, e.target.value)
    }

    const extraChange = (e)=>{
      setExtra(e.target.value)
      setResetFilter(null)//初始化重置
      exports(data.id,[value,e.target.value] )
    }

    let Label = null
    switch (data.type) {
      case 'date':
        Label = (
          <TextField
            className={classes.dateTime}
            id={data.id}
            label={data.label}
            type="date"
            variant="outlined"
            value={value}
            onChange={valueChange}
            InputLabelProps={{ shrink: true }}
          />
        );
        break;
      case 'radio':
        Label = (
          <RadioGroup
            aria-label="gender"
            row
            value={value}
            onChange={valueChange}
          >
            {(data.lists).map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio color="primary" />}
                  label={item.label}
                />
              );
            })}
          </RadioGroup>
        );
        break;
      case 'select':
        Label = (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">排序</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={valueChange}
            >
              {(data.lists).map((item) => {
                return (
                  <MenuItem key={item.field_name} value={item.field_name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
        break;
      case 'text':
        Label = (
          <TextField
            className={classes.dateTime}
            id={data.id}
            label={data.label}
            variant="outlined"
            value={value}
            onChange={valueChange}
            InputLabelProps={{ shrink: true }}
          />
        )
        break;
      case 'textSection':
        Label = <div style={{
          display:'flex',
          width:'187px',
          justifyContent:'space-between',
          height:'50px',
          lineHeight:'50px'
        }}>
          <TextField
            className={classes.dateTime}
            id={data.id}
            label={data.label}
            variant="outlined"
            value={value}
            onChange={valueChange}
            InputLabelProps={{ shrink: true}}
            inputProps={{
              style: {
                width:'50px',
                padding:'12.5px 14px'
              }
            }}
          />
          一一
          <TextField
            className={classes.dateTime}
            id={data.id}
            label={data.extraLabel}
            variant="outlined"
            value={extra}
            onChange={extraChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: {
                width:'50px',
                padding:'12.5px 14px'
              }
            }}
          />
        </div>
        break;
    }

    return (
      <>
        <Grid item className={classes.width}>
          <Typography>{data.titleText}</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            {Label}
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <Grid
      container
      className={clsx(classes.list, {
        [classes.fullList]: props.anchor === "top" || props.anchor === "bottom",
      })}
      role="presentation"
    >
      {
        importData.map((item, index) => {
          return (<FilterDetails data={item} key={index} />)
        })
      }
    </Grid>
  );
}
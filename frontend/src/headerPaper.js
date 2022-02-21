import React ,{useState,useEffect}from "react";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types'
import CustomInput from "submodule/components/CustomInput/CustomInput";
import DrawerFilter from 'submodule/components/Drawer/DrawerFilter'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: "flex",
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: "100%",
        height: "40%",
    },
    iconButton: {
        width:30,
        padding: 1,
        marginTop : 5,
        marginLeft : 10,
        marginRight : 10,
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        '&>div':{
            padding:"15px 0 10px 20px",
        },
        backgroundColor:'#fff',
        '&:before,&:after,&:hover:before,&:hover:after':{
            borderBottom:'0'
        },
        border: '0',
        '&:hover':{
            backgroundColor:'#fff'
        },
        fontSize:'14px',
        '&>div:focus': {
            backgroundColor:'#fff'
        }
    },
    formCon:{
        margin: 0,
        paddingBottom:0,
        '&>div':{
            marginTop:0
        },
        '&>div:after,&>div:before,&>div:hover:before':{
            borderBottom:0 +'!important',
        },
    }

}))

/** 查询页面的顶部展示条信息 */
export default function HeaderPapers(props){
    const classes = useStyles();
    const {placeholder,value,setValue,handleButtonClick,realTimeInput,
        selectList,selectMenuValue,drawerImport} = props.imports;
    const [selectValue, setSelectValue] = useState(selectList[0]['field_name']);
    useEffect(()=>{selectMenuValue(selectValue)},[])
    const selectChange = (event) => {
        setSelectValue(event.target.value);
        selectMenuValue(event.target.value)
    };
    return (
        <div>
            <Paper component="form" className={classes.root}>
                <FormControl variant="filled" className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        className={classes.selectEmpty}
                        value={selectValue}
                        onChange={selectChange}
                    >
                        {selectList.map(item=>{
                            return (
                                <MenuItem key={item.field_name} value={item.field_name}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <CustomInput 
                    className={classes.input}
                    id='input'
                    formControlProps={{
                        fullWidth: true,
                        className:classes.formCon
                    }}
                    inputProps={{
                        onChange: (e)=>{setValue(e.target.value.trim())},
                        value:value,
                        placeholder,
                        onInput:realTimeInput,
                    }}
                />
                {/* 查询图标 */}
                <IconButton onClick={handleButtonClick} title={"查询图标"} type="button" aria-label="search">
                    <SearchIcon />
                </IconButton>
                {/* 用于展示筛选组件的显示或隐藏*/}
                <IconButton title="筛选" color="primary" className={classes.iconButton} aria-label="directions">
                    <DrawerFilter imports={drawerImport}/>
                </IconButton>
            </Paper>
        </div>
    )
}

HeaderPapers.defaultProps = {
    placeholder : '查询内容',
    value : '',
    selectList : [{name:'用户id',field_name:'userid'}],
    selectMenuValue : ()=>{}
}
HeaderPapers.propTypes = {
    placeholder : PropTypes.string,// 输入框默认显示的值
    value : PropTypes.string,// 输入框的值
    setValue : PropTypes.func,
    handleButtonClick : PropTypes.func,// 搜索点击事件
    setOpen : PropTypes.func,// 侧边栏 显示事件
    selectList : PropTypes.array,// 下拉菜单 渲染数据 
    selectMenuValue : PropTypes.func// 下拉菜单选中的值
}
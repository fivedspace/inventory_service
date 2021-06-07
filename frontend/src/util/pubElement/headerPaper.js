import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=> ({
    root: {
        padding: '2px 4px',
        // display: 'inline-block',
        display: "flex",
        alignItems: 'center',
        width: "98%",
        // background:"rgba(100,100,100,0)"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: "50%",
        // background:"rgba(100,100,100,0)"
    },
    iconButton: {
        width:30,
        padding: 1,
        marginLeft : 10,
        marginRight : 10,
        // background : "#999",
    },
}))

/** 查询页面的顶部展示条信息 */
export default function HeaderPapers(props){

    const classes = useStyles();

    return (
        <div>
            <Paper component="form" className={classes.root}>
                {/*<Paper component="form" >*/}
                {/* InputBase 提供了一个输入框，输入标识信息查找一条信息 */}
                <InputBase
                    className={classes.input}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e)=>{props.setValue(e.target.value.trim())}}
                />
                {/* 查询图标 */}
                <IconButton onClick={props.handleButtonClick()} title={"查询"} type="button" aria-label="search">
                    <SearchIcon />
                </IconButton>

                {/* 用于展示筛选组件的显示或隐藏*/}
                <IconButton disabled={props.orderId ? true : false} onClick={()=>{props.setOpen()}} title="筛选" color="primary" className={classes.iconButton} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        </div>
    )

}
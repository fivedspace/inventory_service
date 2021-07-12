import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table/Table';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Newtype from "./Newtype";
import config from "../../config/config.json";
import axios from "axios";
import GridItem from "../../components/Grid/GridItem";
import Snackbar from "../../components/Snackbar/Snackbar";
import {AddAlert} from "_@material-ui_icons@4.11.2@@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    rightStyle: {
        textAlign: "right"
    },
    table: {
        minWidth: 650,
    },
}));

export default function Inputs(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);         //设置提示框的显示隐藏
    const [title, setTitle] = React.useState(true);        //标识 MerchantProfile组件的功能状态，true=>修改 ，false=>添加
    const [dialogTitle, setDialogTitle] = useState("查看公私钥")     //设置对话框提示内容
    const [abs, setAbs] = useState([]);
    const [zxc, setZxc] = useState({});
    const [type_id, setType_id] = useState({});

    const [tc, setTC] = React.useState(false);             //设置提示框的显示隐藏
    const [message, setMessage] = React.useState("");            //设置提示框的提示信息

    useEffect(()=>{
        headen()
    },[])

    //提示框
    const flagSnackbar = (messages) => {
        if (!tc) {
            setTC(true)
            setMessage(messages)
            setTimeout(function () {
                setTC(false);
                setMessage("")
            }, 6000);
        }
    }


    //修改删除按钮
    const change=(item,id)=>{
        return (
            <div>
                <Button variant="outlined" color="primary"
                        onClick={()=>{setDialogTitle("修改商户信息");
                            setOpen(true);
                            setTitle(true);
                            setType_id(id);
                            setZxc(item)}}>
                    修改
                </Button>
                <Button variant="outlined" color="secondary" onClick={()=>{Delete(id)}} style={{marginLeft:'10px'}}>
                    删除
                </Button>
            </div>
        )
    }

    //删除接口
    const Delete=(id)=>{
        // eslint-disable-next-line no-restricted-globals
        if(confirm('是否确认删除？')) {
            axios.delete(config.httpUrl2 + id)
                .then((res) => {
                    console.log(res.data)
                    flagSnackbar('删除成功')
                    window.history.go(0)
                })
                .catch((err) => {
                    flagSnackbar('此类型已被占用，无法删除')
                })
        }
    }

    //所有类型数据
    const headen = () => {
        axios.get( config.httpUrl1 )
            .then((res) => {
                setAbs(
                    res.data.type_list
                )
            })
            .catch((err) => {
                console.log('err')
            })
    }

    //列表渲染
    const tableData = () => {
        const tabData = [];
        const tableJson = abs;
        if (Array.isArray(tableJson) && tableJson.length) {
            for (let i = 0; i < tableJson.length; i++) {
                tabData.push(
                    [
                        i+1,
                        tableJson[i].type_id,
                        tableJson[i].type,
                        change(tableJson[i],tableJson[i].type_id)
                        // <SearchTwoToneIcon color="secondary" onClick={()=>{setMerchantOneItem(tableJson[i]);setOpen(true);setDialogTitle("查看公私钥")}} className={classes.pointer} titleAccess="查看公钥"/>
                    ]
                )
            }
        } else {
            tabData.push([
                tableJson.type_id,
                tableJson.type,
            ])
        }
        return tabData
    }

    //弹出框
    function dialogOpen(){
        setOpen(false);
        window.history.go(0);
    }

    return (
        <div style={{position:'relative',margin:'0px 50px'}}>
            {/*提示框*/}
            <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message={message}
                    open={tc}
                    closeNotification={() => setTC(false)}
                    close
                />
            </GridItem>
            {/*新增修改弹出框*/}
            <Dialog
                open={open}
                onClose={()=>{dialogOpen()}}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers>
                    {
                        dialogTitle === "查看公私钥"
                            ? (<div>
                                <h6>商品名称:</h6>
                                <DialogContentText>
                                </DialogContentText>
                                <h6>库存数量:</h6>
                                <DialogContentText>
                                </DialogContentText>
                                <h6>备注:</h6>
                                <DialogContentText>
                                </DialogContentText>
                            </div>)
                            : (<Newtype
                                // setMerchant={(item)=>{setMerchantOneItem(item)}} //传递当前选择的一条商户信息
                                query={zxc}
                                TypeId={type_id}
                                title={title}
                            />)
                        // 对话框显示新增修改入口
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>dialogOpen()} color="primary" variant="outlined">
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>
            {/*添加按钮*/}
            <div style={{position:'absolute',top:'-30px', right:'30px'}}>
                <div className={classes.rightStyle}>
                    <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("添加商品信息");setOpen(true);setTitle(false);}}>添加</Button>
                </div>
            </div>
            {/*列表渲染*/}
            <Table
                tableHead={['序号','类型ID','类型','操作']}
                tableData={tableData()}
            />
        </div>
    );
}

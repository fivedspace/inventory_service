import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table/Table';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Newtype from "./Newtype";
import config from "../../config/config.json";
import axios from "axios";


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


    useEffect(()=>{
        headen()
    },[])
    const change=(item,id)=>{
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("修改商户信息");setOpen(true);setTitle(true);setType_id(id);setZxc(item)}}>
                    修改
                </Button>
                <Button variant="outlined" color="secondary" onClick={()=>{Delete(id)}} style={{marginLeft:'10px'}}>
                    删除
                </Button>
            </div>
        )
    }

    const Delete=(id)=>{
        axios.delete(config.httpUrl2+id)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log('err')
            })
    }

    const headen = () => {
        axios.get( config.httpUrl1 )
            .then((res) => {
                console.log(res.data)
                setAbs(
                    res.data.type_list
                )
            })
            .catch((err) => {
                console.log('err')
            })
        // console.log(abs)
    }

    const tableData = () => {
        console.log(abs)
        const tabData = [];
        const tableJson = abs;
        if (Array.isArray(tableJson) && tableJson.length) {
            for (let i = 0; i < tableJson.length; i++) {
                tabData.push(
                    [
                        tableJson[i].type_id,
                        tableJson[i].type,
                        // tableJson[i].data_type,
                        // tableJson[i].spec_remark,
                        change(tableJson[i],tableJson[i].type_id)
                        // <SearchTwoToneIcon color="secondary" onClick={()=>{setMerchantOneItem(tableJson[i]);setOpen(true);setDialogTitle("查看公私钥")}} className={classes.pointer} titleAccess="查看公钥"/>
                    ]
                )
            }
        } else {
            tabData.push([
                tableJson.type_id,
                tableJson.type,
                // tableJson.data_type,
                // tableJson.spec_remark,
            ])
        }
        return tabData
    }
    function dialogOpen(){
        setOpen(false)
    }



    return (
        <div style={{position:'relative',margin:'0px 50px'}}>
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
            <div style={{boxSizing:'border-box',marginBottom:'50px'}}>
                <form className={classes.root}
                      style={{
                          width:'100%',
                          padding:'2px 4px',
                          display:'flex',
                          backgroundColor:'#ab47bc',
                      }}
                      noValidate autoComplete="off"
                >
                    <InputBase
                        className={classes.margin}
                        placeholder="全部商品"
                        style={{
                            // flex:'1',
                            backgroundColor:'white',
                            padding:'6px 0 7px 6px',
                            border:'1px solid black'
                        }}
                        fullWidth={true}
                        inputProps={{ 'aria-label': 'naked' }}
                    />
                </form>
            </div>
            <div style={{position:'absolute',top:'90px', right:'30px'}}>
                <div className={classes.rightStyle}>
                    <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("添加商品信息");setOpen(true);setTitle(false);}}>添加</Button>
                </div>
            </div>
            <Table
                tableHead={['序号','类型','操作']}
                tableData={tableData()}
            />
        </div>
    );
}

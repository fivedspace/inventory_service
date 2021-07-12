import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NewSpace from "./NewSpce";
import DialogActions from "@material-ui/core/DialogActions";
import Table from '../../components/Table/Table'
import config from "../../config/config.json";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    table: {
        minWidth: 650,
    },
}));



export default function Inputs() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);         //设置提示框的显示隐藏
    const [title, setTitle] = React.useState(true);        //标识 MerchantProfile组件的功能状态，true=>修改 ，false=>添加
    const [dialogTitle, setDialogTitle] = useState("查看公私钥");     //设置对话框提示内容
    const [abs, setAbs] = useState([]);
    const [zxc, setZxc] = useState({});
    const [pop, setPop] = useState({});

    useEffect(()=>{
        headen()
    },[])

    //修改按钮
    const change=(item,id)=>{
        return (
            <div>
                <Button variant="outlined" color="primary"  onClick={()=>{setPop(id);setDialogTitle("修改规格信息");setOpen(true);setTitle(true);setZxc(item)}}>
                    修改
                </Button>
            </div>
        )
    }

     //所有规格数据接口
     const headen = () => {
        axios.get( config.spec1 )
            .then((res) => {
                // console.log(res.data)
                setAbs(
                    res.data
                )
            })
            .catch((err) => {
                console.log('err')
            })
    }

    //列表渲染
    const tableData = () => {
        // console.log(abs)
        const tabData = [];
        const tableJson = abs;
        if (Array.isArray(tableJson) && tableJson.length) {
            for (let i = 0; i < tableJson.length; i++) {
                tabData.push(
                    [
                        i+1,
                        tableJson[i].spec_name,
                        tableJson[i].data_type,
                        tableJson[i].spec_remark,
                        change(tableJson[i],tableJson[i].spec_id)
                        // <SearchTwoToneIcon color="secondary" onClick={()=>{setMerchantOneItem(tableJson[i]);setOpen(true);setDialogTitle("查看公私钥")}} className={classes.pointer} titleAccess="查看公钥"/>
                    ]
                )
            }
        } else {
            tabData.push([
                tableJson.spec_id,
                tableJson.spec_name,
                tableJson.data_type,
                tableJson.spec_remark,
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
            {/*弹出框*/}
            <Dialog
                open={open}
                onClose={()=>{dialogOpen()}}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogContent dividers>
                    {
                        dialogTitle === "查看公私钥"
                            ? (<div>
                                <h6>规格名称:</h6>
                                <DialogContentText>
                                </DialogContentText>
                            </div>)
                            : (<NewSpace
                                // setMerchant={(item)=>{setMerchantOneItem(item)}} //传递当前选择的一条商户信息
                                query={zxc}
                                specId={pop}
                                title={title}
                            />)
                        // 对话框显示新增修改入口
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>dialogOpen()} color="primary" variant="outlined" >
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>
            {/*添加按钮*/}
            <div style={{position:'absolute',top:'-30px', right:'30px'}}>
                <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("添加规格信息");setOpen(true);setTitle(false);}}>
                    新增
                </Button>
            </div>
            {/*列表渲染*/}
            <Table
                tableHead={['序号','规格名称','规格数据类型','备注','操作']}
                tableData={tableData()}
            />
        </div>
    );
}

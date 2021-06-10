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

    useEffect(()=>{
        headen()
    },[])

    const change=(item)=>{
        return (
            <div>
                <Button variant="outlined" color="primary"  onClick={()=>{setDialogTitle("修改规格信息");setOpen(true);setTitle(true);setZxc(item)}}>
                    修改
                </Button>
            </div>
        )
    }

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
         // console.log(abs)
    }

    const tableData = () => {
        // console.log(abs)
        const tabData = [];
        const tableJson = abs;
        if (Array.isArray(tableJson) && tableJson.length) {
            for (let i = 0; i < tableJson.length; i++) {
                tabData.push(
                    [
                        tableJson[i].spec_id,
                        tableJson[i].spec_name,
                        tableJson[i].data_type,
                        tableJson[i].spec_remark,
                        change(tableJson[i])
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
                                <h6>规格名称:</h6>
                                <DialogContentText>
                                </DialogContentText>
                            </div>)
                            : (<NewSpace
                                // setMerchant={(item)=>{setMerchantOneItem(item)}} //传递当前选择的一条商户信息
                                query={zxc}
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
                        placeholder="全部规格"
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
                <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("添加规格信息");setOpen(true);setTitle(false);}}>
                    新增
                </Button>
            </div>

            <Table
                tableHead={['序号','规格名称','规格数据类型','备注','操作']}
                tableData={tableData()}
            />
        </div>
    );
}

import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table/Table';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Newpage from "./Newpage";


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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



// const rows = [
//     createData('1', '语文', '10', '教育系统',change()),
//     createData('2', '数学', '15', '教育系统',change()),
//     createData('3', '英语', '5', '教育系统',change()),
//     createData('4', '家政', '4', '家政系统',change()),
//     createData('5', '家政', '7', '家政系统',change()),
// ];

export default function Inputs(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);         //设置提示框的显示隐藏
    const [title, setTitle] = React.useState(true);        //标识 MerchantProfile组件的功能状态，true=>修改 ，false=>添加
    const [dialogTitle, setDialogTitle] = useState("查看公私钥")     //设置对话框提示内容

    function dialogOpen(){
        setOpen(false)
    }

    function change(){
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("修改商户信息");setOpen(true);setTitle(false);}}>
                    修改
                </Button>
                <Button variant="outlined" color="secondary" href="#outlined-buttons" style={{marginLeft:'10px'}}>
                    删除
                </Button>
            </div>
        )
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
                            : (<Newpage
                                // setMerchant={(item)=>{setMerchantOneItem(item)}} //传递当前选择的一条商户信息
                                // query={merchantOneItem}
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
                    <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("添加商户信息");setOpen(true);setTitle(false);}}>添加</Button>
                </div>
            </div>
            <Table
                tableHead={['序号','商品名称','库存数量','备注','操作']}
                tableData={[
                    [createData.name,createData.calories,createData.fat,createData.carbs,change()],
                    [createData.name,createData.calories,createData.fat,createData.carbs,createData.protein],
                    [createData.name,createData.calories,createData.fat,createData.carbs,createData.protein],
                    [createData.name,createData.calories,createData.fat,createData.carbs,createData.protein],
                    [createData.name,createData.calories,createData.fat,createData.carbs,createData.protein],
                    [createData.name,createData.calories,createData.fat,createData.carbs,createData.protein],
                ]}
            />
        </div>
    );
}

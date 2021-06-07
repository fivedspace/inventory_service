import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Newpage from './Newpage'



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

const rows = [
    createData('1', '语文', 200, '教育系统'),
    createData('2', '数学', 300, '教育系统'),
    createData('3', '家政', 15, '家政系统'),
    createData('4', '家政', 16, '家政系统'),
    createData('5', '英语', 160, '教育系统'),
];


export default function Inputs() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);         //设置提示框的显示隐藏
    const [title, setTitle] = React.useState(true);        //标识 MerchantProfile组件的功能状态，true=>修改 ，false=>添加
    const [dialogTitle, setDialogTitle] = useState("查看公私钥")     //设置对话框提示内容

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
                        defaultValue="添加商品"
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


            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>序号</TableCell>
                            <TableCell align="right">商品名称</TableCell>
                            <TableCell align="right">库存数量</TableCell>
                            <TableCell align="right">备注</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                {/*<TableCell align="right">{row.protein}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

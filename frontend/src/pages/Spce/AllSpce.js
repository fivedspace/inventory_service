import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NewSpace from "./NewSpce";
import DialogActions from "@material-ui/core/DialogActions";
import Table from '../../components/Table/Table'


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

function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs};
}

function change(){
    return (
        <div>
            <Button variant="outlined" color="primary" href="#outlined-buttons">
                修改
            </Button>
            <Button variant="outlined" color="secondary" href="#outlined-buttons" style={{marginLeft:'10px'}}>
                删除
            </Button>
        </div>
    )
}

const rows = [
    createData('1', '规格id', '规格名称', change()),
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
                                <h6>规格名称:</h6>
                                <DialogContentText>
                                </DialogContentText>
                            </div>)
                            : (<NewSpace
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
                        defaultValue="全部规格"
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
                <Button variant="outlined" color="primary" onClick={()=>{setDialogTitle("添加商户信息");setOpen(true);setTitle(false);}}>
                    新增
                </Button>
            </div>

            <Table
                tableHead={['序号','规格名称','规格数据类型','备注','操作']}
                tableData={[
                    ['1','名1','string','备注',change()],
                    [createData.name,createData.calories,createData.fat,createData.carbs],
                ]}
            />
            {/* <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">序号</TableCell>
                            <TableCell align="center">规格id</TableCell>
                            <TableCell align="center">规格名称</TableCell>
                            <TableCell align="center">备注</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </div>
    );
}

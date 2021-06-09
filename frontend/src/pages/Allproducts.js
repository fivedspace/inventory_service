import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '../components/Table/Table'


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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
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
    createData('1', '语文', '10', '教育系统',change()),
    createData('2', '数学', '15', '教育系统',change()),
    createData('3', '英语', '5', '教育系统',change()),
    createData('4', '家政', '4', '家政系统',change()),
    createData('5', '家政', '7', '家政系统',change()),
];

export default function Inputs(props) {
    const classes = useStyles();

    return (
        <div style={{position:'relative',margin:'0px 50px'}}>
            <div style={{boxSizing:'border-box',marginBottom:'50px'}}>
                <form className={classes.root}
                      style={{
                          width:'100%',
                          padding:'2px 4px',
                          display:'flex',
                          backgroundColor:'#eb81fd',
                      }}
                      noValidate autoComplete="off"
                >
                    <InputBase
                        className={classes.margin}
                        defaultValue="全部商品"
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

            <Table
                tableHead={['序号','商品名称','库存数量','备注','操作']}
                tableData={[
                    [createData.name,createData.calories,createData.fat,createData.carbs,createData.protein],
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

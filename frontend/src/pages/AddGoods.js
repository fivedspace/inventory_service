import React from 'react';
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

const rows = [
    createData('1', '语文', 200, '教育系统'),
    createData('2', '数学', 300, '教育系统'),
    createData('3', '家政', 15, '家政系统'),
    createData('4', '家政', 16, '家政系统'),
    createData('5', '英语', 160, '教育系统'),
];

export default function Inputs() {
    const classes = useStyles();

    return (
        <div style={{position:'relative',margin:'0px 50px'}}>
            {/*<div style={{margin:'20px 0px'}}>*/}
                {/*<a href="#" style={{*/}
                {/*    color:'#858585',*/}
                {/*    fontSize:'18px',*/}
                {/*    textDecoration:'none'*/}
                {/*}}>*/}
                {/*    <span>添加商品</span>*/}
                {/*</a>*/}
            {/*</div>*/}
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
                        fullWidth='true'
                        inputProps={{ 'aria-label': 'naked' }}
                    />
                </form>
            </div>
            <div style={{position:'absolute',top:'120px', right:'30px'}}>
                <Button variant="outlined" color="primary" href="#outlined-buttons">
                    新增
                </Button>
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

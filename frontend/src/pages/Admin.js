import React, { Component } from "react";
import axios from "axios";
import config from '../config/config.json';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const abs = '';
const rows = [
    createData('1', '规格id', '规格名称', 'asdas'),
];
export default class index extends Component {
    state = {
        abs: '',
    }
    headen = () => {
        axios({ url: config.spec1 })
            .then((res) => {
                console.log(res);
                this.setState({
                    abs: res.data[0].spec_id,
                    abb: res.data[0].spec_name,
                    abc: res.data[0].spec_remark,
                    abd: res.data[0].data_type
                })
                console.log(abs);
            })
            .catch((err) => {
                console.log('err')
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.headen}>点击</button>
                <div>{this.state.abs}</div>
                <div>{this.state.abb}</div>
                <div>{this.state.abc}</div>
                <div>{this.state.abd}</div>
                <div>{rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell component="th" scope="row" align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                        {/*<TableCell align="right">{row.protein}</TableCell>*/}
                    </TableRow>
                ))}</div>
            </div>
        )
    }
}
import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import styles from "../../assets/jss/style/components/tableStyle";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const classes = useStyles();
    /*
    * tableHead table共有多少列，以及每一列的名称
    * tableData 一个数组嵌套数组对象，展示每一行各列的数据
    * tableHeaderColor table的展示颜色
    * */
    const {tableHead, tableData, tableHeaderColor} = props;
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}
                                    >
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                {/* 遍历共有多少行的数据 */}
                {tableData !== undefined ? (
                    <TableBody>
                        {tableData.map((prop, key) => {
                            return (
                                <TableRow key={key} className={classes.tableBodyRow}>
                                    {/* 根据每一行遍历该行每一列的数据 */}
                                    {prop.map((item, key) => {
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                {item}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                ) : null}
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "primary"
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string)
};

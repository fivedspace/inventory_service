import {primary} from "../../util/theme";

const TableStyle = (theme) => ({
    table: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "transparent",
        borderSpacing: "0",
        borderCollapse: "collapse"
    },
    tableHeadCell: {
        color: primary,
        "&, &$tableCell": {
            fontSize: "1em"
        }
    },
    tableCell: {
        lineHeight: "1.42857143",
        padding: "12px 8px",
        verticalAlign: "middle",
        fontSize: "0.8125rem"
    },
    tableResponsive: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    tableHeadRow: {
        height: "56px",
        color: "inherit",
        display: "table-row",
        outline: "none",
        verticalAlign: "middle"
    },
    tableBodyRow: {
        height: "48px",
        color: "inherit",
        display: "table-row",
        outline: "none",
        verticalAlign: "middle"
    }
})
export default TableStyle
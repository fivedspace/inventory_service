import {
    defaultFont,
    container,
    primaryColor,
    grayColor
} from "../jss/material-dashboard-react";
import Background from '../images/sidebar-2.jpg'

const footerStyle = {
    block: {
        color: "inherit",
        padding: "15px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block",

        ...defaultFont,
        fontWeight: "500",
        fontSize: "15px",
    },
    left: {
        float: "left!important",
        display: "block",
    },
    right: {
        padding: "15px 0",
        margin: "0",
        fontSize: "14px",
        float: "right!important"
    },
    footer: {
        position:'relative',
        color:'#fff',
        ...defaultFont,
    },
    container,
    a: {
        textDecoration: "none",
    },

    list: {
        // marginBottom: "0",
        width: "100%",
        padding: "0",
        // marginTop: "0"
        margin: "auto",
        textAlign: "center",
    },
    inlineBlock: {
        display: "inline-block",
        padding: "10px",
        textAlign: "center",
    },
    TOPLoGo: {
        width: "100%",
        textAlign: "center",
        lineHeight: "50px",
        fontSize: 19,
        fontWeight: 1000,
        paddingLeft:'60px',
        borderBottom: "1px solid #505051"
    },
    bgt:{
        position:'absolute ',
        top:0,
        left: 0,
        height:'100vh',
        backgroundColor: 'rgba(0,0,0,.80)',
    },
    pick:{
        backgroundColor:'#00ACC1'
    },
};
export default footerStyle;

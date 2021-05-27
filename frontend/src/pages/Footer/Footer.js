/*eslint-disable*/
import React from "react";
// import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/css/FooterStyle/FooterStyle";

const useStyles = makeStyles(styles);

//底部导航栏

export default function Footer(props) {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/dashboard" className={classes.block}>
                                首页
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/orders" className={classes.block}>
                                订单管理
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/find_app" className={classes.block}>
                                系统管理
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/find_merchant" className={classes.block}>
                                商户管理
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/reconciliation" className={classes.block}>
                                对账
                            </a>
                        </ListItem>
                    </List>
                </div>
            </div>
        </footer>
    );
}

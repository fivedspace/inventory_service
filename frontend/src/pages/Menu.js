/*eslint-disable*/
import React from "react";
// import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../assets/css/menu.js";
import bgImage from '../assets/images/sidebar-2.jpg';

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    return (
        //侧边栏菜单选项
        <footer className={classes.footer}>
            <div className={classes.container}
                 style={{
                     height: '100vh',
                     background: `url("${bgImage}") center  / cover no-repeat`,
                 }}
            >
                <div className={classes.bgt}>
                    <div className={classes.left}>
                        <List className={classes.list}>
                            <ListItem className={classes.TOPLoGo}>
                                库存系统后台管理
                            </ListItem>
                            <ListItem className={classes.inlineBlock}
                            style={{
                                backgroundColor:'#00ACC1'
                            }}
                            >
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
            </div>
        </footer>
    );
}

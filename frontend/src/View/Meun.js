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
import routes from "./routes";

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
                            <ListItem className={classes.inlineBlock} style={{backgroundColor:'#00ACC1'}}>
                                <link to={ ' /admin/AllEchart ' + ' 1 ' }  activeClassName='active' className={classes.block}>
                                    首页
                                </link>
                                <NavLink></NavLink>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="/admin/Allproducts" className={classes.block}>
                                    全部商品
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="/admin/AllSpace" className={classes.block}>
                                    全部规格
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="/admin/AddGoods" className={classes.block}>
                                    添加商品
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="/admin/reconciliation" className={classes.block}>
                                    管理员管理
                                </a>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        </footer>
    );
}

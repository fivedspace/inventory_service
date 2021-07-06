/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/jss/style/components/footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/AllEchart" className={classes.block}>
                                首页
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/Allproducts" className={classes.block}>
                                商品管理
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/admin/Alltype" className={classes.block}>
                                类型管理
                            </a>
                        </ListItem>
                        {/*<ListItem className={classes.inlineBlock}>*/}
                        {/*    <a href="/admin/AllSpace" className={classes.block}>*/}
                        {/*        全部规格*/}
                        {/*    </a>*/}
                        {/*</ListItem>*/}
                    </List>
                </div>
            </div>
        </footer>
    );
}

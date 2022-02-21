/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/jss/style/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const { lists } = props;
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        {
                            lists.map((item, index) => {
                                return (
                                    <ListItem key={index} className={classes.inlineBlock}>
                                        <a href={item.href} className={classes.block}>
                                            {item.name}
                                        </a>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
            </div>
        </footer>
    );
}

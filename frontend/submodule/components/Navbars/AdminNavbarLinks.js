import React, { useState, useEffect } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/style/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
    const classes = useStyles();
    const [openProfile, setOpenProfile] = useState(null);
    const [viewWidth, setViewWidth] = useState(0)
    useEffect(() => { setViewWidth(window.innerWidth) }, [])
    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const handleCloseProfile = () => {
        setOpenProfile(null);
    };

    return (
        <div className={classes.manager}>
            <Button
                color={viewWidth > 959 ? "transparent" : "white"}
                justIcon={viewWidth > 959}
                simple={!(viewWidth > 959)}
                aria-owns={openProfile ? "profile-menu-list-grow" : null}
                aria-haspopup="true"
                onClick={handleClickProfile}
                className={classes.buttonLink}
            >
                <Person className={classes.icons} />
                <Hidden mdUp implementation="css">
                    <p className={classes.linkText}>Profile</p>
                </Hidden>
            </Button>
            <Poppers
                open={Boolean(openProfile)}
                anchorEl={openProfile}
                transition
                disablePortal
                className={
                    classNames({ [classes.popperClose]: !openProfile }) +
                    " " +
                    classes.popperNav
                }
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="profile-menu-list-grow"
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleCloseProfile}>
                                <MenuList role="menu">
                                    {
                                        props.lists.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    onClick={item.func}
                                                    className={classes.dropdownItem}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Poppers>
        </div>
    );
}

import React, { useState ,useEffect} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/style/components/headerStyle.js";

const useStyles = makeStyles(styles);
export default function Header(props) {
  const classes = useStyles();
  const [href,setHref] = useState('')

  useEffect(()=>{setHref(location.href)},[])

  function makeBrand() {
    let name;
    (props.routes).map(prop => {
      (prop.childRoute).map(item=>{
        if (href.indexOf(item.path) !== -1) {
          name = item.title;
        }
        return null;
      })
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks lists={props.lists} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

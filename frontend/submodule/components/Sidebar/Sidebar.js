import React ,{useEffect,useState}from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore,} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import styles from "../../assets/jss/style/components/sidebarStyle.js";
import Link from 'next/link'
// import {routes} from 'routes'
const useStyles = makeStyles(styles)
export default function SidebarCollapse(props) {
  const classes = useStyles();
  const { color, image, logoText ,routes} = props;
  const [href,setHref] = useState('')
  
  useEffect(()=>{setHref(location.href)},[])
  
  function activeRoute(routeName) {
      return href.indexOf(routeName) > -1 ? true : false;
    }
    
    /* 一个列表项以及子列表*/
  function ListItemChild(props) {
    const { item,color, childRoute, Icons } = props;
    const [open, setOpen] = useState(false)//标识当前选择项的的子项是否显示
    // useEffect(()=>{
    //   console.log(1);
    //   for(let i of childRoute){
    //     if(activeRoute(i.path)){
    //       setOpen(true)
    //     }
    //   }
    // },[open])

    return (
      <div style={{ color: "#000" }}>
        <ListItem
          button
          onClick={(e) => {e.stopPropagation() ;setOpen(!open) }}
        >
          <ListItemIcon className={classNames(classes.itemIcon, {
            [classes.itemIconRTL]: props.rtlActive
          })}>
            {Icons}
          </ListItemIcon>
          <ListItemText primary={item.primary} className={classNames(classes.itemText, {
            [classes.itemTextRTL]: props.rtlActive
          })}
          /> 
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className={classes.list}>
            {childRoute ? childRoute.map((prop, key) => {   //遍历路由信息，需要先注册到route中
              let activePro = " ";
              let listItemClasses;
              // console.log(prop.path);
              if(activeRoute(prop.path)){}
              if (prop.path === "/upgrade-to-pro") {
                activePro = classes.activePro + " ";
                listItemClasses = classNames({
                  [" " + classes[color]]: true
                });
              } else {
                listItemClasses = classNames({
                  [" " + classes[color]]: activeRoute(prop.path)
                });
              }
              return (
                <Link
                  href={prop.path}
                  className={activePro + classes.item}
                  key={key}
                  underline='none'
                >
                  <ListItem button className={classes.nested + listItemClasses}>
                    <ListItemText
                      primary={prop.name}
                      disableTypography={true}
                    />
                  </ListItem>
                </Link>
              );
            }) : null}
          </List>
        </Collapse>
      </div>
    )
  }

  /* 第一级列表项 */
  function ParentList(props) {
    const { color } = props

    return (
      <List className={classes.parentList}>
        {routes.map((item, key) => {
          return (
            <div style={{ color: "#000"}} key={key + "*"}>
              <ListItemChild
                index={key}
                item={item}
                childRoute={item.childRoute}
                color={color}
                Icons={item.icon} />
            </div>
          )
        })}
      </List>
    )
  }


  /* 左侧边栏头部展示*/
    let Brand = () => {
        return (
            <div className={classes.logo}>
                <div
                    className={classes.logoLink}
                >
                    {/*logo*/}
                    <div className={classes.logoImage} />
                    {/*logo文字*/}
                    {logoText}
                </div>
            </div>
        )
    };

  return (
    <div>
      {/* pe */}
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Brand/>
          <div className={classes.sidebarWrapper}>
          <ParentList color={color}  routes={routes}/>
          </div>
          <div
            className={classes.background}
            style={image ? { backgroundImage: `url(${image})` } : { backgroundColor: "#fff" }}
          />
        </Drawer>
      </Hidden>
      {/* pc */}
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
        {/* 头部 */}
          <Brand/>
        {/* 导航=列表 */}
          <div className={classes.sidebarWrapper}>
            <ParentList color={color} />
          </div>
        {/* 背景 */}
          <div
            className={classes.background}
            style={image ? { backgroundImage: `url(${image})` } : { backgroundColor: "#fff" }}
          />
        </Drawer>
      </Hidden>
    </div>
  );
}

SidebarCollapse.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// core components
import styles from "../../assets/jss/style/components/sidebarStyle.js";
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore,} from "@material-ui/icons";
// import InboxIcon from '@material-ui/icons/MoveToInbox';

// import {Dashboard} from "@material-ui/icons";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import {sidebarList,base_dashboard} from 'base/base'

const useStyles = makeStyles(styles);

/* 一个列表项以及子列表*/
function ListItemChild(props){

    const classes = useStyles();
    const {item,whiteFontClasses,color,childRoute, Icons} = props;

    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    const [open, setOpen] = React.useState(false)       //标识当前选择项的的子项是否显示

    return (
        <div style={{color:"white"}}>
            <ListItem
                button
                onClick={()=>{setOpen(!open)}}
            >
                <ListItemIcon className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                                   })}>
                    {/*<InboxIcon className={classes.itemIcon} fontSize="inherit"/>*/}
                    {/*<Icons />*/}

                    {Icons}
                </ListItemIcon>

                {/*<Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                        [classes.itemIconRTL]: props.rtlActive
                    })}
                >
                    {icon}
                </Icon>*/}

                {/*{typeof props.icon === "string" ? (
                    <Icon
                        className={classNames(classes.itemIcon, whiteFontClasses, {
                            [classes.itemIconRTL]: props.rtlActive
                        })}
                    >
                        {props.icon}
                    </Icon>
                ) : (
                    <prop.icon
                        className={classNames(classes.itemIcon, whiteFontClasses, {
                            [classes.itemIconRTL]: props.rtlActive
                        })}
                    />
                )}*/}

                <ListItemText primary={item.primary} className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive})}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {/*<LinksFun childRoute={childRoute} color={color} key={index}/>*/}
                <List className={classes.list}>
                    {childRoute ? childRoute.map((prop, key) => {   //遍历路由信息， 需要先注册到route中
                        let activePro = " ";
                        let listItemClasses;
                        if (prop.path === "/upgrade-to-pro") {
                            activePro = classes.activePro + " ";
                            listItemClasses = classNames({
                                [" " + classes[color]]: true
                            });
                        } else {
                            listItemClasses = classNames({
                                [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                            });
                        }
                        return (
                            <NavLink
                                to={prop.layout + prop.path }
                                className={activePro + classes.item}
                                activeClassName="active"
                                key={key}
                            >
                                <ListItem button className={classes.nested + listItemClasses}>
                                    <ListItemText
                                        primary={props.rtlActive ? prop.rtlName : prop.name}
                                        disableTypography={true}
                                    />
                                </ListItem>
                            </NavLink>
                        );
                    })  : null}
                </List>
            </Collapse>
        </div>
    )
}
ListItemChild.prototype = {
    item: PropTypes.object,
}

/*{typeof prop.icon === "string" ? (
    <Icon
        className={classNames(classes.itemIcon, whiteFontClasses, {
            [classes.itemIconRTL]: props.rtlActive
        })}
    >
        {prop.icon}
    </Icon>
) : (
    <prop.icon
        className={classNames(classes.itemIcon, whiteFontClasses, {
            [classes.itemIconRTL]: props.rtlActive
        })}
    />
)}*/


/* 第一级列表项 */
function ParentList(props){

    const {color} = props
    const classes = useStyles();
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    return (
        <List className={classes.parentList }>

            {
                base_dashboard.layout ?
                    <NavLink
                        to={base_dashboard.layout + base_dashboard.path }
                        className={classes.item}
                        activeClassName="active"
                    >
                        <ListItem button className={classes.nestedDashboard}>
                            <ListItemIcon className={classNames(classes.itemIcon, {
                                [classes.itemIconRTL]: props.rtlActive})}
                            >
                                {/*<Dashboard className={classes.itemIcon} fontSize="inherit"/>  /!* 单独展示一个首页导航项  *!/*/}
                                {base_dashboard.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={base_dashboard.name}
                                disableTypography={true}
                            />
                        </ListItem>
                    </NavLink>
                    :
                    null
            }

            {sidebarList.map((item,key)=>{
                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(item.primary)
                });
                return (
                    <div style={{color:"white"}} key={key+"*"}>
                        <ListItemChild index={key}
                                       item={item}
                                       childRoute={item.childRoute}
                                       whiteFontClasses={whiteFontClasses}
                                       color={color}
                                       Icons={item.icon}/>
                    </div>
                )
            })}
        </List>
    )
}

export default function SidebarCollapse(props) {
    const classes = useStyles();
    const {color, image, logoText} = props;

    /* 左侧边栏头部展示*/
    let brand = (
        <div className={classes.logo}>
            <div
                className={classNames(classes.logoLink, {
                    [classes.logoLinkRTL]: props.rtlActive
                })}
            >
                {/*logo*/}
                <div className={classes.logoImage}/>
                {/*logo文字*/}
                {logoText}
            </div>
        </div>
    );

    return (
        <div>
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
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {/*<AdminNavbarLinks/>*/}
                        {/*{links}*/}
                        {/*{parentList}*/}
                        <ParentList color={color}/>
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{backgroundImage: "url(" + image + ")"}}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {/*{links}*/}
                        {/*{links2}*/}
                        {/*{parentList}*/}
                        <ParentList color={color}/>
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{backgroundImage: "url(" + image + ")"}}
                        />
                    ) : null}
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


/*
*  问题1: 子组件接收父组件的数据 遍历对象的时候，map被认为是属性而不是函数名称
*  问题2: 在子组件中使用hook，为每一个组件定义独有的状态属性时候，无法使用set为其赋值，
*  问题3: 在遍历数组对象的时候，一定要确保该对象的引用值不为空或者 遍历前非空判断
*  */
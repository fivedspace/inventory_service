import React ,{useState,useEffect}from "react";
import {makeStyles} from "@material-ui/core/styles";
import Navbar from "/submodule/components/Navbars/Navbar";
import Footer from "/submodule/components/Footer/Footer";
import Sidebar from "/submodule/components/Sidebar/Sidebar";
import styles from "/assets/style/js/adminStyle";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PerfectScrollbar from "perfect-scrollbar";
import {getCookie,removeCookie} from '/submodule/util/cookie'
import Router from 'next/router'
import {routes} from "/routes";

const useStyles = makeStyles(styles);
const footerList = [
    {
        name:'仓库查询',
        href:'/repertory/queryRepertory'
    },
    {
        name:'货物查询',
        href:'/queryCargo/queryCargo'
    },
    {
        name:'应用系统查询',
        href:'/System/SystemQuery'
    },
]

// 进入该系统第一个加载的组件
export default function Admin({callback,...rest}) {
    const classes = useStyles();
    const mainPanel = React.createRef();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if(!getCookie('token')){
            Router.push('/userAuth/login')
        }
    }, []);

    const navbarList = [
        {
            name:'注销',
            func:navbarChange
        },
    ]
    function navbarChange (){
        removeCookie('token')
        Router.replace('/userAuth/login')
    }


    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"库存管理系统"} //侧边栏顶部提示信息
                handleDrawerToggle={handleDrawerToggle}  //抽屉侧边栏的显示隐藏的回调函数
                open={mobileOpen}  //侧边栏的显示和隐藏
                color={"primary"}
                {...rest}
            />
            {/*  除侧边栏之外的区域 */}
            <div className={classes.mainPanel} ref={mainPanel}>
                {/*  中间部分的头部展示组件 */}
                <Navbar
                    lists={navbarList}
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />
                {/*  路由后的组件展示  */}
                <div className={classes.content}>
                    <div className={classes.container}>{callback()}</div>
                </div>
                <Footer lists={footerList}/>
            </div>
        </div>
    );
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Route, Redirect,} from "react-router-dom";
import Footer from "../components/Footer/Footer.js";
import routes from "./routes";
import PerfectScrollbar from "perfect-scrollbar";
import Sidebar from "../components/Sidebar/Sidebar";
import bgImage from "../assets/images/sidebar-2.jpg";
import styles from "../assets/jss/style/layouts/adminStyle.js";
import Navbar from "../components/Navbars/Navbar.js";
import * as cookie from "react-cookies";
// import toSignIn from "../util/toSignIn/toSignIn";
import request from "../util/netWork/network";



let ps;

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        // history={}
                        // path={prop.layout + prop.path + "/:token"}
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
            return null;
        })}

        {/* ===========================================  */}
        {/*<Redirect from="/admin" to={cookie.load("token")? "/admin/AllEchart" : "/admin/pageView"} />*/}
        <Redirect from="/admin" to={cookie.load("token")? "/admin/AllEchart" : ""} />
    </Switch>
);

const useStyles = makeStyles(styles);

export default function Home({...rest}) {
// export default function Home(props) {
    const classes = useStyles();
    // const {...rest} = props
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image] = React.useState(bgImage);//侧边栏图片
    const [color] = React.useState("blue");//主题色
    // const [fixedClasses, setFixedClasses] = React.useState("dropdown");//主题设置功能开关
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // setImage(bgImage)
    // setColor(color)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };


    React.useEffect(() => {

        /**
         * 加载该组件时候，判断项目是否已经有过初始化操作 （第一个路由组件是否已经加载）
         * initInfo 第一次加载的时候保存到cookies中，用于判断组件加载进程
         * */
        // 正常情况，加载了第一个路由组件，initInfo，token将会存在
        if(cookie.load("initInfo") && cookie.load("token")) {
            // console.log("token===" + cookie.load("token"))
            // 当前组件作用是遍历所有路由，此时去验证token的有效性（项目中所有的页面在操作时候都将会加载该组件一次）
            request({url: "http://192.168.0.113:8008/token/auth?token="+cookie.load("token")}).then((res) => {
                console.log(res)
                if (res.data.status !== 200) {  //表示token过期/无效
                    // toSignIn(document.location.href, config.callbackUrl, config.publicKey, config.singleUrl)
                }
            })
            //当initInfo，token都不存在的时候（即访问该项目时候，直接输入非主页路由）或者只存在initInfo的时候（即到单点登录页面后，不登录直接输入当前系统的非主页路由）
            //以上两种情况都将跳过登录操作
        } else if((!cookie.load("initInfo") && !cookie.load("token")) || cookie.load("initInfo")){
            // 没有登录信息  直接去单点登录页面
            // toSignIn(document.location.href, config.callbackUrl, config.publicKey, config.singleUrl)
        }


        /**
         * 1. 实现访问过滤
         * 2. 部分页面需要token存在才可以访问
         * 3. 还有部分页面不需要token也可以直接访问
         *    当前为登录状态
         *    清空浏览器的用户登录信息后
         *    2946578538@qq.com   000000
         * */

        //初始化页面显示的总体架构
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };

        // 根据页面的完美滚动条（mainPanel）是否改变，来重新加载
    }, [mainPanel]);


    return (
        <div className={classes.wrapper}>
            {/*侧边栏*/}
            <Sidebar
                routes={routes}
                logoText={"库存服务管理界面"}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />


            <div className={classes.mainPanel} ref={mainPanel}>
                {/*头部*/}
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />

                {/* 引用遍历路由组件 */}
                <div className={classes.content}>
                    <div className={classes.container}>{switchRoutes}</div>
                </div>
                {/*页脚*/}
                <Footer/>
                {/*主题变更*/}
                {/*<FixedPlugin
                    handleImageClick={handleImageClick}
                    handleColorClick={handleColorClick}
                    bgColor={color}
                    bgImage={image}
                    handleFixedClick={handleFixedClick}
                    fixedClasses={fixedClasses}
                />*/}
            </div>
        </div>
    );
}

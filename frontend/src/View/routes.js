import HomeIcon from '@material-ui/icons/Home';
import ReorderIcon from '@material-ui/icons/Reorder';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AllEchart from "../pages/Echarts/AllEchart";
import Allproducts from "../pages/Goods/Allproducts";
import AllSpace from '../pages/Spce/AllSpce';
import AllType from '../pages/Type/Alltype';
import DetailsPage from "../pages/Goods/DetailsPage";
import Admin from '../pages/Admin';


// import View2Home from './views2/view2'


const dashboardRoutes = [
    {
        path: "/AllEchart",
        name: "首页",
        icon: HomeIcon,
        component: AllEchart,
        layout: "/admin"
    },
    {
        path: "/Allproducts",
        name: "全部商品",
        icon: ReorderIcon,
        component: Allproducts,
        layout: "/admin"
    },
    // {
    //     path: "/DetailsPage",
    //     name: "上传图片",
    //     icon: AssignmentIcon,
    //     component: DetailsPage,
    //     layout: "/admin"
    // },
    {
        path: "/AllType",
        name: "类型管理",
        icon: ReorderIcon,
        component: AllType,
        layout: "/admin"
    },
    {
        path: "/AllSpace",
        name: "全部规格",
        icon: AssessmentIcon,
        component: AllSpace,
        layout: "/admin",
    },
    // {
    //   path: "/pageView",
    //   name: "无权限可以访问的页面",
    //   icon: AssignmentIcon,
    //   components: View2Home,
    //   layout: "/admin"
    // }
];

export default dashboardRoutes;

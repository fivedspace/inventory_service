import HomeIcon from '@material-ui/icons/Home';
import ReorderIcon from '@material-ui/icons/Reorder';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddGoods from "../pages/AddGoods";
import AllEchart from "../pages/AllEchart";
import Allproducts from "../pages/Allproducts";


// import View2Home from './views2/view2'


const dashboardRoutes = [
    {
        path: "/AllEchart",
        name: "首页",
        icon: HomeIcon,
        component: AllEchart,
        layout: "/admin"
    },{
        path: "/Allproducts",
        name: "全部商品",
        icon: ReorderIcon,
        component: Allproducts,
        layout: "/admin"
    },{
        path: "/AddGoods",
        name: "全部规格",
        icon: AssessmentIcon,
        component: AddGoods,
        layout: "/admin",
    },
    // {
    //     path: "/find_merchant",
    //     name: "添加商品",
    //     icon: AssignmentIcon,
    //     component: MerchantList,
    //     layout: "/admin"
    // },{
    //     path: "/reconciliation",
    //     name: "管理员管理",
    //     icon: AssignmentIcon,
    //     component: Reconciliation,
    //     layout: "/admin"
    // },
    // {
    //   path: "/pageView",
    //   name: "无权限可以访问的页面",
    //   icon: AssignmentIcon,
    //   components: View2Home,
    //   layout: "/admin"
    // }
];

export default dashboardRoutes;

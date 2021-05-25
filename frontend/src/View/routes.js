import HomeIcon from '@material-ui/icons/Home';
import ReorderIcon from '@material-ui/icons/Reorder';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardPage from "views/Dashboard/Dashboard";
import MerchantList from "./views/Merchant/FindMerchant";
import Order from  "views/Order/Order"
import AppList from "./views/App/FindApp";
import Reconciliation from "./views/Reconciliation/Reconciliation";
// import View2Home from './views2/view2'


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "首页",
        icon: HomeIcon,
        component: DashboardPage,
        layout: "/admin"
    },{
        path: "/orders",
        name: "全部商品",
        icon: ReorderIcon,
        component: Order,
        layout: "/admin"
    },{
        path: "/find_app",
        name: "全部规格",
        icon: AssessmentIcon,
        component: AppList,
        layout: "/admin",
    }, {
        path: "/find_merchant",
        name: "添加商品",
        icon: AssignmentIcon,
        component: MerchantList,
        layout: "/admin"
    },{
        path: "/reconciliation",
        name: "管理员管理",
        icon: AssignmentIcon,
        component: Reconciliation,
        layout: "/admin"
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

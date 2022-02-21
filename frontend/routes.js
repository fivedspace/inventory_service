import ReorderIcon from '@material-ui/icons/Reorder';
import AirplayIcon from '@material-ui/icons/Airplay';
import AssessmentIcon from '@material-ui/icons/Assessment'

const routes = [
    {
        primary:"仓库管理", 
        icon:<AirplayIcon />,
        childRoute: [
            {path:"/repertory/repertory", name:"新增仓库",title:'新增仓库'},
            {path:"/repertory/queryRepertory", name:"查询仓库",title:'查询仓库'}
        ]
    },
    {
        primary:"库存管理", 
        icon:<ReorderIcon />, 
        childRoute: [
            {path:"/oncoming/oncoming", name:"货物入库",title:'货物入库'},
            {path:"/queryCargo/queryCargo", name:"查询货物",title:'查询货物'}
        ]
    },
    {
        primary: "系统管理",
        icon: <AssessmentIcon/>,
        childRoute: [
            {path: "/System/SystemAdd", name: "系统添加", title: '系统添加'},
            {path: "/System/SystemQuery", name: "系统查询", title: '系统查询'},]
    }
];

export {routes};
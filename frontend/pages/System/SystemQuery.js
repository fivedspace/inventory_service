import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DirectionsIcon from "@material-ui/icons/Directions";
import Button from "submodule/components/CustomButtons/Button";
import GridContainer from "submodule/components/Grid/GridContainer";
import GridItem from "submodule/components/Grid/GridItemPc";
import Pagination from "submodule/components/Pagination/Pagination";
import Card from "submodule/components/Card/Card";
import CardHeader from "submodule/components/Card/CardHeader";
import CardBody from "submodule/components/Card/CardBody";
import Table from "submodule/components/Table/Table";
import CardFooter from "submodule/components/Card/CardFooter";
import Prompt from "submodule/components/Prompt/Prompt";
import Dialog from 'submodule/components/Dialog/DialogConfirm'
import Details from "submodule/components/Details/Details";
import Filter from 'submodule/components/FilterField/FilterField'
import HeaderPapers from "src/headerPaper";
import Admin from 'src/layout/Admin'
import {request} from "submodule/networks/request";

const useStyles = makeStyles(() => ({
    pointer: {
        cursor: "pointer",
    },
    grids: {minWidth: 130, textAlign: "center"},
}));
export default function SystemQuery() {
    const classes = useStyles();
    //初始数据
    const tableList = [//表头数据
        "应用系统id",
        "系统名称",
        "管理员",
        "管理员电话",
        "邮箱",
        "创建时间",
        "更新时间",
        '操作选择'
    ]
    const selectData = [//下拉菜单数据
        {name: 'ID', field_name: 'id'},
        {name: '系统名称', field_name: 'name'},
        {name: '管理员', field_name: 'admin_name'},
        {name: '管理员电话', field_name: 'admin_phone'},
    ]
    const filterFieldData = [//过滤字段数据
        {
            type: "date",
            titleText: "选择创建时间",
            id: "created_at",
            label: "创建时间",
            value: "",
        },
        {
            type: "date",
            titleText: "选择更新时间",
            id: "updated_at",
            label: "更新时间",
            value: "",
        },
        {
            type: "radio",
            titleText: "选择升降序",
            id: "direction",
            value: "desc",
            lists: [
                {value: "desc", label: "降序"},
                {value: "asc", label: "升序"},
            ],
        },
        {
            type: "select",
            titleText: "选择排序方式",
            id: "field_name",
            value: "id",
            lists: [
                {name: "应用系统id", field_name: "id"},
                {name: "系统名称", field_name: "name"},
                {name: "管理员", field_name: "admin_name"},
                {name: "管理员电话", field_name: "admin_phone"},
                {name: "邮箱", field_name: "email"},
                {name: "创建时间", field_name: "created_at"},
                {name: "更新时间", field_name: "updated_at"},
            ],
        },
    ]
    //弹窗与对话框
    const [hint, setHint] = useState({open: false, severity: 'success', message: '提示信息!'});//弹窗状态
    const [dialogOpen, setDialogOpen] = useState(false);//对话框
    const buttonGroup = [//对话框中的按钮
        {text: '确认', func: removeMachines},
        {
            text: '取消', func: () => {
                setDialogOpen(false)
            }
        },
    ]
    //当前页状态
    const [pageCount, setPageCount] = useState(1);//设置总页数
    const [pageItems, setPageItems] = useState([]);//当前页的初始数据
    const [page, setPage] = useState(1);//页码
    //详情状态
    const [detailData, setDetailData] = useState({})//详情中返回所有输入框的值
    const [disabled, setDisabled] = useState(true);//详情输入框禁用
    const [type, setType] = useState(false);//切换详情状态
    const [dataVal, setDataVal] = useState(null);//详情显示数据
    const detailButtons = [//详情提交按钮
        {name: (disabled ? '修改' : '提交'), func: submit, color: (disabled ? 'danger' : 'primary')},
        {
            name: '返回主机页面', func: () => {
                setType(false);
                setDisabled(true)
            }
        }
    ]
    const detailInputs = [//详情组件数据
        {help_text: "", labelText: "应用系统id", id: "id", name: "id", value: (dataVal ? dataVal[1].id : ''), disabled:true},
        {help_text: "", labelText: "系统名称", id: "name", name: "name", value: (dataVal ? dataVal[1].name : ''), disabled},
        {
            help_text: "",
            labelText: "管理员",
            id: "admin_name",
            name: "admin_name",
            value: (dataVal ? dataVal[1].admin_name : ''),
            disabled
        },
        {
            help_text: "",
            labelText: "管理员电话",
            id: "admin_phone",
            name: "admin_phone",
            value: (dataVal ? dataVal[1].admin_phone : ''),
            disabled
        },
        {
            help_text: "",
            labelText: "系统key",
            id: "key",
            name: "key",
            value: (dataVal ? dataVal[1].key : ''),
            disabled
        },
        {
            help_text: "",
            labelText: "系统Ip",
            id: "ip",
            name: "ip",
            value: (dataVal ? dataVal[1].ip : ''),
            disabled
        },
        {
            help_text: "",
            labelText: "邮箱",
            id: "email",
            name: "email",
            value: (dataVal ? dataVal[1].email : ''),
            disabled
        },
        {
            help_text: "",
            labelText: "备注",
            id: "remark",
            name: "remark",
            value: (dataVal ? dataVal[1].remark : ''),
            disabled
        },
        {
            help_text: "",
            labelText: "创建时间",
            id: "created_at",
            name: "created_at",
            value: (dataVal ? dataVal[1].created_at : ''),
            disabled: true
        },
        {
            help_text: "",
            labelText: "更新时间",
            id: "updated_at",
            name: "updated_at",
            value: (dataVal ? dataVal[1].updated_at : ''),
            disabled: true
        },
    ]
    //过滤状态
    const [filterData, setFilterData] = useState({});//过滤组件中返回的所有过滤状态的值
    const [filterField] = useState([...filterFieldData]);//过滤组件中
    const [empty, setEmpty] = useState(null);//重置过滤条件
    const [baseInputValue, setBaseInputValue] = useState("");//搜索输入框中的值
    const [selectValue, setSelectValue] = useState('name');//下拉菜单中的值

    //初次加载
    useEffect(() => {
        requestPackage({creatRequest: true})
    }, [])

    //弹窗方法
    function hintOpen(message, severity) {//弹窗
        setHint({open: true, severity, message});
    }


    function fieldList() {//过滤的字段
        return (
            <Filter
                imports={{
                    resetFilter: empty,
                    setResetFilter: setEmpty,
                    importData: filterField
                }}
                exports={filterExport}
            />
        )
    }


    function filterExport(id, value) {//过滤组件导出数据
        if (id) {
            setFilterData(event => {
                event[id] = value
                return event
            })
        }
        return filterData
    }

    function reset() {//重置事件
        requestPackage({creatRequest: true})
    }

    function ascertain() {//过滤确认事件
        let data = ''
        if (baseInputValue) {
            data = {'value': baseInputValue, 'field_name': selectValue}
        }
        requestPackage({inquire: data})
    }

    function selectMenuChange(e) {//下拉菜单事件
        setSelectValue(e);
    }

    function realTimeInput(e) {//清空输入框时重新加载数据
        !(e.target.value).length ? requestPackage({creatRequest: true}) : '';
    }

    function handleButtonClick() {//根据输入的条件查询数据
        if (baseInputValue) {
            requestPackage({inquire: {'value': baseInputValue, 'field_name': selectValue}, pageValue: 1})
        } else {
            hintOpen('请输入查询内容', 'warning')
        }
    }


    function dtailExport(id, value) {//详情组件导出数据
        if (id) {
            setDetailData(event => {
                event[id] = value
                return event
            })
        }
        return detailData
    }

    async function submit() {//提交修改
        if (disabled) {
            setDisabled(false);
            return
        }
        const {id, name, admin_name, admin_phone, email, key, ip, remark} = detailData
        if (name && admin_name && admin_phone && email && key && ip && remark) {
            const [res, err] = await request.put(`/application/${id}`,{
                "name": name,
                "key": key,
                "email": email,
                "admin_name": admin_name,
                "admin_phone": admin_phone,
                "ip": ip,
                "remark": remark
            })
            if (res) {
                res.created_at = (res.created_at ? res.created_at.replace('T', ' ') : '一')
                res.updated_at = (res.updated_at ? res.updated_at.replace('T', ' ') : '一')
                hintOpen('修改成功', 'success')
                setDataVal([dataVal[0], res])
                requestData(res)
            } else {
                hintOpen(err, 'error')
            }
        } else {
            hintOpen("请按提示信息正确录入系统信息!", 'warning')
        }
    }

    //页面操作方法
    function ButtonItems(i) {//操作按钮
        return (
            <Grid className={classes.grids} key={i[0]}>
                <Button color={"primary"} size="sm" className={classes.pointer}
                        onClick={() => {
                            setType(true);
                            setDataVal([i[1], i[2]])
                        }}>详情</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="danger" size="sm" onClick={() => {
                    setDialogOpen(i)
                }}>删除</Button>
            </Grid>
        )
    }

    function requestData(i) {//修改数据
        setPageItems((e) => {
            e.splice(dataVal[0], 1, i)
            return e
        })
    }

    async function removeMachines() {//删除事件
        const [res, err] = await request.delete(`/application/${dialogOpen[0]}`).req_result()
        // console.log(dialogOpen[0])
        // console.log(res, err)
        // return
        if (res) {
            // console.log(res.msg)
            // return
            if (res.msg === "删除成功") {
                pageItems.splice(dialogOpen[1], 1)
                hintOpen('删除成功', 'success')
            }
        } else {
            hintOpen(err, 'error')
        }
        setDialogOpen(false)
    }

    //页面方法
    function PaginationChange(e, value) {//页码
        setPage(value)
        requestPackage({pageValue: value})
    }

    function tableData() {//将数组对象列表转换为数组包含数组的形式,table组件所接受的数据结构
        const tab_data = [];
        if (Array.isArray(pageItems) && pageItems.length) {
            for (let i = 0; i < pageItems.length; i++) {
                tab_data.push(
                    [
                        pageItems[i].id,//主机id
                        pageItems[i].name,//系统名称
                        pageItems[i].admin_name,//管理员
                        pageItems[i].admin_phone,//管理员电话
                        pageItems[i].email,//邮箱
                        pageItems[i].created_at,//创建时间
                        pageItems[i].updated_at,//更新时间
                        ButtonItems([pageItems[i].id, i, pageItems[i]])//操作
                    ]
                )
            }
        }
        return tab_data;
    }

    async function requestPackage(props) {//封装请求
        let {creatRequest, inquire, pageValue} = props,
            filter = [];
        const {created_at, updated_at, direction, field_name} = filterData
        if (inquire) {
            filter = [{"fieldname": inquire.field_name, "option": "like", 'value': `%${inquire.value}%`}]
        }
        if (updated_at) {
            filter.push({"fieldname": 'updated_at', "option": "like", "value": `%${updated_at}%`})
        }
        if (created_at) {
            filter.push({"fieldname": 'created_at', "option": "like", "value": `%${created_at}%`})
        }
        const [res, err] = await request.get('/application',{
            params: (creatRequest ? '' : {
                paginate: JSON.stringify({"page": (pageValue ? pageValue : page), "limit": 10}),
                filter: JSON.stringify(filter),
                sort: JSON.stringify([{
                    "field": (field_name ? field_name : 'id'),
                    "direction": direction ? direction : 'desc'
                }])
            })
        }).req_result()
        if (res) {
            let {data} = res
            // console.log(res.data)
            let arr = data.map((item) => {
                return {
                    id: item.id,//应用系统id
                    created_at: (item.created_at).replace('T', ' '),//创建时间
                    name: item.name,//系统名称
                    updated_at: (item.updated_at).replace('T', ' '),//更新时间
                    admin_name: item.admin_name,//管理员名字
                    admin_phone: item.admin_phone,//管理员电话
                    email: item.email,//邮箱
                    ip: item.ip,//邮箱
                    remark: item.remark,//邮箱
                    key: item.key,
                }
            })
            if (creatRequest) {
                setBaseInputValue('')
                setEmpty(filterFieldData)
            }
            // console.log(res.page_count)
            setPageCount(res.page_count)
            setPageItems(arr)
        } else {
            hintOpen(err, 'error')
        }
    }

    return (
        <Admin
            callback={() => {
                return (
                    <>
                        {
                            type ? (//详情组件
                                <Details
                                    imports={{
                                        titleText: '修改系统',
                                        detailButtons,
                                        detailInputs,
                                    }}
                                    exports={dtailExport}
                                />
                            ) : (//查询页面
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card plain>
                                            <CardHeader color="primary">
                                                {/*过滤组件*/}
                                                <HeaderPapers imports={{
                                                    value: baseInputValue,//搜索输入框中的值
                                                    setValue: (e) => {
                                                        setBaseInputValue(e)
                                                    },//获取查询时候，用户录入的筛选条件
                                                    handleButtonClick,//搜索点击事件
                                                    selectList: selectData,//下拉菜单中的数据
                                                    selectMenuValue: selectMenuChange,//下拉菜单选中的值
                                                    realTimeInput,
                                                    drawerImport: {
                                                        fieldList,//过滤字段
                                                        drawerShape: "right",//抽屉划出方向
                                                        ascertain,//过滤确认
                                                        reset,//重置
                                                        DirectionsIcon: () => {
                                                            return <DirectionsIcon/>
                                                        }
                                                    },//过滤数据
                                                    placeholder: '请搜索要查询的内容'
                                                }}/>
                                            </CardHeader>
                                            <CardBody>
                                                <Table
                                                    tableHeaderColor={"primary"}
                                                    tableHead={tableList}
                                                    tableData={pageItems ? tableData() : []}
                                                />
                                            </CardBody>
                                            <CardFooter>
                                                {pageItems.length ? (
                                                    <Pagination
                                                        onChange={PaginationChange}
                                                        page={page}
                                                        count={pageCount}
                                                    />
                                                ) : (
                                                    <h3 style={{margin: "0 auto"}}>没 有 数 据 了</h3>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            )
                        }
                        <Prompt
                            handleClose={() => {
                                setHint({
                                    open: false,
                                    severity: hint.severity,
                                    message: hint.message,
                                });
                            }}
                            {...hint}
                        />
                        <Dialog
                            status={dialogOpen}
                            txtContent="请确认是否要删除此数据？"
                            buttonGroup={buttonGroup}
                        />
                    </>
                )
            }}
        />
    );
}
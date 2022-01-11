import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table/Table';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Newpage from "./Newpage";
import DetailsPage from "./DetailsPage";
import config from "../../config/config.json";
import axios from "axios";
import Home from "../../View/Home";
import { Route } from "react-router-dom";
import Snackbar from "../../components/Snackbar/Snackbar";
import {AddAlert} from "_@material-ui_icons@4.11.2@@material-ui/icons";
import GridItem from "../../components/Grid/GridItem";
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    rightStyle: {
        textAlign: "right"
    },
    table: {
        minWidth: 650,
    },
}));

export default function Inputs(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);         //设置提示框的显示隐藏
    const [openq, setOpenq] = React.useState(false);         //设置提示框的显示隐藏
    const [title, setTitle] = React.useState(true);        //标识 MerchantProfile组件的功能状态，true=>修改 ，false=>添加
    const [titleq, setTitleq] = React.useState(true);        //标识 MerchantProfile组件的功能状态，true=>修改 ，false=>添加
    const [dialogTitle, setDialogTitle] = useState("查看公私钥")     //设置对话框提示内容
    const [dialogTitleq, setDialogTitleq] = useState("查看公私钥")     //设置对话框提示内容
    const [abs, setAbs] = useState([]);
    const [proId, setProId] = useState({});
    const [pro, setPro] = useState({});
    const [det, setDet] = useState({});

    const [tc, setTC] = React.useState(false);             //设置提示框的显示隐藏
    const [message, setMessage] = React.useState("");            //设置提示框的提示信息

    const [pag, setPag] = useState([]);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        // headen();
        PAGE(page)
    }, [])

    const handlePageChange = (event,value) => {
        setPage(value)
        PAGE(value)
    }

    //分页接口
    const PAGE = (a) => {
        axios.get(config.httpUrlpro, {
            params: {
                page: a,
                limit: 8,
            }
        })
            .then((res) => {
                // console.log(res.data)
                setAbs(
                    res.data.data,
                );
                setPag(
                    res.data.page_count
                )
            })
            .catch((err) => {
                console.log('err')
            })
    }

    //提示框
    const flagSnackbar = (messages) => {
        if (!tc) {
            setTC(true)
            setMessage(messages)
            setTimeout(function () {
                setTC(false);
                setMessage("")
            }, 6000);
        }
    }

    //修改删除按钮
    const change = (item, id) => {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={() => {
                    setDialogTitle("修改商品信息");
                    setOpen(true);
                    setTitle(true);
                    setProId(id);
                    setPro(item)
                }}>
                    修改
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => { Delete(id) }}
                    style={{ marginLeft: '10px' }}>
                    删除
                </Button>
            </div>
        )
    }

    //删除接口
    const Delete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm('是否确认删除？')) {
            axios.delete(config.httpUrlpro1 + id)
                .then((res) => {
                    console.log(res.data);
                    flagSnackbar('删除成功')
                    window.history.go(0)

                })
                .catch((err) => {
                    console.log('err')
                })
        }

    }

    const inputData = useRef(null);

    //所有商品数据接口
    // const headen = () => {
    //     axios.get(config.httpUrlpro1)
    //         .then((res) => {
    //             setAbs(
    //                 res.data
    //             )
    //         })
    //         .catch((err) => {
    //             console.log('err')
    //         })
    // }

    //详情页按钮
    const details = (id) => {
        return (
            <div>
                <Button variant="outlined" color="inherit" onClick={() => {
                    // deta(id);
                    setDet(id)
                    setDialogTitleq("修改商品信息");
                    setOpenq(true);
                    setTitleq(false);
                }}>详情</Button>
            </div>
        )
    }

    //列表数据渲染
    const tableData = () => {
        // console.log(abs)
        const tabData = [];
        const tableJson = abs;
        if (Array.isArray(tableJson) && tableJson.length) {
            for (let i = 0; i < tableJson.length; i++) {
                tabData.push(
                    [
                        i + 1,
                        // tableJson[i].commodity_id,
                        tableJson[i].commodity_name,
                        tableJson[i].quantity_in_stock,
                        tableJson[i].remark,
                        change(tableJson[i], tableJson[i].commodity_id),
                        details(tableJson[i].commodity_id)
                        // <SearchTwoToneIcon color="secondary" onClick={()=>{setMerchantOneItem(tableJson[i]);setOpen(true);setDialogTitle("查看公私钥")}} className={classes.pointer} titleAccess="查看公钥"/>
                    ]
                )
            }
        } else {
            tabData.push([
                tableJson.commodity_name,
                tableJson.quantity_in_stock,
                tableJson.remark,
            ])
        }
        return tabData
    }

    //弹出框
    function dialogOpen() {
        setOpen(false);
        setOpenq(false);
        window.history.go(0);
    }
    function dialogOpenq() {
        setOpenq(false);
    }

    return (
        <div style={{ position: 'relative', margin: '0px 50px' }}>
            {/*提示框*/}
            <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message={message}
                    open={tc}
                    closeNotification={() => setTC(false)}
                    close
                />
            </GridItem>

            {/*删除修改页*/}
            <Dialog
                open={open}
                onClose={() => { dialogOpen() }}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers>
                    {
                        dialogTitle === "查看公私钥"
                            ? (<div>
                                <h6>商品名称:</h6>
                                <DialogContentText>
                                </DialogContentText>
                                <h6>库存数量:</h6>
                                <DialogContentText>
                                </DialogContentText>
                                <h6>备注:</h6>
                                <DialogContentText>
                                </DialogContentText>
                            </div>)
                            : (<Newpage
                                // setMerchant={(item)=>{setMerchantOneItem(item)}} //传递当前选择的一条商户信息
                                // query={merchantOneItem}
                                query={pro}
                                proId={proId}
                                title={title}
                            />)
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dialogOpen()} color="primary" variant="outlined">
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>

            {/*详情页*/}
            <Dialog
                open={openq}
                onClose={() => { dialogOpen() }}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers>
                    {
                        dialogTitleq === "查看公私钥"
                            ? (<div>
                                <h6>商品名称:</h6>
                                <DialogContentText>
                                </DialogContentText>
                                <h6>库存数量:</h6>
                                <DialogContentText>
                                </DialogContentText>
                                <h6>备注:</h6>
                                <DialogContentText>
                                </DialogContentText>
                            </div>)
                            : (<DetailsPage
                                // setMerchant={(item)=>{setMerchantOneItem(item)}} //传递当前选择的一条商户信息
                                // query={merchantOneItem}
                                query={det}
                                title={titleq}
                            />)
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dialogOpenq()} color="primary" variant="outlined">
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{ boxSizing: 'border-box', marginBottom: '50px' }}>
                {/*输入框*/}
                <div className={classes.root}
                    style={{
                        width: '100%',
                        padding: '2px 4px',
                        display: 'flex',
                        backgroundColor: '#ab47bc',
                    }}
                    noValidate autoComplete="off"
                >
                    <InputBase
                        className={classes.margin}
                        placeholder="请输入类型管理中的类型ID查询"
                        style={{
                            // flex:'1',
                            backgroundColor: 'white',
                            padding: '6px 0 7px 6px',
                            border: '1px solid black'
                        }}
                        fullWidth={true}
                        inputProps={{ 'aria-label': 'naked' }}
                        onKeyDown={(data) => {
                            if (data.key === 'Enter') {
                                console.log(inputData.current.lastChild.value);
                                const typeid = inputData.current.lastChild.value;
                                axios.get(config.httpUrlType + '?type_id=' + typeid, { headers: {} })
                                    .then((res) => {
                                        console.log(res)
                                        setAbs(res.data)
                                    })
                                    .catch((err) => {
                                        console.log('err')
                                    })
                            }
                        }}
                        ref={inputData}
                    />
                </div>
            </div>

            {/*添加按钮*/}
            <div style={{ position: 'absolute', top: '90px', right: '30px' }}>
                <div className={classes.rightStyle}>
                    <Button variant="outlined" color="primary" onClick={() => { setDialogTitle("添加商品信息"); setOpen(true); setTitle(false); }}>添加</Button>
                </div>
            </div>

            {/*列表渲染*/}
            <Table
                tableHead={['序号', '商品名称', '库存数量', '备注', '操作', '详情']}
                tableData={tableData()}
            />

            {/*分页*/}
            <div className={classes.root}>
                <Pagination count={pag} variant="outlined" color="primary"
                            onChange={handlePageChange}
                />
                <span>共 {pag} 页</span>
                <span>当前第 {page} 页</span>
            </div>
        </div>
    );
}
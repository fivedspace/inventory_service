import React, {useState} from "react";
import Admin from 'src/layout/Admin'
import Details from 'submodule/components/Details/Details'
import Prompt from "submodule/components/Prompt/Prompt";
import {request} from "submodule/networks/request";
/* 新增系统 */
export default function SystemAdd() {
    const [hint, setHint] = useState({open: false, severity: 'success', message: '提示信息!'});//弹窗状态
    const detailButtons = [{name: '提交', func: subApp}]//提交按钮
    const [detailData, setDetailData] = useState({})//详情中返回所有输入框的值
    const [dataVal, setDataVal] = useState(null)

    function hintOpen(message, severity) {//弹窗
        setHint({open: true, severity, message});
    }

    const detailInputs = [
        {help_text: "", labelText: "系统名称", id: "name", name: "name", value: dataVal ? dataVal.name : ''},
        {help_text: "", labelText: "系统key", id: "key", name: "key", value: dataVal ? dataVal.key : ''},
        {help_text: "", labelText: "邮箱地址", id: "email", name: "email", value: dataVal ? dataVal.email : ''},
        {
            help_text: "",
            labelText: "管理员姓名",
            id: "admin_name",
            name: "admin_name",
            value: dataVal ? dataVal.admin_name : ''
        },
        {
            help_text: "",
            labelText: "管理员电话",
            id: "admin_phone",
            name: "admin_phone",
            value: dataVal ? dataVal.admin_phone : ''
        },
        {help_text: "", labelText: "系统ip", id: "ip", name: "ip", value: dataVal ? dataVal.ip : ''},
        {help_text: "", labelText: "备注", id: "remark", name: "remark", value: dataVal ? dataVal.remark : ''},
    ]

    function dtailExport(id, value) {//详情组件导出数据
        if (id) {
            setDetailData(event => {
                event[id] = value
                return event
            })
        }
        return detailData
    }

    async function subApp() {//新增系统信息
        const {name, key, email, admin_name, admin_phone, ip, remark,} = detailData
        if (name && key && email && admin_name && admin_phone && ip && remark) {
            const [res, err] = await request.post('/application',{
                name,
                key,
                email,
                admin_name,
                admin_phone,
                ip,
                remark
            }).req_result()
            if (res) {
                let txt = '添加系统成功',
                    type = 'success'
                hintOpen(txt, type)
            } else {
                setDataVal({name, key, email, admin_name, admin_phone, ip, remark})
                hintOpen(err, 'error')
            }
        } else {
            hintOpen("请按提示信息正确录入系统信息!", 'warning')
        }
    }

    return (
        <Admin callback={() => {
            return (
                <>
                    <Details
                        imports={{
                            titleText: '添加系统',
                            detailButtons,
                            detailInputs
                        }}
                        exports={dtailExport}
                    />
                    <Prompt
                        handleClose={() => {
                            setHint({
                                open: false,
                                severity: hint.severity,
                                message: hint.message,
                            });
                        }}
                        {...hint}/>
                </>
            )
        }}/>
    )
}
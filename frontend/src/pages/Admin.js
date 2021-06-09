import React, { Component } from "react";
import axios from "axios";
import config from '../config/config.json';
import Table from '../components/Table/Table'

export default class index extends Component {
    constructor() {
        super();
        this.state = {
            abs: [],
        }
    }

    headen = () => {
        axios({ url: config.spec1 })
            .then((res) => {
                this.setState({
                    abs: res.data,
                })
            })
            .catch((err) => {
                console.log('err')
            })
    }

    /* 将数组对象列表转换为数组包含数组的形式,table组件所接受的数据结构*/
    tableData = () => {
        const tabData = [];
        const tableJson = this.state.abs;
        if (Array.isArray(tableJson) && tableJson.length) {
            for (let i = 0; i < tableJson.length; i++) {
                tabData.push(
                    [
                        tableJson[i].spec_id,
                        tableJson[i].spec_name,
                        tableJson[i].data_type,
                        tableJson[i].spec_remark,
                        // <SearchTwoToneIcon color="secondary" onClick={()=>{setMerchantOneItem(tableJson[i]);setOpen(true);setDialogTitle("查看公私钥")}} className={classes.pointer} titleAccess="查看公钥"/>
                    ]
                )
            }
        } else {
            tabData.push([
                tableJson.spec_id,
                tableJson.spec_name,
                tableJson.data_type,
                tableJson.spec_remark,
            ])
        }
        return tabData
    }

    render() {
        return (
            <div>
                <button onClick={this.headen}>点击</button>
                <Table
                    tableHead={['序号','规格名称','规格数据类型','备注',]}
                    tableData={this.tableData()}
                />
            </div>
        )
    }
}
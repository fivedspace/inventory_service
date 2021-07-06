import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "../../components/Snackbar/Snackbar";
import { AddAlert } from "@material-ui/icons";
import axios from "_axios@0.20.0@axios";
import config from "../../config/config.json";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'block',
    },

}));
const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

makeStyles(styles);

/** 商户信息修改或增加 */
export default function MerchantProfile(props) {
    let merchant = { type: "" };
    let flag = true;
    if (props.title) {
        // if(props.query){
        merchant = props.query
        flag = false
    }
    // console.log(props)
    const classes = useStyles();
    // const [message] = React.useState("");
    const [pageType, setPageType] = React.useState(flag ? "新增商品信息" : "修改商品信息");
    const [commodity_nameItem, setCommodity_nameItem] = React.useState({ name: 'commodity_name', tips: '商品名称', error: false, help_text: '', value: props.query.commodity_name });
    const [quantity_in_stockItem, setQuantity_in_stockItem] = React.useState({ name: 'quantity_in_stock', tips: '库存数量', error: false, help_text: '', value: props.query.quantity_in_stock });
    const [spec_info_valItem, setSpec_info_valItem] = React.useState({ name: 'spec_info_val', tips: '规格val', error: false, help_text: '', value: '' });
    const [remarkItem, seTremarkItem] = React.useState({ name: 'remark', tips: '备注', error: false, help_text: '', value: props.query.remark });
    const [filesItem, setFilesItem] = React.useState({ name: 'files', tips: '文件', error: false, help_text: '', value: "" });
    const [typeIdItem, setTypeIdItem] = React.useState({ name: 'typeId', tips: '类型ID', error: false, help_text: '', value: '' });
    const [tc, setTC] = React.useState(false);             //设置提示框的显示隐藏
    const [message, setMessage] = React.useState("");            //设置提示框的提示信息


    /* 设置提示框的显示数据，过期时间*/

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
    /* 录入数据,校验并赋值*/
    function textChange(e, name) {
        switch (name) {
            case "commodity_name":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setCommodity_nameItem({ name: 'commodity_name', tips: '商品名称', error: true, help_text: '商品名称不能为空', value: e.target.value })
                    break;
                }
                setCommodity_nameItem({ name: 'commodity_name', tips: '商品名称', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "quantity_in_stock":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setQuantity_in_stockItem({ name: 'quantity_in_stock', tips: '库存数量', error: true, help_text: '库存数量不能为空', value: e.target.value })
                    break;
                }
                setQuantity_in_stockItem({ name: 'quantity_in_stock', tips: '库存数量', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "spec_info_val":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setSpec_info_valItem({ name: 'spec_info_val', tips: '规格val', error: true, help_text: '规格val不能为空', value: e.target.value })
                    break;
                }
                setSpec_info_valItem({ name: 'spec_info_val', tips: '规格val', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "typeId":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setTypeIdItem({ name: 'typeId', tips: '请输入类型ID', error: true, help_text: '请根据类型管理中类型ID选择类型', value: e.target.value })
                    break;
                }
                setTypeIdItem({ name: 'typeId', tips: '请输入类型ID', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "remark":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    seTremarkItem({ name: 'remark', tips: '备注', error: true, help_text: '备注不能为空', value: e.target.value })
                    break;
                }
                seTremarkItem({ name: 'remark', tips: '备注', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "files":
                setFilesItem({ name: 'files', tips: '备注', error: false, help_text: '', value: e.target.files[0] })
                break;
        }
    }
    // typeIdItem
    const res_data = {
        commodity_name: commodity_nameItem.value,
        quantity_in_stock: parseInt(quantity_in_stockItem.value),
        type: [
            {
                "type_id": typeIdItem.value
            }
        ],
        spec: [
            {
                "spec_id": 2,
                "spec_info_val": spec_info_valItem.value
            }
        ],
        remark: remarkItem.value
    }
    const res_data2 = {
        commodity_name: commodity_nameItem.value,
        quantity_in_stock: parseInt(quantity_in_stockItem.value),
        type: [
            {
                "type_id": typeIdItem.value
            }
        ],
        spec: [
            {
                "spec_id": 2,
                "spec_info_val": spec_info_valItem.value
            }
        ],
        remark: remarkItem.value,
        commodity_id: props.proId
    }

    /* 新增或修改触发事件*/
    function submitBtn() {
        if (flag) {
            //新增操作
            subAdd(res_data)
        } else {
            //修改操作
            subUpdate(res_data2)
        }
    }

    // 新增、修改后都会改变父组件的flag，从而更新页面数据
    //新增
    function subAdd(res_data) {
        // console.log("sadfg")
        if ((commodity_nameItem.error && quantity_in_stockItem.error && spec_info_valItem.error && remarkItem.error) ||
            (!commodity_nameItem.value && !quantity_in_stockItem.value && !spec_info_valItem.value && !remarkItem.value)) {
            flagSnackbar("请正确录入规格信息！");
        } else {
            console.log(res_data)

            fetch(config.httpUrlpro, {
                method: "POST",
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res_data)
            }).then(response => response.json()).then(json => {
                flagSnackbar("商品信息添加成功");
                console.log(json.commodity_id)
                console.log(filesItem.value[0])
                if (json.commodity_id) {
                    console.log('sdvb')
                    const formData = new FormData()
                    formData.append("commodity_id", json.commodity_id)
                    formData.append("files", filesItem.value)
                    axios.post(config.picture,
                        formData,
                        { headers: { 'content-type': 'multipart/form-data' } })
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => {
                            console.log('err')
                        })
                }

            }).catch((err) => {
                flagSnackbar("商品信息添加失败");
            })
        }
    }
    // 修改
    function subUpdate(res_data) {
        if ((commodity_nameItem.error && quantity_in_stockItem.error && spec_info_valItem.error && remarkItem.error) ||
            (!commodity_nameItem.value && !quantity_in_stockItem.value && !spec_info_valItem.value && !remarkItem.value)) {
            flagSnackbar("请正确录入商品信息！");
        } else {
            console.log(res_data)

            fetch(config.httpUrlpro, {
                method: "PATCH",
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res_data)
            }).then(response => response.json()).then(json => {
                flagSnackbar("商品信息修改成功");
                // console.log(filesItem.value[0])
                if (json.commodity_id) {
                    console.log('sdvb')
                    const formData = new FormData()
                    formData.append("commodity_id", json.commodity_id)
                    formData.append("files", filesItem.value)
                    axios.post(config.picture,
                        formData,
                        { headers: { 'content-type': 'multipart/form-data' } })
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => {
                            console.log('err')
                        })
                }
            }).catch((err) => {
                flagSnackbar("商品信息修改失败");
            })
        }
    }


    return (
        <div>
            <GridContainer>
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
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{pageType}</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{ color: "red" }}>{commodity_nameItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={commodity_nameItem.tips}
                                        id={commodity_nameItem.name}
                                        name={commodity_nameItem.name}
                                        value={commodity_nameItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: commodity_nameItem.error,
                                            value: commodity_nameItem.value,
                                            onChange: (e) => {
                                                textChange(e, commodity_nameItem.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{ color: "red" }}>{quantity_in_stockItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={quantity_in_stockItem.tips}
                                        id={quantity_in_stockItem.name}
                                        name={quantity_in_stockItem.name}
                                        value={quantity_in_stockItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: quantity_in_stockItem.error,
                                            value: quantity_in_stockItem.value,
                                            onChange: (e) => {
                                                textChange(e, quantity_in_stockItem.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{ color: "red" }}>{spec_info_valItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={spec_info_valItem.tips}
                                        id={spec_info_valItem.name}
                                        name={spec_info_valItem.name}
                                        value={spec_info_valItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: spec_info_valItem.error,
                                            value: spec_info_valItem.value,
                                            onChange: (e) => {
                                                textChange(e, spec_info_valItem.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{ color: "red" }}>{typeIdItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={typeIdItem.tips}
                                        id={typeIdItem.name}
                                        name={typeIdItem.name}
                                        value={typeIdItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: typeIdItem.error,
                                            value: typeIdItem.value,
                                            onChange: (e) => {
                                                textChange(e, typeIdItem.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{ color: "red" }}>{remarkItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={remarkItem.tips}
                                        id={remarkItem.name}
                                        name={remarkItem.name}
                                        value={remarkItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: remarkItem.error,
                                            value: remarkItem.value,
                                            onChange: (e) => {
                                                textChange(e, remarkItem.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                {/*添加图片*/}
                                <GridItem xs={12} sm={12} md={5}>
                                    <div className={classes.root}>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            // multiple
                                            type="file"
                                            onChange={(e) => { textChange(e, filesItem.name) }}
                                        />
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={submitBtn}>提交</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
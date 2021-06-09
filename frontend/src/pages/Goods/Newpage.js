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
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
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

    const classes = useStyles();
    const [message] = React.useState("");
    const [commodity_nameItem, setcommodity_nameItem] = React.useState({ name: 'commodity_name', tips: '商品名称', error: false, help_text: '', value: "" });
    const [quantity_in_stock, setquantity_in_stock] = React.useState({ name: 'quantity_in_stock', tips: '库存数量', error: false, help_text: '', value: "" });
    const [remark, setremark] = React.useState({ name: 'remark', tips: '备注', error: false, help_text: '', value: "" });


    /* 设置提示框的显示数据，过期时间*/


    /* 录入数据,校验并赋值*/
    function textChange(e, name) {
        switch (name) {
            case "commodity_name":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setcommodity_nameItem({ name: 'commodity_name', tips: '商品名称', error: true, help_text: '商品名称不能为空', value: e.target.value })
                    break;
                }
                setcommodity_nameItem({ name: 'commodity_name', tips: '商品名称', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "quantity_in_stock":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setquantity_in_stock({ name: 'quantity_in_stock', tips: '库存数量', error: true, help_text: '库存数量不能为空', value: e.target.value })
                    break;
                }
                setquantity_in_stock({ name: 'quantity_in_stock', tips: '库存数量', error: false, help_text: '', value: e.target.value.trim() })
                break;
            case "remark":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setremark({ name: 'remark', tips: '备注', error: true, help_text: '备注不能为空', value: e.target.value })
                    break;
                }
                setremark({ name: 'remark', tips: '备注', error: false, help_text: '', value: e.target.value.trim() })
                break;
        }
    }

    /* 新增或修改触发事件*/

    // 新增、修改后都会改变父组件的flag，从而更新页面数据
    // props.change(props.flag);

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Snackbar
                        place="tc"
                        color="info"
                        icon={AddAlert}
                        message={message}
                        close
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>添加商品</h4>
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
                                    <InputLabel style={{ color: "red" }}>{quantity_in_stock.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={quantity_in_stock.tips}
                                        id={quantity_in_stock.name}
                                        name={quantity_in_stock.name}
                                        value={quantity_in_stock.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: quantity_in_stock.error,
                                            value: quantity_in_stock.value,
                                            onChange: (e) => {
                                                textChange(e, quantity_in_stock.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{ color: "red" }}>{remark.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={remark.tips}
                                        id={remark.name}
                                        name={remark.name}
                                        value={remark.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: remark.error,
                                            value: remark.value,
                                            onChange: (e) => {
                                                textChange(e, remark.name);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                    <div className={classes.root}>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                                上传图片
                                            </Button>
                                        </label>
                                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="上传图片" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary">提交</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
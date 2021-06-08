import React from "react";
import {makeStyles} from "@material-ui/core/styles";
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
import {AddAlert} from "@material-ui/icons";

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

const useStyles = makeStyles(styles);

/** 商户信息修改或增加 */
export default function MerchantProfile(props) {

    const classes = useStyles();
    const [message] = React.useState("");
    const [spec_nameItem,setspec_nameItem] = React.useState({name:'spec_name',tips:'规格名称',error:false,help_text:'',value:""});

    /* 设置提示框的显示数据，过期时间*/


    /* 录入数据,校验并赋值*/
    function textChange(e,name){
        switch (name){
            case "spec_name":
                if(e.target.value===null || e.target.value==="" || e.target.value.trim()===""){
                    setspec_nameItem({name:'spec_name',tips:'规格名称',error:true,help_text:'规格名称不能为空',value:e.target.value})
                    break;
                }
                setspec_nameItem({name:'spec_name',tips:'规格名称',error:false,help_text:'',value:e.target.value.trim()})
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
                                    <InputLabel style={{color: "red"}}>{spec_nameItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={spec_nameItem.tips}
                                        id={spec_nameItem.name}
                                        name={spec_nameItem.name}
                                        value={spec_nameItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error:spec_nameItem.error,
                                            value:spec_nameItem.value,
                                            onChange:(e)=>{
                                                textChange(e,spec_nameItem.name);
                                            }
                                        }}
                                    />
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
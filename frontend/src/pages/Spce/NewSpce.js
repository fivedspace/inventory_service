import React
// {useState}
    from "react";
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
import axios from "_axios@0.20.0@axios";
import config from "../../config/config.json";

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
    let merchant = {spec_name: "", spec_remark: ""};
    let flag = true;
    if(props.query && props.title){
        // if(props.query){
        merchant = props.query
        flag = false
    }


    const classes = useStyles();
    const [message] = React.useState("");
    const [pageType, setPageType] = React.useState(flag?"新增规格信息":"修改规格信息");
    const [spec_nameItem,setspec_nameItem] = React.useState({name:'spec_name',tips:'规格名称',error:false,help_text:'',value:""+merchant.spec_name});
    const [spec_remarkItem,setspec_remarkItem] = React.useState({name:'spec_remark',tips:'备注',error:false,help_text:'',value:""+merchant.spec_remark});


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
            case "spec_remark":
                if(e.target.value===null || e.target.value==="" || e.target.value.trim()===""){
                    setspec_remarkItem({name:'spec_remark',tips:'备注',error:true,help_text:'备注不能为空',value:e.target.value})
                    break;
                }
                setspec_remarkItem({name:'spec_remark',tips:'备注',error:false,help_text:'',value:e.target.value.trim()})
                break;
        }
    }

    const res_data = {
        "spec_name": spec_nameItem.value,
        "spec_remark": spec_remarkItem.value,
    }


    /* 新增或修改触发事件*/
    function submitBtn(){
        if(flag){
            //新增操作
            subAdd(res_data)
            // props.change(props.flag);
        }else {
            //修改操作
            subUpdate(res_data)
            // props.setMerchant("")
            // props.change(props.flag);
        }
        // 新增、修改后都会改变父组件的flag，从而更新页面数据
        // props.change(props.flag);
    }


    //新增
    function subAdd(res_data){
        // console.log(res_data)
        if((spec_nameItem.error && spec_remarkItem.error) || (!spec_nameItem.value && !spec_remarkItem.value) ){
            alert("请正确录入规格信息");
        }else {
            axios.post(config.spec2,{'spec':[{"spec_name": spec_nameItem.value,"data_type_id":6, "spec_remark": spec_remarkItem.value}]},{headers:{}})
                .then((res)=>{
                    if(res){
                        alert("添加规格信息成功！");
                        flag = !flag
                        setPageType("添加系统信息")
                        clearVariable();

                    }
                }).catch((err)=>{
                if(err){
                    alert("添加规格信息失败！");
                }
            })
        }
    }
    // 修改
    function subUpdate(res_data){
        if((spec_nameItem.error && spec_remarkItem.error) || (!spec_nameItem.value && !spec_remarkItem.value) ){
            alert("请正确录入规格信息！");
        }else {
            axios.patch(config.spec1,{"spec_id":props.specId,"spec_name": spec_nameItem.value,"data_type_id":4, "spec_remark": spec_remarkItem.value},{headers:{}})
                .then((res)=>{
                    if(res){
                        alert("修改规格信息成功！");
                        flag = !flag
                        setPageType("修改系统信息")
                        clearVariable();
                    }
                }).catch((err)=>{
                if(err){
                    alert("修改规格信息失败！");
                }
            })
        }
    }

    function clearVariable(){
        setspec_nameItem({name:'spec_nameItem',tips:'规格名称',error:false,help_text:'',value:""})
        setspec_remarkItem({name:'spec_remarkItem',tips:'备注',error:false,help_text:'',value:''})
    }
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
                            <h4 className={classes.cardTitleWhite}>{pageType}</h4>
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
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel style={{color: "red"}}>{spec_remarkItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={spec_remarkItem.tips}
                                        id={spec_remarkItem.name}
                                        name={spec_remarkItem.name}
                                        value={spec_remarkItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error:spec_remarkItem.error,
                                            value:spec_remarkItem.value,
                                            onChange:(e)=>{
                                                textChange(e,spec_remarkItem.name);
                                            }
                                        }}
                                    />
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
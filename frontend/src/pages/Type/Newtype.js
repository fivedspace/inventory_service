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
import axios from "_axios@0.20.0@axios";
import config from "../../config/config.json";

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
    let merchant = {type: ""};
    let flag = true;
    if(props.query && props.title){
        // if(props.query){
        merchant = props.query
        flag = false
    }

    const [pageType, setPageType] = React.useState(flag?"新增规格信息":"修改规格信息");

    const classes = useStyles();
    const [message] = React.useState("");
    const [typeItem, setTypeItem] = React.useState({ name: 'type', tips: '类型', error: false, help_text: '', value: "" });


    /* 设置提示框的显示数据，过期时间*/





    /* 录入数据,校验并赋值*/
    function textChange(e, name) {
        switch (name) {
            case "type":
                if (e.target.value === null || e.target.value === "" || e.target.value.trim() === "") {
                    setTypeItem({ name: 'type', tips: '类型', error: true, help_text: '类型不能为空', value: e.target.value })
                    break;
                }
                setTypeItem({ name: 'type', tips: '类型', error: false, help_text: '', value: e.target.value.trim() })
                break;
        }
    }

    const res_data = {
        "type": typeItem.value,
    }


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
    }
    /* 新增或修改触发事件*/
//新增
    function subAdd(res_data){
        if(typeItem.error || !typeItem.value){
            alert("请正确录入规格信息！");
        }else {
            axios.post(config.httpUrl1,{"type": typeItem.value},{headers:{}})
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
        if(typeItem.error || !typeItem.value){
            alert("请正确录入规格信息！");
        }else {
            console.log(props.TypeId)
            axios.patch(config.httpUrl1,{"type": typeItem.value,"type_id":props.TypeId},{headers:{}})
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
        setTypeItem({name:'typeItem',tips:'类型',error:false,help_text:'',value:""})
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
                                    <InputLabel style={{ color: "red" }}>{typeItem.help_text}</InputLabel>
                                    <CustomInput
                                        labelText={typeItem.tips}
                                        id={typeItem.name}
                                        name={typeItem.name}
                                        value={typeItem.value}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            error: typeItem.error,
                                            value: typeItem.value,
                                            onChange: (e) => {
                                                textChange(e, typeItem.name);
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
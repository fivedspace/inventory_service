import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import GridItem from "../Grid/GridItemPc";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainerPc";
import CustomInput from "../CustomInput/CustomInput";
import PropTypes, { bool } from "prop-types"
const useStyles = makeStyles((theme) => ({
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    formControl: {
        margin: theme.spacing(0),
        marginTop: 25,
        width: "100%",
        '& ul': { width: "50%" }
    },
    menuwItem: {
        width: "100%",
        fontSize: 20,
        height: "50%",
    },
}));
export default function Details(props) {
    const classes = useStyles();

    const { imports, exports } = props
    const { titleText, detailButtons, detailInputs, examine} = imports;
    const DetailsButtons = ()=>{
        return detailButtons.map((btn, index) => {
            return <Button color={btn.color ? btn.color : 'primary'} key={index} onClick={btn.func}>{btn.name}</Button>
        })
    }
    const Inputs = (props) => {
        const { item } = props
        const [value, setValue] = useState((item.value || item.value === 0) ? item.value : '')
        useEffect(() => { exports(item.name, item.value) }, [item.name, item.value]);
        function valChange(e) {//获取页面的录入信息
            if(item.type === 'number'){
                if(e.target.value <= 0){
                    e.target.value = 1
                }
            }
            let bool;
            // eslint-disable-next-line default-case
            switch (item.name) {
                case item.name:
                        if(!e.target.value){
                            bool = true
                        }
                    if (item.name === "phone") {
                        const phones = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                        if (!phones.test(e.target.value)) {
                            bool = true
                        }
                        break;
                    }
                    if (item.name === "id_number") {
                        const weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                        // 校验码
                        const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

                        const codes = String(e.target.value)
                        const last = e.target.value[17]// 最后一位
                        const seventeen = codes.substring(0, 17)

                        //判断最后一位校验码是否正确
                        const arr = seventeen.split('')
                        const len = arr.length
                        let num = 0
                        for (let i = 0; i < len; i++) {
                            num = num + arr[i] * weightFactor[i]
                        }

                        // 获取余数
                        const resisue = num % 11
                        const lastNo = checkCode[resisue]

                        // 18位身份证号格式的正则
                        const idcardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

                        // 判断格式是否正确
                        const format = idcardPatter.test(e.target.value)

                        // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
                        if (last === lastNo && format) {
                            bool = false
                        }else{
                            bool=true
                        }
                    }
                    break;
            }
            setValue(e.target.value)
            exports(item.name, e.target.value, true, bool)
        }
        let label = null;
        switch (item.type) {
            case 'select':
                label = (
                    <GridItem xs={12} sm={12} md={5}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{item.labelText}</InputLabel>
                            <Select
                                value={value}
                                inputProps={{
                                    disabled: item.disabled ? item.disabled : false
                                }}
                                onChange={valChange}
                            >
                                {(item.lists).map((data) => {
                                    return (
                                        <MenuItem key={data.field_name} value={data.field_name} className={classes.menuwItem}>
                                            {data.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                );
                break;
            case 'TextField':
                label = (
                    <GridItem xs={12} sm={12} md={5}>
                        <div className={classes.formControl}>
                            <TextField
                                id={item.name}
                                label={item.labelText}
                                name={item.name}
                                multiline
                                className={classes.formControl}
                                value={value}
                                rows={4}
                                inputProps={{
                                    disabled: item.disabled,
                                    onChange: valChange
                                }}
                            />
                        </div>
                    </GridItem>
                );
                break;
            default:
                label = (
                    <GridItem xs={12} sm={12} md={5} maxLength={1}>
                        <InputLabel style={{ color: "red" }} maxLength={1}>{item.help_text}</InputLabel>
                        <CustomInput
                            labelText={item.labelText}
                            id={item.id}
                            type={ item.type ? item.type : "" }
                            name={item.name}
                            formControlProps={{
                                fullWidth: true,
                                maxLength: 1,
                            }}
                            maxLength={item.maxLength}

                            inputProps={{
                                disabled: item.disabled,
                                error: item.help_text ? true : false,
                                value: value,
                                maxLength: 0,
                                type: item.type ? item.type : 'text',
                                onChange: valChange
                            }}
                        />
                    </GridItem>
                );
                break;
        }
        return label;
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{titleText}</h4>
                </CardHeader>
                {/* 定义了输入框组件的显示*/}
                <CardBody>
                    <GridContainer>
                        {
                            examine ? (
                                detailInputs.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item style={{ width: '100%', marginBottom: '10px', borderBottom: '1px solid' }}><Typography>{`${item.gridid}号储物格`}</Typography></Grid>
                                            {(item.details).map((i, j) => {
                                                return (
                                                    <Inputs key={j} item={i} />
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })
                            ) : (
                                detailInputs.map((item, index) => { return (<Inputs key={index} item={item} />) })
                            )
                        }
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <DetailsButtons />
                </CardFooter>
            </Card>
        </GridItem>
    )
}

Details.propTypes = {
    imports: PropTypes.object,
    exports: PropTypes.func
}
Details.defaultProps = {
    exports: () => {
        return {
            detailData: {}
        }
    },
    imports: {
            titleText: '详情',
            detailButtons: [],
            detailInputs: []

    }
}
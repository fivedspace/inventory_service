import React from "react";
import {Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Buttons from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=> ({
    formControl: {
        marginTop: 8,
        minWidth: 200,
    },
    fullList: {
        width: 'auto',
    },
    list: {
        width: 300,
    },
    formButton: {
        margin: 10,
        width: 70,
    },
}))

/** 查询时候的筛选条件组件*/
export default function ListAnchor(props){

    const classes = useStyles();
    const [appId,setAppId] = React.useState("");                          //设置查询条件，根据系统筛选
    const [minMoney,setMinMoney] = React.useState("");                    //设置查询最小金额
    const [maxMoney,setMaxMoney] = React.useState("");                    //设置查询最大金额
    const [startTime,setStartTime] = React.useState("2020-01-01T00:00");  //设置查询开始时间
    const [endTime,setEndTime] = React.useState("2020-01-01T00:00");      //设置查询截至时间
    const [payStatus,setPayStatus] = React.useState("");
    const [payMode,setPayMode] = React.useState("");

    //确定后，拿到过滤条件
    const setFilter = () => {
        const filters = [];
        if(payMode){
            const mode = payMode.split("|")
            filters.push({"fieldname":mode[0],"option":mode[1],"value":mode[2]})
        }
        if(payStatus){
            const status = payStatus.split("|")
            filters.push({"fieldname":status[0],"option":status[1],"value":status[2]})
        }
        if(appId){
            filters.push({"fieldname":"application_id","option":"==","value":appId})
        }

        if(minMoney && !maxMoney){
            //如果只输入了最小金额，则查询大于它的金额
            filters.push({"fieldname":"total_money","option":">=","value":minMoney})
        }else if(maxMoney && !minMoney){
            filters.push({"fieldname":"total_money","option":"<=","value":maxMoney})
        }else if(minMoney && maxMoney){
            filters.push({"fieldname":"total_money","option":">=","value":minMoney})
            filters.push({"fieldname":"total_money","option":"<=","value":maxMoney})
        }else {
            // console.log("请输入金额区间")
        }

        if(startTime!=="2020-01-01T00:00" && endTime==="2020-01-01T00:00"){
            // filters.push({"field":"created_at","option":"","value":""})
        }else if (startTime==="2020-01-01T00:00" && endTime!=="2020-01-01T00:00"){
            // filters.push({"field":"created_at","option":"","value":""})
        }else if(startTime!=="2020-01-01T00:00" && endTime!=="2020-01-01T00:00"){
            filters.push({"fieldname":"created_at","option":">=","value":startTime})
            filters.push({"fieldname":"created_at","option":"<=","value":endTime})

            // console.log(filters)
        }else {  
            // console.log("请输入时间区间")
        }

        //设置过滤条件传递到父组件
        props.setParam(filters,props.flag)
        // console.log(JSON.stringify(filters))
        // console.log(startTime)
        // console.log(endTime)
    }

    //重置所选过滤信息
    const reSetFilter = () => {
        setMinMoney("")
        setMaxMoney("")
        setStartTime("2020-01-01T00:00")
        setEndTime("2020-01-01T00:00")
        setPayStatus("")
        setPayMode("")
        setAppId("")
    }

    return (
        <Grid container
              className={clsx(classes.list, {
                  [classes.fullList]: props.anchor === 'top' || props.anchor === 'bottom',
              })}
              role="presentation"
        >
            <Grid container>
                <Grid item hidden={props.title}><Typography>&nbsp;&nbsp;系统标识</Typography></Grid>
                <Grid container spacing={1}>
                    <Grid item hidden={props.title}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className={classes.formControl}
                            id="sys_title"
                            name="sysTitle"
                            label="输入系统标识"
                            variant="outlined"
                            value={appId}
                            onChange={(e)=>{setAppId(e.target.value)}}
                        />
                    </Grid>
                </Grid>
                <Grid item hidden={props.title}><Typography>&nbsp;&nbsp;选择金额区间</Typography></Grid>
                <Grid container spacing={1}>
                    <Grid item hidden={props.title}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className={classes.formControl}
                            id="minMoney"
                            name="minMoney"
                            label="最小金额/或大于它"
                            variant="outlined"
                            value={minMoney}
                            onChange={(e)=>{setMinMoney(e.target.value)}}
                        />
                    </Grid>
                    <Grid item hidden={props.title}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className={classes.formControl}
                            id="maxMoney"
                            name="maxMoney"
                            label="最大金额/或小于它"
                            variant="outlined"
                            value={maxMoney}
                            onChange={(e)=>{setMaxMoney(e.target.value)}}
                        />
                    </Grid>
                </Grid>
                <Grid item ><Typography>&nbsp;&nbsp;选择时间区间</Typography></Grid>
                <Grid container spacing={1}>
                    <Grid item >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className={classes.formControl}
                            id="filled-basic"
                            label="开始时间"
                            type="datetime-local"
                            variant="outlined"
                            value={startTime}
                            onChange={(e)=>{setStartTime(e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className={classes.formControl}
                            id="endDate"
                            label="截至时间"
                            type="datetime-local"
                            value={endTime}
                            variant="outlined"
                            onChange={(e)=>{setEndTime(e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item hidden={props.title}><Typography>&nbsp;&nbsp;选择支付状态</Typography></Grid>
                <Grid item hidden={props.title}>
                    <RadioGroup aria-label="gender" name="payStatus" row value={payStatus} onChange={(e)=>{setPayStatus(e.target.value)}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControlLabel value="status|>|0" control={<Radio />} label="已支付" />
                        <FormControlLabel value="male|==|0" control={<Radio />} label="未支付" />
                    </RadioGroup>
                </Grid>
                <Grid item hidden={props.title}><Typography>&nbsp;&nbsp;选择支付方式</Typography></Grid>
                <Grid item hidden={props.title}>
                    <RadioGroup aria-label="gender" name="payMode" row value={payMode} onChange={(e)=>{setPayMode(e.target.value)}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControlLabel value="pay_mode|==|weChat" control={<Radio />} label="微信" />
                        <FormControlLabel value="pay_mode|==|alipay" control={<Radio />} label="支付宝" />
                    </RadioGroup>
                </Grid>
                <Grid item >
                    <Buttons className={classes.formButton} onClick={reSetFilter} variant="contained" color="default">重置</Buttons>
                    <Buttons className={classes.formButton} onClick={setFilter} variant="contained" color="secondary">确定</Buttons>
                </Grid>
            </Grid>
        </Grid>
    );

}


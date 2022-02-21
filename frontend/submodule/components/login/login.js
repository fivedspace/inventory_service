import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Button from "../CustomButtons/Button";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {request} from "submodule/networks/request";
import Prompt from "submodule/components/Prompt/Prompt";
import {Container} from "@material-ui/core";
import {logDOM} from "@testing-library/react";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Locker Admin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
    avatar: {
        margin: '8px auto',
        marginTop: 50,
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& h1': {
            paddingBottom: 15
        }
    },
    form: {
        width: "86%",
    },
    btnOn: {
        padding: "15px"
    },
    style: {
        marginTop: '10px'
    },
}));


const Inputs = (props) => {
    const classes = useStyles();
    const [btnVal, setBtnVal] = useState({disabled: false, btnText: "获取验证码"})
    const [is_lock, setIs_lock] = useState(false)
    const {item} = props
    const [value, setValue] = useState((item.value || item.value === 0) ? item.value : '')
    useEffect(() => {
        props.exports(item.name, item.value)
        let nowDate = parseInt(new Date().getTime() / 1000)
        let lastClickTime = localStorage.getItem('forgetPwdTime');
        saveCodeButtonRemainingTime(nowDate, lastClickTime)
    }, []);

    const handleHintOpen = (message, info) => {
        props.hintOpen(message, info)
    }

    function valChange(e) {//获取页面的录入信息
        if (item.type === 'number') {
            if (e.target.value <= 0) {
                e.target.value = 1
            }
        }
        let bool = false;
        const phoneRex = /^1[3-9][0-9]{9}$/,
            EmailRex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            passRex = /^[a-zA-Z]\w{5,17}$/;
        if (!phoneRex.test(e.target.value) && !EmailRex.test(e.target.value) && !passRex.test(e.target.value)) {
            bool = true
        }
        setValue(e.target.value)
        props.exports(item.name, e.target.value, true, bool)
    }

    const saveCodeButtonRemainingTime = (time, lastClickTime) => {
        let RemainingTime = 60 - (time - lastClickTime);//剩余时间
        setBtnVal({disabled: true, btnText: RemainingTime + 's后重新发送'})
        let forgetPwdClock = setInterval(() => {
            let lastClickTime = localStorage.getItem('forgetPwdTime');
            let time = parseInt(new Date().getTime() / 1000);//当前时间戳
            let RemainingTime = 60 - (time - lastClickTime);//剩余时间
            setBtnVal({disabled: true, btnText: RemainingTime + 's后重新发送'})
            if (RemainingTime <= 0) {
                clearInterval(forgetPwdClock);
                setBtnVal({disabled: false, btnText: '重新发送'})
            }
        }, 1000);
    }

    async function getCode() {// 获取邮箱\手机验证码
        let phoneOrEmail;
        if (item.password && item.phoneOrEmail) {
            phoneOrEmail = item.phoneOrEmail[0][item.phoneOrEmail[1]]
            let password = item.password[0][item.password[1]]
            props.phoneOrEmails(phoneOrEmail, password)
        } else {
            console.log(item)
            phoneOrEmail = item.phoneOrEmail[0][item.phoneOrEmail[1]]
            props.phoneOrEmails(phoneOrEmail)
        }
        if (!phoneOrEmail) {
            handleHintOpen("请输入正确的邮箱或手机号！！！", "warning");
            return
        }
        if (is_lock) return
        setIs_lock(true)
        setBtnVal(event => {
            event['disabled'] = true
            return event
        })

        const res= await request.post("/code/verify_code?number=" + phoneOrEmail)
        if (res) {
            let type = "error";
        saveCodeButtonRemainingTime()
        if (res.data.status === 200) {
        let forgetPwdTime = parseInt(new Date().getTime() / 1000)
        localStorage.setItem('forgetPwdTime', String(forgetPwdTime));
        saveCodeButtonRemainingTime(forgetPwdTime, forgetPwdTime)
                type = "success";
            }
            handleHintOpen(res.data.message, type);

        } else {
            // hintOpen(err, "error");
        }
    }


    let label = null;
    // eslint-disable-next-line default-case
    switch (item.type) {
        case 'TextField':
            label = (
                <Grid item xs={12}>
                    <TextField
                        error={!!item.helperText}
                        id={item.name}
                        label={item.labelText}
                        name={item.name}
                        variant="outlined"
                        helperText={item.helperText}
                        className={classes.formControl}
                        value={value}
                        inputProps={{
                            disabled: item.disabled,
                            onChange: valChange
                        }}
                    />
                </Grid>
            )
            break;
        case 'ver_code':
            label = (
                <>
                    <Grid item xs={8}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name={item.name}
                            label={item.labelText}
                            helperText={item.helperText}
                            id={item.id}
                            value={value}
                            error={!!item.helperText}
                            onChange={valChange}
                            type="verifyCode"
                            autoComplete="current-verifyCode"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            fullWidth
                            color="default"
                            size="lg"
                            className={classes.btnOn}
                            disabled={btnVal.disabled}
                            onClick={() => {
                                getCode();
                            }}
                        >
                            {btnVal.btnText}
                        </Button>
                    </Grid>
                </>
            )
            break;
    }
    return label;
}


export default function Details(props) {
    const classes = useStyles();
    const {imports, exports, phoneOrEmails} = props
    const {func, detailInputs, title, OnWay, url, OnWay1, url1, OnWay2, url2} = imports;
    const [hint, setHint] = useState({open: false, severity: 'success', message: '提示信息!'});//弹窗状态

    function hintOpen(message, severity) {//弹窗
        setHint({open: true, severity, message});
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <Grid className={classes.form}>
                    <Grid container spacing={2}>
                        {detailInputs.map((item, index) => {
                            return (<Inputs
                                key={index}
                                item={item}
                                exports={exports}
                                phoneOrEmails={phoneOrEmails}
                                hintOpen={hintOpen}
                            />)
                        })}
                    </Grid>
                    <Grid container className={classes.style}>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link href={url} variant="body2">
                                {OnWay}
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={func}
                    >
                        {title}
                    </Button>
                    <Grid container className={classes.style}>
                        <Grid item xs>
                            <Link
                                variant="body2"
                                href={url1}
                            >
                                {OnWay1}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={url2} variant="body2">
                                {OnWay2}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Copyright/>
            </div>
            {/* 消息框 */}
            <Prompt
                handleClose={() => {
                    setHint({
                        open: false,
                        severity: hint.severity,
                        message: hint.message,
                    });
                }}
                {...hint}
            />
        </Container>
    )
}


Details.propTypes = {
    imports: PropTypes.object,
    exports: PropTypes.func
}
Details.defaultProps = {
    exports: () => {
        return {
            detailData: {},

        }
    },
    phoneOrEmails: () => {
        return {
            phoneOrEmail: {}
        }
    },
    imports: {
        title: '登录',
        OnWay: '',
        url: '',
        OnWay1: '',
        url1: '',
        OnWay2: '',
        url2: '',
        detailInputs: [],

    }
}
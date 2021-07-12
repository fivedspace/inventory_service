import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from "../../components/Snackbar/Snackbar";
import { AddAlert } from "@material-ui/icons";
import request from "../../networks/requist";

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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    submit1: {
        margin: theme.spacing(2, 5, 2),
    },
    submit2: {
        height: '20px',
        marginTop: "25px"
    },
}));

export default function SignIn() {
    // window.location.reload()
    const classes = useStyles();

    const [message, setMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [uTitle, setUTitle] = useState({ id: "username", label: "邮箱地址/用户名", name: "username", value: "", helperText: "" })
    const [password, setPassword] = useState({ id: "password", label: "密码", name: "password", value: "", helperText: "" })
    const [code, setCode] = useState({ id: "code", label: "验证码", name: "code", value: "", helperText: "" })
    const [auth_code, setAuth_code] = useState([]);

    const data = {
        // grant_type:"",
        username: uTitle.value,
        password: password.value,
        // scope:"",
        // client_id:"",
        // client_secret:""
    }

    /* 设置提示框的显示数据，过期时间*/
    const flagSnackbar = (messages) => {
        if (!dialogOpen) {
            setDialogOpen(true)
            setMessage(messages)
            setTimeout(function () {
                setDialogOpen(false);
                setMessage("")
            }, 6000);
        }
    }

    /* 录入数据,校验并赋值*/
    function InputChange(e, name) {
        switch (name) {
            case "username":
                const email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (email.test(e.target.value) || e.target.value.trim()) {
                    setUTitle({ id: "username", label: "邮箱地址/用户名", name: "username", value: "" + e.target.value, helperText: "" })
                    break;
                }
                setUTitle({ id: "username", label: "邮箱地址/用户名", name: "username", value: "" + e.target.value, helperText: "请正确输入邮箱/用户名" })
                break;
            case "password":
                if (e.target.value.trim()) {
                    setPassword({ id: "password", label: "密码", name: "password", value: "" + e.target.value, helperText: "" })
                    break;
                }
                setPassword({ id: "password", label: "密码", name: "password", value: "" + e.target.value, helperText: "密码不能为空格" })
                break;
            case "code":
                if (e.target.value.trim()) {
                    setCode({ id: "code", label: "请输入验证码", name: "code", value: "" + e.target.value, helperText: "" })
                    break;
                }
                setCode({ id: "code", label: "请输入验证码", name: "code", value: "" + e.target.value, helperText: "验证码不能为空" })
                break;
            default:
                break;
        }
    }

    //调取登录接口 成功后保存token 并跳至首页
    function submitLogin() {
        // console.log("登录 ？？？？")
        if ((uTitle.value && !uTitle.helperText) && (password.value && !password.helperText)) {

            console.log("调用登录接口")
            console.log(code.value)

            // const formData = new FormData();
            // formData.append("username", data.username)
            // formData.append("password", data.password)


            // const token = request({
            request({
                url: "/auth/login",
                method: "POST",
                data: {
                    "number": data.username,
                    "pwd": password.value,
                    "client_code": code.value,
                    "callback_url": "string"
                },
                // data: {username: "sun",password:"000000"},
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(r => {
                console.log(r)
                if (r.token) {
                    document.cookie = "token=" + r.token + ";path=/;";
                    window.location.reload();
                } else {
                    flagSnackbar("登录失败");
                }
            })
        } else {
            flagSnackbar("请输入账号信息！");
        }
    }

    //调取获取验证码接口
    function AuthCode() {
        request({
            url: "/client_code",
            method: 'POST',
        })
            .then((res) => {
                console.log(res.client_code)
                setAuth_code(res.client_code)
                flagSnackbar("获取验证码成功")
            })
            .catch((err) => {
                console.log('err')
                flagSnackbar("获取验证码失败")
            })

    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/*提示框*/}
                <Grid item >
                    <Snackbar
                        place="tc"
                        color="info"
                        icon={AddAlert}
                        message={message}
                        open={dialogOpen}
                        closeNotification={() => setDialogOpen(false)}
                        close
                    />
                </Grid>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    登录
                </Typography>
                {/*<form className={classes.form} noValidate>*/}
                <form className={classes.form}
                // action={"http://192.168.0.113:7878/Admin/auth/login/"}
                // method={"POST"}
                // onSubmit={submitLogin()}
                >
                    {/*用户名*/}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={uTitle.id}
                        label={uTitle.label}
                        name={uTitle.name}
                        value={uTitle.value}
                        helperText={uTitle.helperText}
                        error={uTitle.helperText ? true : false}
                        autoComplete="email"
                        onChange={(e) => { InputChange(e, uTitle.name) }}
                        autoFocus
                    />
                    {/*密码*/}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={password.id}
                        name={password.name}
                        value={password.value}
                        label={password.label}
                        helperText={password.helperText}
                        error={password.helperText ? true : false}
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => { InputChange(e, password.name) }}
                    />
                    {/*验证码*/}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={code.name}
                        label={code.label}
                        helperText={code.helperText}
                        id={code.id}
                        value={code.value}
                        error={code.helperText ? true : false}
                        onChange={(e) => { InputChange(e, code.name) }}
                        type="code"
                        autoComplete="current-code"
                    />
                    {/*验证码*/}
                    <div style={{ display: 'flex' }}>
                        <Button
                            // type="submit"
                            // fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit1}
                            onClick={() => { AuthCode() }}
                        >
                            获取验证码
                    </Button>
                        <span className={classes.submit1, classes.submit2}>
                            验证码：{auth_code}
                        </span>
                    </div>


                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="记住我"
                    />
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { submitLogin() }}
                    >
                        登录
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                忘记密码?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/admin/register" variant="body2">
                                {"还没有账号? 去注册"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );


}
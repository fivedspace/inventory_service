import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import axios from "axios";

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [message, setMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [uTitle, setUTitle] = useState({ id: "emailOrName", label: "邮箱地址/用户名", name: "emailOrName", value: "", helperText: "" })
    const [password, setPassword] = useState({ id: "password", label: "密码", name: "password", value: "", helperText: "" })
    const [code, setCode] = useState({ id: "code", label: "请输入验证码", name: "code", value: "", helperText: "" })

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

    function InputChange(e, name) {
        // console.log(e.target.value)
        switch (name) {

            case "emailOrName":
                const email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (email.test(e.target.value) || e.target.value.trim()) {
                    setUTitle({ id: "emailOrName", label: "邮箱地址/用户名", name: "emailOrName", value: "" + e.target.value, helperText: "" })
                    break;
                }
                setUTitle({ id: "emailOrName", label: "邮箱地址/用户名", name: "emailOrName", value: "" + e.target.value, helperText: "请正确输入邮箱/用户名" })
                break;
            case "password":
                if (e.target.value.trim()) {
                    setPassword({ id: "password", label: "密码", name: "password", value: "" + e.target.value, helperText: "" })
                    break;
                }
                setPassword({ id: "password", label: "密码", name: "password", value: "" + e.target.value, helperText: "密码不能为空格" })
                break;
            case "code":
                // const code = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
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

    function submitRegister() {
        console.log("注册 ？？？")

        if ((uTitle.value && !uTitle.helperText) &&
            (password.value && !password.helperText) &&
            (code.value && !code.helperText)) {

            request({
                url: "/auth/register",
                method: "POST",
                data: {
                    "number": uTitle.value,
                    "pwd": password.value,
                    "verify_code": code.value
                    // "admin_name": uTitle.value,
                    // "password": password.value,
                    // "is_lock": 0,
                    // "code": code.value,
                    // "nickname": "test"
                }
            })
                .then((res) => {
                    console.log(res.data)
                    flagSnackbar("注册成功")
                })
                .catch(
                    flagSnackbar("注册失败")
                )
        } else {
            flagSnackbar("请输入信息！")
        }

    }

    function AuthCode() {
        console.log("wergh")
        // axios.post("http://192.168.0.124:8000/send_code?number=" + uTitle.value)
        //     .then((res) => {
        //         console.log(res.data)
        //         flagSnackbar("获取验证码成功")
        //     })
        //     .catch((err) => {
        //         console.log('err')
        //         flagSnackbar("获取验证码失败")
        //     })

        request({
            url: "/send_code",
            method: 'POST',
            params: {
                "number":uTitle.value
            }
        })
            .then((res) => {
                console.log(res.data)
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
                    注册
                </Typography>
                {/* <form className={classes.form} noValidate> */}
                <Grid className={classes.form} >
                    <Grid container spacing={2}>

                        {/*<Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>*/}
                        {/*<Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>*/}

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name={uTitle.name}
                                label={uTitle.label}
                                helperText={uTitle.helperText}
                                id={uTitle.id}
                                value={uTitle.value}
                                error={uTitle.helperText ? true : false}
                                onChange={(e) => { InputChange(e, uTitle.name) }}
                                autoComplete="email"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name={password.name}
                                label={password.label}
                                helperText={password.helperText}
                                id={password.id}
                                value={password.value}
                                error={password.helperText ? true : false}
                                onChange={(e) => { InputChange(e, password.name) }}
                                type="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>

                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { AuthCode() }}
                    >
                        获取验证码
                    </Button>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { submitRegister() }}
                    >
                        注册
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/admin/login" variant="body2">
                                已有账号? 去登录
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
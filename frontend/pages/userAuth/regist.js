import Router from "next/router";
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Prompt from "submodule/components/Prompt/Prompt";
import {request} from "submodule/networks/request";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Locker Admin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnOn: {
    padding: "15px",
    margin: theme.spacing(0, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [hint, setHint] = useState({open: false,severity: "success",message: "提示信息!"});
  const [verifyBtnState, setVerifyBtnState] = useState({disabled: false,btnText: "获取验证码"}) //验证码按钮文字
  const [phoneOrEmail, setPhoneOrEmail] = useState({id: "phoneOrEmail",label: "邮箱地址或电话号码",name: "phoneOrEmail",value: "",helperText: ""});
  const [password, setPassword] = useState({id: "password",label: "密码",name: "password",value: "",helperText: ""});
  const [verifyCode, setVerifyCode] = useState({id: "verifyCode",label: "验证码",name: "verifyCode",value: "",helperText: "",});
  const [is_lock,setIs_lock] = useState(false)
  const phoneRex = /^1[3-9][0-9]{9}$/,
        EmailRex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        passRex = /^[a-zA-Z]\w{5,17}$/;
  let acceptCodeTimer = null;
  function hintOpen(message, severity) {
    setHint({ open: true, severity, message });
  }
  useEffect(() => {
    return ()=>{clearInterval(acceptCodeTimer)}
  },[]);

  function InputChange(e, name) {
    const { value } = e.target;
    let helperText = "";
    switch (name) {
      case "phoneOrEmail":
        if (!phoneRex.test(value) && !EmailRex.test(value)){
          helperText = "请正确输入邮箱或电话号码";
        }
        setPhoneOrEmail({id: "phoneOrEmail",label: "邮箱或电话",name: "phoneOrEmail",value: "" + value,helperText})
        break;
      case "password":
        if (!passRex.test(value)){
          helperText = "请正确输入密码： 以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
        }
        setPassword({id: "password",label: "密码",name: "password",value: "" + value,helperText})
        break;
      case "verifyCode":
        if (!value.trim()){
          helperText = "请正确输入验证码!"
        } 
        setVerifyCode({id: "verifyCode",label: "验证码",name: "verifyCode",value: "" + value,helperText})
        break;
    }
  }

 async function submitRegister() {//事件函数
    if (
      !phoneOrEmail.value ||
      phoneOrEmail.helperText ||
      !password.value ||
      password.helperText ||
      !verifyCode.value ||
      verifyCode.helperText
    ) {
      hintOpen("请输入正确的信息！！", "warning");
      return
    }
    let data = {
      number: phoneOrEmail.value,
      pwd: password.value,
      verify_code: verifyCode.value,
    };
    const [res,err] = await request.post('/admin/register',data).req_result()
    if(err){
      hintOpen(err, "error");
      return
    }
    if (res.status == 200) {
      hintOpen("注册成功", "success");
      Router.push("/userAuth/login");
      return;
    }
    hintOpen(res.message, "warning");
}

  //获取邮箱\手机验证码
  async function acceptCode() {
    if (
      !phoneRex.test(phoneOrEmail.value) &&
      !EmailRex.test(phoneOrEmail.value)
    ) {
      hintOpen("请输入正确的邮箱或手机号！！！", "warning");
      return
    }
    if(is_lock)return
    setIs_lock(true)
    setVerifyBtnState(event=>{
      event['disabled'] = true
      return event
    })
    const [res,error] = await request.post("/auth/code/verify?number=" + phoneOrEmail.value).req_result()
    if(error){
      setVerifyBtnState({
        disabled: false,
        btnText: "获取验证码",
      })
      hintOpen(error, "error");
      return
    }
    if (res.status == 200) {
      let num = 60;
      acceptCodeTimer = setInterval(() => {
        num--;
        setVerifyBtnState({
          disabled: true,
          btnText: num+ "s",
        })
        if (num < 1) {
          setVerifyBtnState({
            disabled: false,
            btnText: "获取验证码",
          })
          setIs_lock(false)
          clearInterval(acceptCodeTimer);
        }
      }, 1000)
      hintOpen(res.message, 'success');
    }else{
      setVerifyBtnState({
        disabled: false,
        btnText: "获取验证码",
      })
      hintOpen(res.message, 'error');
    } 
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <Grid className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name={phoneOrEmail.name}
                  label={phoneOrEmail.label}
                  helperText={phoneOrEmail.helperText}
                  id={phoneOrEmail.id}
                  value={phoneOrEmail.value}
                  error={phoneOrEmail.helperText ? true : false}
                  onChange={(e) => {
                    InputChange(e, phoneOrEmail.name);
                  }}
                  autoComplete="phoneOrEmail"
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
                onChange={(e) => {
                  InputChange(e, password.name);
                }}
                type="password"
                autoComplete="current-password"
              />
            </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name={verifyCode.name}
                    label={verifyCode.label}
                    helperText={verifyCode.helperText}
                    id={verifyCode.id}
                    value={verifyCode.value}
                    error={verifyCode.helperText ? true : false}
                    onChange={(e) => {
                      InputChange(e, verifyCode.name);
                    }}
                    type="verifyCode"
                    autoComplete="current-verifyCode"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="default"
                    size="small"
                    className={classes.btnOn}
                    disabled={verifyBtnState.disabled}
                    onClick={() => {
                      acceptCode();
                    }}
                  >
                    {verifyBtnState.btnText}
                  </Button>
                </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              submitRegister();
            }}
          >
            注册
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/userAuth/login" variant="body2">
                已有账号? 去登录
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Box mt={1}>
        <Copyright />
      </Box>
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
  );
}

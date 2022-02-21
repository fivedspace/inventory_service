import React, { useState, useEffect } from 'react';
import Router from 'next/router';
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
import {request} from "../../submodule/networks/request";
import Prompt from "../../submodule/components/Prompt/Prompt"
import { setCookie } from '../../submodule/util/cookie'

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
    margin: theme.spacing(3, 0, 2),
  },
  btnOn: {
    padding: "15px",
    margin: theme.spacing(0, 0, 2),
  },
  shape: {
    display: 'flex',
    alignItems: 'center'

  },
  style:{
    marginTop:'10px'
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [hint, setHint] = useState({
    open: false,
    severity: "success",
    message: "提示信息!",
  });
  const [phoneOrEmail, setPhoneOrEmail] = useState({
    id: "phoneOrEmail",
    label: "邮箱地址或电话号码",
    name: "phoneOrEmail",
    value: "",
    helperText: "",
  });
  const [password, setPassword] = useState({
    id: "password",
    label: "密码",
    name: "password",
    value: "",
    helperText: "",
  });
  const [verifyCode, setVerifyCode] = useState({
    id: "verifyCode",
    label: "验证码",
    name: "verifyCode",
    value: "",
    helperText: "",
  });
  const [verifyBtnState, setVerifyBtnState] = useState({
    disabled: false,
    btnText: "获取验证码",
  }); //验证码按钮文字
  const [clientCode, setClientCode] = useState("");
  const [selector, setSelector] = useState(true); //是否密码登录
  const [is_lock,setIs_lock] = useState(false)
  const phoneRex = /^1[3-9][0-9]{9}$/,
    EmailRex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    passRex = /^[a-zA-Z]\w{5,17}$/;
  let acceptCodeTimer = null;
  // 提示窗
  function hintOpen(message, severity) {
    setHint({ open: true, severity, message });
  }

  function InputChange(e, name) {
    const { value } = e.target;
    switch (name) {
      case "phoneOrEmail":
        if (phoneRex.test(value) || EmailRex.test(value)) {
          setPhoneOrEmail({
            id: "phoneOrEmail",
            label: "邮箱或电话",
            name: "phoneOrEmail",
            value: "" + value,
            helperText: "",
          });
          break;
        }
        setPhoneOrEmail({
          id: "phoneOrEmail",
          label: "邮箱或电话",
          name: "phoneOrEmail",
          value: "" + value,
          helperText: "请正确输入邮箱或电话号码",
        });
        break;
      case "password":
        if (passRex.test(value)) {
          setPassword({
            id: "password",
            label: "密码",
            name: "password",
            value: "" + value,
            helperText: "",
          });
          break;
        }
        setPassword({
          id: "password",
          label: "密码",
          name: "password",
          value: "" + value,
          helperText:
            "请正确输入密码： 以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
        });
        break;
      case "verifyCode":
        if (value.trim()) {
          setVerifyCode({
            id: "verifyCode",
            label: "验证码",
            name: "verifyCode",
            value: "" + value,
            helperText: "",
          });
          break;
        }
        setVerifyCode({
          id: "verifyCode",
          label: "验证码",
          name: "verifyCode",
          value: "" + value,
          helperText: "请正确输入验证码!",
        });
        break;
    }
  }
  useEffect(() => {
    getClientCode();
    return () => {
      clearInterval(acceptCodeTimer);
    };
  }, []);

  //获取client_code
  async function getClientCode() {
    let [res,error] = await request.post("/auth/code/client").req_result()
    if(res){
      setClientCode(res.client_code);
    }else{
      hintOpen(error, "error");
    }
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

  // 发送登录请求，获取登录令牌
 async function submitLogin() {
    if (selector) {
      //密码登录
      if (
        !phoneOrEmail.value ||
        phoneOrEmail.helperText ||
        !password.value ||
        password.helperText
      ) {
        hintOpen("请输入账号信息！", "warning")
        return
      }
      const [res, error] = await request.post("/admin/login",{
        number: phoneOrEmail.value,
        pwd: password.value,
        client_code: clientCode,
        callback_url: "string",
      }).req_result()
      if(error){
        hintOpen(error, "error");
        return
      }
      if (res.status == 200) {
        // console.log(res);
        hintOpen("登录成功", "success");
        setCookie("token", res.token);
        setTimeout(() => {Router.replace("/repertory/repertory")}, 1000);
      } else {
        hintOpen(res.message, "warning");
      }
      
    } else {
      //验证码登录
      if (
        !phoneOrEmail.value ||
        phoneOrEmail.helperText ||
        !verifyCode.value ||
        verifyCode.helperText
      ) {
        hintOpen("请输入账号信息！", "warning");
        return
      }
      const [res,error] = await request.post("/admin/login/verifycode",{
          number: phoneOrEmail.value,
          verify_code: verifyCode.value,
          callback_url: "string",
      }).req_result()
      if(error){
        hintOpen(error, "error")
        return
      }

      if (res.status == 200) {
          // console.log(res);
          setCookie("token", res.token);
          hintOpen("登录成功", "success");
          Router.replace("/repertory/repertory");
          return;
      }
      hintOpen(res.message, "warning");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
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
                autoComplete="email"
              />
            </Grid>
            {/* <Selector></Selector> */}
            {selector 
            ?
            (
              <Grid item xs={12} key={0}>
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
            )
            :
            (
              [
                <Grid item xs={8} key={1}>
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
                    type="phone"
                    autoComplete="current-phone"
                  />
                </Grid>,
                <Grid item xs={4} key={2}>
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
                </Grid>,
              ]
            )}
          </Grid>
          <Grid container className={classes.style}>
            <Grid item xs>
              <Link
                variant="body2"
                onClick={() => {
                  setSelector(!selector);
                }}
              >
                {selector ? "使用验证码登录" : "使用密码登录"}
              </Link>
            </Grid>
            <Grid item className={classes.shape}>
              <Link href="/userAuth/regist" variant="body2">
                还没有账号? 去注册
              </Link>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              submitLogin();
            }}
          >
            登录
          </Button>
        </Grid>
      </div>
      <Box>
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
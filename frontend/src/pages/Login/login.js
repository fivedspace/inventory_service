import React, {useState} from 'react';
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
import {AddAlert} from "@material-ui/icons";
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
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();

    const [message, setMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [uTitle,setUTitle] = useState({id:"username",label:"邮箱地址/用户名",name:"username",value:"",helperText:""})
    const [password,setPassword] = useState({id:"password",label:"密码",name:"password",value:"",helperText:""})

    const data = {
        // grant_type:"",
        username:uTitle.value,
        password:password.value,
        // scope:"",
        // client_id:"",
        // client_secret:""
    }

    const flagSnackbar = (messages) =>{
        if(!dialogOpen){
            setDialogOpen(true)
            setMessage(messages)
            setTimeout(function() {
                setDialogOpen(false);
                setMessage("")
            }, 6000);
        }
    }

    function InputChange(e,name){
        switch (name){

            case "username":
                const email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(email.test(e.target.value) || e.target.value.trim()){
                    setUTitle({id:"username",label:"邮箱地址/用户名",name:"username",value:""+e.target.value,helperText:""})
                    break;
                }
                setUTitle({id:"username",label:"邮箱地址/用户名",name:"username",value:""+e.target.value,helperText:"请正确输入邮箱/用户名"})
                break;
            case "password":
                if(e.target.value.trim()){
                    setPassword({id:"password",label:"密码",name:"password",value:""+e.target.value,helperText:""})
                    break;
                }
                setPassword({id:"password",label:"密码",name:"password",value:""+e.target.value,helperText:"密码不能为空格"})
                break;
            default:
                break;
        }
    }

    function submitLogin(){
        // console.log("登录 ？？？？")
        if((uTitle.value && !uTitle.helperText) && (password.value && !password.helperText)){

            console.log("调用登录接口")
            console.log(uTitle.value+password.value)

            const formData = new FormData();
            formData.append("username",data.username)
            formData.append("password",data.password)

            // const token = request({
            request({
                url: "/Admin/auth/login",
                method: "POST",
                data: formData,
                // data: {username: "sun",password:"000000"},
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }).then( r =>{
                if(r.access_token){
                    // document.cookie = "token="+r.access_token+";path=/;";
                    // window.location.reload();
                }else {
                    flagSnackbar("登录失败");
                }
            })
        }else {
            flagSnackbar("请输入账号信息！");
        }
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
                    登录
                </Typography>
                {/*<form className={classes.form} noValidate>*/}
                <form className={classes.form}
                      // action={"http://192.168.0.113:7878/Admin/auth/login/"}
                      // method={"POST"}
                      // onSubmit={submitLogin()}
                >
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
                        onChange={(e)=>{InputChange(e,uTitle.name)}}
                        autoFocus
                    />
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
                        onChange={(e)=>{InputChange(e,password.name)}}
                    />
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
                        onClick={()=>{submitLogin()}}
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
                            <Link href="/locker-admin/register" variant="body2">
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
import React, {useState, useEffect} from "react";
import Button from "submodule/components/CustomButtons/Button";
import { makeStyles } from "@material-ui/core/styles";
import {request} from "/submodule/networks/request";
import Prompt from "/submodule/components/Prompt/Prompt";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmationDialogRaw from "../oncoming/addCut"
import Card from "submodule/components/Card/Card";
import CardHeader from "submodule/components/Card/CardHeader";
import CardBody from "submodule/components/Card/CardBody";
import CardFooter from "submodule/components/Card/CardFooter";
import ImageCut from "./imageCut"
import VideoCut from "./videoCut"
import AudioCut from "./audioCut"
import TextCut from "./textCut"
import IntCut from "./intCut"
import FloatCut from "./floatCut"

const styles = {
    btn: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    root: {
        width: '100%',
        maxWidth: 360,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
};

const useStyles = makeStyles(styles);


export default function modelproperty(props) {
    const classes = useStyles();

    const [hint, setHint] = useState({ open: false, severity: 'success', message: '提示信息!' });//弹窗状态
	function hintOpen(message, severity) {//弹窗
	    setHint({ open: true, severity, message });
	}

    const { handleproperty, imports, pro, type } = props;
    const { titleText, amendButtons } = imports;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [ property, setproperty ] = useState(pro ? pro : []);
    const [ amend, setamend ] = useState(type ? false : true);//提交按钮状态


    const DetailsButtons = ()=>{
        return amendButtons.map((btn, index) => {
            return <Button color={btn.color ? btn.color : 'primary'} key={index} onClick={btn.func}>{btn.name}</Button>
        })
    }


    const handleClickListItem = () => {
        setOpen(true);
    };
    // 关闭弹窗的回调
    const handleClose = (newValue,newproperty) => {
        setOpen(false);
        if (newValue) {
            setValue(newValue);
        }
        if(newproperty){
            setproperty(newproperty)
        }
    };


    // 更改属性名和值时修改property
    const handleProperty = (newproperty) => {
        if(newproperty){
            property.map((item,index) => {
                if(item.id){
                    if(item.id == newproperty.id){
                        setproperty((prop) => {
                            prop.splice(index,1,newproperty)
                            return prop
                        })
                        return
                    }
                }
                if(item.uuid){
                    if(item.uuid == newproperty.uuid){
                        setproperty((prop) => {
                            prop.splice(index,1,newproperty)
                            return prop
                        })
                        return
                    }
                }
            })
        }
    }
    // 删除属性
    const handleDelete = (id) => {
        property.map((item,index) => {
            if(item.id){
                if(item.id == id){
                    setproperty((prop) => {
                        prop.splice(index,1)
                        return prop
                    })
                    return
                }
            }
            if(item.uuid){
                if(item.uuid == id){
                    setproperty((prop) => {
                        prop.splice(index,1)
                        return prop
                    })
                    return
                }
            }
        })
        setproperty([...property])
    }

    // 上传文件
    async function upload (){
        if(!type){
            if(amend){ setamend(false); return }
        }
        let arr = [];
        let arr1 = [];
        property.map((item) => {
            switch(item.type){
                case "图片":
                    arr.push({name: item.name, type: 'image', value: item.value});
                    break; 
                case "视频":
                    arr.push({name: item.name, type: 'video', value: item.value});
                    break; 
                case "音频":
                    arr.push({name: item.name, type: 'audio', value: item.value});
                    break; 
                case "文本":
                    arr.push({name: item.name, type: 'text', value: item.value});
                    break; 
                case "整数":
                    arr.push({name: item.name, type: 'int', value: item.value});
                    break; 
                case "小数":
                    arr.push({name: item.name, type: 'float', value: item.value});
                    break; 
                default:
                    arr1.push(item);
                    break; 
            }
        })
        
        const [res,err] = await request.post('/uploading',arr).req_result()
        if(err){
			hintOpen('保存失败', 'error')
			return
		}
		let _arr = res.map((item) => {
			return {
				name: item.name,
                type: item.type,
                uuid: item.uuid,
                value: item.value,
			}
		})
        handleproperty(_arr.concat(arr1));
        hintOpen("保存成功", 'success')
    }


    // 动态加载属性组件
    const PropertyModel = () =>{
        let arr = [];
        console.log(property,'model')
        property.map((item,index) => {
            switch(item.type){
                    case "图片":
                        arr.push(<ImageCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></ImageCut>)
                        break;
                    case "视频":
                        arr.push(<VideoCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></VideoCut>)
                        break;
                    case "音频":
                        arr.push(<AudioCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></AudioCut>)
                        break;
                    case "文本":
                        arr.push(<TextCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></TextCut>)
                        break;
                    case "整数":
                        arr.push(<IntCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></IntCut>)
                        break;
                    case "小数":
                        arr.push(<FloatCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></FloatCut>)
                        break;
                    case "image":
                        arr.push(<ImageCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></ImageCut>)
                        break;
                    case "video":
                        arr.push(<VideoCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></VideoCut>)
                        break;
                    case "audio":
                        arr.push(<AudioCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></AudioCut>)
                        break;
                    case "text":
                        arr.push(<TextCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></TextCut>)
                        break;
                    case "int":
                        arr.push(<IntCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></IntCut>)
                        break;
                    case "float":
                        arr.push(<FloatCut key={index} cut={item} handleProperty={handleProperty} handleDelete={handleDelete} amend={amend}></FloatCut>)
                        break;
                }
            })
            return arr
    }

    return (
        <>
            <Card>
                <CardHeader color="primary">
                    <h4 style={{ margin: '0 auto' }}>{ titleText }</h4>
                </CardHeader>
                <CardBody style={{ margin: '0' }}>
                    <div className={classes.root} style={{ display: amend ? 'none' : 'block' }}>
                        <List component="div" role="list">
                            <ListItem
                                button
                                divider
                                aria-haspopup="true"
                                aria-controls="ringtone-menu"
                                aria-label="phone ringtone"
                                onClick={handleClickListItem}
                                role="listitem"
                            >
                                <ListItemText primary="添加属性" />
                            </ListItem>
                            <ConfirmationDialogRaw
                                classes={{
                                    paper: classes.paper,
                                }}
                                id="ringtone-menu"
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                value={value}
                                proper={property}
                            />
                        </List>
                    </div>
                    {/* { PropertyModel() } */}
                    <PropertyModel/>
                </CardBody>
                <CardFooter>
                    <Button variant="contained" color={ type ? 'primary' : amend ? 'danger' : 'primary' }
                        onClick={ upload }>{ type ? '保存' : amend ? '修改' : '保存' }</Button>
                    { DetailsButtons() }
                </CardFooter>
            </Card>
            <Prompt
                handleClose={() => {
                    setHint({
                        open: false,
                        severity: hint.severity,
                        message: hint.message,
                    });
                }}
            {...hint}/>
        </>
    )
}

import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Details from '/submodule/components/Details/Details'
import Prompt from "/submodule/components/Prompt/Prompt";
import {request} from "/submodule/networks/request";
import Admin from '/src/layout/Admin';
import Button from "submodule/components/CustomButtons/Button";
import { Popover } from "@material-ui/core";
import Modelproperty from "./modelproperty";


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
    },
    table: {
        minWidth: 650,
    },
    btn: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    addbtn: {
        marginBottom: 20
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

export default function repertory() {
    const classes = useStyles()

    const detailButtons = [{ name: '提交', func: subApp }]//提交按钮
    const [detailData,setDetailData] = useState({})//详情中返回所有输入框的值
    // const [property, setproperty] = useState([])// 自定义属性
    const [propertyDate, setpropertyDate] = useState([])// 上传的属性数组

	const [dataVal,setDataVal] = useState(null)

    const [hint, setHint] = useState({ open: false, severity: 'success', message: '提示信息!' });//弹窗状态
	function hintOpen(message, severity) {//弹窗
	    setHint({ open: true, severity, message });
	}

    const [cutBtn, setcutBtn] = useState(false); // 切换添加商品属性和自定义属性
    const [date, setdate] = useState('');

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const m = now.getMonth();
        const d = now.getDate();
        const h = now.getHours();
        const i = now.getMinutes();
        if(h < 10){
            h = '0'+h;
        }
        if(i < 10){
            i = '0'+i;
        }
        setdate(year+'-'+m+1+'-'+d +'T'+ h + ':' + i)
    },[])

    const detailInputs = [
	    { help_text: "", labelText: "货物名称", id: "freight_name", name: "freight_name", value:dataVal?dataVal.freight_name:""},
	    { help_text: "", labelText: "货物数量", id: "purchase_quantity", name: "purchase_quantity", value:dataVal?dataVal.purchase_quantity:""},
	    { help_text: "", labelText: "生产厂家", id: "manufacture_factory", name: "manufacture_factory", value:dataVal?dataVal.manufacture_factory:""},
	    { help_text: "", labelText: "生产时间", type: 'datetime-local', id: "manufacture_time", name: "manufacture_time", value:dataVal?dataVal.manufacture_time:date},
	    { help_text: "", labelText: "货物价格", id: "freight_price", name: "freight_price", value:dataVal?dataVal.freight_price:""},
	    { help_text: "", labelText: "入库时间", type: 'datetime-local', id: "warehouseIn_time", name: "warehouseIn_time", value:dataVal?dataVal.warehouseIn_time:date},
	    { help_text: "", labelText: "仓库id", id: "warehouse_id", name: "warehouse_id", value:dataVal?dataVal.warehouse_id:""},
	    { help_text: "", labelText: "应用系统id", id: "appcation_id", name: "appcation_id", value:dataVal?dataVal.appcation_id:""}
	]

    function dtailExport (id,value,blur,bool) {
        if(id){
	        setDetailData(event=>{
	            event[id] = value
	            return event
	        })
	    }
		if(blur){
			for(let i=0;i<detailInputs.length;i++){
				
				if(detailInputs[i].id===id){
					let text="";
						switch(id){
                            case "freight_name":
							    if(bool){
							        text="货物名称不能为空"
							    }
                            case "purchase_quantity":
                                if(bool){
                                    text="货物数量不能为空"
                                }
                            case "manufacture_factory":
                                if(bool){
                                    text="生产厂家不能为空"
                                }
                            case "manufacture_time":
                                if(bool){
                                    text="生产时间不能为空"
                                }
                            case "freight_price":
                                if(bool){
                                    text="货物价格不能为空"
                                }
                            case "warehouseIn_time":
                                if(bool){
                                    text="入库时间不能为空"
                                }
                            case "warehouse_id":
                                if(bool){
                                    text="仓库id不能为空"
                                }
                            case "appcation_id":
                                if(bool){
                                    text="应用系统id不能为空"
                                }
						}	
						detailInputs[i].help_text=text
					}
			}
            return bool
		}
    }
    /* 新增货物信息 */
    async function subApp(){
		const {freight_name,purchase_quantity,manufacture_factory,manufacture_time,freight_price,warehouseIn_time,warehouse_id,appcation_id} = detailData
        if (!freight_name || !purchase_quantity || !manufacture_factory || !manufacture_time || !freight_price || !warehouseIn_time || !warehouse_id || !appcation_id) {
			hintOpen("请按提示信息正确录入货物信息!","warning") //当录入数据不合法时，点击提交按钮给出提示
			return
		}
        // console.log(freight_name,purchase_quantity,manufacture_factory,manufacture_time,warehouseIn_time)
		const [res,err] = await request.post('/freight/warehouse_in',{
            freight_name,
            purchase_quantity,
            manufacture_factory,
            manufacture_time,
            freight_price: freight_price * 1,
            warehouseIn_time,
            warehouse_id: warehouse_id * 1,
            appcation_id: appcation_id * 1,
            property: propertyDate
		}).req_result()
        if(res){
            hintOpen("添加货物成功", 'success')
            return
        }
        hintOpen(err,'error');
        setDataVal({freight_name,purchase_quantity,manufacture_factory,manufacture_time,freight_price,warehouseIn_time,warehouse_id,appcation_id})
    }



    // 切换属性按钮状态 
    function handlepropertyBtn(){
        setcutBtn(!cutBtn);
    }
    const amendButtons = [//添加属性返回按钮
		{ name: '返回', func: () => { setcutBtn(!cutBtn); } }
	]
    function handleproperty(newval){// 更新新增货物属性
        newval.map((item) => {
            delete item.value;
        })
        setpropertyDate(newval)
    }



    return (
        <Admin 
            callback={() => {
                return (
                    <>
                        {
                        cutBtn
                        ?
                        (
                            <Modelproperty
                                handleproperty={ handleproperty }
                                handlepropertyBtn={ handlepropertyBtn }
                                imports={{
									titleText:'添加自定义属性',
									amendButtons
								}}
                                type={true}
                            ></Modelproperty>
                        )
                        :
                        (
                            <>
                                <Details
                                imports={{titleText:'添加货物',
                                            detailButtons,
                                            detailInputs
                                            }}
                                    exports={dtailExport}
                                />
                                <Button variant="contained" color="primary" onClick={handlepropertyBtn}>添加自定义属性</Button>
                            </>
                        )
                        }
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
            }}
        ></Admin>
    )
}

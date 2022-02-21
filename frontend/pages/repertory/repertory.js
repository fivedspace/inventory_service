import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Details from '/submodule/components/Details/Details'
import Prompt from "/submodule/components/Prompt/Prompt";
import {request} from "/submodule/networks/request";
import Admin from '/src/layout/Admin'

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
    }
};
const useStyles = makeStyles(styles);

export default function repertory() {
	const classes = useStyles();
    const detailButtons = [{ name: '提交', func: subApp }]//提交按钮
    const [detailData,setDetailData] = useState({})//详情中返回所有输入框的值

	const [dataVal,setDataVal] = useState(null)

    const [hint, setHint] = useState({ open: false, severity: 'success', message: '提示信息!' });//弹窗状态
	function hintOpen(message, severity) {//弹窗
	    setHint({ open: true, severity, message });
	}

    const detailInputs = [
	    { help_text: "", labelText: "仓库名称", id: "warehouse_name", name: "warehouse_name", value:dataVal?dataVal.warehouse_name:""},
	    { help_text: "", labelText: "仓库地址", id: "address", name: "address", value:dataVal?dataVal.address:""},
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
							case "warehouse_name":
							  if(bool){
							  	text="仓库名称不能为空"
							  }
							  break;
							case "address":
							if(bool){
								text="仓库地址不能为空"
							}
							  break;
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
    /* 新增仓库信息 */
    async function subApp(){
		console.log(detailData)
		const {warehouse_name,address,appcation_id} = detailData
		const appcationid = appcation_id * 1;
        if (!warehouse_name||!address || !appcation_id) {
			hintOpen("请按提示信息正确录入仓库信息!","warning") //当录入数据不合法时，点击提交按钮给出提示
			return
		}
		const [res,err] = await request.post('/warehouse',{
			warehouse_name,
            address,
			'appcation_id': appcationid
		}).req_result()
		if(res){
			hintOpen("添加仓库成功", 'success')
			return
		}
		hintOpen(err,'error');
		setDataVal({warehouse_name,address,appcationid})
    }

    return (
        <Admin 
            callback={() => {
                return (
                    <>
					    <Details
						imports={{titleText:'添加仓库',
									detailButtons,
									detailInputs
								   }}
					        exports={dtailExport}
					    />
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

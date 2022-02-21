import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DirectionsIcon from "@material-ui/icons/Directions";
import Grid from "@material-ui/core/Grid";
import Button from "submodule/components/CustomButtons/Button";
import GridContainer from "submodule/components/Grid/GridContainer";
import GridItem from "submodule/components/Grid/GridItemPc";
import Card from "submodule/components/Card/Card";
import CardHeader from "submodule/components/Card/CardHeader";
import CardBody from "submodule/components/Card/CardBody";
import Table from "submodule/components/Table/Table";
import CardFooter from "submodule/components/Card/CardFooter";
import BasicPagination from 'submodule/components/Pagination/Pagination';
import Details from "submodule/components/Details/Details";
import Prompt from 'submodule/components/Prompt/Prompt';
import Dialog from 'submodule/components/Dialog/DialogConfirm';
import Filter from 'submodule/components/FilterField/FilterField';
import {request} from "submodule/networks/request";
import HeaderPapers from "src/headerPaper";
import Admin from 'src/layout/Admin';

import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { card } from "assets/material-dashboard-react";
import Modelproperty from "/pages/oncoming/modelproperty";

const useStyles = makeStyles((theme) => ({
	pointer: { cursor: "pointer" },
	grids: { minWidth: 130, textAlign: "center" }
}));


export default function queryCargo(props) {
	const classes = useStyles();
	const [pageCount, setPageCount] = useState(1);   //设置总页数
	const [page, setPage] = useState(1);                   //当前页数,默认为第一页
	const [pageItems, setPageItems] = useState([]);        //设置当前页的初始驱动数据
	const [changeFlag, setChangeFlag] =useState(false);//当page,page_size改变时，改变flag
	const [baseInputValue, setBaseInputValue] = useState("");
	const [upOpen, setUpOpen] = useState(null);//详情显示数据
	const [type, setType] = useState(false)//切换状态
	const [selectValue, setSelectValue] = useState('')//下拉菜单中的值
	const [hint, setHint] = useState({ open: false, severity: 'success', message: '提示信息!' })//弹窗状态
	const [dialogOpen, setDialogOpen] = useState(false);//对话框
	const [disabled, setDisabled] = useState(true);//详情输入框禁用
	const [amendDisabled, setamendDisabled] = useState(true);//自定义属性修改按钮禁用
	const [detailData, setDetailData] = useState({})//详情中返回所有输入框的值
	const [propertyData, setpropertyData] = useState([])


	const detailInputs = [//详情输入框
		{ help_text: "", labelText: "创建时间", id: "created_at", name: "created_at", value: (upOpen ? upOpen[0].created_at : ''), disabled },
		{ help_text: "", labelText: "更新时间", id: "updated_at", name: "updated_at", value: (upOpen ? upOpen[0].updated_at : ''), disabled },
		{ help_text: "", labelText: "货物id", id: "id", name: "id", value: (upOpen ? upOpen[0].id : ''), disabled },
		{ help_text: "", labelText: "货物名称", id: "freight_name", name: "freight_name", value: (upOpen ? upOpen[0].freight_name : ''), disabled},
		{ help_text: "", labelText: "货物数量", id: "freight_quantity", name: "freight_quantity", value: (upOpen ? upOpen[0].freight_quantity : ''), disabled},
		{ help_text: "", labelText: "生产厂家", id: "manufacture_factory", name: "manufacture_factory", value: (upOpen ? upOpen[0].manufacture_factory : ''), disabled },
		{ help_text: "", labelText: "生产时间", id: "manufacture_time", name: "manufacture_time", value: (upOpen ? upOpen[0].manufacture_time : ''), disabled },
		{ help_text: "", labelText: "货物单价", id: "freight_price", name: "freight_price", value: (upOpen ? upOpen[0].freight_price : ''), disabled },
		{ help_text: "", labelText: "仓库id", id: "warehouse_id", name: "warehouse_id", value: (upOpen ? upOpen[0].warehouse_id : ''), disabled },
		{ help_text: "", labelText: "应用系统id", id: "appcation_id", name: "appcation_id", value: (upOpen ? upOpen[0].appcation_id : ''), disabled },
	]

	const detailButtons = [//详情提交按钮
		{ name: (disabled ? '修改' : '提交'), func: submit, color: (disabled ? 'danger' : 'primary') },
		{ name: '返回查询页面', func: () => { setType(false); setDisabled(true) } }
	]
	const amendButtons = [
		{ name: '返回查询页面', func: () => { setType(false); setamendDisabled(true) } }
	]

	function requestData(i) {
		setPageItems((e) => {
			e.splice(upOpen[1], 1, i)
			return e
		})
	}

	let selectData = [
		{ name: '货物id', field_name: 'id' },
		{ name: "货物名称", field_name: 'freight_name' },
		{ name: "货物数量", field_name: 'freight_quantity' },
		{ name: "货物价格", field_name: 'freight_price' },
		{ name: '生产厂家', field_name: 'manufacture_factory'},
		{ name: '仓库id', field_name: 'warehouse_id'},
		{ name: '应用系统id', field_name: 'appcation_id'}
	]

	const filterFieldData = [//过滤字段数据
		{
			type: "radio",
			titleText: "选择升降序",
			id: "direction",
			value: "desc",
			lists: [
				{ value: "desc", label: "降序" },
				{ value: "asc", label: "升序" },
			],
		},
		{
			type: "select",
			titleText: "选择排序方式",
			id: "fieldname",
			value: "id",
			lists: [
				{ name: '货物id', field_name: 'id' },
				{ name: "货物名称", field_name: 'freight_name' },
				{ name: "货物数量", field_name: 'freight_quantity' },
				{ name: "货物价格", field_name: 'freight_price' },
				{ name: '生产厂家', field_name: 'manufacture_factory'},
				{ name: '仓库id', field_name: 'warehouse_id'},
				{ name: '应用系统id', field_name: 'appcation_id'}
			],
		},
		{
			type: "text",
			titleText: "输入货物名称",
			id: "freightname",
			value: "",
			label: "货物名称"
		},
		{
			type: "text",
			titleText: "输入货物数量",
			id: "freightquantity",
			value: "",
			label: "货物数量",
		},
		{
			type: "text",
			titleText: "输入生产厂家",
			id: "manufacturefactory",
			value: "",
			label: "生产厂家",
		},
		{
			type: "text",
			titleText: "输入货物单价",
			id: "freightprice",
			value: "",
			label: "货物单价"
		},
		{
			type: "text",
			titleText: "输入仓库id",
			id: "warehouseid",
			value: "",
			label: "仓库id"
		}
	]

	const [filterField] = useState([...filterFieldData]);//过滤组件中
	const [empty, setEmpty] = useState(null);//重置过滤条件	
	const [filterData, setFilterData] = useState({});//过滤组件中返回的所有过滤状态的值	
	const buttonGroup = [//对话框中的按钮
		{ text: '确认', func: removeBtn },
		{ text: '取消', func: () => { setDialogOpen(false) } },
	]
	const buttonfreight = [
		{ text: '确认', func: warehouseOut },
		{ text: '取消', func: () => { setfreightOut(false) } }
	]
	function hintOpen(message, severity) {//弹窗
		setHint({ open: true, severity, message });
	}
	// useEffect(requestPackage({creatRequest: true}), [])
	useEffect(() => {
		requestPackage({ creatRequest: true })
	}, [])
	 
	function realTimeInput(e) {//清空输入框时重新加载数据
		!(e.target.value).length ? requestPackage({ creatRequest: true }) : ''
	}
	function selectMenuChange(e) {//下拉菜单事件
		setSelectValue(e);
	}

	// 自定义属性名称的显示
	function propertyList (tableJson){
		const list = [];
		if(tableJson.length == 0){
			list.push(<div>无</div>)
		}
		tableJson.map((item,index) => {
			list.push(<div key={index}>{item.name}</div>)
		})
		return list;
	}

	/* 将数组对象列表转换为数组包含数组的形式,table组件所接受的数据结构*/
	function tableData() {
		const tabData = [];
		const tableJson = pageItems;
		if (Array.isArray(tableJson) && tableJson.length) {
			for (let i = 0; i < tableJson.length; i++) {
				tabData.push(
					[
						tableJson[i].created_at,
						tableJson[i].updated_at,
						tableJson[i].freight_name,
						tableJson[i].freight_quantity,
						tableJson[i].manufacture_factory,
						tableJson[i].manufacture_time,
						tableJson[i].freight_price,
						tableJson[i].warehouse_id,
						tableJson[i].appcation_id,
						tableJson[i].id,
						propertyList(tableJson[i].property),
						<Grid className={classes.grids} key={i}>
							<Button size="sm" className={classes.pointer} color={"primary"}
								onClick={() => { setType(true); setUpOpen([tableJson[i], i]) }}>详情</Button>&nbsp;&nbsp;&nbsp;&nbsp;
							<Button size="sm" className={classes.pointer} color={"primary"}
								onClick={ () => { setfreightOut(true); setfreightData(tableJson[i]); setUpOpen([tableJson[i], i]) } }>出库</Button>&nbsp;&nbsp;&nbsp;&nbsp;
							<Button color={"danger"} size="sm"
								onClick={() => { setDialogOpen([tableJson[i], i]) }}>删除</Button>
						</Grid>,
					]
				)
			}
		}
		return tabData;
	}
	function dtailExport(id, value) {//详情组件导出数据
		if (id) {
			setDetailData(event => {
				event[id] = value
				return event
			})
		}
		return detailData
	}
	function back() {
		setUpOpen(false)
	}

	/* 修改货物信息 */
	async function submit() {
		if (disabled) { setDisabled(false); return }
		// console.log(detailData)
		const { created_at,updated_at,freight_name,freight_quantity,manufacture_factory,manufacture_time,freight_price,warehouse_id,appcation_id,id } = detailData
		const [res, err] = await request.put('/freight/'+id,{
			'freight_name': freight_name,
			'purchase_quantity': freight_quantity,
			'manufacture_factory': manufacture_factory,
			'manufacture_time': manufacture_time,
			'freight_price': freight_price,
			'warehouseIn_time': created_at,
			'warehouse_id': warehouse_id,
			'appcation_id': appcation_id,
			'property': propertyData
		}).req_result()
		if(err){
			hintOpen(err, 'error')
			return 
		}
		setUpOpen([res, upOpen[1]])
		requestData(res)
		hintOpen("修改成功", 'success');
	}

	const [freightOut, setfreightOut] = useState(false); // 出库弹窗
	const [freightData, setfreightData] = useState({}); // 货物信息
	const [err, seterr] = useState(false);
	const [helperText, sethelperText] = useState(''); // 提示信息
	const [shipment, setshipment] = useState(1); // 货物数量

	// 出库
	async function warehouseOut (){
		const { id, freight_name, warehouse_id, appcation_id } = freightData;
		const time = null;
		const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const h = now.getHours();
        const m = now.getMinutes();
        time = year+'-'+month+1+'-'+day+'T'+h+':'+m;

		if(shipment < 1 && shipment%1 != 0){
			return
		}

		const [res, err] = await request.post('/freight/warehouse_out',{
			freight_id: id,
			freight_name,
			shipment,
			warehouseOut_time: time+'',
			warehouse_id,
			appcation_id
		}).req_result()
		if(err){
			hintOpen(err, 'error')
			return
		}
		setUpOpen([res, upOpen[1]])
		requestData(res)
		hintOpen("出库成功",'success');
		setfreightOut(false);
	}
	
	function freightAmount(e){//更新货物数量
		if(e.target.value*1 % 1 != 0 && e.target.value > 0){
			seterr(true);
			sethelperText("请输入正整数");
			return
		}
		setshipment(e.target.value);
	}
	function warehouseOutInfo () {//出库弹窗内容
		return(
			<>
				<DialogContent>
					<TextField
						id="outlined-number"
						label="出货数量"
						type='number'
						variant="outlined"
						helperText={ helperText }
						InputLabelProps={{
							shrink: true,
						}}
						value={ shipment }
						onChange={ freightAmount }
						error={err}
					/>
				</DialogContent>
			</>
		)
	}

	async function requestPackage(info) {//封装请求
		let filter = [],
			{ creatRequest, inquire, pageValue } = info
		const { freightname, freightquantity, manufacturefactory, freightprice, warehouseid, direction, fieldname } = filterData
		if (inquire) {
			filter = [{"fieldname": inquire.fieldname, "option": "==", 'value': inquire.value }]
		}
		if (freightname) {
			filter.push({"fieldname": 'freight_name', "option": "like", "value": "%"+freightname+"%" })
		}
		if (freightquantity) {
			filter.push({"fieldname": 'freight_quantity', "option": "==", "value": freightquantity })
		}
		if (manufacturefactory) {
			filter.push({"fieldname": 'manufacture_factory', "option": "like", "value": "%"+manufacturefactory+"%" })
		}
		if (freightprice) {
			filter.push({"fieldname": 'freight_price', "option": "==", "value": freightprice })
		}
		if (warehouseid) {
			filter.push({"fieldname": 'warehouse_id', "option": "==", "value": warehouseid })
		}
		const [res, err] = await request.get('/freight',{
			params: (creatRequest ? '' : {
				paginate: JSON.stringify({ "page": (pageValue ? pageValue : page), "limit": 10 }),
				filter: JSON.stringify(filter),
				sort: JSON.stringify([{"field": (fieldname ? fieldname : 'id'), "direction": direction ? direction : 'desc' }])

			})}).req_result()
		if(err){
			hintOpen(err, 'error')
			return
		}
		let arr = res.data.map((item) => {
			return {
				created_at: item.created_at.replace('T',' '),
				updated_at: item.updated_at.replace('T',' '),
				freight_name: item.freight_name,
				freight_quantity: item.freight_quantity,
				manufacture_factory: item.manufacture_factory,
				manufacture_time: item.manufacture_time.replace('T',' '),
				freight_price: item.freight_price,
				warehouse_id: item.warehouse_id,
				appcation_id: item.appcation_id,
				id: item.id,
				property: item.property
			}
		})
		// console.log(arr)
		if (creatRequest) {
			setBaseInputValue('')
			setEmpty(filterFieldData)
		}
		setPageCount(res.page_count)
		setPageItems(arr)
	}
	
	async function removeBtn() {
		const [res, err] = await request.delete("/freight/" + dialogOpen[0].warehouse_id +"/"+ dialogOpen[0].id).req_result()
		setDialogOpen(false)
		if(err){
			hintOpen("删除失败", 'error')
			return
		}
		// pageItems.splice(dialogOpen[1], 1)
		const items = pageItems;
		items.splice(dialogOpen[1],1)
		setPageItems(items);
		setChangeFlag(!changeFlag)   //删除成功后改变flag, 重新加载数据渲染页面
		hintOpen("删除成功", 'success')
	}

	/* 根据输入的条件查询数据 */
	function handleButtonClick() {
		if (baseInputValue) {
			requestPackage({ inquire: { 'value': baseInputValue, 'fieldname': selectValue } })
		} else {
			hintOpen('请输入查询内容', 'warning')
		}
	}

	function handPages(e, value) { //页码
		setPage(value);
		requestPackage('', value)
	}

	function fieldList() {//过滤的字段
		return (
			<Filter
				imports={{//过滤组件导入数据
						  resetFilter: empty,
					      setResetFilter: setEmpty,
						  importData: filterField
						}}
				exports={filterExport}
			/>
		)
	}
	function filterExport(id, value) {//过滤组件导出数据
		if (id) {
			setFilterData(event => {
				event[id] = value
				return event
			})
		}
		return filterData
	}
	function reset() {//重置事件
		requestPackage({ creatRequest: true })
	}
	function ascertain() {//过滤确认事件
		let data = ''
		if (baseInputValue) {
			data = { 'value': baseInputValue, 'fieldname': selectValue }
		}
		requestPackage({ inquire: data })
	}

	const handleproperty = (newArr) => {//修改自定义属性后的的值
		setpropertyData(newArr);
	}

	return (
		<Admin callback={() => {
			return (
				<>
					{
					type
					?
					(
						<>
							<Details
								imports={ {
									titleText: '修改信息',
									detailButtons,
									detailInputs
								}}
								exports={dtailExport}
							/>
							<Modelproperty
								handleproperty={ handleproperty }
								imports={{
									titleText:'修改自定义属性',
									amendButtons
								}}
								pro={ upOpen[0].property }
								type={false}
							></Modelproperty>
						</>
					)
					:
					(
						<GridContainer>
							<GridItem xs={12} sm={12} md={12}>
								<Card plain>
									<CardHeader color="primary">
										{/*过滤组件*/}
										<HeaderPapers imports={{
											value: baseInputValue,//搜索输入框中的值
											setValue: (e) => {//获取查询时候，用户录入的筛选条件
												setBaseInputValue(e);
											},
											handleButtonClick,//搜索点击事件
											selectList: selectData,//下拉菜单中的数据
											selectMenuValue: selectMenuChange,//下拉菜单选中的值
											realTimeInput,
											drawerImport:{
												fieldList,//过滤字段
												drawerShape: "right",//抽屉划出方向
												ascertain,//过滤确认
												reset,//重置
												DirectionsIcon: () => { return <DirectionsIcon /> }
											},//过滤数据
											placeholder: '查询内容'
										}} />
									</CardHeader>
									<CardBody>
										<Table
											tableHeaderColor={"primary"}
											tableHead={["创建时间", "更新时间", "货物名称", "货物数量","生产厂家","生产时间","货物单价","仓库id","应用系统id","货物id","属性","操作"]}
											tableData={pageItems ? tableData() : []}
										/>
									</CardBody>
									<CardFooter>
										{
											pageItems.length
											?
											(<BasicPagination
												hidden={pageCount > 0 ? true : false}
												count={pageCount}
												onChange={(e, page) => { setPage(page); setChangeFlag(!changeFlag) }}
											/>)
											:
											<h3 style={{ margin: '0 auto', color: 'red' }}>未查询到该货物，请重新查询</h3>
										}
									</CardFooter>
								</Card>
							</GridItem>
						</GridContainer>
					)
					}
					<Dialog
						status={freightOut}
						title='请选择出库数量'
						txtContent={warehouseOutInfo()}
						buttonGroup={buttonfreight}
					/>
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
					{/*  删除数据确认的提示框  */}
					<Dialog
						status={dialogOpen}
						txtContent="请确认是否要删除此数据？"
						buttonGroup={buttonGroup}
					/>
				</>
			)
		}} />
	);
}

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
	const [detailData, setDetailData] = useState({})//详情中返回所有输入框的值

	const detailInputs = [//详情输入框
		{ help_text: "", labelText: "仓库名称", id: "warehouse_name", name: "warehouse_name", value: (upOpen ? upOpen[0].warehouse_name : ''), disabled },
		{ help_text: "", labelText: "仓库地址", id: "address", name: "address", value: (upOpen ? upOpen[0].address : ''), disabled},
		{ help_text: "", labelText: "创建时间", id: "created_at", name: "created_at", value: (upOpen ? upOpen[0].created_at : ''), disabled},
		{ help_text: "", labelText: "仓库id", id: "id", name: "id", value: (upOpen ? upOpen[0].id : ''), disabled},
		{ help_text: "", labelText: "应用系统id", id: "appcation_id", name: "appcation_id", value: (upOpen ? upOpen[0].appcation_id : ''), disabled},
	]

	const detailButtons = [//详情提交按钮
		{ name: (disabled ? '修改' : '提交'), func: submit, color: (disabled ? 'danger' : 'primary') },
		{ name: '返回查询页面', func: () => { setType(false); setDisabled(true) } }
	]

	function requestData(i) {
		setPageItems((e) => {
			e.splice(upOpen[0], 1, i)
			return e
		})
	}

    // 查询条件
	let selectData = [
        { name: 'ID', field_name: 'id' },
		{ name: '仓库名称', field_name: 'warehouse_name' },
		{ name: '仓库地址', field_name: 'address' },
		{ name: '应用系统id', field_name: 'appcation_id' }
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
				{ name: 'ID', field_name: 'id' },
				{ name: '仓库名称', field_name: 'warehouse_name' },
				{ name: '仓库地址', field_name: 'address' },
				{ name: '应用系统id', field_name: 'appcation_id' }
			],
		},
		{
			type: "text",
			titleText: "输入仓库名称",
			id: "warehousename",
			value: "",
			label: "仓库名"
		},
		{
			type: "text",
			titleText: "输入仓库地址",
			id: "address",
			value: "",
			label: "仓库地址"
		}
	]

	const [filterField] = useState([...filterFieldData]);//过滤组件中
	const [empty, setEmpty] = useState(null);//重置过滤条件	
	const [filterData, setFilterData] = useState({});//过滤组件中返回的所有过滤状态的值	
	const buttonGroup = [//对话框中的按钮
		{ text: '确认', func: removeBtn },
		{ text: '取消', func: () => { setDialogOpen(false) } },
	]

	function hintOpen(message, severity) {//弹窗
		setHint({ open: true, severity, message });
	}

	useEffect(() => { requestPackage({ creatRequest: true })}, [])
	 
	function realTimeInput(e) {//清空输入框时重新加载数据
		!(e.target.value).length ? requestPackage({ creatRequest: true }) : ''
	}
    //下拉菜单事件
	function selectMenuChange(e) {
		setSelectValue(e);
	}
	/* 将数组对象列表转换为数组包含数组的形式,table组件所接受的数据结构*/
	function tableData() {
		const tabData = [];
		const tableJson = pageItems;
		if (Array.isArray(tableJson) && tableJson.length) {
			for (let i = 0; i < tableJson.length; i++) {
				tabData.push(
					[
						tableJson[i].warehouse_name,
						tableJson[i].address,
						tableJson[i].created_at,
						tableJson[i].id,
						tableJson[i].appcation_id,
						<Grid className={classes.grids} key={i}>
							<Button size="sm" className={classes.pointer} color={"primary"}
								onClick={() => { setType(true); setUpOpen([tableJson[i], i]) }}>详情</Button>&nbsp;&nbsp;&nbsp;&nbsp;
							<Button color={"danger"} size="sm" onClick={() => { setDialogOpen([tableJson[i].id, i]) }}>删除</Button>

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

	/* 修改仓库信息 */
	async function submit() {
		if (disabled) { setDisabled(false); return }
		// console.log(detailData)
		const { warehouse_name, address, id } = detailData
		const [res, err] = await request.put('/warehouse/'+id,{
			'warehouse_name': warehouse_name,
			'address': address
		}).req_result()
		if(err){
			hintOpen(err, 'error')
			return 
		}
		setUpOpen([res, upOpen[1]])
		requestData(res)
		hintOpen("修改成功", 'success');
	}

	async function requestPackage(props) {//封装请求
		let filter = [],
			{ creatRequest, inquire, pageValue } = props
		const { warehousename, address, createTime, direction, fieldname } = filterData
		if (inquire) {
			filter = [{"fieldname": inquire.fieldname, "option": "==", 'value': inquire.value }]
		}
		if (warehousename) {
			filter.push({"fieldname": 'warehouse_name', "option": "like", "value": "%"+warehousename+"%" })
		}
		if (address) {
			filter.push({"fieldname": 'address', "option": "like", "value": "%"+address+"%" })
		}
		const [res, err] = await request.get('/warehouse',{
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
				address: item.address,
				appcation_id: item.appcation_id,
				created_at: item.created_at.replace('T',' '),
				id: item.id,
				warehouse_name: item.warehouse_name
			}
		})
		if (creatRequest) {
			setBaseInputValue('')
			setEmpty(filterFieldData)
		}
		setPageCount(res.page_count)
		setPageItems(arr)
	}
	
	// 删除仓库信息
	async function removeBtn() {
		const [res, err] = await request.delete("/warehouse/" + dialogOpen[0]).req_result()
		setDialogOpen(false)
		if(err){
			hintOpen("删除失败", 'error')
			return
		}
		pageItems.splice(dialogOpen[1], 1)
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

	return (
		<Admin callback={() => {
			return (
				<>
					{type
					?
					(
						<Details
							imports={ {
								titleText: '修改仓库信息',
								detailButtons,
								detailInputs
							}}
							exports={dtailExport}
						/>
					) 
					:
					(<GridContainer>
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
										tableHead={["仓库名称", "仓库地址","创建时间","仓库id","应用系统id","操作"]}
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
										<h3 style={{ margin: '0 auto', color: 'red' }}>未查询到该仓库，请重新查询</h3>
									}
								</CardFooter>
							</Card>
						</GridItem>
					</GridContainer>
					)}
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

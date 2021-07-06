
import React from 'react';
import {Component} from 'react'
// import './App.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue:'',
            ifConfirm:true,
            firmsList:[]
        };
    }
    //中文输入开始
    onCompositionStart = () => {
        this.setState({ifConfirm:false})
    }
    //中文输入结束
    onCompositionEnd = () => {
        this.setState({ifConfirm:true})
    }
    handleChange = event => {
        //在setState函数中绑定一个回调函数
        this.setState(
            {searchValue:event.target.value},
            () => {
                if (this.state.searchValue === ''){
                    //输入为空时
                    this.setState({firmsList:[]})
                }
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    //中文输入结束并且输入不为空
                    if(this.state.ifConfirm && this.state.searchValue){
                        //调取后端接口，返回数据库结果
                        fetch('http://localhost:3000/match?wexp='+(this.state.searchValue),{
                            mode:'no-cors'
                        })
                            .then(response => response.json())
                            .then(myJson => this.setState({firmsList:myJson}))
                    }
                },300)
            }
        );
    }
    //input输入框点击事件
    inputClick = () =>{
        let adepsp = document.getElementById("adepsp");
        let adepmatch = document.getElementById("adepmatch");
        adepsp.style.border = "0.1rem solid #32CD32";
        adepmatch.style.display = "block";
    }
    //匹配列鼠标点击事件
    onClick = event =>{
        //点击<li>，将<li>内容赋值给input;
        this.setState({searchValue:event.target.innerHTML});
        let adepmatch = document.getElementById("adepmatch");
        event.target.style.display = "none";
        adepmatch.style.display="none";
    }
    //渲染节点
    render(){
        return (
            <React.Fragment>
                <div>
		        <span className="adepstyle" id="adepsp">
		            <span className="adeplable">
		        	    起飞机场
		        	</span>
		        	<span className="adepspan">
		        	    <input className="adepinput" id="adep"
                               type="text" name="adep" value={this.state.searchValue}
                               onClick={this.inputClick}
                            // onBlur={this.onBlur}
                               onChange={this.handleChange} />
		        	</span>
		        </span>
                </div>
                <div className="match" id="adepmatch" >
                    <ul>
                        {this.state.firmsList.map((adep) =>
                            <li key={adep.id} onClick={this.onClick}>
                                {adep.wexp + adep.cfullname}
                            </li>
                        )}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Admin;
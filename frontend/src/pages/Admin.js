import React from "react";
import axios from 'axios';
import { Component } from "react";





class Admin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.handclick = this.handclick.bind(this)
    };
    handclick() {
        let url="http://tzw160702.work:8000/"
        axios.get(url)
            .then((res) => {
                console.log(JSON.stringify(res.data))
                this.setState({
                    list: res.data.list
                })
            })
            // .catch((error) => { console.log(error+'+++') })
            alert('获取失败！！！')
    }
    render() {
        return (
            <div>
                <button onClick={this.handclick}>
                    点击点击
            </button>
            </div>
        )
    }
};
export default Admin;



import React, { Component } from "react";
import axios from "axios";
import config from '../config/config.json'


const abs='';
export default class index extends Component {
    state = {
        abs: '',
        abb:''
    }
    headen = () => {
        axios({url:config.httpUrl1})
            .then((res) => {
                console.log(res);
                this.setState({
                    abs:res.data.type_list[0].type,
                    abb:res.data.type_list[0].type_id
                })
                console.log(abs);
            })
            .catch((err) => {
                console.log('err')
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.headen}></button>
                <div>{this.state.abs}</div>
                <div>{this.state.abb}</div>
            </div>
        )
    }
}
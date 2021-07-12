import React,{Component} from 'react';
// import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

    getOption = ()=>{
        let option = {
            title: {
                text: '家政平台统计图',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '家政',
                    type: 'pie',
                    // radius: '50%',
                    radius: [0, 100],
                    center: ['50%', '60%'],
                    data: [
                        {value: 104, name: '家政1'},
                        {value: 29, name: '家政2'},
                        {value: 77, name: '家政3'},
                        {value: 195, name: '家政4'},
                        {value: 151, name: '家政5'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    };
    render() {
        return (
            <ReactEcharts option={this.getOption()}/>
        )
    }
}
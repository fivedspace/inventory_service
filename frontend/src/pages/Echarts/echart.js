import React,{Component} from 'react';
// import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

    getOption = ()=>{
        let option = {
            title: {
                text: '教育平台统计图',
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
                    name: '课程',
                    type: 'pie',
                    // radius: '50%',
                    radius: [0, 100],
                    center: ['50%', '60%'],
                    data: [
                        {value: 1048, name: '语文'},
                        {value: 735, name: '数学'},
                        {value: 580, name: '英语'},
                        {value: 484, name: '物理'},
                        {value: 300, name: '化学'}
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
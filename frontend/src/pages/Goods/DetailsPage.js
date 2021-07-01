import React,{useEffect, useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import config from "../../config/config.json";
import axios from "axios";
import mla from "../../assets/images/1.jpg"


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    rightStyle: {
        textAlign: "right"
    },
    table: {
        minWidth: 650,
    },
}));

export default function Inputs(props) {
    const classes = useStyles();
    const imgStyles ={
        display:'block',
        width:'40%',
        height:'200px',
        margin: '10px 10px'
    }
    const [abs, setAbs] = useState({picture:[]});

    useEffect(()=>{
        details()
    },[])
    const details=()=>{
        axios.get(config.httpUrlpro1+ props.query)
                .then((res) => {
                    console.log(res.data);
                    setAbs(
                        res.data
                    )
                })
                .catch((err) => {
                    console.log('err')
                })
    }


    return (
            <div className={classes.root}>
                <div style={{display:'flex'}}>
                    <img src={mla} style={imgStyles}/>
                    <div style={{marginLeft:'10%'}}>
                        <h4>商品名称：{abs.commodity_name}</h4>
                        <h4>库存数量：{abs.quantity_in_stock}</h4>
                        <h4>商品类型：</h4>
                        <h4>商品规格：</h4>
                        <h4>备注：{abs.remark}</h4>
                    </div>
                </div>
                <div>
                    <h4>详细图片</h4>
                    <div style={{display:'flex',flexWrap: 'wrap'}}>
                        {

                            abs.picture.map((a,index)=>{
                                console.log(a);
                                // console.log(index)
                                const Img = 'http://tzw160702.work:8000' +  '/' + a.path + a.picture_name;
                                return(
                                    // <div>
                                        <img key={index} style={imgStyles} src={Img}/>
                                    // </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
    );
}

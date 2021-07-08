import React, { useEffect, useState, useRef } from 'react';
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
    const imgStyles = {
        display: 'block',
        width: '40%',
        height: '200px',
        margin: '10px 10px'
    }
    const [abs, setAbs] = useState({ picture: [{ path: '', picture_name: '' }], type: [], spec: [] });

    useEffect(() => {
        details()
    }, [])
    const details = () => {
        axios.get(config.httpUrlpro1 + props.query)
            .then((res) => {
                // console.log(res.data);
                setAbs(
                    res.data
                )
            })
            .catch((err) => {
                console.log('err')
            })
    }
    const TYpe = abs.type.length > 3 ? abs.type.slice(-2) : abs.type
    const SPec = abs.spec.length >= 2 ? abs.spec.slice(-2) : abs.spec



    return (
        <div className={classes.root}>
            <div style={{ display: 'flex' }}>
                <img src={
                    abs.picture[0] ?
                        'http://120.55.58.140:8000' + '/' + abs.picture[0].path + abs.picture[0].picture_name :
                        mla
                } style={imgStyles} />
                <div style={{ marginLeft: '10%', width: '40%' }}>
                    <h4>商品名称：{abs.commodity_name}</h4>
                    <h4>库存数量：{abs.quantity_in_stock}</h4>
                    <h4>商品类型：</h4>
                    {

                        TYpe.map((a, index) => {
                            // console.log(a);
                            // console.log(index)

                            // a.length>3 ? TYPE.slice(0,3) : TYPE;
                            const TYPE = a.type;
                            return (
                                <p key={index} style={{ margin: '2px 0 2px 35%' }}>
                                    {index + 1 + "、" + TYPE}
                                </p>
                            )
                        })
                    }
                    <h4>商品规格：</h4>
                    {
                        SPec.map((a, index) => {
                            // console.log(a);
                            // console.log(index)
                            const SPEC = a.spec_info_val;
                            return (
                                <p key={index} style={{ margin: '2px 0 2px 35%' }}>
                                    {index + 1 + "、" + SPEC}
                                </p>
                            )
                        })
                    }
                    <h4>备注：{abs.remark}</h4>
                </div>
            </div>
            <div>
                <h4>详细图片</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {

                        abs.picture.map((a, index) => {
                            // console.log(a);
                            // console.log(index)
                            const Img = 'http://120.55.58.140:8000' + '/' + a.path + a.picture_name;
                            return (
                                // <div>
                                <img key={index} style={imgStyles} src={Img} />
                                // </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
